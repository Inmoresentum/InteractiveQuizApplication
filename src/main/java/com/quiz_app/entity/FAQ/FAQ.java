package com.quiz_app.entity.FAQ;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAQ_id", nullable = false)
    private Long id;
    @Column(name = "FAQ_question", nullable = false)
    private String question;
    @Column(name = "FAQ_anwers", nullable = false, columnDefinition = "TEXT")
    private String answers;
    @Version
    private Integer version;
}
