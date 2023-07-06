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
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> optionsToChooseForm;
    private String correctAnswer;
}
