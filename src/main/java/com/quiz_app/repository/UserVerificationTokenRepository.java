package com.quiz_app.repository;

import com.quiz_app.entity.user.UserVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVerificationTokenRepository extends JpaRepository<UserVerificationToken, Long> {
}
