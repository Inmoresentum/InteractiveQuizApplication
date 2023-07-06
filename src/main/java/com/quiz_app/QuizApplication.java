package com.quiz_app;

import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.service.auth.AuthenticationService;
import com.quiz_app.controller.authcontroller.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.quiz_app.entity.user.Role.ADMIN;
import static com.quiz_app.entity.user.Role.USER;

@SpringBootApplication
@Async
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service, QuizRepository quizRepository) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .username("admin")
                    .firstname("Admin")
                    .lastname("Admin")
                    .email("admin@mail.com")
                    .password("password")
                    .role(ADMIN)
                    .accountCreatedAt(LocalDateTime.now())
                    .agreesWithTermsAndConditions(true)
                    .build();
            service.register(admin);

            var user = RegisterRequest.builder()
                    .username("some-user")
                    .firstname("User")
                    .lastname("User")
                    .email("user@mail.com")
                    .password("password")
                    .accountCreatedAt(LocalDateTime.now())
                    .agreesWithTermsAndConditions(true)
                    .role(USER)
                    .build();
            service.register(user);

            List<Question> questionList = new ArrayList<>();
            Question firstQuestion = Question.builder()
                    .question("What is the capital of France?")
                    .optionsToChooseForm(List.of("Madrid", "Paris", "Rome", "Berlin"))
                    .correctAnswer("Paris")
                    .build();

            Question secondQuestion = Question.builder()
                    .question("What is the largest planet in our solar system?")
                    .optionsToChooseForm(List.of("Mars", "Jupiter", "Venus", "Saturn"))
                    .correctAnswer("Jupiter")
                    .build();
            questionList.add(firstQuestion);
            questionList.add(secondQuestion);
            var quiz = Quiz.builder()
                    .questionList(questionList)
                    .build();

            quizRepository.save(quiz);
        };
    }
}
