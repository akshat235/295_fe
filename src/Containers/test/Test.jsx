import React, { useState, useEffect } from "react";
import "./Test.css";
import jsonDataVARC from "./../../database/questions_varc.json";
import jsonDataDILR from "./../../database/questions_dilr.json";
import jsonDataQUANT from "./../../database/questions_quant.json";
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

const submissionJson = { VARC: [jsonDataVARC.map(item => ({
    questionid: item.QuestionId,
    correctans: item.Correct_answer,
    optionSelected:""
  }))
  ] ,  QUANT: [jsonDataQUANT.map(item => ({
    questionid: item.QuestionId,
    correctans: item.Correct_answer,
    optionSelected:""
  }))] , DILR: [jsonDataDILR.map(item => ({
    questionid: item.QuestionId,
    correctans: item.Correct_answer,
    optionSelected:""
  }))]
  };

function Test() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerVisible, setCorrectAnswerVisible] = useState(false);
  const [correctAnswerMessage, setcorrectAnswerMessage] = useState(false);
  const [divCount, setDivCount] = useState(1);
  const [timer, setTimer] = useState(40 * 60);
  const [dataToUse, setDataToUse] = useState(jsonDataVARC);
  const [showModal, setShowModal] = useState(false);
  //   const [jsonData, setJsonData] = useState([
  //     {
  //       questionId: 1,
  //       questionBody: "Error Loading Json.question",
  //       options: [" ", " ", " ", " "],
  //       correctAnswer: " ",
  //     },
  //   ]);
  const [responesJsonData, setResponseJsonData] = useState("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState("VARC");
  const VARCresponse = {
    VARC: dataToUse.map(item => ({
      questionid: item.QuestionId,
      correctans: item.Correct_answer,
      optionSelected:""
    }))
  };
//   console.log(VARCresponse);

  //   useEffect(() => {
  //     setResponseJsonData(
  //       jsonData.map((question) => ({
  //         ...question,
  //         selectedOption: "",
  //       }))
  //     );
  //   }, [jsonData]);
  //   const [sectionSubmission, setSectionSubmission] = useState([
  //     {
  //       questionId: 0,
  //       response: {
  //         selectedOption: "",
  //         correctAnswer: "",
  //       },
  //     },
  //   ]);
  const [sectionSubmission, setSectionSubmission] = useState({});

  

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn == "false") {
      navigate("/login");
      return;
    }
  }, []);
  

  useEffect(() => {
    if(currentSectionTitle == "VARC")
    {
        setDataToUse(jsonDataVARC);
    }
    else if(currentSectionTitle == "QUANT")
    {
        setDataToUse(jsonDataQUANT);
    }
    else if(currentSectionTitle == "DILR")
    {
        setDataToUse(jsonDataDILR);
    }
    
    
  }, [currentSectionTitle]);


  //   useEffect(() => {
  //     const apiUrl = "http://127.0.0.1:5000/test/questions";

  //     fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setJsonData(result);
  //         console.log(responesJsonData);

  //         console.log("Questions Loaded!");
  //         console.log("Number of questions in jsonData: ", jsonData.length);

  //         // seupdatedJsonData = [...jsonData];
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

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
    if (currentIndex <= dataToUse.length - 1) {
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

  const handleSectionSubmit = () => {
    if(currentSectionTitle == "DILR"){
        handleSubmitResponse();
    }
    else if(currentSectionTitle == "VARC")
    {
        setCurrentSectionTitle("QUANT");
        setCurrentIndex(0);
    }
    else if(currentSectionTitle == "QUANT")
    {
        setCurrentSectionTitle("DILR");
        setCurrentIndex(0);
    }

  };



  const handleSubmitResponse = () => {
    const submitUrl = "http://127.0.0.1:5000/test/submitresponse";
    const uid = localStorage.getItem("userID");
    const final_response = {
      userId: uid,
      submission: submissionJson
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
        console.error("Network error:", error);
      });
  };

  const handleTimeUp = () => {
    setShowModal(false);
  };

  const currentItem = dataToUse[currentIndex];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option !== currentItem.Correct_answer) {
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

  const handleOptionSelection = (option) => {
    // setSelectedOption(option);
    console.log(currentIndex)
    
    if(currentSectionTitle=='VARC'){
    submissionJson.VARC[0][currentIndex].optionSelected = option;}
    if(currentSectionTitle=='QUANT'){
    submissionJson.QUANT[0][currentIndex].optionSelected = option;}
    if(currentSectionTitle=='DILR'){
    submissionJson.DILR[0][currentIndex].optionSelected = option;}
    
    
    console.log(submissionJson);
  };

  useEffect(() => {
    setDivCount(dataToUse.length);
  }, [dataToUse]);

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
                <h3>{currentSectionTitle}</h3>

                <p className="sequio__test-content-p">
                  {currentItem.Comp_body}
                </p>
              </div>

              <div className="sequio__border-radius-center">
                <h2 className="sequio__test-content-h2">
                  Question {currentItem.QuestionId + 1}:
                </h2>
                <hr /> <br />
                <h2 className="sequio__test-content-h2">
                  {currentItem.Question}:
                </h2>
                <h4>Select an option:</h4>
                <ul className="sequio__test-content__grid-container-options">
                  {Object.keys(currentItem)
                    .filter((key) => key.startsWith("Opt_"))
                    .map((key) => (
                      <li key={key}>
                        <input
                          type="radio"
                          name="options"
                          value={currentItem[key]}
                          checked={selectedOption === currentItem[key]}
                          onChange={() =>
                            handleOptionSelection(currentItem[key])
                          }
                        />
                        <h4>{currentItem[key]}</h4>
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
            {currentIndex === dataToUse.length - 1 ? (
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
            {currentIndex === dataToUse.length - 1 ? (
              <button
                className="sequio__navigation-btns__submit"
                onClick={handleSectionSubmit}
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
