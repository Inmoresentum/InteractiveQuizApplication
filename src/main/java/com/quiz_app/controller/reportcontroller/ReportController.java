package com.quiz_app.controller.reportcontroller;

import com.quiz_app.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {
    private final ReportService reportService;

    @GetMapping(value = "/users/csv", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> generateUserReportCSV() {
         return reportService.generateUserReportCSV();
    }

    @GetMapping(value = "/users/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<?> generateUserReportPDF() {
        return reportService.generateUserReportPDF();
    }
}