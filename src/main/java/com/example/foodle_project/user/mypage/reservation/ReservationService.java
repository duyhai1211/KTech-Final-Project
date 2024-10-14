package com.example.foodle_project.user.mypage.reservation;

import com.example.foodle_project.restaurant.retaurant.RestaurantRepository;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.user.model.entity.User;
import com.example.foodle_project.user.model.repo.UserRepository;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationRequestDto;
import com.example.foodle_project.user.mypage.reservation.dto.ReservationResponseDto;
import com.example.foodle_project.user.mypage.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;



    public Long createReservation(ReservationRequestDto reservationDto) {
        User User = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() ->new NoSuchElementException("Member not found with ID: " + reservationDto.getUserId()));
        Restaurant restaurant = restaurantRepository.findById(reservationDto.getRestaurantId())
                .orElseThrow(() -> new NoSuchElementException("Restaurant not found with ID: " + reservationDto.getRestaurantId()));

        Reservation reservation = new Reservation();
        reservation.setName(reservationDto.getName());
        reservation.setPhone(reservationDto.getPhone());
        reservation.setDate(reservationDto.getDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setPartySize(reservationDto.getPartySize());
        reservation.setUser(new User());
        reservation.setRestaurant(restaurant);
        reservation.setRestaurantName(restaurant.getRestaurantName());
        reservation.setStatus("PENDING");

        Reservation savedReservation = reservationRepository.save(reservation);
        return savedReservation.getReservationId();
    }

    public ReservationResponseDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation not found with ID: " + id));

        ReservationResponseDto reservationDto = new ReservationResponseDto();
        reservationDto.setReservationId(reservation.getReservationId());
        reservationDto.setName(reservation.getName());
        reservationDto.setPhone(reservation.getPhone());
        reservationDto.setDate(reservation.getDate());
        reservationDto.setReservationTime(reservation.getReservationTime());
        reservationDto.setPartySize(reservation.getPartySize());
        reservationDto.setMemberId(reservation.getUser().getId());

        if (reservation.getStatus().equals("CONFIRMED")) {
            reservationDto.setStatus("확정");
        } else if (reservation.getStatus().equals("CANCELLED")) {
            reservationDto.setStatus("취소");
        } else {
            reservationDto.setStatus("대기");
        }

        return reservationDto;
    }

    public List<ReservationResponseDto> getReservationsByMemberId(Long user_id) {
        List<Reservation> reservations = reservationRepository.findAllByMemberId(user_id);
        reservations.sort(Comparator.comparing(Reservation::getDate).thenComparing(Reservation::getReservationTime));

        List<ReservationResponseDto> reservationDtos = new ArrayList<>();
        for (Reservation reservation : reservations) {
            System.out.println("예약 : " + reservation);
            ReservationResponseDto reservationDto = new ReservationResponseDto();
            Boolean hasReview = reviewRepository.findByReservationReservationId(reservation.getReservationId()).isPresent();
            reservationDto.setHasReview(hasReview);
            reservationDto.setReview(reservation.getReview());
            reservationDto.setReservationId(reservation.getReservationId());
            reservationDto.setName(reservation.getName());
            reservationDto.setPhone(reservation.getPhone());
            reservationDto.setDate(reservation.getDate());
            reservationDto.setReservationTime(reservation.getReservationTime());
            reservationDto.setPartySize(reservation.getPartySize());
            reservationDto.setRestaurantName(reservation.getRestaurantName());

            if (reservation.getStatus().equals("CONFIRMED")) {
                reservationDto.setStatus("확정");
            } else if (reservation.getStatus().equals("CANCELLED")) {
                reservationDto.setStatus("취소");
            } else if (reservation.getStatus().equals("COMPLETED")) {
                reservationDto.setStatus("방문 완료");
            } else {
                reservationDto.setStatus("대기");
            }

            reservationDtos.add(reservationDto);
        }
        return reservationDtos;
    }

    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation not found with ID: " + id));

        reservationRepository.delete(reservation);
    }

    public void confirmReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation not found with ID: " + id));

        if (reservation.getStatus().equals("PENDING")) {
            // 예약 확정
            reservation.setStatus("CONFIRMED");
            reservationRepository.save(reservation);
        } else {
            throw new IllegalStateException("Reservation cannot be confirmed.");
        }
    }

    public void completeReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reservation not found with ID: " + id));

        if (!reservation.getStatus().equals("CONFIRMED")) {
            throw new IllegalStateException("Reservation cannot be completed.");
        }

        reservation.setStatus("COMPLETED");
        reservationRepository.save(reservation);
    }

    public void cancelReservation(Long id) {
        Reservation reservation = findReservation(id);
        reservation.cancelReservation();
        reservationRepository.save(reservation);
    }


    public Reservation findReservation(Long reservationId){
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NoSuchElementException("Reservation not found with ID: " + reservationId));
    }


    public Reservation findByIdElseThrow(Long reservationId) {
        return reservationRepository.findById(reservationId).orElseThrow();
    }

    @Scheduled(fixedRate = 60000) // 1분에 한 번씩 실행
    public void autoUpdateReservations() {
        List<Reservation> reservations = reservationRepository.findAll();

        for (Reservation reservation : reservations) {
            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getReservationTime());
            LocalDateTime now = LocalDateTime.now();

            // 예약 시간 한 시간 전에 "확정"으로 상태 변경
            if (now.isAfter(reservationDateTime.minusHours(1)) && reservation.getStatus().equals("PENDING")) {
                reservation.setStatus("CONFIRMED");
                reservationRepository.save(reservation);
            }

            // 예약 시간이 지나면 "방문 완료"로 상태 변경
            if (now.isAfter(reservationDateTime) && reservation.getStatus().equals("CONFIRMED")) {
                reservation.setStatus("COMPLETED");
                reservationRepository.save(reservation);
            }
        }
    }
}