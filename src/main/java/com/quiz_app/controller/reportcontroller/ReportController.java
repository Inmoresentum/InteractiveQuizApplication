package com.quiz_app.controller.reportcontroller;

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

import java.io.IOException;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
//@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/users/csv")
    public ResponseEntity<String> generateUserReportCSV() {
        System.out.println("ggggggggggggggggggggggggggggg");
//        List<User> users = reportService.getAllUsers();
        User user = User.builder()
                .id(1)
                .username("user1")
                .firstname("Abu")
                .lastname("Darda")
                .email("a@a.com")
                .role(Role.USER)
                .phoneNumber("1234567890")
                .dateOfBirth(LocalDate.now())
                .build();

        List<User> users = Collections.singletonList(user);
        // Generate CSV content using OpenCSV
        String csvContent = generateCSV(users);
        System.out.println("Number of users: " + users.size());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.csv");

        return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    }

    // go for pdf

    private String generateCSV(List<User> users) {
        // Implement the logic to convert the user data into CSV format using OpenCSV

        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            String[] header = {"ID", "Username", "Firstname", "Lastname", "Email", "Role", "Phone Number", "Date of Birth"};
            csvWriter.writeNext(header);

            for (User user : users) {
                String[] row = {
                        String.valueOf(user.getId()),
                        user.getUsername(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail(),
                        user.getRole().toString(),
                        user.getPhoneNumber(),
                        user.getDateOfBirth().toString()
                };
                csvWriter.writeNext(row);
            }
        } catch (IOException e) {
            // Handle CSV generation error
            e.printStackTrace();
        }

        return writer.toString();
    }
}