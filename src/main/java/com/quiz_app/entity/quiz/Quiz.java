package com.quiz_app.entity.quiz;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Quiz {
    @Id
    @GeneratedValue
    private Integer quizId;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Question> questionList;
}
