package com.quiz_app.entity.leaderboard.global;

import com.quiz_app.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "global_leader_board")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GlobalLeaderBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    private Long score = 0L;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Rank Can't be Null")
    @Enumerated
    @Column(name = "global_rank")
    @OrderBy("globalRank ASC, score DESC") // Sort by globalRank ascending, then by score descending
    private GlobalRank globalRank;

    @Version
    @Column(name = "version")
    private Integer version;

}