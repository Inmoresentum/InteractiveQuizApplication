package com.quiz_app.entity.quiz;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue
    private int questionId;
    private String question;
    private QuestionType questionType;
    private String questionPic;// it's optional
    private AnswerSelectionType answerSelectionType;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> answers;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Integer> correctAnswer;
    private String messageForCorrectAnswer;
    private String messageForIncorrectAnswer;
    private String explanation;
    private Double point;
}
