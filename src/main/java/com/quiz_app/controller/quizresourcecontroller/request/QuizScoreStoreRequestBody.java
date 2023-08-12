package com.quiz_app.controller.quizresourcecontroller.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizScoreStoreRequestBody {
    private Integer quizId;
    private Integer score;
}
