package com.example.foodle_project.restaurant.retaurant;

import com.example.foodle_project.restaurant.address.entity.Address;
import com.example.foodle_project.restaurant.address.repo.AddressRepository;
import com.example.foodle_project.restaurant.image.RestaurantImage;
import com.example.foodle_project.restaurant.image.RestaurantImageRepository;
import com.example.foodle_project.restaurant.menu.dto.MenuDto;
import com.example.foodle_project.restaurant.menu.entity.Menu;
import com.example.foodle_project.restaurant.menu.repo.MenuRepository;
import com.example.foodle_project.restaurant.retaurant.dto.RestaurantDto;
import com.example.foodle_project.restaurant.retaurant.entity.Restaurant;
import com.example.foodle_project.restaurant.retaurant.entity.RestaurantType;
import com.example.foodle_project.restaurant.retaurant.repo.RestaurantRepository;
import com.example.foodle_project.user.mypage.reservation.Reservation;
import com.example.foodle_project.user.mypage.reservation.ReservationRepository;
import com.example.foodle_project.user.mypage.review.ReviewRepository;
import com.example.foodle_project.user.mypage.review.entity.Review;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final AddressRepository addressRepository;
    private final MenuRepository menuRepository;
    private final RestaurantImageRepository restaurantImageRepository;



    // Tạo mới một nhà hàng
    public Restaurant createRestaurant(RestaurantDto restaurantDto) {
        Address address = new Address(restaurantDto.getAddress1(), restaurantDto.getAddress2(), restaurantDto.getAddress3(), restaurantDto.getDetailAddress());
        addressRepository.save(address);
        Restaurant restaurant = Restaurant.builder()
                .restaurantName(restaurantDto.getRestaurantName())
                .description(restaurantDto.getDescription())
                .type(RestaurantType.valueOf(restaurantDto.getType()))
                .phoneNumber(restaurantDto.getPhoneNumber())
                .address(address)
                .openingTime(LocalTime.parse(restaurantDto.getOpeningTime()))
                .closingTime(LocalTime.parse(restaurantDto.getClosingTime()))
                .build();

        return restaurantRepository.save(restaurant);
    }


    // Cập nhật thông tin nhà hàng
    public RestaurantDto updateRestaurant(Long restaurantId, RestaurantDto restaurantDto) {
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);
        if (restaurantOptional.isPresent()) {
            Restaurant restaurant = restaurantOptional.get();

            // Cập nhật Address nếu cần thiết
            Address address = new Address(restaurantDto.getAddress1(), restaurantDto.getAddress2(), restaurantDto.getAddress3(), restaurantDto.getDetailAddress());
            addressRepository.save(address);

            restaurant.update(
                    restaurantDto,
                    address,
                    LocalTime.parse(restaurantDto.getOpeningTime()),
                    LocalTime.parse(restaurantDto.getClosingTime())
            );
            restaurantRepository.save(restaurant);
            return restaurantDto;
        } else {
            throw new EntityNotFoundException("Restaurant with ID " + restaurantId + " not found.");
        }
    }


    // Tìm nhà hàng theo ID
    public Restaurant getRestaurantById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
    }

    // Xóa nhà hàng
    public void deleteRestaurant(Long restaurantId) {
        if (restaurantRepository.existsById(restaurantId)) {
            restaurantRepository.deleteById(restaurantId);
        } else {
            throw new IllegalArgumentException("Restaurant not found");
        }
    }


    // Tìm tất cả đánh giá của một nhà hàng
    public List<Review> getReviews(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        return restaurant.getReviews();
    }


    // Tìm tất cả đặt chỗ của nhà hàng
    public List<Reservation> getReservations(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        return restaurant.getReservations();
    }

    // updateimgae
    public String updateRestaurantImage(Long restaurantId, MultipartFile file) throws IOException {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Nhà hàng không tồn tại"));

        // Tạo đường dẫn lưu trữ
        String fileName = restaurantId + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("images/");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Tạo hoặc cập nhật đối tượng RestaurantImage
        RestaurantImage restaurantImage = restaurant.getRestaurantImage(); // Lấy hình ảnh hiện tại
        if (restaurantImage == null) {
            restaurantImage = new RestaurantImage(file.getOriginalFilename(), fileName, filePath.toString());
            restaurantImage.setRestaurant(restaurant); // Liên kết với nhà hàng
        } else {
            restaurantImage.setUploadFileName(file.getOriginalFilename());
            restaurantImage.setStoredFileName(fileName);
            restaurantImage.setImagePath(filePath.toString());
        }

        restaurantImageRepository.save(restaurantImage); // Lưu hình ảnh
        return fileName;
    }

    // Phương thức thêm menu cho nhà hàng
    public Long addMenuToRestaurant(Long restaurantId, MenuDto menuDto) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NoSuchElementException("ID 레스토랑을 찾을 수 없습니다 : " + restaurantId));

        Menu menu = new Menu();
        menu.setMenuName(menuDto.getMenuName());
        menu.setPrice(menuDto.getPrice());
        menu.setRestaurant(restaurant); // Thiết lập nhà hàng cho menu

        Menu savedMenu = menuRepository.save(menu); // Lưu menu
        return savedMenu.getMenuId(); // Trả về ID của menu đã lưu
    }


    // Phương thức tìm một nhà hàng theo ID
    public Restaurant findOne(Long id) {
        // Tìm nhà hàng theo ID, nếu không tìm thấy sẽ ném ra một ngoại lệ
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Nhà hàng với ID " + id + " không tồn tại."));
    }


}

