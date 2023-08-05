package com.quiz_app.service.auth;

import com.quiz_app.config.jwt.JwtService;
import com.quiz_app.controller.authcontroller.request.AuthenticationRequest;
import com.quiz_app.controller.authcontroller.request.ForgotPasswordVerificationRequest;
import com.quiz_app.controller.authcontroller.request.RegisterRequest;
import com.quiz_app.controller.authcontroller.response.AccountRegistrationResponse;
import com.quiz_app.controller.authcontroller.response.AccountVerificationResponse;
import com.quiz_app.controller.authcontroller.response.AuthenticationResponse;
import com.quiz_app.controller.authcontroller.response.ForgotPasswordVerificationResponse;
import com.quiz_app.entity.jwttoken.Token;
import com.quiz_app.entity.jwttoken.TokenType;
import com.quiz_app.entity.user.ForgotPasswordVerificationToken;
import com.quiz_app.entity.user.User;
import com.quiz_app.entity.user.UserVerificationToken;
import com.quiz_app.repository.ForgotPasswordVerificationRepository;
import com.quiz_app.repository.TokenRepository;
import com.quiz_app.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiz_app.repository.UserVerificationTokenRepository;
import com.quiz_app.service.email.EmailService;
import com.quiz_app.service.email.EmailUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
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
    private final ForgotPasswordVerificationRepository forgotPasswordVerificationRepository;
    @Value("${front.server.address}")
    private String FRONT_END_SERVER_BASE_URL;

    @Transactional
    public ResponseEntity<AccountRegistrationResponse> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>(AccountRegistrationResponse.builder()
                    .message("There is already an account associated with this email")
                    .build(), HttpStatus.CONFLICT);
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return new ResponseEntity<>(AccountRegistrationResponse.builder()
                    .message("The Username is already taken")
                    .build(), HttpStatus.CONFLICT);
        }

        var user = User.builder()
                .username(request.getUsername())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountCreated(LocalDateTime.now())
                .agreesWithTermsOfServicesAndPrivacyAndPolicy(request.isAgreesWithTermsAndConditions())
                .role(request.getRole())
                .build();

        userRepository.save(user);


        final String ACTIVATION_TOKEN = UUID.randomUUID().toString();
        final String EMAIL_VERIFICATION_URL = FRONT_END_SERVER_BASE_URL + "/auth/verify/account/activate?token=";
        final String ACTIVATION_LINK = EMAIL_VERIFICATION_URL.concat(ACTIVATION_TOKEN);
        // Also, have to save this activation token in the token repository.
        UserVerificationToken userVerificationToken = new UserVerificationToken(ACTIVATION_TOKEN,
                LocalDateTime.now(), LocalDateTime.now().plusHours(3), user);
        // Saving the token
        userVerificationTokenRepository.save(userVerificationToken);
        emailService.send(user.getEmail(), "Account Activation", emailUtils
                .buildAccountConfirmationEmail(user.getFirstname(), ACTIVATION_LINK));

        var response = AccountRegistrationResponse.builder()
                .message("please check your email for further instructions")
                .build();
        return ResponseEntity.ok(response);
    }

    @SuppressWarnings("DuplicatedCode")
    @Transactional
    public void registerAll(List<RegisterRequest> requests) {
        for (var request : requests) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new IllegalStateException("User with same email already exits\n" + requests);
            }

            if (userRepository.existsByUsername(request.getUsername())) {
                throw new IllegalStateException("User with same username already exits\n" + requests);
            }

            var user = User.builder()
                    .username(request.getUsername())
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .accountCreated(LocalDateTime.now())
                    .agreesWithTermsOfServicesAndPrivacyAndPolicy(request.isAgreesWithTermsAndConditions())
                    .role(request.getRole())
                    .build();

            userRepository.save(user);


            final String ACTIVATION_TOKEN = UUID.randomUUID().toString();
            final String EMAIL_VERIFICATION_URL = FRONT_END_SERVER_BASE_URL + "/auth/verify/account/activate?token=";
            final String ACTIVATION_LINK = EMAIL_VERIFICATION_URL.concat(ACTIVATION_TOKEN);
            // Also, have to save this activation token in the token repository.
            UserVerificationToken userVerificationToken = new UserVerificationToken(ACTIVATION_TOKEN,
                    LocalDateTime.now(), LocalDateTime.now().plusHours(3), user);
            // Saving the token
            userVerificationTokenRepository.save(userVerificationToken);
            emailService.send(user.getEmail(), "Account Activation", emailUtils
                    .buildAccountConfirmationEmail(user.getFirstname(), ACTIVATION_LINK));
        }
    }

    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()
                    )
            );
        } catch (AuthenticationException authenticationException) {
            return ResponseEntity.badRequest().body(
                    AuthenticationResponse.builder()
                            .message("wrong email or password")
                            .build()
            );
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        // Checking if the user is verified or not
        if (!user.isAccountVerified()) {
            return ResponseEntity.badRequest().body(
                    AuthenticationResponse.builder()
                            .message("Please verify email first")
                            .build()
            );
        }

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return ResponseEntity.ok(AuthenticationResponse.builder()
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .username(user.getUsername())
                .email(user.getEmail())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .profilePicUrl(user.getProfilePicUrl())
                .message("Successfully Authenticated")
                .build());
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

    public ResponseEntity<AccountVerificationResponse> verifyUser(String token) {
        var optionalUserVerificationToken =
                userVerificationTokenRepository.findByToken(token);
        if (optionalUserVerificationToken.isEmpty()) {
            var response = AccountVerificationResponse.builder()
                    .message("The Link is broken")
                    .build();
            return ResponseEntity.status(404).body(response);
        }

        var userVerificationToken = optionalUserVerificationToken.get();

        if (userVerificationToken.getConfirmedAt() != null) {
            var response = AccountVerificationResponse.builder()
                    .message("This link has already been used")
                    .build();
            return ResponseEntity.badRequest().body(response);
        }

        // Verify it later.
        LocalDateTime expireAt = userVerificationToken.getExpiresAt();
        if (LocalDateTime.now().isAfter(expireAt)) {
            var response = AccountVerificationResponse.builder()
                    .message("The Link Has Expired")
                    .build();
            return ResponseEntity.badRequest().body(response);
        }

        userVerificationTokenRepository.updateConfirmedAt(token,
                LocalDateTime.now());
        User user = userVerificationToken.getUser();
        user.setAccountVerified(true);
        userRepository.save(user);
        var response = AccountVerificationResponse.builder()
                .message("Account Verification Successful")
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ForgotPasswordVerificationResponse> generatePasswordResetLink(String email) {
        var optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body(
                    ForgotPasswordVerificationResponse.builder()
                            .message("There is no user associated with this email")
                            .build()
            );
        }
        final String forgotPasswordVerificationToken = UUID.randomUUID().toString();
        final String EMAIL_VERIFICATION_URL = FRONT_END_SERVER_BASE_URL + "/auth/forgot/password/verify?token=";
        final String resetLink = EMAIL_VERIFICATION_URL.concat(forgotPasswordVerificationToken);
        var user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalStateException("User details must need to be in the " +
                "database");
        emailService.send(user.get().getEmail(), "Password Resetting Link",
                emailUtils.buildPasswordResetRequestEmail(user.get().getUsername(), resetLink));
        var verificationToken = ForgotPasswordVerificationToken
                .builder()
                .user(user.get())
                .token(forgotPasswordVerificationToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .build();
        forgotPasswordVerificationRepository.save(verificationToken);
        return ResponseEntity.status(201).body(
                ForgotPasswordVerificationResponse
                        .builder()
                        .message("Sent Password Reset Link To Your Email")
                        .build()
        );
    }

    @Transactional
    public ResponseEntity<ForgotPasswordVerificationResponse> verifyForgotPasswordToken(
            String token,
            ForgotPasswordVerificationRequest forgotPasswordVerificationRequest) {
        var optionalToken = forgotPasswordVerificationRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            return ResponseEntity.status(404).body(
                    ForgotPasswordVerificationResponse
                            .builder()
                            .message("The link is broken")
                            .build()
            );
        }

        // Time to check the validity of the token
        if (optionalToken.get().getExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(ForgotPasswordVerificationResponse
                    .builder()
                    .message("The Link Has Expired")
                    .build());
        }
        // time to check if the new password is the same as the old password
        var user = optionalToken.get().getUser();
        if (passwordEncoder.matches(forgotPasswordVerificationRequest.getNewPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(
                    ForgotPasswordVerificationResponse
                            .builder()
                            .message("New Password is the same as old password")
                            .build()
            );
        }

        var encodedNewPassword = passwordEncoder.encode(forgotPasswordVerificationRequest.getNewPassword());
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
        forgotPasswordVerificationRepository.updateConfirmedAt(optionalToken.get().getToken(), LocalDateTime.now());
        return ResponseEntity.status(200).body(
                ForgotPasswordVerificationResponse
                        .builder()
                        .message("The Password Has Been Successfully changed")
                        .build()
        );
    }
}
