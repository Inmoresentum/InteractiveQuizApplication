package com.quiz_app.config.opneapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Inmoresentum",
                        email = "rafee69029@gmail.com",
                        url = "https://github.com/Inmoresentum"
                ),
                title = "An Interactive Web-Based Quiz Application - CSE470 PROJECT",
                description = "OpenApi documentation for \"An Interactive Web-Based Quiz Application\"" +
                        " which is my CSE470 Project. This documentation contains importation regarding various" +
                        " endpoints that me and my team-mates have developed over a span of Month.",
                version = "0.5.5",
                license = @License(
                        name = "MIT",
                        url = "https://github.com/Inmoresentum/InteractiveQuizApplication/blob/main/LICENSE.md"
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "PROD ENV",
                        url = "https://to-be-added.tec"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        // I will put the description here later.
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
