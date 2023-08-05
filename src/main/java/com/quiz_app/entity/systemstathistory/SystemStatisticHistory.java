package com.quiz_app.entity.systemstathistory;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "system_statistic_history")
@NamedQuery(name = "SystemStatisticHistory.findLastInsertedValue",
        query = "SELECT s FROM SystemStatisticHistory s WHERE s.localDateTime = (SELECT MAX(s.localDateTime) FROM SystemStatisticHistory s)")
@Builder
public class SystemStatisticHistory {
    @Id
    private Long id;
    private Long totalNumberOfUsers;
    private Long totalNumberOfQuizzes;
    private Long totalNumberOfNewUsersToday;
    private Long totalNumberOfNewQuizzesToday;
    @Column(name = "local_date_time")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime localDateTime;
}