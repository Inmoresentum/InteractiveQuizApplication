package com.quiz_app.repository;

import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.entity.quiz.QuizTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    List<Quiz> findAllByCurQuizTag(QuizTag curQuizTag);
    List<Quiz> findAllByQuizTitleContainingIgnoreCase(String searchParams);
}
