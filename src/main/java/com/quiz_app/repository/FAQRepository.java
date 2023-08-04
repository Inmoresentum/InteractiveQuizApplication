package com.quiz_app.repository;

import com.quiz_app.entity.FAQ.FAQ;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {
    @Transactional
    @Modifying
    @Query("update FAQ f set f.question = ?1, f.answers = ?2 where f.id = ?3")
    void updateFAQ(@NonNull String question, @NonNull String answers, @NonNull Long id);
}
