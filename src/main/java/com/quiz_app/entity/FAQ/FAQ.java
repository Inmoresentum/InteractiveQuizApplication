package com.quiz_app.entity.FAQ;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAQ_id", nullable = false)
    private Long id;
    @Column(name = "FAQ_question", nullable = false)
    private String question;
    @Column(name = "FAQ_anwers", nullable = false)
    private String answers;
    @Version
    private Integer version;
}
