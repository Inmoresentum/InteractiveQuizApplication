package com.quiz_app.repository;

import com.quiz_app.entity.systemstathistory.SystemStatisticHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemStatisticHistoryRepository extends JpaRepository<SystemStatisticHistory, Long> {
    Optional<SystemStatisticHistory> findLastInsertedValue();

}