package com.quiz_app.controller.quizresourcecontroller.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuizCreateRequestBody {
    private String quizTitle;
    private String quizSynopsis;
    private List<QuestionCreatedRequestBody> questionCreatedRequestBodies;
}
