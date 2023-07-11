package com.quiz_app.service.minio;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RequiredArgsConstructor
@Service
public class MinioService {
    private final MinioClient minioClient;

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

    public String getObject(String objectName) {
        try (InputStream stream = minioClient
                .getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build());) {
            return new String(stream.readAllBytes());
        } catch (ErrorResponseException | InsufficientDataException |
                 InternalException | InvalidKeyException | InvalidResponseException |
                 IOException | NoSuchAlgorithmException | ServerException |
                 XmlParserException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return "You haven't uploaded anything yet.";
    }
}
