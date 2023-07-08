package com.quiz_app.service.email;

public interface EmailSender {
    void send(String to, String subject, String email);
}

