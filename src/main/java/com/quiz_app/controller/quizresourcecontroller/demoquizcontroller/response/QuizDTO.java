package com.quiz_app.controller.quizresourcecontroller.demoquizcontroller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class QuizDTO {
    private final String quizTitle;
    private final String quizSynopsis;
    private final Integer nrOfQuestions;
    @JsonProperty("questions")
    private final List<QuestionDTO> questionDTOList;
}
