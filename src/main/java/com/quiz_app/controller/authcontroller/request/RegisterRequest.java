package com.quiz_app.controller.authcontroller.request;

import com.quiz_app.entity.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    private LocalDateTime accountCreatedAt;
    private boolean agreesWithTermsAndConditions;
}
