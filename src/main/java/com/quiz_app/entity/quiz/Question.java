package com.quiz_app.entity.quiz;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
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

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o)
                .getHibernateLazyInitializer()
                .getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this)
                .getHibernateLazyInitializer()
                .getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        return false;
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
