package com.quiz_app.entity.quiz;

import com.quiz_app.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;

import static com.quiz_app.entity.quiz.Difficulty.*;

@Entity
@Getter
@Setter
@ToString
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
    @ToString.Exclude
    private List<Question> questions;
    private String quizProfilePhotoUrl;
    @Enumerated(EnumType.STRING)
    private Difficulty difficultyLevel = EASY;
    @CollectionTable(name = "quiz_tags")
    @Enumerated(EnumType.STRING)
    private QuizTag tags;

    @ManyToOne
    @JoinColumn(name = "author_of_the_quiz")
    private User createdBy;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Quiz quiz = (Quiz) o;
        return getQuizId() != null && Objects.equals(getQuizId(), quiz.getQuizId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
