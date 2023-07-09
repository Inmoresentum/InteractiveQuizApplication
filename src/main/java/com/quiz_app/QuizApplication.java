package com.quiz_app;

import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.service.auth.AuthenticationService;
import com.quiz_app.controller.authcontroller.request.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;

import java.time.LocalDateTime;
import java.util.List;

import static com.quiz_app.entity.quiz.AnswerSelectionType.*;
import static com.quiz_app.entity.quiz.QuestionType.*;
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

            Question firstQuestion = Question.builder()
                    .question("How can you access the state of a component from inside of a member function?")
                    .questionType(TEXT)
                    .questionPic("https://dummyimage.com/600x400/000/fff&text=X")
                    .answerSelectionType(SINGLE)
                    .answers(List.of("this.getState()",
                            "this.prototype.stateValue",
                            "this.state",
                            "this.values"))
                    .correctAnswer(List.of(3))
                    .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                    .messageForCorrectAnswer("GG")
                    .explanation("Well, you know xD")
                    .point((double) 20)
                    .build();

            Question secondQuestion = Question.builder()
                    .question("What are the advantages of React JS?")
                    .questionType(TEXT)
                    .questionPic(null)
                    .answerSelectionType(MULTIPLE)
                    .answers(List.of(
                            "React can be used on client and as well as server side too",
                            "Using React increases readability and makes maintainability easier. Component," +
                                    " Data patterns improves readability and thus makes it easier for manitaining larger apps",
                            "React components have lifecycle events that fall into State/Property Updates",
                            "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
                    ))
                    .correctAnswer(List.of(1, 2, 4))
                    .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                    .messageForCorrectAnswer("GG")
                    .explanation("Well, you know xD")
                    .point((double) 20)
                    .build();

            Question thirdQuestion = Question.builder()
                    .question("Choose the image that looks like **A**")
                    .questionType(TEXT)
                    .questionPic(null)
                    .answerSelectionType(SINGLE)
                    .answers(List.of(
                            "https://dummyimage.com/600x400/000/fff&text=A",
                            "https://dummyimage.com/600x400/000/fff&text=B",
                            "https://dummyimage.com/600x400/000/fff&text=C",
                            "https://dummyimage.com/600x400/000/fff&text=D"
                    ))
                    .correctAnswer(List.of(1))
                    .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                    .messageForCorrectAnswer("GG")
                    .explanation("Well, you know xD")
                    .point((double) 5)
                    .build();

            List<Question> questionList = List.of(firstQuestion,
                    secondQuestion,
                    thirdQuestion);

            var quiz = Quiz.builder()
                    .quizTitle("Checking Test Quiz")
                    .quizSynopsis("Well, I do not want to type anything")
                    .questions(questionList)
                    .build();

            quizRepository.save(quiz);
        };
    }
}
