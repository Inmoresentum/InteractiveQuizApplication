package com.quiz_app.controller.authcontroller;

import com.quiz_app.repository.QuizRepository;
import com.quiz_app.service.auth.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AuthenticationController {

    private final AuthenticationService authService;
    private final QuizRepository quizRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request) {
        return authService.register(request);
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        System.out.println("I was able to hit the end point");
        return authService.authenticate(request);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }

    @GetMapping("/account/verify")
    public ResponseEntity<AccountVerificationResponse> verifyAccountVerification(@RequestParam("token") String token) {
        return authService.verifyUser(token);
    }

    @PostMapping("/account/forgot")
    public ResponseEntity<ForgotPasswordVerificationResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest resetRequest) {
        return authService.generatePasswordResetLink(resetRequest.getEmail());
    }
    @GetMapping("/account/forgot/verify")
    public ResponseEntity<ForgotPasswordVerificationResponse> verifyForgotPasswordToken(
            @RequestParam("token") String token,
            @RequestBody ForgotPasswordVerificationRequest forgotPasswordVerificationRequest) {
    return authService.verifyForgotPasswordToken(token, forgotPasswordVerificationRequest);
    }
}
