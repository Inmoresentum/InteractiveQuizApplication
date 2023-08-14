package com.quiz_app.controller.quizresourcecontroller;

import com.quiz_app.controller.quizresourcecontroller.request.QuizCreateRequestBody;
import com.quiz_app.controller.quizresourcecontroller.request.QuizScoreStoreRequestBody;
import com.quiz_app.entity.user.User;
import com.quiz_app.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @GetMapping("/allQuiz")
    public ResponseEntity<?> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
    @GetMapping("/allQuiz/search")
    public ResponseEntity<?> getAllQuizzesBySearch(@RequestParam String search) {
        return quizService.getAllQuizzesBySearchTerm(search);
    }
    @GetMapping("/allQuiz/tag")
    public ResponseEntity<?> getAllQuizzesByTag(@RequestParam String tag) {
        return quizService.getAllQuizzesByTag(tag);
    }
    @PostMapping(value = "/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitQuiz(@RequestBody QuizCreateRequestBody quizCreateRequestBody) {
        // Handle the submission of the quiz form data and file uploads here
        System.out.println(quizCreateRequestBody);
        Authentication mayBeUser = SecurityContextHolder.getContext().getAuthentication();
        var userWhoCreatedTheQuiz = (User) mayBeUser.getPrincipal();
        System.out.println(userWhoCreatedTheQuiz.getId());
        quizService.handleQuizCreation(quizCreateRequestBody, userWhoCreatedTheQuiz);
        return ResponseEntity.status(201).body(Map.of("message",
                "successfully created the quiz"));
    }

    @PostMapping("/save-score")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> saveQuizScore(@RequestBody QuizScoreStoreRequestBody quizScoreStoreRequestBody) {
        Authentication mayBeUser = SecurityContextHolder.getContext().getAuthentication();
        if (mayBeUser == null) {
            throw new RuntimeException("User can't be null");
        }
        quizService.saveQuizScore(quizScoreStoreRequestBody, mayBeUser);
        return ResponseEntity.ok(Map.of("message",
                "saved the score of " + quizScoreStoreRequestBody.getScore()));
    }
}