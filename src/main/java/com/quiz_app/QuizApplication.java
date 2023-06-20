package com.quiz_app;

import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.service.AuthenticationService;
import com.quiz_app.controller.authcontroller.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.quiz_app.entity.user.Role.ADMIN;
import static com.quiz_app.entity.user.Role.USER;

@SpringBootApplication
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service, QuizRepository quizRepository) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .firstname("Admin")
                    .lastname("Admin")
                    .email("admin@mail.com")
                    .password("password")
                    .role(ADMIN)
                    .accountCreatedAt(LocalDateTime.now())
                    .agreesWithTermsAndConditions(true)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());

            var user = RegisterRequest.builder()
                    .firstname("User")
                    .lastname("User")
                    .email("user@mail.com")
                    .password("password")
                    .accountCreatedAt(LocalDateTime.now())
                    .agreesWithTermsAndConditions(true)
                    .role(USER)
                    .build();
            System.out.println("User token: " + service.register(user).getAccessToken());

            List<Question> questionList = new ArrayList<>();
            Question firstQuestion = new Question();
            firstQuestion.setQuestion("What is the capital of France?");
            firstQuestion.setOptionsToChooseForm(List.of("Madrid", "Paris", "Rome", "Berlin"));
            firstQuestion.setCorrectAnswer("Paris");
            Question secondQuestion = new Question();
            secondQuestion.setQuestion("What is the largest planet in our solar system?");
            secondQuestion.setOptionsToChooseForm(List.of("Mars", "Jupiter", "Venus", "Saturn"));
            secondQuestion.setCorrectAnswer("Jupiter");
            questionList.add(firstQuestion);
            questionList.add(secondQuestion);
            var quiz = new Quiz();
            quiz.setQuestionList(questionList);
            quizRepository.save(quiz);
        };
    }
}
