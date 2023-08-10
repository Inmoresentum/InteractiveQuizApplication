package com.quiz_app.service.clamav;

import org.apache.catalina.webresources.FileResource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ClamAVService {
    private final WebClient webClient;

    public ClamAVService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:7075").build();
    }

    public boolean scanFile(Resource fileData) {
        try {
            String result = webClient.post()
                    .uri("/scan")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData("file", fileData))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println(result);
            System.out.println(result != null && result.contains("OK"));
            return result != null && result.contains("OK");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
