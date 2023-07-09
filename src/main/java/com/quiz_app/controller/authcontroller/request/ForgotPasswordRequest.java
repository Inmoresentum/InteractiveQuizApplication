package com.quiz_app.controller.authcontroller.request;

import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForgotPasswordRequest {
    @Email
    private String email;
}
