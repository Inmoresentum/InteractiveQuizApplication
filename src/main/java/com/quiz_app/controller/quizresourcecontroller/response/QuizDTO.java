package com.quiz_app.controller.quizresourcecontroller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.quiz_app.entity.quiz.Difficulty;
import com.quiz_app.entity.quiz.QuizTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    private String quizTitle;
    private String quizSynopsis;
    private Integer nrOfQuestions;
    @JsonProperty("questions")
    private List<QuestionDTO> questions;
    private Integer quizId;
    private String quizProfilePhotoUrl;
    private Difficulty difficultyLevel;
    private QuizTag curQuizTag;
    private Integer createdById;
    private String createdByUsername;
    private String createdByFirstname;
    private String createdByLastname;
    private String createdByEmail;
    private String createdByProfilePicUrl;
}
