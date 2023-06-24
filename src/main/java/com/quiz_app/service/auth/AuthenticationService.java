package com.quiz_app.service.auth;

import com.quiz_app.config.JwtService;
import com.quiz_app.controller.authcontroller.AccountRegistrationResponse;
import com.quiz_app.controller.authcontroller.AuthenticationRequest;
import com.quiz_app.entity.jwttoken.Token;
import com.quiz_app.entity.jwttoken.TokenType;
import com.quiz_app.entity.user.User;
import com.quiz_app.controller.authcontroller.AuthenticationResponse;
import com.quiz_app.controller.authcontroller.RegisterRequest;
import com.quiz_app.entity.user.UserVerificationToken;
import com.quiz_app.repository.TokenRepository;
import com.quiz_app.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiz_app.repository.UserVerificationTokenRepository;
import com.quiz_app.service.email.EmailService;
import com.quiz_app.service.email.EmailUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserVerificationTokenRepository userVerificationTokenRepository;
    private final EmailService emailService;
    private final EmailUtils emailUtils;

    @Transactional
    public AccountRegistrationResponse register(RegisterRequest request) {

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountCreated(LocalDateTime.now())
                .agreesWithTermsOfServicesAndPrivacyAndPolicy(request.isAgreesWithTermsAndConditions())
                .role(request.getRole())
                .build();

        userRepository.save(user);

        final String activationToken = UUID.randomUUID().toString();
        final String EMAIL_VERIFICATION_URL = "http://localhost:3000/activate?token=";
        final String activationLink = EMAIL_VERIFICATION_URL.concat(activationToken);
        // Also, have to save this activation token in the token repository.
        UserVerificationToken userVerificationToken = new UserVerificationToken(activationToken,
                LocalDateTime.now(), LocalDateTime.now().plusHours(3), user);
        // Saving the token
        userVerificationTokenRepository.save(userVerificationToken);
        emailService.send(user.getEmail(), "Account Activation", emailUtils
                .buildAccountConfirmationEmail(user.getFirstname(), activationLink));

        return AccountRegistrationResponse.builder()
                .message("please check your email for further instructions")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
