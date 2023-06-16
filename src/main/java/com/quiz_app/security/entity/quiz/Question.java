package com.quiz_app.security.entity.quiz;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Question {
    @Id
    @GeneratedValue
    private int questionId;
    private String question;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> optionsToChooseForm;
    private String correctAnswer;
}
