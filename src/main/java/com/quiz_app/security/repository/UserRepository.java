package com.quiz_app.security.repository;

import java.util.Optional;

import com.quiz_app.security.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
