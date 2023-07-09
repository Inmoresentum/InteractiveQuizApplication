package com.quiz_app.service.quiz;

import com.quiz_app.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DemoQuizService {
    private final QuizRepository quizRepository;


    public ResponseEntity<?> getDemoQuiz(Integer id) {
        return ResponseEntity.ok().body(quizRepository.findById(id));
    }
}
