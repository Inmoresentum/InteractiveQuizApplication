package com.quiz_app.controller.authcontroller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.quiz_app.entity.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @JsonProperty("username")
    private String username;
    private String email;
    private Role role;
    private String phoneNumber;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("message")
    private String message;
    @JsonProperty("profile_picture_url")
    private String profilePicUrl;
}
