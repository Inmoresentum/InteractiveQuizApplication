package com.quiz_app.controller.FileStorageController;

import com.quiz_app.service.clamav.ClamAVService;
import com.quiz_app.service.minio.MinioService;
import com.quiz_app.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/storage/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Log4j2
public class FileStorageController {
    private final MinioService minioService;
    private final QuizService quizService;

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

    @PostMapping(value = "/image/quiz",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadQuizImageToMinIO(@RequestParam("image") MultipartFile imageData) {
        try {
            var url = quizService.saveQuizImage(imageData);
            return ResponseEntity.status(201).body(Map.of("image_url", url));

        } catch (IOException e) {
            log.error("Failed to upload quiz image");
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to upload image to server"));
        }
    }

//    @PostMapping(value = "/image/quiz/test",
//            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
//    )
//    public ResponseEntity<?> scanCheckForVirus(@RequestParam("image") MultipartFile imageData) {
//        var url = clamAVService.scanFileTest(imageData);
//        return ResponseEntity.status(201).body(Map.of("image_url", "whatever"));
//
//    }
    @GetMapping("/image/quiz/{filename}")
    public ResponseEntity<?> downloadQuizImage(@PathVariable String filename) {
        return minioService.getQuizImage(filename);
    }

    @GetMapping("/image/user/{filename}")
    public ResponseEntity<?> downloadUserImage(@PathVariable String filename) {
        return minioService.getUserProfileImage(filename);
    }
}
