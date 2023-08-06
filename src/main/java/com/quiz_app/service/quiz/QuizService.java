package com.quiz_app.service.quiz;

import com.quiz_app.controller.quizresourcecontroller.request.QuestionCreatedRequestBody;
import com.quiz_app.controller.quizresourcecontroller.request.QuizCreateRequestBody;
import com.quiz_app.controller.quizresourcecontroller.response.DemoQuizResponse;
import com.quiz_app.controller.quizresourcecontroller.response.QuestionDTO;
import com.quiz_app.controller.quizresourcecontroller.response.QuizDTO;
import com.quiz_app.entity.quiz.*;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.service.minio.MinioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final MinioService minioService;
    private final String BASE_URL = "http://localhost:8080";

    public ResponseEntity<DemoQuizResponse> getDemoQuiz() {
        var quiz = quizRepository.findById(1);
        System.out.println(quiz);
        if (quiz.isEmpty()) {
            return ResponseEntity.status(404).body(
                    DemoQuizResponse.builder()
                            .message("Server was unable to find this quiz with id 1")
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
        var demoQuizResponse = DemoQuizResponse.builder()
                .message("Success. Here is the quiz")
                .quiz(quizDTO)
                .build();
        return ResponseEntity.ok(demoQuizResponse);
    }

    public ResponseEntity<?> getQuizzesByPage(Integer page) {
        var listOfQuizzes = quizRepository.findAll(PageRequest.of(page, 10));
        return ResponseEntity.ok(listOfQuizzes);
    }


    @Transactional
    public void handleQuizCreation(QuizCreateRequestBody quizCreateRequestBody, MultipartFile quizProfileImage, MultipartFile[] questionImages) throws IOException {
        // Save the question images to files or upload them to a cloud storage service

        // Todo: First step is to save the quiz profile image to minio
        var quizProfileImageUrl = saveQuizImage(quizProfileImage);
        // Done saving quiz profile image

        List<String> questionImageUrls = new ArrayList<>();
        for (MultipartFile questionImage : questionImages) {
            String questionImageUrl = saveQuizImage(questionImage);
            questionImageUrls.add(questionImageUrl);
        }

        // Create a new Quiz entity and set its properties using the quiz form data
        Quiz quizEntity = new Quiz();
        quizEntity.setQuizTitle(quizCreateRequestBody.getQuizTitle());
        quizEntity.setQuizSynopsis(quizCreateRequestBody.getQuizSynopsis());
        quizEntity.setQuizProfilePhotoUrl(quizProfileImageUrl);
//         Todo: Later add the missing values after completing features
        quizEntity.setDifficultyLevel(Difficulty.EASY);
//         we will have to build logic here
        quizEntity.setTags(List.of(QuizTag.LANGUAGE, QuizTag.BRAIN_TEASERS, QuizTag.NATURE));

        // Create new QuestionCreatedRequestBody entities for each question in the quiz form data
        List<Question> listOfQuestionsEntity = new ArrayList<>();
        for (QuestionCreatedRequestBody questionCreatedRequestBody : quizCreateRequestBody.getQuestionCreatedRequestBodies()) {
            Question questionEntity = new Question();
            questionEntity.setQuestion(questionCreatedRequestBody.getTitle());
            questionEntity.setQuestionType(questionCreatedRequestBody.getType().equals("text")
                    ? QuestionType.TEXT : QuestionType.PHOTO);
            questionEntity.setAnswerSelectionType(questionCreatedRequestBody.getAnswerType().equals("single")
                    ? AnswerSelectionType.SINGLE : AnswerSelectionType.MULTIPLE);
            // Todo:
            //  Set other properties of the QuestionCreatedRequestBody entity using the questionCreatedRequestBody form data
            if (questionCreatedRequestBody.getAnswers() != null && !questionCreatedRequestBody.getAnswers().isEmpty())
                questionEntity.setAnswers(questionCreatedRequestBody.getAnswers());
            questionEntity.setMessageForCorrectAnswer(questionCreatedRequestBody.getCorrectMessage());
            questionEntity.setMessageForIncorrectAnswer(questionCreatedRequestBody.getWrongMessage());
            questionEntity.setExplanation(questionCreatedRequestBody.getExplanation());
            questionEntity.setPoint((double) questionCreatedRequestBody.getPoints());
            // If the questionCreatedRequestBody type is "image", set the answers property using the uploaded questionCreatedRequestBody images
            if (questionCreatedRequestBody.getType().equals("image")) {
                List<String> answers = new ArrayList<>();
                for (int correctAnswerIndex : questionCreatedRequestBody.getCorrectAnswers()) {
                    String answer = questionImageUrls.get(correctAnswerIndex);
                    answers.add(answer);
                }
            }

            listOfQuestionsEntity.add(questionEntity);
        }
        quizEntity.setQuestions(listOfQuestionsEntity);

        quizRepository.save(quizEntity);
    }

    private String saveQuizImage(MultipartFile image) throws IOException {
        var quizImageByteInputStream = new ByteArrayInputStream(image.getBytes());
        var generatedUniqueFileName = UUID.randomUUID().toString();
        minioService.putQuizImage(generatedUniqueFileName, quizImageByteInputStream);
        return BASE_URL + "/quiz/" + generatedUniqueFileName;
    }
}
