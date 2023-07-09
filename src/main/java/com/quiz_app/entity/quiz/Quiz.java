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
@Table(name = "Created Quiz")
public class Quiz {
    @Id
    @GeneratedValue
    private Integer quizId;
    @Column(nullable = false)
    private String quizTitle;
    @Column(nullable = false)
    private String quizSynopsis;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Question> questions;
}
