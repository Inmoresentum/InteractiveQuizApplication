package com.quiz_app.service.report;

import com.quiz_app.entity.user.User;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
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



@Service
@RequiredArgsConstructor
public class ReportService {
    private final UserRepository userRepository;
    private final ResourceLoader resourceLoader;

    public ResponseEntity<?> generateUserReportCSV() {
        List<User> users = userRepository.findAll();
        try {
            var csvContent = generateCSV(users);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("text/csv"));
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.csv");

            return  new ResponseEntity<>(csvContent, headers, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(503).body(Map.of("message",
                    "Failed to create CSV report"));
        }
    }

    private byte[] generateCSV(List<User> users) throws IOException {
        StringWriter writer = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(writer);
            String[] header = {"ID", "Username", "Firstname",
                    "Lastname", "Email", "Role",
                    "Phone Number", "Date of Birth"};
            csvWriter.writeNext(header);

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

        return writer.toString()
                .getBytes(StandardCharsets.UTF_8);
    }

    public ResponseEntity<?> generateUserReportPDF() {
        List<User> users = userRepository.findAll();
        try {
            var pdfContent = generatePDF(users);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.pdf");
            return new ResponseEntity<>(pdfContent, headers, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of(
               "message" , "Failed to generate user pdf report"
            ));
        }
    }

    private byte[] generatePDF(List<User> users) throws IOException {
            PDDocument document = new PDDocument();
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);
            String imagePath = "classpath:images/quiz-app-logo.png";
            PDImageXObject iconImage = PDImageXObject
                    .createFromFileByContent(resourceLoader
                            .getResource(imagePath).getFile(), document);


            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            float imageWidth = 50;
            float imageHeight = 50;
            contentStream.drawImage(iconImage, 50, 750, imageWidth, imageHeight);

            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.beginText();
            contentStream.newLineAtOffset(120, 775);
            contentStream.showText("User Report");
            contentStream.endText();

            int yPosition = 700;
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.beginText();
            contentStream.newLineAtOffset(50, yPosition);
            contentStream.showText("ID");
            contentStream.newLineAtOffset(50, 0);
            contentStream.showText("Username");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Firstname");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Lastname");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Email");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Role");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Phone Number");
            contentStream.newLineAtOffset(100, 0);
            contentStream.showText("Date of Birth");
            contentStream.endText();

            contentStream.setFont(PDType1Font.HELVETICA, 12);

            for (User user : users) {
                yPosition -= 20;
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText(String.valueOf(user.getId()));
                contentStream.newLineAtOffset(50, 0);
                contentStream.showText(user.getUsername());
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText(user.getFirstname());
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText(user.getLastname());
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText(user.getEmail());
                contentStream.newLineAtOffset(100, 0);
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
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();

            return byteArrayOutputStream.toByteArray();

    }
    private String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }

}
