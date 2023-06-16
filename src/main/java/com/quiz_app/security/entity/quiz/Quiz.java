package com.quiz_app.security.entity.quiz;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Quiz {
    @Id
    @GeneratedValue
    private Integer quizId;
    @OneToMany
    private List<Question> questionList;
}
