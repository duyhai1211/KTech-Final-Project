package com.example.foodle.reservation;

import com.example.foodle.auth.AuthenticationFacade;
import com.example.foodle.auth.entity.UserEntity;
import com.example.foodle.auth.repo.UserRepo;
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
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {
    private final AuthenticationFacade authFacade;
    private final ReservationRepo reservationRepo;
    private final UserRepo userRepo;
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
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setRestaurant(restaurant);
        reservation.setName(reservationDto.getName());
        reservation.setPhone(reservationDto.getPhone());
        reservation.setDate(reservationDto.getDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setPartySize(reservationDto.getPartySize());
        reservation.setStatus("Pending");
        reservationRepo.save(reservation);

        return ReservationDto.fromEntity(reservation);

    }

    //user reservation
    public Page<ReservationDto> myReservation(Pageable pageable) {
        Long userId = authFacade.extractUser().getId();
        return reservationRepo.findAllByUserId(userId, pageable)
                .map(ReservationDto::fromEntity);
    }
    //restaurant reservation confirm
    public ReservationDto confirmReservation(Long reservationId) {
        // Lấy thông tin người dùng hiện tại
        UserEntity currentUser = authFacade.extractUser();

        // Kiểm tra xem người dùng hiện tại có phải là chủ nhà hàng không
        if (!currentUser.getRoles().equals("ROLE_OWNER")) {
            throw new RuntimeException("You are not authorized to confirm this reservation");
        }

        // Tìm đơn đặt chỗ theo ID
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Chỉ nhà hàng quản lý mới được xác nhận đặt chỗ
        if (!reservation.getRestaurant().getOwner().equals(currentUser)) {
            throw new RuntimeException("You are not authorized to confirm this reservation");
        }

        // Xác nhận đơn đặt chỗ
        reservation.setStatus("Confirmed");
        reservationRepo.save(reservation);

        return ReservationDto.fromEntity(reservation);
    }

    //
    public ReservationDto cancelReservation(Long reservationId, String reason) {
        // Lấy thông tin người dùng hiện tại
        UserEntity currentUser = authFacade.extractUser();

        // Tìm đơn đặt chỗ theo ID
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Cập nhật trạng thái đơn đặt chỗ thành 'Cancelled' và lý do hủy
        reservation.setStatus("Cancelled");
        reservation.setReason(reason);
        reservationRepo.save(reservation);
        return ReservationDto.fromEntity(reservation);
    }
    //complete reservation
    public ReservationDto completeReservation(Long reservationId) {
        UserEntity currentUser = authFacade.extractUser();
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus("Complete");
        reservationRepo.save(reservation);
        return ReservationDto.fromEntity(reservation);
    }



}
