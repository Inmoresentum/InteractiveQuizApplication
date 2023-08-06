package com.quiz_app.controller.quizresourcecontroller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    private String question;
    private String questionType;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String questionPic;
    private String answerSelectionType;
    private List<String> answers;
    @JsonSerialize(using = CorrectAnswerSerializer.class)
    private List<Integer> correctAnswer;
    private String messageForCorrectAnswer;
    private String messageForIncorrectAnswer;
    private String explanation;
    private Double point;
}
