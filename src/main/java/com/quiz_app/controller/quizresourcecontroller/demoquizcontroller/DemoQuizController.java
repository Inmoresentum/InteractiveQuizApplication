package com.quiz_app.controller.quizresourcecontroller.demoquizcontroller;

import com.quiz_app.service.quiz.DemoQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quiz/public/demo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class DemoQuizController {
    private final DemoQuizService demoQuizService;

    @GetMapping("/getDemoQuiz/{id}")
    public ResponseEntity<?> getDemoQuiz(@PathVariable Integer id) {
        return demoQuizService.getDemoQuiz(id);
    }
}
