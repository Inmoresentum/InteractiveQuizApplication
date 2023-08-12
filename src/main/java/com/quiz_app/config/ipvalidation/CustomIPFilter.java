package com.quiz_app.config.ipvalidation;

import com.quiz_app.service.ipservice.IPService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.util.matcher.IpAddressMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomIPFilter extends OncePerRequestFilter {
    private final IPService ipService;

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
                                    @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain)
            throws ServletException, IOException {
        String remoteAddr = request.getRemoteAddr();
        if (ipService.isBanned(remoteAddr)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
