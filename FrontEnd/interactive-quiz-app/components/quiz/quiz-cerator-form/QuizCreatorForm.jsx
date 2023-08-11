"use client"
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {toast} from "react-toastify";

// Creating a schema for the form data using zod
const schema = z.object({
    quizTitle: z.string()
        .nonempty({message: "Quiz title is required"})
        .refine((value) => value.length >= 3, {message: "Quiz title must be at least 3 characters long"}),
    quizSynopsis: z.string()
        .nonempty({message: "Quiz synopsis is required"})
        .refine((value) => value.length >= 10, {message: "Quiz synopsis must be at least 10 characters long"}),
    quizProfileImage: z.any(),
    quizTags: z.string().nonempty({message: "Quiz tag is required"}),
    difficulty: z.string().nonempty({message: "Difficulty level is required"}),
    questions: z.array(
        z.object({
            title: z.string().nonempty({message: "Question title is required"}),
            type: z.string().nonempty({message: "Question type is required"}),
            answers: z.array(z.any()).nonempty({message: "At least one answer is required"}),
            answerType: z.string().nonempty({message: "Answer type is required"}),
            correctAnswer: z.any(),
            correctAnswers: z.array(z.boolean()),
            correctMessage: z.string().nonempty({message: "Message for correct answer is required"}),
            wrongMessage: z.string().nonempty({message: "Message for wrong answer is required"}),
            explanation: z.string().nonempty({message: "Explanation is required"}),
            points: z.number().positive({message: "Points must be a positive number"})
        })
    ).nonempty({message: "At least one question is required"})
});

export default function QuizCreationForm() {
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            quizTitle: "",
            quizSynopsis: "",
            quizTags: "SCIENCE",
            difficulty: "EASY",
            questions: []
        }
    });

    const [questions, setQuestions] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // Loop over the errors object and create a separate toast for each error
    Object.values(errors).forEach((error) => {
        if (error.questions) {
            // If there are errors in the questions object, loop over them
            error.questions.forEach((questionError) => {
                // Loop over the values of the questionError object and create a separate toast for each error
                Object.values(questionError).forEach((message) => {
                    toast.error(message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                });
            });
        } else {
            // If there are no errors in the questions object, create a toast for the error
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        console.log(errors);
        console.log(questions);
    });

    const quizProfileImageFile = watch("quizProfileImage");
    let quizProfileImageURL = null;
    try {
        quizProfileImageURL = quizProfileImageFile ? URL.createObjectURL(quizProfileImageFile[0]) : null;
    } catch (e) {
        quizProfileImageURL = null;
    }

    const onSubmit = async (data) => {
        console.log(questions);
        // // Check if there is at least one correct answer
        // let hasCorrectAnswer = false;
        // if (data.questions) {
        //     for (const question of data.questions) {
        //         if (question.correctAnswer || question.correctAnswers) {
        //             hasCorrectAnswer = true;
        //             break;
        //         }
        //     }
        // }
        //
        // if (!hasCorrectAnswer) {
        //     // If there is no correct answer, show an error message and return
        //     toast.error("Please properly fill up the form", {
        //         position: "bottom-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        //     return;
        // }
        //
        // // Handle quizProfileImage upload
        // const file = data.quizProfileImage[0];
        // if (file) {
        //     // Create a FormData object
        //     const formData = new FormData();
        //     formData.append("image", file);
        //
        //     // Make an API call to your Spring Boot backend server using Axios
        //     try {
        //         const response = await axios.post(
        //             "http://localhost:8080/api/v1/storage/public/image/quiz",
        //             formData
        //         );
        //
        //         if (response.status === 201) {
        //             // If the server returns a 201 status code
        //             data.quizProfileImage = response.data.image_url;
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // if (data.questions) {
        //     console.log("I was able to reach data.questions");
        //
        //     for (const question of data.questions) {
        //         console.log("I was able to reach question for loop");
        //         if (question.answers) {
        //             // Handle correctAnswers
        //             if (question.answerType === "single") {
        //                 question.correctAnswers = [parseInt(question.correctAnswer) + 1];
        //             } else if (question.correctAnswers) {
        //                 question.correctAnswers = Object.entries(question.correctAnswers)
        //                     .filter(([key, value]) => value)
        //                     .map(([key, value]) => parseInt(key) + 1);
        //             }
        //             for (let i = 0; i < question.answers.length; i++) {
        //                 console.log("I was able to reach question.answer for loop");
        //                 const file = question.answers[i][0];
        //                 console.log(file);
        //                 if (file instanceof File) {
        //                     console.log("I was able to reach File");
        //                     // Create a FormData object
        //                     const formData = new FormData();
        //                     formData.append("image", file);
        //
        //                     // Make an API call to your Spring Boot backend server using Axios
        //                     try {
        //                         const response = await axios.post("http://localhost:8080/api/v1/storage/public/image/quiz", formData);
        //
        //                         if (response.status === 201) {
        //                             // If the server returns a 201 status code
        //                             question.answers[i] = response.data.image_url;
        //                         }
        //                     } catch (error) {
        //                         console.error(error);
        //                     }
        //                 }
        //             }
        //         }
        //         question.points = parseInt(question.points);
        //     }
        // }
        console.log(data);
        // try {
        //     const response = await axios.post("http://localhost:8080/api/v1/quiz/resource/create", data);
        //
        //     if (response.status === 201) {
        //         // If the server returns a 201 status code
        //         console.log("Done with the submission");
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const addQuestion = () => {
        setQuestions([...questions, {answers: []}]);
    };

    const addAnswer = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].answers.push("");
        setQuestions(newQuestions);
    };

    const clearAll = () => {
        reset();
        setQuestions([]);
    };

    // Function to handle image upload
    const handleImageUpload = async (event, index, answerIndex) => {
        console.log("I am in handleImageUpload arrow function");
        const file = event.target.files[0];
        if (file) {
            // Create a FormData object
            const formData = new FormData();
            formData.append("image", file);

            // Make an API call to your Spring Boot backend server using Axios
            try {
                const response = await axios.post("http://localhost:8080/api/v1/storage/public/image/",
                    formData);

                if (response.status === 201 || response.status === 200) {
                    // If the server returns a 201 status code
                    const newQuestions = [...questions];
                    newQuestions[index].answers[answerIndex] = response.data.image_url;
                    setQuestions(newQuestions);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form
            className="p-4 bg-white rounded-md shadow-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="quizTitle"
                >
                    Quiz Title
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="quizTitle"
                    {...register("quizTitle")}
                />
                {errors.quizTitle && <p className="text-red-500">{errors.quizTitle.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="quizSynopsis"
                >
                    Quiz Synopsis
                </label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="quizSynopsis"
                    {...register("quizSynopsis")}
                />
                {errors.quizSynopsis && <p className="text-red-500">{errors.quizSynopsis.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="quizProfileImage"
                >
                    Quiz Profile Image
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="file"
                    accept="image/*"
                    id="quizProfileImage"
                    {...register("quizProfileImage")}
                />
                {quizProfileImageURL && (
                    <img
                        className="w-full mt-4 rounded-md object-cover"
                        src={quizProfileImageURL}
                        alt="Quiz Profile Image Preview"
                    />
                )}
            </div>

            {/* Add the following code after the "Quiz Profile Image" input field */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="quizTags"
                >
                    Quiz Tags
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="quizTags"
                    {...register("quizTags")}
                >
                    <option value="SCIENCE">SCIENCE</option>
                    <option value="ARTS">ARTS</option>
                    <option value="DRAW">DRAW</option>
                    <option value="MATH">MATH</option>
                    <option value="HISTORY">HISTORY</option>
                    <option value="GEOGRAPHY">GEOGRAPHY</option>
                    <option value="LITERATURE">LITERATURE</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="MOVIES">MOVIES</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="TECHNOLOGY">TECHNOLOGY</option>
                    <option value="GENERAL_KNOWLEDGE">GENERAL_KNOWLEDGE</option>
                    <option value="TRIVIA">TRIVIA</option>
                    <option value="ANIMALS">ANIMALS</option>
                    <option value="NATURE">NATURE</option>
                    <option value="FOOD_AND_COOKING">FOOD_AND_COOKING</option>
                    <option value="HEALTH_AND_FITNESS">HEALTH_AND_FITNESS</option>
                    <option value="POLITICS">POLITICS</option>
                    <option value="MYTHOLOGY">MYTHOLOGY</option>
                    <option value="LANGUAGE">LANGUAGE</option>
                    <option value="IQ_TEST">IQ_TEST</option>
                    <option value="BRAIN_TEASERS">BRAIN_TEASERS</option>
                    <option value="LOGIC_PUZZLES">LOGIC_PUZZLES</option>
                    <option value="PERSONALITY_TEST">PERSONALITY_TEST</option>
                    <option value="POP_CULTURE">POP_CULTURE</option>
                    <option value="CELEBRITIES">CELEBRITIES</option>
                    <option value="CODING">CODING</option>
                    <option value="PROGRAMMING">PROGRAMMING</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="BACKEND">BACKEND</option>
                    {/*// Add more options here as needed*/}
                </select>
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="difficulty"
                >
                    Difficulty
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="difficulty"
                    {...register("difficulty")}
                >
                    <option value="EASY">EASY</option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="HARD">HARD</option>
                    <option value="CRAZY">CRAZY</option>
                </select>
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
                type="button"
                onClick={addQuestion}
            >
                Add Question
            </button>

            {questions.map((question, index) => {
                const answers = watch(`questions.${index}.answers`, []);
                const answerImageURLs = answers.map((answer) => answer ? URL.createObjectURL(answer[0]) : null);
                return (
                    <div key={index} className="mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor={`questionTitle${index}`}
                            >
                                Question Title
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="text"
                                id={`questionTitle${index}`}
                                {...register(`questions.${index}.title`)}
                            />
                            {errors.questions?.[index]?.title && <p className="text-red-500">{errors.questions[index].title.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor={`questionType${index}`}
                            >
                                Question Type
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md"
                                id={`questionType${index}`}
                                {...register(`questions.${index}.type`)}
                            >
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                            </select>
                        </div>

                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
                            type="button"
                            onClick={() => addAnswer(index)}
                        >
                            Add Answer
                        </button>

                        {question.answers.map((answer, answerIndex) =>
                            watch(`questions.${index}.type`) === "text" ? (
                                <input
                                    key={answerIndex}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    type="text"
                                    {...register(`questions.${index}.answers.${answerIndex}`)}
                                />
                            ) : (
                                <Fragment key={index}>
                                    <input
                                        key={answerIndex + 244}
                                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => handleImageUpload(event, index, answerIndex)}
                                        {...register(`questions.${index}.answers.${answerIndex}`)}
                                    />
                                    {answerImageURLs[answerIndex] && (
                                        <img className="w-full mt-4 rounded-md object-cover"
                                             src={answerImageURLs[answerIndex]} alt={`Answer ${answerIndex + 1} Preview`}/>
                                    )}
                                </Fragment>
                            )
                        )}

                        {question.answers.length > 0 && (
                            <>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`answerType${index}`}
                                    >
                                        Answer Type
                                    </label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        id={`answerType${index}`}
                                        {...register(`questions.${index}.answerType`)}
                                    >
                                        <option value="single">Single</option>
                                        <option value="multiple">Multiple</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`correctAnswer${index}`}
                                    >
                                        Correct Answer
                                    </label>
                                    {watch(`questions.${index}.answerType`) === "single" ? (
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            id={`correctAnswer${index}`}
                                            {...register(`questions.${index}.correctAnswer`)}
                                        >
                                            {question.answers.map((answer, answerIndex) => (
                                                <option key={answerIndex} value={answerIndex}>
                                                    Answer {answerIndex + 1}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`correctAnswer${index}${answerIndex}`}
                                                    {...register(`questions.${index}.correctAnswers.${answerIndex}`, {
                                                        setValueAs: (value) => value ? answerIndex : null
                                                    })}
                                                />
                                                <label
                                                    className="ml-2"
                                                    htmlFor={`correctAnswer${index}${answerIndex}`}
                                                >
                                                    Answer {answerIndex + 1}
                                                </label>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`correctMessage${index}`}
                                    >
                                        Message for Correct Answer
                                    </label>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        id={`correctMessage${index}`}
                                        {...register(`questions.${index}.correctMessage`)}
                                    />
                                    {errors.questions?.[index]?.correctMessage &&
                                        <p className="text-red-500">{errors.questions[index].correctMessage.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`wrongMessage${index}`}
                                    >
                                        Message for Wrong Answer
                                    </label>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        id={`wrongMessage${index}`}
                                        {...register(`questions.${index}.wrongMessage`)}
                                    />
                                    {errors.questions?.[index]?.wrongMessage &&
                                        <p className="text-red-500">{errors.questions[index].wrongMessage.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`explanation${index}`}
                                    >
                                        Explanation
                                    </label>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        id={`explanation${index}`}
                                        {...register(`questions.${index}.explanation`)}
                                    />
                                    {errors.questions?.[index]?.explanation &&
                                        <p className="text-red-500">{errors.questions[index].explanation.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`points${index}`}
                                    >
                                        Points
                                    </label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        type="number"
                                        id={`points${index}`}
                                        {...register(`questions.${index}.points`, {
                                            setValueAs: (value) => parseInt(value)
                                        })}                                />
                                    {errors.questions?.[index]?.points && <p className="text-red-500">{errors.questions[index].points.message}</p>}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
                type="submit"
            >
                Submit
            </button>
            <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                type="reset"
                onClick={clearAll}
            >
                Clear All
            </button>
        </form>
    );
}
