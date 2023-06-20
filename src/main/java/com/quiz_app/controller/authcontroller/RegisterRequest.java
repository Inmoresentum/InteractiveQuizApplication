package com.quiz_app.controller.authcontroller;

import com.quiz_app.entity.user.Role;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    private LocalDateTime accountCreatedAt;
    private boolean agreesWithTermsAndConditions;
}
