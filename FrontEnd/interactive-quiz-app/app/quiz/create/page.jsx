"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateQuizForm() {
    const { register, handleSubmit, reset } = useForm();
    const [questions, setQuestions] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
    };

    const addQuestion = () => {
        setQuestions([...questions, { answers: [] }]);
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

                    {question.answers.map((answer, answerIndex) => (
                        <input
                            key={answerIndex}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            type="text"
                            {...register(`questions.${index}.answers.${answerIndex}`)}
                        />
                    ))}

                    {question.answers.length > 0 && (
                        <>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                    htmlFor={`correctAnswer${index}`}
                                >
                                    Correct Answer
                                </label>
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
};
