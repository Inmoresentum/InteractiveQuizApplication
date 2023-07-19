package com.quiz_app.entity.quiz;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;

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
