package com.quiz_app.service.report;

import com.quiz_app.entity.user.User;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.flywaydb.core.internal.resource.classpath.ClassPathResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.quiz_app.entity.user.Role;
import com.quiz_app.entity.user.User;
import com.quiz_app.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.opencsv.CSVWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.List;
import java.time.format.DateTimeFormatter;



@Service
//@RequiredArgsConstructor
//@RestController
@RequestMapping("/api/reports")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
public class ReportService {
    private final UserRepository userRepository;
    private final ResourceLoader resourceLoader;

    @Autowired
    public ReportService(UserRepository userRepository, ResourceLoader resourceLoader) {
        this.userRepository = userRepository;
        this.resourceLoader = resourceLoader;
    }

    public String generateUserReportCSV() {
        List<User> users = userRepository.findAll();
        return generateCSV(users);
    }

    private String generateCSV(List<User> users) {
        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            String[] header = {"ID", "Username", "Firstname", "Lastname", "Email", "Role", "Phone Number", "Date of Birth"};
            csvWriter.writeNext(header);

            for (User user : users) {
                String dateOfBirthString = Optional.ofNullable(user.getDateOfBirth())
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
        } catch (IOException e) {
            // Handle CSV generation error
            e.printStackTrace();
        }

        return writer.toString();
    }

    //pdf
    public byte[] generateUserReportPDF() {
        List<User> users = userRepository.findAll();
        return generatePDF(users);
    }

    private byte[] generatePDF(List<User> users) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            //FrontEnd/interactive-quiz-app/public/quiz-app-logo.png
            String imagePath = "classpath:images/quiz-app-logo.png";
            PDImageXObject iconImage = PDImageXObject.createFromFileByContent(resourceLoader.getResource(imagePath).getFile(), document);


            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
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
                    contentStream.showText(user.getPhoneNumber() != null ? user.getPhoneNumber() : ""); // Null-check for Phone Number
                    contentStream.newLineAtOffset(100, 0);
                    contentStream.showText(user.getDateOfBirth() != null ? formatDate(user.getDateOfBirth()) : ""); // Null-check for Date of Birth
                    contentStream.endText();
                }
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();

            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            // Handle PDF generation error
            e.printStackTrace();
            return new byte[0];
        }
    }
    private String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }

}
