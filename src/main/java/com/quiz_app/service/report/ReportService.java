package com.quiz_app.service.report;

import com.quiz_app.entity.user.User;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Service
//@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reports")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
public class ReportService {

    private final UserRepository userRepository;

    @Autowired
    public ReportService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
