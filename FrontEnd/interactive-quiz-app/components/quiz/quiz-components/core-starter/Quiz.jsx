import React, {useState, useEffect, useCallback} from "react";
import Core from "./Core";
import defaultLocale from "./Locale";

const Quiz = function ({
                           quiz, shuffle, showDefaultResult, onComplete, customResultPage,
                           showInstantFeedback, continueTillCorrect, revealAnswerOnSubmit,
                           allowNavigation, onQuestionSubmit, disableSynopsis,
                       }) {
    const [start, setStart] = useState(false);
    const [questions, setQuestions] = useState(quiz.questions);
    const nrOfQuestions = (quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length)
        ? quiz.nrOfQuestions : quiz.questions.length;

    const shuffleQuestions = useCallback((q) => {
        for (let i = q.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [q[i], q[j]] = [q[j], q[i]];
        }
        q.length = nrOfQuestions;
        return q;
    }, []);

    useEffect(() => {
        if (disableSynopsis) setStart(true);
    }, [disableSynopsis]);

    useEffect(() => {
        if (shuffle) {
            setQuestions(shuffleQuestions(quiz.questions));
        } else {
            quiz.questions.length = nrOfQuestions;
            setQuestions(quiz.questions);
        }

        setQuestions(questions.map((question, index) => ({
            ...question,
            questionIndex: index + 1,
        })));
    }, [start]);

    const validateQuiz = (q) => {
        if (!q) {
            console.error("Quiz object is required.");
            return false;
        }

        for (let i = 0; i < questions.length; i += 1) {
            const {
                question, questionType, answerSelectionType, answers, correctAnswer,
            } = questions[i];
            if (!question) {
                console.error("Field 'question' is required.");
                return false;
            }

            if (!questionType) {
                console.error("Field 'questionType' is required.");
                return false;
            }
            if (questionType !== "text" && questionType !== "photo") {
                console.error("The value of 'questionType' is either 'text' or 'photo'.");
                return false;
            }

            if (!answers) {
                console.error("Field 'answers' is required.");
                return false;
            }
            if (!Array.isArray(answers)) {
                console.error("Field 'answers' has to be an Array");
                return false;
            }

            if (!correctAnswer) {
                console.error("Field 'correctAnswer' is required.");
                return false;
            }

            let selectType = answerSelectionType;

            if (!answerSelectionType) {
                // Default single to avoid code breaking due to automatic version upgrade
                console.warn("Field answerSelectionType should be defined" +
                    " since v0.3.0. Use single by default.");
                selectType = answerSelectionType || "single";
            }

            if (selectType === "single"
                && !(typeof selectType === "string"
                    || selectType instanceof String)) {
                console.error("answerSelectionType is single but" +
                    " expecting String in the field correctAnswer");
                return false;
            }

            if (selectType === "multiple" && !Array.isArray(correctAnswer)) {
                console.error("answerSelectionType is multiple but" +
                    " expecting Array in the field correctAnswer");
                return false;
            }
        }

        return true;
    };

    if (!validateQuiz(quiz)) {
        return (null);
    }

    const appLocale = {
        ...defaultLocale,
        ...quiz.appLocale,
    };

    return (
        <div className="react-quiz-container flex-grow">
            {!start
                && (
                    <div className="p-14 bg-gray-100 rounded-2xl shadow-2xl max-w-[1280px] w-full hover:bg-white
                duration-300 ease-linear">
                        <h2 className="text-center font-semibold text-rose-400 text-3xl">{quiz.quizTitle}</h2>
                        <h3 className="flex justify-end underline bg-green-100 rounded-2xl p-2.5">{quiz.createdByLastname}</h3>
                        <div className="flex justify-end pt-2 text-green-500 underline">
                            {appLocale.landingHeaderText.replace("<questionLength>", nrOfQuestions)}
                        </div>
                        {quiz.quizSynopsis
                            && (
                                <div className="quiz-synopsis font-serif bg-gray-200 rounded-2xl p-2.5">
                                    {quiz.quizSynopsis}
                                </div>
                            )}
                        <div className="startQuizWrapper flex justify-end">
                            <button onClick={() => setStart(true)}
                                    className="rounded-full bg-teal-500 content-center p-2.5 shadow-2xl shadow-black font-semibold
                                    hover:bg-orange-500 duration-300 ease-in">
                                {appLocale.startQuizBtn}
                            </button>
                        </div>
                    </div>
                )}

            {start && (
                <Core
                    questions={questions}
                    showDefaultResult={showDefaultResult}
                    onComplete={onComplete}
                    customResultPage={customResultPage}
                    showInstantFeedback={showInstantFeedback}
                    continueTillCorrect={continueTillCorrect}
                    revealAnswerOnSubmit={revealAnswerOnSubmit}
                    allowNavigation={allowNavigation}
                    appLocale={appLocale}
                    onQuestionSubmit={onQuestionSubmit}
                />
            )}
        </div>
    );
};

export default Quiz;
