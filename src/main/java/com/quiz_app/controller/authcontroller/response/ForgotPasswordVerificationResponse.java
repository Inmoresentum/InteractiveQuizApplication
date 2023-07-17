package com.quiz_app.controller.authcontroller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForgotPasswordVerificationResponse {
    private String message;
}
