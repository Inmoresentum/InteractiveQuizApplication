package com.quiz_app.repository;

import com.quiz_app.entity.validip.InvalidIP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvalidIPRepository extends JpaRepository<InvalidIP, Long> {
    List<InvalidIP> findAll();
}
