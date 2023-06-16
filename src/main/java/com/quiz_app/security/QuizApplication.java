package com.quiz_app.security;

import com.quiz_app.security.service.AuthenticationService;
import com.quiz_app.security.controller.authcontroller.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

import static com.quiz_app.security.entity.user.Role.ADMIN;
import static com.quiz_app.security.entity.user.Role.USER;

@SpringBootApplication
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service) {
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
        };
    }
}
