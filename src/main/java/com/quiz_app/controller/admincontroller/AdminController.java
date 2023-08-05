package com.quiz_app.controller.admincontroller;

import com.quiz_app.entity.dailysystemstats.DailySystemStatistics;
import com.quiz_app.entity.user.UserDto;
import com.quiz_app.repository.DailySystemStatisticsRepository;
import com.quiz_app.service.admin.AdminService;
import com.quiz_app.service.statistics.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST,
                RequestMethod.DELETE, RequestMethod.PATCH})
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final StatisticsService statisticsService;

    @GetMapping
    public String get() {
        return "GET:: admin controller";
    }

    @GetMapping("/control/users")
    public Page<UserDto> getUsers(@RequestParam int page) {
        return adminService.getUsers(page);
    }

    @GetMapping("/stats/daily")
    public DailySystemStatistics getUsers() {
        return statisticsService.getDailySystemStatistics();
    }
}
