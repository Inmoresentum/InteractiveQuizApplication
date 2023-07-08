package com.quiz_app.repository;

import com.quiz_app.entity.user.ForgotPasswordVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ForgotPasswordVerificationRepository
        extends JpaRepository<ForgotPasswordVerificationToken,
        Long> {
    Optional<ForgotPasswordVerificationToken> findByToken(String token);

    boolean existsByToken(String Token);

    @Transactional
    @Modifying
    @Query("UPDATE ForgotPasswordVerificationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    void updateConfirmedAt(String token, LocalDateTime confirmedAt);
}
