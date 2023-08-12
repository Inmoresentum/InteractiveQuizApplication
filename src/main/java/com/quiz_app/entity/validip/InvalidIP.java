package com.quiz_app.entity.validip;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvalidIP {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String bannedIp;
    @Version
    private Integer version;
}
