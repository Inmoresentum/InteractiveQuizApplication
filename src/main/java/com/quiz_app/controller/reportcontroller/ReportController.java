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
import java.util.Optional;

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
        String csvContent = reportService.generateUserReportCSV();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.csv");

        return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    }

    @GetMapping("/users/pdf")
    public ResponseEntity<byte[]> generateUserReportPDF() {
        byte[] pdfContent = reportService.generateUserReportPDF();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_report.pdf");

        return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
    }
}