package com.quiz_app;

import com.quiz_app.entity.FAQ.FAQ;
import com.quiz_app.entity.dailysystemstats.DailySystemStatistics;
import com.quiz_app.entity.dailysystemstats.DailySystemStatisticsKey;
import com.quiz_app.entity.quiz.Question;
import com.quiz_app.entity.quiz.Quiz;
import com.quiz_app.repository.DailySystemStatisticsRepository;
import com.quiz_app.repository.FAQRepository;
import com.quiz_app.repository.QuizRepository;
import com.quiz_app.repository.UserRepository;
import com.quiz_app.service.auth.AuthenticationService;
import com.quiz_app.controller.authcontroller.request.RegisterRequest;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.quiz_app.entity.quiz.AnswerSelectionType.*;
import static com.quiz_app.entity.quiz.QuestionType.*;
import static com.quiz_app.entity.user.Role.ADMIN;
import static com.quiz_app.entity.user.Role.USER;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableCaching
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(AuthenticationService service,
                                        QuizRepository quizRepository,
                                        UserRepository userRepository,
                                        FAQRepository faqRepository,
                                        Environment environment,
                                        DailySystemStatisticsRepository dailySystemStatisticsRepository) {
        return args -> {
            if (!Arrays.asList(environment.getActiveProfiles()).contains("dev") && userRepository.count() == 0) {
                Set<String> usedUsernames = ConcurrentHashMap.newKeySet();
                Set<String> usedEmails = ConcurrentHashMap.newKeySet();

                // Fixed issue for the lower end systems meaning
                // CPU with lower number of threads.
                ExecutorService executor = Executors
                        .newFixedThreadPool(Math.min(22, Runtime.getRuntime().availableProcessors() - 1));

                List<CompletableFuture<Void>> futures = new ArrayList<>();
                for (int i = 0; i < 1; i++) {
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        Faker faker = new Faker();
                        List<RegisterRequest> users = new ArrayList<>();
                        for (int j = 0; j < 1000; j++) {
                            String username = faker.name().username();
                            while (!usedUsernames.add(username)) {
                                username = faker.name().username();
                            }

                            String email = faker.internet().emailAddress();
                            while (!usedEmails.add(email)) {
                                email = faker.internet().emailAddress();
                            }

                            RegisterRequest user = RegisterRequest.builder()
                                    .username(username)
                                    .firstname(faker.name().firstName())
                                    .lastname(faker.name().lastName())
                                    .email(email)
                                    .password("admin")
                                    .accountCreatedAt(LocalDateTime.now())
                                    .agreesWithTermsAndConditions(true)
                                    .role(USER)
                                    .build();
                            users.add(user);
                        }
                        service.registerAll(users);
                    }, executor);
                    futures.add(future);
                }
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                executor.shutdown();
            } else if (Arrays.asList(environment.getActiveProfiles()).contains("dev") && userRepository.count() == 0) {
                var admin = RegisterRequest.builder()
                        .username("admin")
                        .firstname("Admin")
                        .lastname("Admin")
                        .email("admin@mail.com")
                        .password("password")
                        .role(ADMIN)
                        .accountCreatedAt(LocalDateTime.now())
                        .agreesWithTermsAndConditions(true)
                        .build();
                service.register(admin);

                var user = RegisterRequest.builder()
                        .username("some-user")
                        .firstname("User")
                        .lastname("User")
                        .email("user@mail.com")
                        .password("password")
                        .accountCreatedAt(LocalDateTime.now())
                        .agreesWithTermsAndConditions(true)
                        .role(USER)
                        .build();
                service.register(user);
            }
            if (!userRepository.existsByEmail("admin@mail.com")) {
                var admin = RegisterRequest.builder()
                        .username("admin")
                        .firstname("Admin")
                        .lastname("Admin")
                        .email("admin@mail.com")
                        .password("admin")
                        .role(ADMIN)
                        .accountCreatedAt(LocalDateTime.now())
                        .agreesWithTermsAndConditions(true)
                        .build();
                service.register(admin);
            }

            if (!userRepository.existsByEmail("user@mail.com")) {
                var admin = RegisterRequest.builder()
                        .username("user")
                        .firstname("user")
                        .lastname("User")
                        .email("user@mail.com")
                        .password("admin")
                        .role(USER)
                        .accountCreatedAt(LocalDateTime.now())
                        .agreesWithTermsAndConditions(true)
                        .build();
                service.register(admin);
            }
            if (quizRepository.count() == 0) {
                Question firstQuestion = Question.builder()
                        .question("How can you access the state of a component" +
                                " from inside of a member function?")
                        .questionType(TEXT)
                        .questionPic("http://localhost:8080/api/v1/storage/public/image/quiz/A")
                        .answerSelectionType(SINGLE)
                        .answers(List.of("this.getState()",
                                "this.prototype.stateValue",
                                "this.state",
                                "this.values"))
                        .correctAnswer(List.of(3))
                        .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                        .messageForCorrectAnswer("GG")
                        .explanation("Well, you know xD")
                        .point((double) 20)
                        .build();

                Question secondQuestion = Question.builder()
                        .question("What are the advantages of React JS?")
                        .questionType(TEXT)
                        .questionPic(null)
                        .answerSelectionType(MULTIPLE)
                        .answers(List.of(
                                "React can be used on client and as well as server side too",
                                "Using React increases readability and makes maintainability easier. Component," +
                                        " Data patterns improves readability and thus makes it easier for manitaining larger apps",
                                "React components have lifecycle events that fall into State/Property Updates",
                                "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
                        ))
                        .correctAnswer(List.of(1, 2, 4))
                        .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                        .messageForCorrectAnswer("GG")
                        .explanation("Well, you know xD")
                        .point((double) 20)
                        .build();

                Question thirdQuestion = Question.builder()
                        .question("Choose the image that looks like **A**")
                        .questionType(PHOTO)
                        .questionPic(null)
                        .answerSelectionType(SINGLE)
                        .answers(List.of(
                                "http://localhost:8080/api/v1/storage/public/image/quiz/A",
                                "http://localhost:8080/api/v1/storage/public/image/quiz/B",
                                "http://localhost:8080/api/v1/storage/public/image/quiz/C",
                                "http://localhost:8080/api/v1/storage/public/image/quiz/D"
                        ))
                        .correctAnswer(List.of(1))
                        .messageForIncorrectAnswer("Incorrect Answer. Please try again")
                        .messageForCorrectAnswer("GG")
                        .explanation("Well, you know xD")
                        .point((double) 5)
                        .build();

                List<Question> questionList = List.of(firstQuestion,
                        secondQuestion,
                        thirdQuestion);

                var quiz = Quiz.builder()
                        .quizTitle("Checking Test Quiz")
                        .quizSynopsis("Well, I do not want to type anything")
                        .questions(questionList)
                        .build();

                quizRepository.save(quiz);
            }

            if (faqRepository.count() == 0) {
                List<FAQ> faqList = new ArrayList<>();
                var faq1 = FAQ.builder()
                        .question("What is an Interactive Web-based Quiz Application?")
                        .answers("An Interactive Web-based Quiz Application is a web-based platform that allows users to create, share, and take quizzes interactively.")
                        .build();
                faqList.add(faq1);

                var faq2 = FAQ.builder()
                        .question("How do I create an account on the Interactive Web-based Quiz Application?")
                        .answers("To create an account on the Interactive Web-based Quiz Application, you can visit the website and click on the 'Sign Up' or 'Register' button. You will then be prompted to enter your personal information and create a username and password.")
                        .build();
                faqList.add(faq2);

                var faq3 = FAQ.builder()
                        .question("How do I log in to the Interactive Web-based Quiz Application?")
                        .answers("To log in to the Interactive Web-based Quiz Application, you can visit the website and click on the 'Log In' or 'Sign In' button. You will then be prompted to enter your username and password.")
                        .build();
                faqList.add(faq3);

                var faq4 = FAQ.builder()
                        .question("How do I reset my password on the Interactive Web-based Quiz Application?")
                        .answers("If you have forgotten your password for the Interactive Web-based Quiz Application, you can reset it by clicking on the 'Forgot Password' link on the login page. You will then be prompted to enter your email address and follow the instructions to reset your password.")
                        .build();
                faqList.add(faq4);

                var faq5 = FAQ.builder()
                        .question("How do I create a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To create a quiz on the Interactive Web-based Quiz Application, you can log in to your account and navigate to the 'Create Quiz' page. You will then be able to enter the details of your quiz, such as the title, description, and questionCreatedRequestBodies.")
                        .build();
                faqList.add(faq5);

                var faq6 = FAQ.builder()
                        .question("How do I add questionCreatedRequestBodies to a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To add questionCreatedRequestBodies to a quiz on the Interactive Web-based Quiz Application, you can navigate to the quiz editing page and click on the 'Add QuestionCreatedRequestBody' button. You will then be able to enter the details of your question, such as the question text, answer options, and correct answer.")
                        .build();
                faqList.add(faq6);

                var faq7 = FAQ.builder()
                        .question("How do I edit a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To edit a quiz on the Interactive Web-based Quiz Application, you can navigate to the quiz editing page and make changes to the quiz details, such as the title, description, and questionCreatedRequestBodies. Once you have made your changes, you can save them by clicking on the 'Save' button.")
                        .build();
                faqList.add(faq7);

                var faq8 = FAQ.builder()
                        .question("How do I delete a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To delete a quiz on the Interactive Web-based Quiz Application, you can navigate to the quiz editing page and click on the 'Delete' button. You will then be prompted to confirm that you want to delete the quiz.")
                        .build();
                faqList.add(faq8);

                var faq9 = FAQ.builder()
                        .question("How do I share a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To share a quiz on the Interactive Web-based Quiz Application, you can navigate to the quiz page and click on quiz that you want to share and then copy the url and share with your friends and family or whoever that you want.")
                        .build();
                faqList.add(faq9);
                var faq10 = FAQ.builder()
                        .question("How do I take a quiz on the Interactive Web-based Quiz Application?")
                        .answers("To take a quiz on the Interactive Web-based Quiz Application, you can navigate to the quiz page and click on the 'Take Quiz' button. You will then be able to answer the questionCreatedRequestBodies and submit your answers to see your results.")
                        .build();
                faqList.add(faq10);

                var faq11 = FAQ.builder()
                        .question("How do I view my quiz results on the Interactive Web-based Quiz Application?")
                        .answers("To view your quiz results on the Interactive Web-based Quiz Application, you can navigate to the 'My Results' page. You will then be able to see a list of all the quizzes you have taken and your scores for each quiz.")
                        .build();
                faqList.add(faq11);

                var faq12 = FAQ.builder()
                        .question("How do I view my quiz history on the Interactive Web-based Quiz Application?")
                        .answers("To view your quiz history on the Interactive Web-based Quiz Application, you can navigate to the 'My History' page. You will then be able to see a list of all the quizzes you have taken, along with details such as the date and time you took each quiz and your score for each quiz.")
                        .build();
                faqList.add(faq12);

                var faq13 = FAQ.builder()
                        .question("Can I save my progress while taking a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can save your progress while taking a quiz on the Interactive Web-based Quiz Application. If you need to pause or exit the quiz before completing it, your progress will be automatically saved and you can resume where you left off when you return to the quiz.")
                        .build();
                faqList.add(faq13);

                var faq14 = FAQ.builder()
                        .question("Can I pause and resume a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can pause and resume a quiz on the Interactive Web-based Quiz Application. If you need to take a break while taking a quiz, you can click on the 'Pause' button to pause the quiz. When you are ready to resume, you can click on the 'Resume' button to continue where you left off.")
                        .build();
                faqList.add(faq14);

                var faq15 = FAQ.builder()
                        .question("Can I retake a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can retake a quiz on the Interactive Web-based Quiz Application. If you want to improve your score or try again after completing a quiz, you can navigate to the quiz page and click on the 'Retake Quiz' button.")
                        .build();
                faqList.add(faq15);

                var faq16 = FAQ.builder()
                        .question("Can I view explanations for quiz questionCreatedRequestBodies on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can view explanations for quiz questionCreatedRequestBodies on the Interactive Web-based Quiz Application. After completing a quiz, you can navigate to the 'Quiz Results' page and click on each question to view an explanation of the correct answer.")
                        .build();
                faqList.add(faq16);

                var faq17 = FAQ.builder()
                        .question("Can I provide feedback on a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can provide feedback on a quiz on the Interactive Web-based Quiz Application. After completing a quiz, you can navigate to the 'Quiz Feedback' page and enter your feedback in the provided text box.")
                        .build();
                faqList.add(faq17);

                var faq18 = FAQ.builder()
                        .question("Can I report a problem with a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can report a problem with a quiz on the Interactive Web-based Quiz Application. If you encounter an issue while taking a quiz, such as an error in a question or answer, you can navigate to the 'Report Problem' page and enter details about the issue in the provided text box.")
                        .build();
                faqList.add(faq18);
                var faq19 = FAQ.builder()
                        .question("Can I suggest improvements for a quiz?")
                        .answers("We might add that feature in the near future but now we don't have anything like that")
                        .build();
                faqList.add(faq19);
                var faq20 = FAQ.builder()
                        .question("Can I create custom quizzes on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can create custom quizzes on the Interactive Web-based Quiz Application. You can use the quiz creation tools to design and build quizzes that are tailored to your specific needs and interests.")
                        .build();
                faqList.add(faq20);

                var faq21 = FAQ.builder()
                        .question("Can I import questionCreatedRequestBodies from other sources into a quiz on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can import questionCreatedRequestBodies from other sources into a quiz on the Interactive Web-based Quiz Application. You can use the quiz import tools to upload questionCreatedRequestBodies from external sources, such as text files or spreadsheets, into your quiz.")
                        .build();
                faqList.add(faq21);

                var faq22 = FAQ.builder()
                        .question("Can I export my quizzes from the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can export your quizzes from the Interactive Web-based Quiz Application. You can use the quiz export tools to download your quizzes in a variety of formats, such as PDF or CSV, for use outside of the application.")
                        .build();
                faqList.add(faq22);

                var faq23 = FAQ.builder()
                        .question("Can I collaborate with others to create quizzes on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can collaborate with others to create quizzes on the Interactive Web-based Quiz Application. You can use the quiz collaboration tools to invite other users to work together on a quiz, share ideas and feedback, and track changes and progress.")
                        .build();
                faqList.add(faq23);

                var faq24 = FAQ.builder()
                        .question("Can I share my quizzes with others outside of the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can share your quizzes with others outside of the Interactive Web-based Quiz Application. You can use the quiz sharing tools to generate a unique link or embed code for your quiz, which you can then share with others via email, social media, or other platforms.")
                        .build();
                faqList.add(faq24);

                var faq25 = FAQ.builder()
                        .question("Can I embed quizzes from the Interactive Web-based Quiz Application into other websites or platforms?")
                        .answers("Yes, you can embed quizzes from the Interactive Web-based Quiz Application into other websites or platforms. You can use the quiz embedding tools to generate an embed code for your quiz, which you can then insert into the HTML code of your website or platform.")
                        .build();
                faqList.add(faq25);

                var faq26 = FAQ.builder()
                        .question("Can I track my progress and performance on quizzes over time using the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can track your progress and performance on quizzes over time using the Interactive Web-based Quiz Application. You can use the progress tracking tools to view detailed statistics and reports on your quiz-taking history, including your scores, completion times, and improvement over time.")
                        .build();
                faqList.add(faq26);

                var faq27 = FAQ.builder()
                        .question("Can I set goals and track my progress towards them using the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can set goals and track your progress towards them using the Interactive Web-based Quiz Application. You can use the goal setting tools to define specific learning objectives and milestones, and then track your progress towards achieving them through your quiz-taking activity.")
                        .build();
                faqList.add(faq27);

                var faq28 = FAQ.builder()
                        .question("Can I earn rewards or badges for completing quizzes on the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can earn rewards or badges for completing quizzes on the Interactive Web-based Quiz Application. You can use the rewards system to earn points, badges, or other incentives for achieving certain milestones or completing specific challenges within the application.")
                        .build();
                faqList.add(faq28);

                var faq29 = FAQ.builder()
                        .question("Can I compete with others in real-time quizzes using the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can compete with others in real-time quizzes using the Interactive Web-based Quiz Application. You can use the real-time quiz tools to join or create live quiz events, where you can compete against other users in real-time to answer questionCreatedRequestBodies and earn points.")
                        .build();
                faqList.add(faq29);
                var faq30 = FAQ.builder()
                        .question("Can I join or create groups to take quizzes together using this platform?")
                        .answers("Well this feature is under construction and is yet to be stabilized. Hopefully in the near future ")
                        .build();
                faqList.add(faq30);
                var faq31 = FAQ.builder()
                        .question("Is there a limit to how many quizzes or questionCreatedRequestBodies I can create using the Interactive Web-based Quiz Application?")
                        .answers("The limit to how many quizzes or questionCreatedRequestBodies you can create using the Interactive Web-based Quiz Application may vary depending on the specific application and its terms of service. You can check the application's documentation or contact customer support for more information.")
                        .build();
                faqList.add(faq31);

                var faq32 = FAQ.builder()
                        .question("Is there a limit to how many times I can take a quiz using the Interactive Web-based Quiz Application?")
                        .answers("The limit to how many times you can take a quiz using the Interactive Web-based Quiz Application may vary depending on the specific quiz and its settings. Some quizzes may allow unlimited attempts, while others may have a set number of attempts or a time limit for completion.")
                        .build();
                faqList.add(faq32);

                var faq33 = FAQ.builder()
                        .question("Is there a time limit for completing quizzes using the Interactive Web-based Quiz Application?")
                        .answers("The time limit for completing quizzes using the Interactive Web-based Quiz Application may vary depending on the specific quiz and its settings. Some quizzes may have no time limit, while others may have a set time limit for completion.")
                        .build();
                faqList.add(faq33);

                var faq34 = FAQ.builder()
                        .question("Are there any age restrictions for using the Interactive Web-based Quiz Application?")
                        .answers("The age restrictions for using the Interactive Web-based Quiz Application may vary depending on the specific application and its terms of service. Some applications may have age restrictions in place to comply with local laws and regulations, while others may be suitable for users of all ages.")
                        .build();
                faqList.add(faq34);

                var faq35 = FAQ.builder()
                        .question("Is it safe to provide personal information when creating an account on the Interactive Web-based Quiz Application?")
                        .answers("It is generally safe to provide personal information when creating an account on a reputable Interactive Web-based Quiz Application. However, it is always important to use caution when providing personal information online and to ensure that you are using a secure and trustworthy platform.")
                        .build();
                faqList.add(faq35);

                var faq36 = FAQ.builder()
                        .question("Is my data protected when using the Interactive Web-based Quiz Application?")
                        .answers("Your data should be protected when using a reputable Interactive Web-based Quiz Application. Most applications have security measures in place to protect user data, such as encryption and secure servers. However, it is always important to use caution when providing personal information online and to ensure that you are using a secure and trustworthy platform.")
                        .build();
                faqList.add(faq36);

                var faq37 = FAQ.builder()
                        .question("What happens if there is a technical issue while taking a quiz using the Interactive Web-based Quiz Application?")
                        .answers("If there is a technical issue while taking a quiz using the Interactive Web-based Quiz Application, your progress may be automatically saved so that you can resume where you left off when the issue is resolved. If you encounter any technical issues, you can contact customer support for assistance.")
                        .build();
                faqList.add(faq37);

                var faq38 = FAQ.builder()
                        .question("What happens if there is an error in a question or answer while taking a quiz using the Interactive Web-based Quiz Application?")
                        .answers("If there is an error in a question or answer while taking a quiz using the Interactive Web-based Quiz Application, you can report the issue to customer support or provide feedback on the quiz. The quiz creator may then review and correct the error.")
                        .build();
                faqList.add(faq38);

                var faq39 = FAQ.builder()
                        .question("Can I provide feedback on the user experience of the Interactive Web-based Quiz Application?")
                        .answers("Yes, you can provide feedback on the user experience of the Interactive Web-based Quiz Application. Most applications have feedback mechanisms in place, such as surveys or contact forms, where you can share your thoughts and suggestions for improving the user experience.")
                        .build();
                faqList.add(faq39);

                var faq40 = FAQ.builder()
                        .question("Can I customize the appearance and layout of the Interactive Web-based Quiz Application?")
                        .answers("The ability to customize the appearance and layout of the Interactive Web-based Quiz Application may vary depending on the specific application and its features. Some applications may allow users to change certain aspects of the appearance and layout, such as colors or fonts, while others may have fixed designs.")
                        .build();
                faqList.add(faq40);
                var faq41 = FAQ.builder()
                        .question("Can I change the language of the application?")
                        .answers("As of now we only support English. In the near future we do plan to support other languages as well.")
                        .build();
                faqList.add(faq41);
                var faq42 = FAQ.builder()
                        .question("Can I change the language of the Interactive Web-based Quiz Application?")
                        .answers("The ability to change the language of the Interactive Web-based Quiz Application may vary depending on the specific application and its features. Some applications may support multiple languages and allow users to switch between them, while others may only be available in a single language.")
                        .build();
                faqList.add(faq42);

                var faq43 = FAQ.builder()
                        .question("Can I access the Interactive Web-based Quiz Application from multiple devices?")
                        .answers("Yes, you can typically access the Interactive Web-based Quiz Application from multiple devices, such as a computer, tablet, or smartphone. As long as you have an internet connection and a compatible web browser, you should be able to log in to your account and use the application from any device.")
                        .build();
                faqList.add(faq43);

                var faq44 = FAQ.builder()
                        .question("Can I use the Interactive Web-based Quiz Application offline?")
                        .answers("The ability to use the Interactive Web-based Quiz Application offline may vary depending on the specific application and its features. Some applications may have offline capabilities, allowing users to download quizzes or other content for use without an internet connection, while others may require an active internet connection at all times.")
                        .build();
                faqList.add(faq44);

                var faq45 = FAQ.builder()
                        .question("Is there a mobile app version of the Interactive Web-based Quiz Application?")
                        .answers("Whether or not there is a mobile app version of the Interactive Web-based Quiz Application may vary depending on the specific application. Some applications may have a dedicated mobile app available for download on popular app stores, while others may only be accessible through a web browser.")
                        .build();
                faqList.add(faq45);

                var faq46 = FAQ.builder()
                        .question("Is there a desktop app version of the Interactive Web-based Quiz Application?")
                        .answers("Whether or not there is a desktop app version of the Interactive Web-based Quiz Application may vary depending on the specific application. Some applications may have a dedicated desktop app available for download on popular operating systems, while others may only be accessible through a web browser.")
                        .build();
                faqList.add(faq46);

                var faq47 = FAQ.builder()
                        .question("Is there a cost associated with using the Interactive Web-based Quiz Application?")
                        .answers("Whether or not there is a cost associated with using the Interactive Web-based Quiz Application may vary depending on the specific application and its business model. Some applications may be completely free to use, while others may require users to pay for certain features or content.")
                        .build();
                faqList.add(faq47);

                var faq48 = FAQ.builder()
                        .question("Are there any in-app purchases available on the Interactive Web-based Quiz Application?")
                        .answers("Whether or not there are any in-app purchases available on the Interactive Web-based Quiz Application may vary depending on the specific application and its business model. Some applications may offer additional features or content that can be purchased within the app, while others may not have any in-app purchases.")
                        .build();
                faqList.add(faq48);

                var faq49 = FAQ.builder()
                        .question("Are there any advertisements on the Interactive Web-based Quiz Application?")
                        .answers("Whether or not there are any advertisements on the Interactive Web-based Quiz Application may vary depending on the specific application and its business model. Some applications may display advertisements to generate revenue, while others may be ad-free.")
                        .build();
                faqList.add(faq49);

                var faq50 = FAQ.builder()
                        .question("How do I contact customer support for the Interactive Web-based Quiz Application?")
                        .answers("To contact customer support for the Interactive Web-based Quiz Application, you can typically visit the application's website and navigate to the 'Contact' or 'Support' page. There, you should be able to find information on how to get in touch with customer support, such as an email address or phone number.")
                        .build();
                faqList.add(faq50);
                faqRepository.saveAll(faqList);
            }

            if (!Arrays.asList(environment.getActiveProfiles()).contains("dev") && dailySystemStatisticsRepository.count() == 0) {
                var dailyStat = DailySystemStatistics.builder()
                        .key(new DailySystemStatisticsKey())
                        .totalNumberOfQuizzes(quizRepository.count())
                        .totalNumberOfUsers(userRepository.count())
                        .totalNumberOfNewUsersToday(userRepository.count())
                        .totalNumberOfNewQuizzesToday(quizRepository.count())
                        .totalNumberOfQuizzesPlayedToday(0L)
                        .build();

                dailySystemStatisticsRepository.save(dailyStat);
            }
        };
    }
}
