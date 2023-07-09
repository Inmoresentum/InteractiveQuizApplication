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
public class Quiz {
    @Id
    @GeneratedValue
    private Integer quizId;
    private String quizTitle;
    private String quizSynopsis;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Question> questions;
}
