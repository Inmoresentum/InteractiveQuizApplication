package com.quiz_app.repository;

import com.quiz_app.entity.dailysystemstats.DailySystemStatistics;
import com.quiz_app.entity.dailysystemstats.DailySystemStatisticsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailySystemStatisticsRepository
        extends JpaRepository<DailySystemStatistics, DailySystemStatisticsKey> {
}