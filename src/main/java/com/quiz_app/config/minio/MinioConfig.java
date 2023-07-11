package com.quiz_app.config.minio;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Value("${minio.endpoint}")
    private String minioUrl;
    @Value("${minio.access-key}")
    private String accessKey;
    @Value("${minio.secret-key}")
    private String secretKey;

    @Bean
    public MinioClient minioClient() {
        try {
            return MinioClient.builder().credentials(accessKey, secretKey)
                    .endpoint(minioUrl, 9000, false).build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create connection \n" + e);
        }
    }
}