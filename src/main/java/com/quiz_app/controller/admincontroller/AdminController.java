package com.quiz_app.controller.admincontroller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AdminController {

    @GetMapping
    public String get() {
        return "GET:: admin controller";
    }

    @GetMapping("/control/getListOfUsers")
    public String getListOfUsers() {
        return "GET:: admin controller";
    }
}
