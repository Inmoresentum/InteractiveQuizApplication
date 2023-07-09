package com.quiz_app.service.quiz;

import com.quiz_app.controller.quizresourcecontroller.demoquizcontroller.response.DemoQuizResponse;
import com.quiz_app.controller.quizresourcecontroller.demoquizcontroller.response.QuestionDTO;
import com.quiz_app.controller.quizresourcecontroller.demoquizcontroller.response.QuizDTO;
import com.quiz_app.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DemoQuizService {
    private final QuizRepository quizRepository;


    public ResponseEntity<DemoQuizResponse> getDemoQuiz(Integer id) {
        var quiz = quizRepository.findById(id);
        System.out.println(quiz);
        if (quiz.isEmpty()) {
            return ResponseEntity.status(404).body(
                    DemoQuizResponse.builder()
                            .message("Quiz With this " + id + "Id not found")
                            .build()
            );
        }

        List<QuestionDTO> questionDTOs = quiz.get().getQuestions().stream()
                .map(question -> QuestionDTO.builder()
                        .question(question.getQuestion())
                        .questionType(question.getQuestionType().name().toLowerCase())
                        .questionPic(question.getQuestionPic())
                        .answerSelectionType(question.getAnswerSelectionType().name().toLowerCase())
                        .answers(question.getAnswers())
                        .correctAnswer(question.getCorrectAnswer())
                        .messageForCorrectAnswer(question.getMessageForCorrectAnswer())
                        .messageForIncorrectAnswer(question.getMessageForIncorrectAnswer())
                        .explanation(question.getExplanation())
                        .point(question.getPoint())
                        .build())
                .collect(Collectors.toList());

        var quizDTO = QuizDTO.builder()
                .quizTitle(quiz.get().getQuizTitle())
                .quizSynopsis(quiz.get().getQuizSynopsis())
                .nrOfQuestions(quiz.get().getQuestions().size())
                .questionDTOList(questionDTOs)
                .build();
        System.out.println(quizDTO);
        var demoQuizResponse =  DemoQuizResponse.builder()
                .message("Success. Here is the quiz")
                .quiz(quizDTO)
                .build();
        return ResponseEntity.ok(demoQuizResponse);
    }
}
