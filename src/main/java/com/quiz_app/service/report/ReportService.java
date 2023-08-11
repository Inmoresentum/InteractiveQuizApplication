package com.quiz_app.service.report;

import com.quiz_app.entity.user.User;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.core.io.ResourceLoader;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import static org.springframework.data.domain.PageRequest.*;


@Service
@RequiredArgsConstructor
public class ReportService {
    private final UserRepository userRepository;
    private final ResourceLoader resourceLoader;

    public ResponseEntity<?> generateUserReportCSV() {
        int chunkSize = 10; // Number of users per chunk
        int currentPage = 0;

        StringWriter writer = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(writer);

        while (true) {
            Pageable pageable = PageRequest.of(currentPage, chunkSize);
            Page<User> userPage = userRepository.findAll(pageable);

            if (!userPage.hasContent()) {
                break; // No more users to process
            }

            List<User> chunk = userPage.getContent();
            generateCSVChunk(csvWriter, chunk);

            currentPage++;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.csv");

        return new ResponseEntity<>(writer.toString(), headers, HttpStatus.CREATED);
    }

    private void generateCSVChunk(CSVWriter csvWriter, List<User> users) {
        for (User user : users) {
            String dateOfBirthString = Optional
                    .ofNullable(user.getDateOfBirth())
                    .map(LocalDate::toString)
                    .orElse("");

            String[] row = {
                    String.valueOf(user.getId()),
                    user.getUsername(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getRole().toString(),
                    user.getPhoneNumber(),
                    dateOfBirthString
            };
            csvWriter.writeNext(row);
        }
    }



    public ResponseEntity<?> generateUserReportPDF() {
        int chunkSize = 25; // Number of users per chunk
        int currentPage = 0;

        try (PDDocument document = new PDDocument()) {
            while (true) {
                Pageable pageable = of(currentPage, chunkSize);
                Page<User> userPage = userRepository.findAll(pageable);

                if (!userPage.hasContent()) {
                    break; // No more users to process
                }

                List<User> chunk = userPage.getContent();
                generatePDF(document, chunk);

                currentPage++;
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.pdf");

            return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(503).body(Map.of(
                    "message", "Failed to generate user pdf report"
            ));
        }
    }

    private void generatePDF(PDDocument document, List<User> users) throws IOException {
        PDPage page = new PDPage(PDRectangle.A4);
        document.addPage(page);
        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)){
            String imagePath = "classpath:images/quiz-app-logo.png";
            PDImageXObject iconImage = PDImageXObject
                    .createFromFileByContent(resourceLoader
                            .getResource(imagePath).getFile(), document);
//            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            float imageWidth = 50;
            float imageHeight = 50;
            contentStream.drawImage(iconImage, 50, 750, imageWidth, imageHeight);
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.beginText();
            contentStream.newLineAtOffset(120, 775);
            contentStream.showText("User Report");
            contentStream.endText();

            int yPosition = 700;
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.beginText();
            contentStream.newLineAtOffset(25, yPosition);
            contentStream.showText("ID");
            contentStream.newLineAtOffset(25, 0);
            contentStream.showText("Username/Email");
            contentStream.newLineAtOffset(200, 0);
            contentStream.showText("Firstname");
            contentStream.newLineAtOffset(75, 0);
            contentStream.showText("Lastname");
            contentStream.newLineAtOffset(75, 0);
//            contentStream.showText("Email");
//            contentStream.newLineAtOffset(200, 0);
            contentStream.showText("Role");
            contentStream.newLineAtOffset(50, 0);
            contentStream.showText("Phone Number");
            contentStream.newLineAtOffset(50, 0);
            contentStream.showText("Date of Birth");
            contentStream.endText();

            contentStream.setFont(PDType1Font.HELVETICA, 10);

            for (User user : users) {
                yPosition -= 20;
                contentStream.beginText();
                contentStream.newLineAtOffset(25, yPosition);
                contentStream.showText(String.valueOf(user.getId()));
                contentStream.newLineAtOffset(25, 0);
                contentStream.showText(user.getUsername());
                contentStream.newLineAtOffset(200, 0);
                contentStream.showText(user.getFirstname());
                contentStream.newLineAtOffset(75, 0);
                contentStream.showText(user.getLastname());
                contentStream.newLineAtOffset(75, 0);
//                contentStream.showText(user.getEmail());
//                contentStream.newLineAtOffset(200, 0);
                contentStream.showText(user.getRole().toString());
                contentStream.newLineAtOffset(100, 0);
                // Null-check for Phone Number
                contentStream.showText(user.getPhoneNumber() != null ? user.getPhoneNumber() : "");
                contentStream.newLineAtOffset(100, 0);
                // Null-check for Date of Birth
                contentStream.showText(user.getDateOfBirth() != null ? formatDate(user.getDateOfBirth()) : "");
                contentStream.endText();
            }
            contentStream.close();
        }


    }
    private String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }

}
