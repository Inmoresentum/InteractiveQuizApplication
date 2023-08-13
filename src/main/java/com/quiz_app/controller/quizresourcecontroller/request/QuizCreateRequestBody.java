package com.quiz_app.controller.quizresourcecontroller.request;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Builder
@ToString
public class QuizCreateRequestBody {
    private String quizTitle;
    private String quizSynopsis;
    private String quizProfileImage;
    private List<QuestionCreatedRequestBody> questions;
    private String difficulty;
    private String quizTags;
}
