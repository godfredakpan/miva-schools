
import React, { useState } from 'react';
import Question from './questions';
import { Quiz } from '../../utils/types';

// With time all Quiz can be updated to pull data from database and also ask generic questions on the course.
const Quizzes: React.FC = () => {
    const quizzes: Quiz[] = [
        {
            id: 1,
            title: 'Quiz for Course 1',
            questions: [
                {
                    question: 'What is 2 + 2?',
                    options: ['4', '5', '6'],
                    correctAnswer: '4'
                },

                {
                    question: 'What is the capital of France?',
                    options: ['Berlin', 'Paris', 'Madrid'],
                    correctAnswer: 'Paris'
                },
            ],
        },
        {
            id: 2,
            title: 'Quiz for Course 2',
            questions: [
                {
                    question: 'What is the largest mammal?',
                    options: ['Elephant', 'Blue Whale', 'Giraffe'],
                    correctAnswer: 'Blue Whale'
                },

                {
                    question: 'Who wrote Hamlet?',
                    options: ['Shakespeare', 'Hemingway', 'Tolstoy'],
                    correctAnswer: 'Shakespeare'
                },
            ],
        },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

    const handleQuizSelect = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setSelectedAnswers({});
    };

    const handleQuestionSelect = (questionIndex: number, selectedOption: string) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    return (

        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Quizzes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className={`cursor-pointer border rounded-md p-4 ${selectedQuiz && selectedQuiz.id === quiz.id ? 'bg-blue-200' : 'bg-white'
                            }`}
                        onClick={() => handleQuizSelect(quiz)}
                    >
                        <h2 className="text-lg font-bold mb-2">{quiz.title}</h2>
                    </div>
                ))}
            </div>

            {selectedQuiz && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Selected Quiz: {selectedQuiz.title}</h2>

                    {selectedQuiz.questions.map((question, index) => (
                        <Question
                            key={index}
                            question={question.question}
                            options={question.options}
                            onSelect={(selectedOption) => handleQuestionSelect(index, selectedOption)}
                            selectedOption={selectedAnswers[index] || null} correctAnswer={question.correctAnswer} />
                    ))}

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        onClick={() => console.log('Selected Answers:', selectedAnswers)}
                    >
                        Submit Answers
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quizzes;
