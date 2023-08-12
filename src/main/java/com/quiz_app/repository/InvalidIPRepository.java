package com.quiz_app.repository;

import com.quiz_app.entity.validip.InvalidIP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvalidIPRepository extends JpaRepository<InvalidIP, Long> {
    Optional<InvalidIP> findByBannedIp(String bannedIp);

    List<InvalidIP> findAll();
}
