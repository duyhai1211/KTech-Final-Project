package com.example.foodle_project.user.model.repo;

import com.example.foodle_project.user.model.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    Optional<User> findByNickname(String nickname);

    Optional<User> findByEmail(String email);
}
