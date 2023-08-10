package com.quiz_app.controller.quizresourcecontroller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.quiz_app.entity.quiz.Difficulty;
import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.QuizTag;
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
    private final List<QuestionDTO> questions;
    private final Integer quizId;
    private final String quizProfilePhotoUrl;
    private final Difficulty difficultyLevel;
    private final List<QuizTag> tags;
    private final Integer createdById;
    private final String createdByUsername;
    private final String createdByFirstname;
    private final String createdByLastname;
    private final String createdByEmail;
    private final String createdByProfilePicUrl;
}
