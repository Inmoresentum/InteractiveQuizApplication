package com.quiz_app;

import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.repository.UserRepository;
import com.quiz_app.service.auth.AuthenticationService;
import com.quiz_app.controller.authcontroller.request.RegisterRequest;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.quiz_app.entity.quiz.AnswerSelectionType.*;
import static com.quiz_app.entity.quiz.QuestionType.*;
import static com.quiz_app.entity.user.Role.ADMIN;
import static com.quiz_app.entity.user.Role.USER;

@SpringBootApplication
@EnableAsync
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(AuthenticationService service,
                                        QuizRepository quizRepository,
                                        UserRepository userRepository,
                                        Environment environment) {
        return args -> {
            System.out.println(Arrays.toString(environment.getActiveProfiles()));
            if (!Arrays.asList(environment.getActiveProfiles()).contains("dev") && userRepository.count() == 0) {
                Set<String> usedUsernames = ConcurrentHashMap.newKeySet();
                Set<String> usedEmails = ConcurrentHashMap.newKeySet();

                // Fixed issue for the lower end systems meaning
                // CPU with lower number of threads.
                ExecutorService executor = Executors
                        .newFixedThreadPool(Math.min(22, Runtime.getRuntime().availableProcessors()));

                List<CompletableFuture<Void>> futures = new ArrayList<>();
                for (int i = 0; i < 40; i++) {
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        Faker faker = new Faker();
                        List<RegisterRequest> users = new ArrayList<>();
                        for (int j = 0; j < 1000; j++) {
                            String username = faker.name().username();
                            while (!usedUsernames.add(username)) {
                                username = faker.name().username();
                            }

                            String email = faker.internet().emailAddress();
                            while (!usedEmails.add(email)) {
                                email = faker.internet().emailAddress();
                            }

                            RegisterRequest user = RegisterRequest.builder()
                                    .username(username)
                                    .firstname(faker.name().firstName())
                                    .lastname(faker.name().lastName())
                                    .email(email)
                                    .password(faker.internet().password())
                                    .accountCreatedAt(LocalDateTime.now())
                                    .agreesWithTermsAndConditions(true)
                                    .role(USER)
                                    .build();
                            users.add(user);
                        }
                        service.registerAll(users);
                    }, executor);
                    futures.add(future);
                }
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                executor.shutdown();
            } else {
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
            }

            if (quizRepository.count() == 0) {
                Question firstQuestion = Question.builder()
                        .question("How can you access the state of a component" +
                                " from inside of a member function?")
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
                        .questionType(PHOTO)
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
            }
        };
    }
}
