/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Popup.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "@/App";
import "./Popup.css";

const Popup = () => {
  const { score, setScore, status, setStatus, loading,setLoading,BASE} = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuestion();
      setShowPopup(true);
    }, 300000); // Show popup every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchQuestion = async () => {
    try {
        setLoading(true);
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=1&type=multiple"
      );
      const data = response.data.results[0];
      const formattedQuestion = {
        question: data.question,
        options: [...data.incorrect_answers, data.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        answer: data.correct_answer,
      };
      setQuestionData(formattedQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
    }finally{
        setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questionData.answer) {
      setScore(score + 1);
      setStatus("Correct!");
      alert(`${selectedOption} is Correct!`);
    } else {
      setStatus("Incorrect!");
    }
    setShowPopup(false);
  };

  return (
    !loading && showPopup &&
    questionData && (
      <div className="popup">
        <h2 dangerouslySetInnerHTML={{ __html: questionData.question }}></h2>
        <div className="options">
          {questionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              dangerouslySetInnerHTML={{ __html: option }}
            ></button>
          ))}
        </div>
        <div className="status">{status}</div>
      </div>
    )
  );
};

export default Popup;
