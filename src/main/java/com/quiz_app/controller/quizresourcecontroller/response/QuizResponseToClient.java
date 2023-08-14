package com.quiz_app.controller.quizresourcecontroller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizResponseToClient {
    private final QuizDTO quiz;
    private final String message;
    private String quizCardPicture;
}
