package com.quiz_app.entity.validip;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
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
    private String bannedIp;
    @Version
    private Integer version;
}
