package com.quiz_app.repository;

import com.quiz_app.entity.leaderboard.global.GlobalLeaderBoard;
import com.quiz_app.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalLeaderBoardRepository
        extends JpaRepository<GlobalLeaderBoard, Long>,
        JpaSpecificationExecutor<GlobalLeaderBoard> {

    boolean existsByUser(User user);
    GlobalLeaderBoard findGlobalLeaderBoardByUser(User user);
}