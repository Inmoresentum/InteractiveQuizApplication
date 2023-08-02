package com.quiz_app.entity.user;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for {@link User}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    @Size(min = 5, max = 65)
    private String email;
    private Role role;
    private String profilePicUrl;
    @Size(min = 4, max = 34)
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private boolean accountVerified = false;
    private boolean deactivatedByAdmin = false;
    private String aboutYourSelf;
    private String address;
    private Gender gender;
    private LocalDateTime accountCreated;
    private boolean agreesWithTermsOfServicesAndPrivacyAndPolicy;
}