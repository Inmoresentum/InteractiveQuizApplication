package com.quiz_app.controller.authcontroller.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForgotPasswordVerificationRequest {
    private String newPassword;
}
