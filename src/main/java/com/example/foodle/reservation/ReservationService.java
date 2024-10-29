package com.example.foodle.reservation;

import com.example.foodle.auth.AuthenticationFacade;
import com.example.foodle.auth.entity.UserEntity;

import com.example.foodle.reservation.dto.ReservationDto;
import com.example.foodle.reservation.entity.Reservation;
import com.example.foodle.reservation.repository.ReservationRepo;
import com.example.foodle.restaurant.entity.Restaurant;
import com.example.foodle.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {
    private final AuthenticationFacade authFacade;
    private final ReservationRepo reservationRepo;

    private final RestaurantRepository restaurantRepo;


    public ReservationDto createReservation(ReservationDto reservationDto,Long restaurantId) {
        UserEntity user = authFacade.extractUser();
        Restaurant restaurant = restaurantRepo.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        if(!user.getRoles().equals("ROLE_USER")){
            throw new RuntimeException("Only users can create reservations");
        }
        // Check if the party size exceeds the restaurant's capacity
        if (reservationDto.getPartySize() > restaurant.getCapacity()) {
            throw new RuntimeException("Party size exceeds the capacity of the restaurant");
        }
        log.info("Creating reservation");
        Reservation reservation = new Reservation();

        reservation.setUser(user);
        log.info("Creating reservation 2");
        reservation.setRestaurant(restaurant);
        reservation.setRestaurantName(restaurant.getName());
        log.info("Creating reservation 3");
        reservation.setName(reservationDto.getName());
        reservation.setPhone(reservationDto.getPhone());
        reservation.setDate(reservationDto.getDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setPartySize(reservationDto.getPartySize());
        reservation.setStatus("PENDING");
        log.info("Creating reservation 4");
        reservationRepo.save(reservation);

        return ReservationDto.fromEntity(reservation);

    }

    //user reservation
    public Page<ReservationDto> myReservation(Pageable pageable) {
        Long userId = authFacade.extractUser().getId();
        return reservationRepo.findAllByUserId(userId, pageable)
                .map(ReservationDto::fromEntity);
    }
    //restaurant reservation
    public Page<ReservationDto> myReservations(Pageable pageable) {
        UserEntity owner = authFacade.extractUser();
        Restaurant restaurant = restaurantRepo.findByOwner(owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
        return reservationRepo.findAllByRestaurantId(restaurant.getId(),pageable)
                .map(ReservationDto::fromEntity);
    }
    //restaurant reservation confirm
    public ReservationDto confirmReservation(Long reservationId) {
        // Lấy thông tin người dùng hiện tại
        UserEntity currentUser = authFacade.extractUser();

        // Tìm đơn đặt chỗ theo ID
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        if (!currentUser.getRoles().contains("ROLE_OWNER") ||
                !reservation.getRestaurant().getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("권한이 없습니다"); // Không có quyền
        }
        // Xác nhận đơn đặt chỗ
        reservation.setStatus("CONFIRMED");
        reservationRepo.save(reservation);

        return ReservationDto.fromEntity(reservation);
    }

    //
    public ReservationDto cancelReservation(Long reservationId,String reason) {
        // Lấy thông tin người dùng hiện tại
        UserEntity currentUser = authFacade.extractUser();

        // Tìm đơn đặt chỗ theo ID
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        if (!currentUser.getRoles().contains("ROLE_OWNER") ||
                !reservation.getRestaurant().getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("권한이 없습니다"); // Không có quyền
        }
        if( !reservation.getStatus().equals("CONFIRMED")){
            throw new RuntimeException("예약 취소를 할 수 없다");
        }
        // Cập nhật trạng thái đơn đặt chỗ thành 'Cancelled' và lý do hủy
        reservation.setStatus("CANCELLED");
        reservation.setReason(reason);
        reservationRepo.save(reservation);
        return ReservationDto.fromEntity(reservation);
    }
    //complete reservation
    public ReservationDto completeReservation(Long reservationId) {
        //UserEntity currentUser = authFacade.extractUser();
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if(!reservation.getStatus().equals("CONFIRMED")){
            throw new RuntimeException("예약 완료를 할 수 없다");
        }
        reservation.setStatus("COMPLETED");
        reservationRepo.save(reservation);
        return ReservationDto.fromEntity(reservation);
    }

    @Scheduled(fixedRate = 60000) // 1분에 한 번씩 실행
    public void autoUpdateReservations() {
        List<Reservation> reservations = reservationRepo.findAll();

        for (Reservation reservation : reservations) {
            LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), reservation.getReservationTime());
            LocalDateTime now = LocalDateTime.now();

            // 예약 시간 한 시간 전에 "확정"으로 상태 변경
            if (now.isAfter(reservationDateTime.minusHours(1)) && reservation.getStatus().equals("PENDING")) {
                reservation.setStatus("CONFIRMED");
                reservationRepo.save(reservation);
            }

            // 예약 시간이 지나면 "방문 완료"로 상태 변경
            if (now.isAfter(reservationDateTime) && reservation.getStatus().equals("CONFIRMED")) {
                reservation.setStatus("COMPLETED");
                reservationRepo.save(reservation);
            }
        }
    }

}
