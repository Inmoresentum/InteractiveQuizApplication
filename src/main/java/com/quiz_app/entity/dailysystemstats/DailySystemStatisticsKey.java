package com.quiz_app.entity.dailysystemstats;

import jakarta.persistence.Embeddable;

import java.io.Serial;
import java.io.Serializable;

@Embeddable
public class DailySystemStatisticsKey implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final Long DUMMY_KEY = 1L;

    private Long id = DUMMY_KEY;
}

