import React from 'react';
import { QuestionProps } from '../../utils/types';

const Question: React.FC<QuestionProps> = ({ question, options, correctAnswer, onSelect, selectedOption }) => {
    const isCorrect = selectedOption === correctAnswer;
  
    return (
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">{question}</h3>
        <ul>
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer border rounded-md p-2 ${
                isCorrect ? 'bg-green-200' : selectedOption === option ? 'bg-red-200' : 'hover:bg-gray-200'
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        {selectedOption && (
          <p className={`mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : `Wrong answer`}
          </p>
        )}
      </div>
    );
  };
  
  export default Question;