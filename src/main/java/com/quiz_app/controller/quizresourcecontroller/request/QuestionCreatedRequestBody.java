package com.quiz_app.controller.quizresourcecontroller.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionCreatedRequestBody {
    private String title;
    private String type;
    private List<String> answers;
    private String answerType;
    private List<Integer> correctAnswers;
    private String correctMessage;
    private String wrongMessage;
    private String explanation;
    private int points;
}
