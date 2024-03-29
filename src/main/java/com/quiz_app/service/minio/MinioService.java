package com.quiz_app.service.minio;

import com.quiz_app.service.clamav.ClamAVService;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Log4j2
public class MinioService {
    private final MinioClient minioClient;
    private final ClamAVService clamAVService;

    @Value("${minio.bucket-name}")
    private String bucketName;

    public void putObject(String objectName, InputStream inputStream) {
        try {
            minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object(objectName)
                    .stream(inputStream, -1, 10485760).build());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException ioException) {
                    ioException.printStackTrace();
                }
            }
        }
    }

    public ResponseEntity<?> getObject(String objectName) {
        try (InputStream stream = minioClient
                .getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build());) {
//            return (stream.readAllBytes());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(stream.readAllBytes());
        } catch (ErrorResponseException | InsufficientDataException |
                 InternalException | InvalidKeyException | InvalidResponseException |
                 IOException | NoSuchAlgorithmException | ServerException |
                 XmlParserException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(404).body(Map.of("message", "file not found"));
    }

    public void putQuizImage(String objectName, MultipartFile imageFile) throws IOException {
        if (!isFileOkayAndDoesNotContainsVirus(imageFile.getResource(), objectName)) {
            throw new IllegalStateException("The File Contains Virus");
        }
        var fileData = imageFile.getInputStream();
        try {
            minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object("/quiz/" + objectName)
                    .stream(fileData, -1, 10485760).build());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                fileData.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }

    public ResponseEntity<?> getQuizImage(String objectName) {
        try (InputStream stream = minioClient
                .getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object("/quiz/" + objectName)
                        .build());) {
//            return (stream.readAllBytes());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(stream.readAllBytes());
        } catch (ErrorResponseException | InsufficientDataException |
                 InternalException | InvalidKeyException | InvalidResponseException |
                 IOException | NoSuchAlgorithmException | ServerException |
                 XmlParserException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(404).body(Map.of("message", "file not found"));
    }

    public void putUserProfileImage(String objectName, InputStream inputStream) {
        try {
            minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object(objectName)
                    .stream(inputStream, -1, 10485760).build());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException ioException) {
                    ioException.printStackTrace();
                }
            }
        }
    }

    public ResponseEntity<?> getUserProfileImage(String objectName) {
        try (InputStream stream = minioClient
                .getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object("/user/" + objectName)
                        .build());) {
//            return (stream.readAllBytes());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(stream.readAllBytes());
        } catch (ErrorResponseException | InsufficientDataException |
                 InternalException | InvalidKeyException | InvalidResponseException |
                 IOException | NoSuchAlgorithmException | ServerException |
                 XmlParserException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(404).body(Map.of("message", "file not found"));
    }


    private boolean isFileOkayAndDoesNotContainsVirus(Resource fileResource, String fileName) {
        try {
            if (!clamAVService.scanFile(fileResource)) {
                log.warn(fileName + " contains virus");
                throw new IllegalStateException("File contains virus");
            }
        } catch (Exception e) {
            log.warn("Scanning failed");
            throw new RuntimeException(e);
        }
        return true;
    }
}
