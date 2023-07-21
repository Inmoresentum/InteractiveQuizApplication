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
//    private final UserRepository userRepository;
//
//    @Autowired
//    public ReportService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
}
