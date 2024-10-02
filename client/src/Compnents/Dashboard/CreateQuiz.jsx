'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import { Button } from "../Home/ui/Button";
import { Input } from "../Home/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../Home/ui/Card";
import { UserContext } from '../../Context/UserContext';
import { ThemeContext } from '../../Context/ThemeContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ManualQuestionInput = ({ question, options, correctAnswer, onChange, index }) => (
  <div className="mb-4 space-y-2">
    <Input
      type="text"
      value={question}
      onChange={(e) => onChange(index, 'question', e.target.value)}
      placeholder="Question"
    />
    {options.map((option, optionIndex) => (
      <Input
        key={optionIndex}
        type="text"
        value={option}
        onChange={(e) => onChange(index, 'option', e.target.value, optionIndex)}
        placeholder={`Option ${optionIndex + 1}`}
      />
    ))}
    <Input
      type="text"
      value={correctAnswer}
      onChange={(e) => onChange(index, 'correctAnswer', e.target.value)}
      placeholder="Correct Answer"
    />
  </div>
);

export default function CreateQuiz() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topicInput, setTopicInput] = useState('');
  const [createMethod, setCreateMethod] = useState(null);
  const [manualQuestions, setManualQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [pdfText, setPdfText] = useState('');

  const createOptions = [
    { name: 'Upload PDF', icon: '📄', id: 'pdf' },
    { name: 'Create from Topic', icon: '💡', id: 'topic' },
    { name: 'Create Manually', icon: '✏', id: 'manual' },
  ];
  const{theme,
    setTheme,
    successMsg,
    setSuccessMsg,
    warningMsg,
    setWarningMsg,
    errMsg,
    setErrMsg,}=useContext(ThemeContext);
  const handleCreate = (method) => {
    setCreateMethod(method);
    if (method === 'pdf') {
      document.getElementById('fileInput').click();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setFileName(file.name); // Save the file name
      setIsModalOpen(true);
      setError(null);
      try {
        const text = await pdfToText(file);
        setPdfText(text);
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
        setError('Failed to extract text from PDF. Please try again.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const generateQuestions = async () => {
    setIsLoading(true);
    setError(null);

    const requestData = {
      pdfText: createMethod === 'pdf' ? pdfText : undefined,
      fileName: createMethod === 'pdf' ? fileName : undefined, // Send the file name
      topic: createMethod === 'topic' ? topicInput : undefined,
      numQuestions,
      difficulty,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/generate-quiz`, requestData);
      setGeneratedQuestions(response.data.questions);
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      setError(error.response?.data?.error || 'Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualQuestionChange = (index, field, value, optionIndex) => {
    const updatedQuestions = [...manualQuestions];
    if (field === 'option') {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setManualQuestions(updatedQuestions);
  };

  const addManualQuestion = () => {
    setManualQuestions([...manualQuestions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const submitManualQuestions = async () => {
    setIsLoading(true);
    setError(null);
    
    const requestData = {
      questions: manualQuestions,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/quiz/create-manual', requestData);
      setGeneratedQuestions(response.data.questions);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting manual questions:', error);
      setError(error.response?.data?.error || 'Failed to submit questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const Navigate = useNavigate()
   const { uid} = useContext(UserContext);
  const submitQuiz = async () => {
    const requestData = {
      questions: generatedQuestions,
      fileName: createMethod === 'pdf' ? fileName : createMethod === 'topic' ? topicInput : 'Manual Questions',
      topic: createMethod === 'topic' ? topicInput : undefined,
      teacherId :uid
    };
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/submit`, requestData);
      if(response){
        setSuccessMsg("Test submitted sucessfully")
        setTheme("Sucess")
        
        Navigate("/dashboard")
        window.location.reload();
      }
    
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error.response?.data?.error || 'Failed to submit quiz. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl">Create a Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {createOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleCreate(option.id)}
              className="flex items-center justify-center"
              disabled={createMethod !== null && createMethod !== option.id} // Disable other options
            >
              <span className="mr-2">{option.icon}</span>
              <span>{option.name}</span>
            </Button>
          ))}
        </div>
        <Input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {error && (
          <div className="mt-4 p-4 bg-destructive text-destructive-foreground rounded-lg">
            {error}
          </div>
        )}
        {isModalOpen && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configure Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label>Number of Questions</label>
                <div className="flex flex-col">
                  {[5, 10, 15].map((num) => (
                    <label key={num}>
                      <input
                        type="radio"
                        name="numQuestions"
                        value={num}
                        checked={numQuestions === num}
                        onChange={() => setNumQuestions(num)}
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label>Difficulty</label>
                <div className="flex flex-col">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label key={level}>
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                      />
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              {createMethod === 'topic' && (
                <div className="mb-4">
                  <label htmlFor="topic">Topic</label>
                  <Input
                    id="topic"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Enter a topic"
                  />
                </div>
              )}
              {createMethod === 'manual' && (
                <div>
                  {manualQuestions.map((q, index) => (
                    <ManualQuestionInput
                      key={index}
                      question={q.question}
                      options={q.options}
                      correctAnswer={q.correctAnswer}
                      onChange={handleManualQuestionChange}
                      index={index}
                    />
                  ))}
                  <Button onClick={addManualQuestion} className="mb-4">Add Question</Button>
                </div>
              )}
            </CardContent>
            <div className="flex justify-end mt-4">
              <Button
                onClick={createMethod === 'manual' ? submitManualQuestions : generateQuestions}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Generate Questions'}
              </Button>
            </div>
          </Card>
        )}
        {generatedQuestions.length > 0 && (
          <div>
            <h2 className="text-xl">Generated Questions</h2>
            {generatedQuestions.map((q, index) => (
              <div key={index} className="mb-4">
                <h3>{index + 1}. {q.text}</h3>
                <ul>
                  {q.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
                <p className="font-bold">Correct Answer: {q.correctAnswer}</p>
              </div>
            ))}
            <div className="flex justify-end">
              <Button onClick={submitQuiz}>Submit Quiz</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
