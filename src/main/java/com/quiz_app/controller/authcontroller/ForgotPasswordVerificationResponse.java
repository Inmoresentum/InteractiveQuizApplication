package com.quiz_app.controller.authcontroller;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForgotPasswordVerificationResponse {
    private String message;
}
