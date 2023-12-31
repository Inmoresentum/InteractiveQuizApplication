package com.quiz_app.service.quiz;

import com.quiz_app.controller.quizresourcecontroller.request.QuestionCreatedRequestBody;
import com.quiz_app.controller.quizresourcecontroller.request.QuizCreateRequestBody;
import com.quiz_app.controller.quizresourcecontroller.request.QuizScoreStoreRequestBody;
import com.quiz_app.controller.quizresourcecontroller.response.QuizResponseToClient;
import com.quiz_app.controller.quizresourcecontroller.response.QuestionDTO;
import com.quiz_app.controller.quizresourcecontroller.response.QuizDTO;
import com.quiz_app.entity.leaderboard.global.GlobalLeaderBoard;
import com.quiz_app.entity.leaderboard.global.GlobalRank;
import com.quiz_app.entity.quiz.*;
import com.quiz_app.entity.user.User;
import com.quiz_app.repository.GlobalLeaderBoardRepository;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.repository.UserRepository;
import com.quiz_app.service.minio.MinioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final String BASE_URL = "http://localhost:8080/api/v1/storage/public";
    private final ModelMapper modelMapper;
    private final GlobalLeaderBoardRepository globalLeaderBoardRepository;
    private final UserRepository userRepository;

    public ResponseEntity<QuizResponseToClient> getDemoQuiz() {
        var quiz = quizRepository.findById(1);
        System.out.println(quiz);
        if (quiz.isEmpty()) {
            return ResponseEntity.status(404).body(
                    QuizResponseToClient.builder()
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
                .questions(questionDTOs)
                .quizId(quiz.get().getQuizId())
                .build();

        System.out.println(quizDTO);
        var demoQuizResponse = QuizResponseToClient.builder()
                .message("Success. Here is the quiz")
                .quiz(quizDTO)
                .build();
        return ResponseEntity.ok(demoQuizResponse);
    }

    public ResponseEntity<QuizResponseToClient> getQuizById(Integer id) {
        var quiz = quizRepository.findById(id);
        if (quiz.isEmpty()) {
            return ResponseEntity.status(404).body(
                    QuizResponseToClient.builder()
                            .message("Server was unable to find this quiz with id " + id)
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
                .questions(questionDTOs)
                .createdByLastname(quiz.get().getCreatedBy().getLastname())
                .quizId(quiz.get().getQuizId())
                .build();

        System.out.println(quizDTO);
        var demoQuizResponse = QuizResponseToClient.builder()
                .message("Success. Here is the quiz")
                .quiz(quizDTO)
                .build();
        return ResponseEntity.ok(demoQuizResponse);
    }

    public ResponseEntity<?> getQuizzesByPage(Integer page) {
        var listOfQuizzes = quizRepository.findAll(PageRequest.of(page, 10));
        var response = listOfQuizzes.map((element) -> modelMapper.map(element, QuizDTO.class));
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAllQuizzes() {
        var allQuizzes = quizRepository.findAll()
                .stream().map((element) ->
                        modelMapper.map(element,
                                QuizDTO.class)).
                collect(Collectors.toList());
        return ResponseEntity.ok(allQuizzes);
    }

    public ResponseEntity<?> getAllQuizzesByTag(String tag) {
        var allQuizzesByTag = quizRepository.findAllByCurQuizTag(mapQuizTag(tag));
        var response = allQuizzesByTag.stream().map((element) -> modelMapper.map(element, QuizDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAllQuizzesBySearchTerm(String searchParam) {
        var allQuizzesByTag = quizRepository.findAllByQuizTitleContainingIgnoreCase(searchParam);
        var response = allQuizzesByTag.stream().map((element) -> modelMapper.map(element, QuizDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @Transactional
    public void handleQuizCreation(QuizCreateRequestBody quizCreateRequestBody, User userWhoCreatedTheQuiz) {
        // Save the question images to files or upload them to a cloud storage service

        // Create a new Quiz entity and set its properties using the quiz form data
        Quiz quizEntity = new Quiz();
        quizEntity.setCreatedBy(userWhoCreatedTheQuiz);
        quizEntity.setQuizTitle(quizCreateRequestBody.getQuizTitle());
        quizEntity.setQuizSynopsis(quizCreateRequestBody.getQuizSynopsis());
        quizEntity.setQuizProfilePhotoUrl(quizCreateRequestBody.getQuizProfileImage());
        quizEntity.setDifficultyLevel(mapDifficulty(quizCreateRequestBody.getDifficulty()));
        quizEntity.setCurQuizTag(mapQuizTag(quizCreateRequestBody.getQuizTags()));

        // Create new QuestionCreatedRequestBody entities for each question in the quiz form data
        List<Question> listOfQuestionsEntity = new ArrayList<>();
        for (QuestionCreatedRequestBody questionCreatedRequestBody : quizCreateRequestBody.getQuestions()) {
            Question questionEntity = new Question();
            questionEntity.setQuestion(questionCreatedRequestBody.getTitle());
            questionEntity.setQuestionType(questionCreatedRequestBody.getType().equals("text")
                    ? QuestionType.TEXT : QuestionType.PHOTO);
            questionEntity.setAnswerSelectionType(questionCreatedRequestBody.getAnswerType().equals("single")
                    ? AnswerSelectionType.SINGLE : AnswerSelectionType.MULTIPLE);
            if (questionCreatedRequestBody.getAnswers() != null && !questionCreatedRequestBody.getAnswers().isEmpty())
                questionEntity.setAnswers(questionCreatedRequestBody.getAnswers());
            questionEntity.setMessageForCorrectAnswer(questionCreatedRequestBody.getCorrectMessage());
            questionEntity.setMessageForIncorrectAnswer(questionCreatedRequestBody.getWrongMessage());
            questionEntity.setExplanation(questionCreatedRequestBody.getExplanation());
            questionEntity.setPoint((double) questionCreatedRequestBody.getPoints());
            questionEntity.setCorrectAnswer(questionCreatedRequestBody.getCorrectAnswers());
            listOfQuestionsEntity.add(questionEntity);
        }
        quizEntity.setQuestions(listOfQuestionsEntity);
        quizRepository.save(quizEntity);
    }

    public String saveQuizImage(MultipartFile image) throws IOException {
        var generatedUniqueFileName = UUID.randomUUID().toString();
        minioService.putQuizImage(generatedUniqueFileName, image);
        return BASE_URL + "/image/quiz/" + generatedUniqueFileName;
    }

    public void saveQuizScore(QuizScoreStoreRequestBody quizScoreStoreRequestBody, User user) {
        var quiz = quizRepository.findById(quizScoreStoreRequestBody.getQuizId());
        if (quiz.isEmpty()) {
            throw new RuntimeException("Invalid Quiz Id");
        }
        if (globalLeaderBoardRepository.existsByUser(user)) {
            var globalLeaderBoard = globalLeaderBoardRepository.findGlobalLeaderBoardByUser(user);
            globalLeaderBoard.setScore(quizScoreStoreRequestBody.getScore() + globalLeaderBoard.getScore());
            globalLeaderBoardRepository.save(globalLeaderBoard);
            return;
        }
        globalLeaderBoardRepository.save(GlobalLeaderBoard.builder()
                .score(Long.valueOf(quizScoreStoreRequestBody.getScore()))
                .globalRank(GlobalRank.NOVICE)
                .user(userRepository.findById(user.getId()).orElseThrow())
                .build());
    }

    private Difficulty mapDifficulty(String provided) {
        if (provided.equals(Difficulty.EASY.name())) {
            return Difficulty.EASY;
        } else if (provided.equals(Difficulty.NORMAL.name())) {
            return Difficulty.NORMAL;
        } else if (provided.equals(Difficulty.MODERATE.name())) {
            return Difficulty.MODERATE;
        } else if (provided.equals(Difficulty.HARD.name())) {
            return Difficulty.HARD;
        }
        return Difficulty.CRAZY;
    }

    private QuizTag mapQuizTag(String providedTag) {
        if (providedTag.equals(QuizTag.ARTS.name())) {
            return QuizTag.ARTS;
        } else if (providedTag.equals(QuizTag.SCIENCE.name())) {
            return QuizTag.SCIENCE;
        } else if (providedTag.equals(QuizTag.DRAW.name())) {
            return QuizTag.DRAW;
        } else if (providedTag.equals(QuizTag.MATH.name())) {
            return QuizTag.MATH;
        } else if (providedTag.equals(QuizTag.HISTORY.name())) {
            return QuizTag.HISTORY;
        } else if (providedTag.equals(QuizTag.GEOGRAPHY.name())) {
            return QuizTag.GEOGRAPHY;
        } else if (providedTag.equals(QuizTag.LITERATURE.name())) {
            return QuizTag.LITERATURE;
        } else if (providedTag.equals(QuizTag.MUSIC.name())) {
            return QuizTag.MUSIC;
        } else if (providedTag.equals(QuizTag.MOVIES.name())) {
            return QuizTag.MOVIES;
        } else if (providedTag.equals(QuizTag.SPORTS.name())) {
            return QuizTag.SPORTS;
        } else if (providedTag.equals(QuizTag.TECHNOLOGY.name())) {
            return QuizTag.TECHNOLOGY;
        } else if (providedTag.equals(QuizTag.GENERAL_KNOWLEDGE.name())) {
            return QuizTag.GENERAL_KNOWLEDGE;
        } else if (providedTag.equals(QuizTag.TRIVIA.name())) {
            return QuizTag.TRIVIA;
        } else if (providedTag.equals(QuizTag.ANIMALS.name())) {
            return QuizTag.ANIMALS;
        } else if (providedTag.equals(QuizTag.NATURE.name())) {
            return QuizTag.NATURE;
        } else if (providedTag.equals(QuizTag.FOOD_AND_COOKING.name())) {
            return QuizTag.FOOD_AND_COOKING;
        } else if (providedTag.equals(QuizTag.HEALTH_AND_FITNESS.name())) {
            return QuizTag.HEALTH_AND_FITNESS;
        } else if (providedTag.equals(QuizTag.POLITICS.name())) {
            return QuizTag.POLITICS;
        } else if (providedTag.equals(QuizTag.MYTHOLOGY.name())) {
            return QuizTag.MYTHOLOGY;
        } else if (providedTag.equals(QuizTag.LANGUAGE.name())) {
            return QuizTag.LANGUAGE;
        } else if (providedTag.equals(QuizTag.IQ_TEST.name())) {
            return QuizTag.IQ_TEST;
        } else if (providedTag.equals(QuizTag.BRAIN_TEASERS.name())) {
            return QuizTag.BRAIN_TEASERS;
        } else if (providedTag.equals(QuizTag.LOGIC_PUZZLES.name())) {
            return QuizTag.LOGIC_PUZZLES;
        } else if (providedTag.equals(QuizTag.PERSONALITY_TEST.name())) {
            return QuizTag.PERSONALITY_TEST;
        } else if (providedTag.equals(QuizTag.POP_CULTURE.name())) {
            return QuizTag.POP_CULTURE;
        } else if (providedTag.equals(QuizTag.CELEBRITIES.name())) {
            return QuizTag.CELEBRITIES;
        } else if (providedTag.equals(QuizTag.CODING.name())) {
            return QuizTag.CODING;
        } else if (providedTag.equals(QuizTag.PROGRAMMING.name())) {
            return QuizTag.PROGRAMMING;
        } else if (providedTag.equals(QuizTag.FRONTEND.name())) {
            return QuizTag.FRONTEND;
        }
        return QuizTag.BACKEND;
    }
}
