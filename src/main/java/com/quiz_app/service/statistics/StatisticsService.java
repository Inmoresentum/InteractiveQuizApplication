package com.quiz_app.service.statistics;

import com.quiz_app.entity.dailysystemstats.DailySystemStatistics;
import com.quiz_app.entity.systemstathistory.SystemStatisticHistory;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.repository.DailySystemStatisticsRepository;
import com.quiz_app.repository.SystemStatisticHistoryRepository;
import com.quiz_app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Log4j2
public class StatisticsService {
    private final DailySystemStatisticsRepository dailySystemStatisticsRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final SystemStatisticHistoryRepository systemStatisticHistoryRepository;


    public DailySystemStatistics getDailySystemStatistics() {
        var returnedData = dailySystemStatisticsRepository.findAll();
        if (returnedData.isEmpty()) {
            log.error("dailySystemStatisticsRepository returned null data");
            throw new RuntimeException("dailySystemStatisticsRepository returned null data");
        }
        return returnedData.get(0);
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void updateHistory() throws IllegalAccessException {
        var returnedData = dailySystemStatisticsRepository.findAll();
        if (returnedData.isEmpty()) {
            log.error("dailySystemStatisticsRepository returned null data");
            throw new IllegalAccessException("dailySystemStatisticsRepository returned null data");
        }
        var today_sData = returnedData.get(0);
        var today_sSystemStat = SystemStatisticHistory.builder()
                .totalNumberOfNewUsersToday(today_sData.getTotalNumberOfNewUsersToday())
                .localDateTime(LocalDateTime.now())
                .totalNumberOfNewQuizzesToday(today_sData.getTotalNumberOfNewQuizzesToday())
                .totalNumberOfUsers(today_sData.getTotalNumberOfUsers())
                .totalNumberOfQuizzes(today_sData.getTotalNumberOfQuizzes())
                .build();
        systemStatisticHistoryRepository.save(today_sSystemStat);
        resetDailySystemStat(today_sData);
    }

    private void resetDailySystemStat(DailySystemStatistics dailySystemStatistics) {
        dailySystemStatistics.setTotalNumberOfNewUsersToday(0L);
        dailySystemStatistics.setTotalNumberOfQuizzesPlayedToday(0L);
        dailySystemStatistics.setTotalNumberOfNewQuizzesToday(0L);
        dailySystemStatistics.setTotalNumberOfQuizzes(quizRepository.count());
        dailySystemStatistics.setTotalNumberOfUsers(userRepository.count());
        dailySystemStatisticsRepository.save(dailySystemStatistics);
    }
}
