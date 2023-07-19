package com.quiz_app.entity.user;

import com.quiz_app.entity.jwttoken.Token;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
//@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user")
@DynamicUpdate
@DynamicInsert
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true, nullable = false)
    private String username;
    private String firstname;
    private String lastname;
    @Size(min = 5, max = 65)
    @Column(nullable = false, unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "profile_pic_url")
    private String profilePicUrl;
    //Todo: before deployment must need
    // to add proper validation
    @Size(min = 4, max = 34)
    private String phoneNumber;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private boolean accountVerified = false;
    private boolean deactivatedByAdmin = false;
    @Column(columnDefinition = "TEXT")
    private String aboutYourSelf;

    @CreatedDate
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime lastModifiedPersonalNotes = LocalDateTime.now();

    @Column(name = "user_address")
    private String address;

    @Column(name = "user_gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @CreatedDate
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime accountCreated;
    @Column(nullable = false, name = "Privacy_Policy_And_TOS_Agreement")
    private boolean agreesWithTermsOfServicesAndPrivacyAndPolicy;

    @Version
    private int version;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o)
                .getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this)
                .getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        User user = (User) o;
        return getId() != null && Objects.equals(getId(), user.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
