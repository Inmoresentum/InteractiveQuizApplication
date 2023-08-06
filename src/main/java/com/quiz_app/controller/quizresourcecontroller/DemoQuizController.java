package com.quiz_app.controller.quizresourcecontroller;

import com.quiz_app.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quiz/public/demo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class DemoQuizController {
    private final QuizService quizService;

    @GetMapping("/getDemoQuiz/{id}")
    public ResponseEntity<?> getDemoQuiz(@PathVariable Integer id) {
        return quizService.getDemoQuiz(id);
    }

    @GetMapping("/getDemoQuiz/{page}")
    public ResponseEntity<?> getQuizPageByPage(@PathVariable Integer page) {
        return quizService.getQuizzesByPage(page);
    }
}