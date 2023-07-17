package com.quiz_app.controller.authcontroller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class AccountRegistrationResponse {
    @JsonProperty("message")
    private String message;
}
