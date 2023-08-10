package com.quiz_app.service.clamav;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ClamAVService {
    private final WebClient webClient;

    public ClamAVService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:7075").build();
    }

    public boolean scanFile(byte[] fileBytes) {
        try {
            String result = webClient.post()
                    .uri("/scan")
                    .body(BodyInserters.fromValue(fileBytes))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return result != null && result.contains("OK");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
