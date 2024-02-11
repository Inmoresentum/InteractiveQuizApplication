package com.quiz_app.entity.FAQ;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link FAQ}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQDtoAdd implements Serializable {
    @NotNull
    @NotEmpty
    @NotBlank
    private String question;
    @NotNull
    @NotEmpty
    @NotBlank
    private String answers;
}