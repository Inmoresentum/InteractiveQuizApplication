package com.quiz_app.controller.quizresourcecontroller;

import com.quiz_app.controller.quizresourcecontroller.request.QuizCreateRequestBody;
import com.quiz_app.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/quiz/resource")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class QuizController {
    private final QuizService quizService;

    @GetMapping("/getDemoQuiz")
    public ResponseEntity<?> getDemoQuiz() {
        return quizService.getDemoQuiz();
    }

    @GetMapping("/quizzes")
    public ResponseEntity<?> getQuizzesByPage(@RequestParam Integer page) {
        if (page == null) {
            ResponseEntity.badRequest().body(Map.of("message",
                    "Must need to include query parameter page"));
        }
        return quizService.getQuizzesByPage(page);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> submitQuiz(@RequestBody QuizCreateRequestBody quizCreateRequestBody) {
        // Handle the submission of the quiz form data and file uploads here
        System.out.println(quizCreateRequestBody);
        quizService.handleQuizCreation(quizCreateRequestBody);
        return ResponseEntity.status(201).body(Map.of("message",
                "successfully created the quiz"));
    }
}