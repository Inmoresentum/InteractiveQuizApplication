package com.quiz_app.service.report;

import com.quiz_app.entity.user.User;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.List;
@Service
//@RequiredArgsConstructor
//@RestController
@RequestMapping("/api/reports")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
public class ReportService {
    private final UserRepository userRepository;

    @Autowired
    public ReportService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 750);
                contentStream.showText("User Report");
                contentStream.endText();

                int yPosition = 700;
                for (User user : users) {
                    yPosition -= 20;
                    contentStream.beginText();
                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.newLineAtOffset(50, yPosition);
                    contentStream.showText("ID: " + user.getId());
                    contentStream.newLineAtOffset(100, 0);
                    contentStream.showText("Username: " + user.getUsername());
                    // Add more user data fields as needed
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


}
