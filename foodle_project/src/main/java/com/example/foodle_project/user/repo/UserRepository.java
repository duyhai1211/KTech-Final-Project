package com.example.foodle_project.user.repo;

import com.example.foodle_project.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUsername(String username);
}
