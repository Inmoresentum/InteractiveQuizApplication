package com.quiz_app.controller.reportcontroller;

import com.quiz_app.service.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @Operation(
            summary = "Get endpoint for get user report in CSV format",
            description = "By hitting this end point authorized persons will be able" +
                    " to generate a CSV report of all users." +
                    " This process is expensive and can " +
                    "take a lot of time depending number" +
                    " of users the platform have.",
            responses = {
                    @ApiResponse(
                            description = "If Successfully Generated CSV File",
                            responseCode = "201"
                    ),
                    @ApiResponse(
                            description = "If any server error",
                            responseCode = "503"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Access Token",
                            responseCode = "403"
                    )
            }
    )
    @GetMapping(value = "/users/csv", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> generateUserReportCSV() {
         return reportService.generateUserReportCSV();
    }

    @Operation(
            summary = "Get endpoint for get user report in PDF format",
            description = "By hitting this end point authorized persons will be able" +
                    " to generate a PDF report of all users." +
                    " This process is expensive and can " +
                    "take a lot of time depending number" +
                    " of users the platform have.",
            responses = {
                    @ApiResponse(
                            description = "If Successfully Generated PDF File",
                            responseCode = "201"
                    ),
                    @ApiResponse(
                            description = "If any server error",
                            responseCode = "503"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Access Token",
                            responseCode = "403"
                    )
            }
    )
    @GetMapping(value = "/users/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<?> generateUserReportPDF() {
        return reportService.generateUserReportPDF();
    }
}