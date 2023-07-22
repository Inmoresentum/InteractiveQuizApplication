package com.quiz_app.config.security;

import com.quiz_app.config.jwt.JwtAuthenticationFilter;
import com.quiz_app.entity.user.Permission;
import com.quiz_app.entity.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    // Updated the security config to the latest recommendation implementation
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // for auto generated api documentation
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth.requestMatchers(
                                "/api/v1/auth/**",
                                "/api/v1/quiz/public/**",
                                "/api/v1/storage/public/**",
                                "/api/v1/reports/users/csv",
                                "/api/v1/reports/users/pdf",
                                "/v2/api-docs",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-resources",
                                "/swagger-resources/**",
                                "/configuration/ui",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        .requestMatchers("/api/v1/management/**")
                                .hasAnyRole(Role.ADMIN.name(),
                                        Role.USER.name())
                        .requestMatchers(GET, "/api/v1/management/**")
                                .hasAnyAuthority(Permission.ADMIN_READ.name(),
                                        Role.USER.name())
                        .requestMatchers(POST, "/api/v1/management/**")
                                .hasAnyAuthority(Permission.ADMIN_CREATE.name(),
                                        Role.USER.name())
                        .requestMatchers(PUT, "/api/v1/management/**")
                                .hasAnyAuthority(Permission.ADMIN_UPDATE.name(),
                                        Role.USER.name())
                        .requestMatchers(DELETE, "/api/v1/management/**")
                                .hasAnyAuthority(Permission.ADMIN_DELETE.name(),
                                        Role.USER.name())
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session
                        -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(configurer -> {
                    configurer.logoutUrl("/api/v1/auth/logout");
                    configurer.addLogoutHandler(logoutHandler);
                    configurer.logoutSuccessHandler(
                            ((request, response, authentication)
                                    -> SecurityContextHolder
                                    .clearContext()));
                });

        return http.build();
    }
}
