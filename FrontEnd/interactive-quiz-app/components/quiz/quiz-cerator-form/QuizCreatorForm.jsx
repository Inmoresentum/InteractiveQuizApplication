"use client"
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {toast} from "react-toastify";

// Create a schema for the form data using zod
const schema = z.object({
    quizTitle: z.string().nonempty(),
    quizSynopsis: z.string().nonempty(),
    quizProfileImage: z.any(),
    quizTags: z.string().nonempty(),
    difficulty: z.string().nonempty(),
    questions: z.array(
        z.object({
            title: z.string().nonempty(),
            type: z.string().nonempty(),
            answers: z.array(z.any()).nonempty(),
            answerType: z.string().nonempty(),
            correctAnswer: z.any(),
            correctAnswers: z.array(z.number()),
            correctMessage: z.string().nonempty(),
            wrongMessage: z.string().nonempty(),
            explanation: z.string().nonempty(),
            points: z.number().positive()
        })
    ).nonempty()
});

export default function QuizCreationForm() {
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            quizTitle: "",
            quizSynopsis: "",
            quizTags: "Science",
            difficulty: "Easy",
            questions: []
        }
    });
    const [questions, setQuestions] = useState([]);

    const onSubmit = async (data) => {
        // Check if there is at least one correct answer
        let hasCorrectAnswer = false;
        if (data.questions) {
            for (const question of data.questions) {
                if (question.correctAnswer || question.correctAnswers) {
                    hasCorrectAnswer = true;
                    break;
                }
            }
        }

        if (!hasCorrectAnswer) {
            // If there is no correct answer, show an error message and return
            toast.error("Please properly fill up the form", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        // Handle quizProfileImage upload
        const file = data.quizProfileImage[0];
        if (file) {
            // Create a FormData object
            const formData = new FormData();
            formData.append("image", file);

            // Make an API call to your Spring Boot backend server using Axios
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/v1/storage/public/image/quiz",
                    formData
                );

                if (response.status === 201) {
                    // If the server returns a 201 status code
                    data.quizProfileImage = response.data.image_url;
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (data.questions) {
            console.log("I was able to reach data.questions");

            for (const question of data.questions) {
                console.log("I was able to reach question for loop");
                if (question.answers) {
                    // Handle correctAnswers
                    if (question.answerType === "single") {
                        question.correctAnswers = [parseInt(question.correctAnswer) + 1];
                    } else if (question.correctAnswers) {
                        question.correctAnswers = Object.entries(question.correctAnswers)
                            .filter(([key, value]) => value)
                            .map(([key, value]) => parseInt(key) + 1);
                    }
                    for (let i = 0; i < question.answers.length; i++) {
                        console.log("I was able to reach question.answer for loop");
                        const file = question.answers[i][0];
                        console.log(file);
                        if (file instanceof File) {
                            console.log("I was able to reach File");
                            // Create a FormData object
                            const formData = new FormData();
                            formData.append("image", file);

                            // Make an API call to your Spring Boot backend server using Axios
                            try {
                                const response = await axios.post("http://localhost:8080/api/v1/storage/public/image/quiz", formData);

                                if (response.status === 201) {
                                    // If the server returns a 201 status code
                                    question.answers[i] = response.data.image_url;
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                }
                question.points = parseInt(question.points);
            }
        }
        console.log(data);
        try {
            const response = await axios.post("http://localhost:8080/api/v1/quiz/resource/create", data);

            if (response.status === 201) {
                // If the server returns a 201 status code
                console.log("Done with the submission");
            }
        } catch (error) {
            console.error(error);
        }
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
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="History">History</option>
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
                    <option value="Easy">Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                    <option value="Crazy">Crazy</option>
                </select>
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
                type="button"
                onClick={addQuestion}
            >
                Add Question
            </button>

            {questions.map((question, index) => (
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
                            <input
                                key={answerIndex}
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleImageUpload(event, index, answerIndex)}
                                {...register(`questions.${index}.answers.${answerIndex}`)}
                            />
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
                                                {...register(
                                                    `questions.${index}.correctAnswers.${answerIndex}`
                                                )}
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
                                    {...register(`questions.${index}.points`)}
                                />
                                {errors.questions?.[index]?.points && <p className="text-red-500">{errors.questions[index].points.message}</p>}
                            </div>
                        </>
                    )}
                </div>
            ))}

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
