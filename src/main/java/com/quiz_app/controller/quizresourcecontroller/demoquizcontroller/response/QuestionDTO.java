package com.quiz_app.controller.quizresourcecontroller.demoquizcontroller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    private List<Integer> correctAnswer;
    private String messageForCorrectAnswer;
    private String messageForIncorrectAnswer;
    private String explanation;
    private Double point;
}
