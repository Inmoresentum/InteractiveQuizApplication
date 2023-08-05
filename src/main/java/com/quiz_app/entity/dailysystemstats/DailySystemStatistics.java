package com.quiz_app.entity.dailysystemstats;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailySystemStatistics {
    @EmbeddedId
    private DailySystemStatisticsKey key;
    private Long totalNumberOfUsers;
    private Long totalNumberOfQuizzes;
    private Long totalNumberOfNewUsersToday;
    private Long totalNumberOfNewQuizzesToday;
    private Long totalNumberOfQuizzesPlayedToday;
}
