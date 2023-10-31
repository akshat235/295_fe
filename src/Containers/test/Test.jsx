import React, { useState, useEffect } from "react";
import "./Test.css";
import jsonDataVARC from "./../../database/questions_varc.json";
import jsonDataDILR from "./../../database/questions_dilr.json";
import jsonDataQUANT from "./../../database/questions_quant.json";
import DILR_paper_1 from "./../../CAT_Papers/CAT DILR - 2022 - Slot 1.json";
import DILR_paper_2 from "./../../CAT_Papers/CAT DILR - 2022 - Slot 2.json";
import DILR_paper_3 from "./../../CAT_Papers/CAT DILR - 2022 - Slot 3.json";
import VARC_paper_1 from "./../../CAT_Papers/CAT VARC - 2022 - Slot 1.json";
import VARC_paper_2 from "./../../CAT_Papers/CAT VARC - 2022 - Slot 2.json";
import VARC_paper_3 from "./../../CAT_Papers/CAT VARC - 2022 - Slot 3.json";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

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
  const [loading, setLoading] = useState(false);

  const [dataToUse, setDataToUse] = useState(jsonDataVARC);
  const [showModal, setShowModal] = useState(false);
  const paper1 = [VARC_paper_1, DILR_paper_1];
  const paper2 = [VARC_paper_2, DILR_paper_2];
  const paper3 = [VARC_paper_3, DILR_paper_3];
  const papers = [paper1, paper2, paper3];

  const papers_list = { 1: paper1, 2: paper2, 3: paper3 };
  const [paperToUse, setPaperToUse] = useState(papers[0]);
  const [sectionToUse, setSectionToUse] = useState(paper1[0]);
  const [responesJsonData, setResponseJsonData] = useState("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState("VARC");
  const [loggedInUserId, setLoggedInUserID] = useState(
    localStorage.getItem("userID")
  );
  // const VARCresponse = {
  //   VARC: paperToUse[0].map((item) => ({
  //     questionid: item.QuestionId,
  //     correctans: item.Correct_answer,
  //     optionSelected: "",
  //   })),
  // };

  function convertDriveLink(originalLink) {
    const fileId = originalLink.match(/[-\w]{25,}/); // Extract the file ID from the original link
    if (fileId) {
      const transformedLink = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
      return transformedLink;
    } else {
      // Handle invalid input
      return originalLink;
    }
  }

  const submissionJson = {
    VARC: [
      paperToUse[0].map((item) => ({
        questionid: item.QuestionId,
        correctans: item.Correct_answer,
        optionSelected: "",
      })),
    ],
    QUANT: [
      paperToUse[1].map((item) => ({
        questionid: item.QuestionId,
        correctans: item.Correct_answer,
        optionSelected: "",
      })),
    ],
    DILR: [
      paperToUse[1].map((item) => ({
        questionid: item.QuestionId,
        correctans: item.Correct_answer,
        optionSelected: "",
      })),
    ],
  };

  const [sectionSubmission, setSectionSubmission] = useState({});

  const sendUserIdAndGetPaper = async () => {
    const send_id_url = "http://127.0.0.1:5000/test/get_paper_number";

    const fetchData = async () => {
      try {
        console.log(loggedInUserId);
        const response = await fetch(send_id_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: loggedInUserId }),
        });

        if (!response.ok) {
          console.log("Sending userID failed");
          throw new Error("Request failed");
        }
        console.log("User ID sent successfully");
      } catch (error) {
        console.error("Error sending userID:", error);
      }
    };

    fetchData();

    fetch(send_id_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        // setPaperToUse(papers[responseData.paper_number]);
        if (responseData.paper_number === 0 || responseData.paper_number === 1 || responseData.paper_number === 2) {
          setPaperToUse(papers[responseData.paper_number]);
      } else {
          responseData.paper_number = 0; 
          setPaperToUse(papers[responseData.paper_number]);
      }
        console.log(paperToUse); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    setLoading(true);

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn == "false") {
      navigate("/login");
      return;
    }

    sendUserIdAndGetPaper();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentSectionTitle == "VARC") {
      setDataToUse(paperToUse[0]);
    } else if (currentSectionTitle == "QUANT") {
      setDataToUse(paperToUse[1]);
    } else if (currentSectionTitle == "DILR") {
      setDataToUse(paperToUse[1]);
    }
  }, [currentSectionTitle, paperToUse]);

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
        if (currentSectionTitle == "VARC") {
          setCurrentSectionTitle("QUANT");
          setTimer(40 * 60);
          // setTimer(2);
        }
        if (currentSectionTitle == "QUANT") {
          setCurrentSectionTitle("DILR");
          setTimer(40 * 60);
          // setTimer(2);
        }
        if (currentSectionTitle == "DILR" && timer === 0) {
          setShowModal(true);
        }
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
    if (currentSectionTitle == "DILR") {
      handleSubmitResponse();
    } else if (currentSectionTitle == "VARC") {
      setCurrentSectionTitle("QUANT");
      setCurrentIndex(0);
    } else if (currentSectionTitle == "QUANT") {
      setCurrentSectionTitle("DILR");
      setCurrentIndex(0);
    }
  };

  const handleSubmitResponse = () => {
    const submitUrl = "http://127.0.0.1:5000/test/submitresponse";
    const uid = localStorage.getItem("userID");
    const final_response = {
      userId: uid,
      submission: submissionJson,
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
  const handleOptionSelectionTITA = (option) => {
    if (currentSectionTitle === "VARC") {
      submissionJson.VARC[0][currentIndex].optionSelected = option;
    }
    if (currentSectionTitle === "QUANT") {
      submissionJson.QUANT[0][currentIndex].optionSelected = option;
    }
    if (currentSectionTitle === "DILR") {
      submissionJson.DILR[0][currentIndex].optionSelected = option;
    }
    // console.log(submissionJson.VARC[0][currentIndex].optionSelected);
  };

  const handleOptionSelection = (option) => {
    // setSelectedOption(option);
    console.log(currentIndex);

    if (currentSectionTitle === "VARC") {
      submissionJson.VARC[0][currentIndex].optionSelected = option;
    }
    if (currentSectionTitle === "QUANT") {
      submissionJson.QUANT[0][currentIndex].optionSelected = option;
    }
    if (currentSectionTitle === "DILR") {
      submissionJson.DILR[0][currentIndex].optionSelected = option;
    }

    console.log(submissionJson);
  };

  useEffect(() => {
    setDivCount(dataToUse.length);
  }, [dataToUse]);

  // fetchData();

  if (!loading) {
    return (
      <>
        (
        <>
          <div className="sequio__test" id="home">
            <div className="sequio__test-content">
              <div className="timer">
                <p>Time Left: {formatTime(timer)}</p>
              </div>
              <div className="sequio__test-content__container">
                <div
                  className="sequio__test-content__grid-container"
                  key={currentIndex}
                >
                  <div className="sequio__border-radius-left">
                    <h3>{currentSectionTitle}</h3>
                    <p className="sequio__test-content-p">
                      {/* {regexPattern.test(currentItem.Image1)} */}
                      {currentItem.Image1 && (
                        <img
                          src={convertDriveLink(currentItem.Image1)}
                          alt="Question Image"
                        />
                      )}{" "}
                      <p></p>
                      {currentItem.Image2 && (
                        <img
                          src={convertDriveLink(currentItem.Image2)}
                          alt="Question Image"
                        />
                      )}{" "}
                      <p></p>
                      {currentItem.Comp_body}
                    </p>
                  </div>
                  <div className="sequio__border-radius-center">
                    <h2 className="sequio__test-content-h2">
                      Question {currentItem.QuestionId}:
                    </h2>
                    <hr />
                    <br />
                    <h2 className="sequio__test-content-h2">
                      {currentItem.Question}:
                    </h2>
                    {currentItem.Opt_1 ||
                    currentItem.Opt_2 ||
                    currentItem.Opt_3 ||
                    currentItem.Opt_4 ? (
                      <>
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
                      </>
                    ) : (
                      <div>
                        <h4>Enter your answer here:</h4>
                        <textarea
                          placeholder="Your answer..."
                          value={selectedOption}
                          onChange={(e) =>
                            handleOptionSelectionTITA(e.target.value)
                          }
                        ></textarea>
                      </div>
                    )}
                  </div>
                  <div className="sequio__border-radius-right">
                    <div className="sequio__content-Question-sequence-container">
                      {divElements}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="sequio__navigation-btns"
                  disabled={currentIndex === 0}
                  onClick={currentIndex !== 0 ? handlePreviousClick : null}
                >
                  {/* <span
                    className="material-symbols-outlined icon-padding"
                    onClick={currentIndex !== 0 ? handlePreviousClick : null}
                  >
                    arrow_back_ios
                  </span> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    className="sequio__icon_btns"
                  >
                    <path
                      d="M0 9L9 18L10.4 16.5L3 9L10.4 1.5L9 0L0 9Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  className="sequio__navigation-btns"
                  disabled={currentIndex === dataToUse.length - 1}
                  onClick={
                    currentIndex !== dataToUse.length - 1
                      ? handleNextClick
                      : null}
                >
                  {/* <span
                    className="material-symbols-outlined icon-padding"
                    onClick={
                      currentIndex !== dataToUse.length - 1
                        ? handleNextClick
                        : null
                    } */}
                  {/* > */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none" className="sequio__icon_btns" >
<path d="M1.99998 0L0.599976 1.5L7.99998 9L0.599976 16.5L1.99998 18L11 9L1.99998 0Z" fill="black"/>
</svg>
                  {/* arrow_forward_ios  */}
                  {/* </span> */}
                </button>
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
          {showModal && currentSectionTitle === "DILR" && (
            <div className="modal">
              <div className="modal-content">
                <h2>Time's Up!</h2>
                <button>Go to Dashboard</button>
              </div>
            </div>
          )}
        </>
        )
      </>
    );
  }
  
}

export default Test;
