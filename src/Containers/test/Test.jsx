import React, { useState, useEffect } from "react";
import "./Test.css";
// import jsonData from "./../../database/Data.json";
import { useNavigate } from "react-router-dom";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function Test() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerVisible, setCorrectAnswerVisible] = useState(false);
  const [correctAnswerMessage, setcorrectAnswerMessage] = useState(false);
  const [divCount, setDivCount] = useState(1);
  const [timer, setTimer] = useState(40 * 60);
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState([
    {
      questionId: 1,
      questionBody: "Error Loading Json.question",
      options: [" ", " ", " ", " "],
      correctAnswer: " ",
    },
  ]);
  const [responesJsonData, setResponseJsonData] = useState("");

  useEffect(() => {
    setResponseJsonData(
      jsonData.map((question) => ({
        ...question,
        selectedOption: "",
      }))
    );
  }, [jsonData]);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/test/questions";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setJsonData(result);
        console.log(responesJsonData);

        console.log("Questions Loaded!");
        console.log("Number of questions in jsonData: ", jsonData.length);

        // seupdatedJsonData = [...jsonData];
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setShowModal(true);
      }
    }, 1000);

    return () => {
      clearTimeout(countdown);
    };
  }, [timer]);

  const handle_question_btn_click = (index) => {
    setCurrentIndex(index);
  };

  const divElements = Array.from({ length: divCount }, (_, index) => (
    <button
      className="sequio__content-question-sequence-rectangle"
      key={index}
      onClick={() => handle_question_btn_click(index)}
    >
      <p className="color-black">{index + 1}</p>
    </button>
  ));

  const handleNextClick = () => {
    if (currentIndex <= jsonData.length - 1) {
      console.log(currentIndex);
      setCurrentIndex(currentIndex + 1);
      setCorrectAnswerVisible(false);
      setcorrectAnswerMessage(false);
      setSelectedOption(null);
      //   setDivCount(divCount + 1);
    } else {
    }
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCorrectAnswerVisible(false);
      setcorrectAnswerMessage(false);
      setSelectedOption(null);
      //   setDivCount(divCount - 1);
    }
  };

  const handleSubmitRespose = () => {
    const submitUrl = "http://127.0.0.1:5000/test/submitresponseXXXX";

    const final_response = {
        "userId": "1",
        "responses": [
          {
            "test_number": "1",
            "response_data": responesJsonData, 
          }
        ],
      };

    console.log(final_response);
    fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(final_response),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data submitted successfully.");
          navigate("/dashboard");
        } else {
          console.error("Error submitting data.");
        }
      })
      .catch((error) => {
        // Handle network errors or other issues.
        console.error("Network error:", error);
      });
  };

  const handleTimeUp = () => {
    setShowModal(false);
  };

  const currentItem = jsonData[currentIndex];
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option !== currentItem.correctAnswer) {
      setCorrectAnswerVisible(true);
    } else {
      setCorrectAnswerVisible(false);
    }
    // submission_object = {
    //     questionId: currentItem.id,
    //   questionBody: currentItem.questionBody,
    //   options: currentItem.options,
    //   correctAnswer: currentItem.correctAnswer,
    //   userAnswer: option
    // }

    responesJsonData[currentIndex].selectedOption = option;
    // console.log(responesJsonData);
  };

  useEffect(() => {
    setDivCount(jsonData.length);
  }, [jsonData]);

  return (
    <>
      <div className="sequio__test" id="home">
        <div className="sequio__test-content">
          <div className="timer">
            <p>Time Left: {formatTime(timer)}</p>
          </div>
          <div className="sequio__test-content__container">
            <div
              className="sequio__test-content__grid-container"
              key={setCurrentIndex}
            >
              <div className="sequio__border-radius-left">
                <h3>VARC</h3>
                <p className="sequio__test-content-p">
                  Direction for Reading Comprehension: The passages given here
                  are followed by some questions that have four answer choices;
                  read the passage carefully and pick the option whose answer
                  best aligns with the passage. We cannot travel outside our
                  neighbourhood without passports. We must wear the same
                  plainclothes. We must exchange our houses every ten years. We
                  cannot avoid labour. We all go to bed at the same time . . .
                  We have religious freedom, but we cannot deny that the soul
                  dies with the body, since 'but for the fear of punishment,
                  they would have nothing but contempt for the laws and customs
                  of society'. . . . In More's time, for much of the population,
                  given the plenty and security on offer, such restraints would
                  not have seemed overly unreasonable. For modern readers,
                  however, Utopia appears to rely upon relentless transparency,
                  the repression of variety, and the curtailment of privacy.
                  Utopia provides security. Such a conclusion might be fortified
                  by examining selectively the tradition which follows more on
                  these points. This often portrays societies where. . .'it
                  would be almost impossible for man to be depraved, or wicked'.
                  . . . This is achieved both through institutions and mores,
                  which underpin the common life. . .. The passions are
                  regulated and inequalities of wealth and distinction are
                  minimized. Needs, vanity, and emulation are restrained, often
                  by prizing equality and holding riches in contempt. The desire
                  for public power is curbed. Marriage and sexual intercourse
                  are often controlled: in Tommaso Campanella's The City of the
                  Sun (1623), the firstst great literary utopia after More's,
                  relations are forbidden to men before the age of twenty-one
                  and women before nineteen. Communal child-rearing is normal;
                  for Campanella this commences at age two. Greater simplicity
                  of life, 'living according to nature', is often a result: the
                  desire for simplicity and purity are closely related. People
                  become more alike in appearance, opinion, and outlook than
                  they often have been. Unity, order, and homogeneity thus
                  prevail at the cost of individuality and diversity.
                </p>
              </div>

              <div className="sequio__border-radius-center">
                <h2 className="sequio__test-content-h2">
                  Question {currentItem.questionId}:
                </h2>
                <hr /> <br />
                <h2 className="sequio__test-content-h2">
                  {currentItem.questionBody}:
                </h2>
                <h4>Select an option:</h4>
                <ul className="sequio__test-content__grid-container-options">
                  {currentItem.options.map((option, setCurrentIndex) => (
                    <li key={setCurrentIndex}>
                      <input
                        type="radio"
                        name="options"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                      />
                      <h4>{option}</h4>
                    </li>
                  ))}
                </ul>
                {/* {correctAnswerVisible && (
                        <p className="sequio__test-content-p-answer">Correct Answer: {currentItem.correctAnswer}</p>
                    )}
                    {correctAnswerMessage && (
                        <p className="sequio__test-content-p-answer-right">You Got that right!</p>
                    )} */}
              </div>

              <div className="sequio__border-radius-right">
                <div className="sequio__content-Question-sequence-container">
                  {divElements}
                </div>
              </div>
            </div>
          </div>
          <div>
            {currentIndex === 0 ? (
              <button className="sequio__navigation-btns">
                <span
                  className="material-symbols-outlined icon-padding"
                  disabled
                >
                  arrow_back_ios
                </span>
              </button>
            ) : (
              <button className="sequio__navigation-btns">
                <span
                  className="material-symbols-outlined icon-padding"
                  onClick={handlePreviousClick}
                >
                  arrow_back_ios
                </span>
              </button>
            )}
            {currentIndex === jsonData.length - 1 ? (
              <button className="sequio__navigation-btns">
                <span
                  className="material-symbols-outlined icon-padding"
                  disabled
                >
                  arrow_forward_ios
                </span>
              </button>
            ) : (
              <button className="sequio__navigation-btns">
                <span
                  className="material-symbols-outlined icon-padding"
                  onClick={handleNextClick}
                >
                  arrow_forward_ios
                </span>
              </button>
            )}
            {currentIndex === jsonData.length - 1 ? (
              <button
                className="sequio__navigation-btns__submit"
                onClick={handleSubmitRespose}
              >
                Submit
              </button>
            ) : (
              <button className="sequio__navigation-btns__submit" disabled>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Modal for "Time's Up" message */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Time's Up!</h2>
            <button>Go to Dashboard</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Test;
