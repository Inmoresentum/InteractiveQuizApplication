package com.quiz_app.controller.authcontroller;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class AccountVerificationResponse {
    private String message;
}
