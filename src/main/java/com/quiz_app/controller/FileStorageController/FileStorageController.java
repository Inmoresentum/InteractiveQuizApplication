package com.quiz_app.controller.FileStorageController;

import com.quiz_app.service.minio.MinioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@RestController
@RequestMapping("/api/v1/storage/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Log4j2
public class FileStorageController {
    private final MinioService minioService;

    @PostMapping(value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void uploadFileToMinIO(@RequestParam("file") MultipartFile file) {
        try {
            InputStream byteArrayInputStream = new ByteArrayInputStream(file.getBytes());
            String fileName = file.getOriginalFilename();
            minioService.putObject(fileName, byteArrayInputStream);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Failed to create object in MINIO");
        }
    }

    @GetMapping("/image/quiz/{filename}")
    public ResponseEntity<?> downloadQuizImage(@PathVariable String filename) {
        return minioService.getQuizImage(filename);
    }

    @GetMapping("/image/quiz/{filename}")
    public ResponseEntity<?> downloadUserImage(@PathVariable String filename) {
        return minioService.getQuizImage(filename);
    }
}
