package com.quiz_app.service.faq;


import com.quiz_app.entity.FAQ.FAQ;
import com.quiz_app.entity.FAQ.FAQDto;
import com.quiz_app.repository.FAQRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FAQService {
    private final FAQRepository faqRepository;
    private final ModelMapper modelMapper;

    public List<FAQDto> getAllFaqs() {
        return faqRepository.findAll().stream().
                map((element) -> modelMapper.map(element, FAQDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateFAQ(FAQ faq) {
        faqRepository.save(faq);
    }

    @Transactional
    public void deleteFAQ(FAQ faq) {
        faqRepository.delete(faq);
    }

    @Transactional
    public void addNewFAQ(FAQ faq) {
        faqRepository.save(faq);
    }
}
