import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
// import chart from '../../assests/lineChart.png';

function Header() {
  const [responseJsonData, setResponseJsonData] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [averageWoW, setAverageWoW] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [wrongAnswered, setWrongAnswered] = useState(0);
  const loggedinuserid = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn == "false") {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const send_id_url = "http://127.0.0.1:5000/dashboard/send_userid";

    const fetchData = async () => {
      try {
        const response = await fetch(send_id_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: loggedinuserid }),
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
  }, []);

  useEffect(() => {
    const apiURL = `http://127.0.0.1:5000/dashboard/test_data`;

    (async () => {
      try {
        console.log("fetching data");
        const response = await fetch(apiURL);

        if (!response.ok) {
          console.log("Loading responseJsonData failed");
          throw new Error("Request failed");
        }
        const data = await response.json();
        setResponseJsonData(data);
        console.log(data);
        console.log("Fetched Successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(responseJsonData).length === 0) {
      // Empty object - Default scenario - skip it
      return;
    }
    setPercentage(
      responseJsonData[responseJsonData.length - 3].percentagecorrect
    );
    setAverageWoW(responseJsonData[responseJsonData.length - 2].average_growth);
    setTotalScore(responseJsonData[responseJsonData.length - 3].finalscore);
    console.log("Loaded data successfully!");
  }, [responseJsonData]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard/get_image")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("There was a problem fetching the image:", error);
      });
  }, []);

  function calculatePercentage(apiResponse) {
    let correctAnswersCount = 0;
    let totalQuestionsCount = 0;

    apiResponse[0].responses.forEach((response) => {
      totalQuestionsCount++;

      if (response.score === 3) {
        correctAnswersCount++;
      }
    });

    const percentage = (correctAnswersCount / totalQuestionsCount) * 100;

    return percentage;
  }

  return (
    <>
      <div className="sequio__dashboard section__padding" id="home">
        <div className="sequio__dashboard-content">
          <div className="sequio__dashboard-content-container">
            <div class="sequio__dashboard-content-container-grid-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="68"
                viewBox="0 0 66 68"
                fill="none"
              >
                <path
                  d="M44 31.1666C48.565 31.1666 52.2225 27.37 52.2225 22.6666C52.2225 17.9633 48.565 14.1666 44 14.1666C39.435 14.1666 35.75 17.9633 35.75 22.6666C35.75 27.37 39.435 31.1666 44 31.1666ZM22 31.1666C26.565 31.1666 30.2225 27.37 30.2225 22.6666C30.2225 17.9633 26.565 14.1666 22 14.1666C17.435 14.1666 13.75 17.9633 13.75 22.6666C13.75 27.37 17.435 31.1666 22 31.1666ZM22 36.8333C15.5925 36.8333 2.75 40.1483 2.75 46.75V53.8333H41.25V46.75C41.25 40.1483 28.4075 36.8333 22 36.8333ZM44 36.8333C43.2025 36.8333 42.295 36.89 41.3325 36.975C44.5225 39.355 46.75 42.5566 46.75 46.75V53.8333H63.25V46.75C63.25 40.1483 50.4075 36.8333 44 36.8333Z"
                  fill="white"
                />
              </svg>
              <p>{totalScore}</p>
              {/* <p>{responseJsonData.total_score} </p> */}
              <label>Last paper score</label>
            </div>
            <div class="sequio__dashboard-content-container-grid-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="68"
                viewBox="0 0 66 68"
                fill="none"
              >
                <path
                  d="M52.25 8.50004H40.755C39.6 5.21337 36.575 2.83337 33 2.83337C29.425 2.83337 26.4 5.21337 25.245 8.50004H13.75C10.725 8.50004 8.25 11.05 8.25 14.1667V53.8334C8.25 56.95 10.725 59.5 13.75 59.5H52.25C55.275 59.5 57.75 56.95 57.75 53.8334V14.1667C57.75 11.05 55.275 8.50004 52.25 8.50004ZM33 8.50004C34.5125 8.50004 35.75 9.77504 35.75 11.3334C35.75 12.8917 34.5125 14.1667 33 14.1667C31.4875 14.1667 30.25 12.8917 30.25 11.3334C30.25 9.77504 31.4875 8.50004 33 8.50004ZM27.5 48.1667L16.5 36.8334L20.3775 32.8384L27.5 40.1484L45.6225 21.4767L49.5 25.5L27.5 48.1667Z"
                  fill="white"
                />
              </svg>
              {console.log("AVERAGEWOW_____", averageWoW)}
              <p>{averageWoW}%</p>
              <label>Week - Week growth</label>
            </div>
            <div class="sequio__dashboard-content-container-grid-item2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="67"
                height="68"
                viewBox="0 0 67 68"
                fill="none"
              >
                <path
                  d="M33.8777 62.2438C36.9057 62.2438 39.3831 59.7057 39.3831 56.6036H28.3723C28.3723 59.7057 30.8222 62.2438 33.8777 62.2438ZM50.394 45.3231V31.2225C50.394 22.5647 45.8795 15.317 38.0068 13.3993V11.4816C38.0068 9.14095 36.1625 7.25146 33.8777 7.25146C31.5929 7.25146 29.7486 9.14095 29.7486 11.4816V13.3993C21.8483 15.317 17.3614 22.5365 17.3614 31.2225V45.3231L11.856 50.9634V53.7835H55.8994V50.9634L50.394 45.3231Z"
                  fill="white"
                />
              </svg>
              <p>{percentage}%</p>
              <label>% correct answers</label>
            </div>
            <div class="sequio__dashboard-content-container-grid-item2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="68"
                viewBox="0 0 66 68"
                fill="none"
              >
                <path
                  d="M43.2575 8.5H22.7425L8.25 23.4317V44.5683L22.7425 59.5H43.2575L57.75 44.5683V23.4317L43.2575 8.5ZM33 49.0167C31.02 49.0167 29.425 47.3733 29.425 45.3333C29.425 43.2933 31.02 41.65 33 41.65C34.98 41.65 36.575 43.2933 36.575 45.3333C36.575 47.3733 34.98 49.0167 33 49.0167ZM35.75 36.8333H30.25V19.8333H35.75V36.8333Z"
                  fill="white"
                />
              </svg>
              <p>{48 - totalScore}</p>
              <label>Incorrect Answers</label>
            </div>
          </div>

          <div className="sequio__dashboard-content-container2">
            <div class="sequio__dashboard-content-container2-grid-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 45 34"
                fill="none"
              >
                <path
                  d="M30 15.5833C33.1125 15.5833 35.6063 13.6849 35.6063 11.3333C35.6063 8.98159 33.1125 7.08325 30 7.08325C26.8875 7.08325 24.375 8.98159 24.375 11.3333C24.375 13.6849 26.8875 15.5833 30 15.5833ZM15 15.5833C18.1125 15.5833 20.6062 13.6849 20.6062 11.3333C20.6062 8.98159 18.1125 7.08325 15 7.08325C11.8875 7.08325 9.375 8.98159 9.375 11.3333C9.375 13.6849 11.8875 15.5833 15 15.5833ZM15 18.4166C10.6313 18.4166 1.875 20.0741 1.875 23.3749V26.9166H28.125V23.3749C28.125 20.0741 19.3687 18.4166 15 18.4166ZM30 18.4166C29.4562 18.4166 28.8375 18.4449 28.1812 18.4874C30.3562 19.6774 31.875 21.2783 31.875 23.3749V26.9166H43.125V23.3749C43.125 20.0741 34.3688 18.4166 30 18.4166Z"
                  fill="white"
                />
              </svg>
              <p>Quant</p>
            </div>
            <div class="sequio__dashboard-content-container2-grid-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 51 39"
                fill="none"
              >
                <path
                  d="M40.375 4.875H31.4925C30.6 2.99 28.2625 1.625 25.5 1.625C22.7375 1.625 20.4 2.99 19.5075 4.875H10.625C8.2875 4.875 6.375 6.3375 6.375 8.125V30.875C6.375 32.6625 8.2875 34.125 10.625 34.125H40.375C42.7125 34.125 44.625 32.6625 44.625 30.875V8.125C44.625 6.3375 42.7125 4.875 40.375 4.875ZM25.5 4.875C26.6688 4.875 27.625 5.60625 27.625 6.5C27.625 7.39375 26.6688 8.125 25.5 8.125C24.3312 8.125 23.375 7.39375 23.375 6.5C23.375 5.60625 24.3312 4.875 25.5 4.875ZM21.25 27.625L12.75 21.125L15.7463 18.8337L21.25 23.0262L35.2537 12.3175L38.25 14.625L21.25 27.625Z"
                  fill="white"
                />
              </svg>
              <p>VARC</p>
            </div>
            <div class="sequio__dashboard-content-container2-grid-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 60 41"
                fill="none"
              >
                <path
                  d="M30.0867 36.8318C32.7993 36.8318 35.0186 35.3513 35.0186 33.5417H25.1547C25.1547 35.3513 27.3495 36.8318 30.0867 36.8318ZM44.8825 26.9614V18.736C44.8825 13.6857 40.8384 9.45783 33.7857 8.33918V7.22054C33.7857 5.85513 32.1335 4.75293 30.0867 4.75293C28.0399 4.75293 26.3877 5.85513 26.3877 7.22054V8.33918C19.3104 9.45783 15.2908 13.6692 15.2908 18.736V26.9614L10.3589 30.2515V31.8966H49.8145V30.2515L44.8825 26.9614Z"
                  fill="white"
                />
              </svg>
              <p>DI LR</p>
            </div>
          </div>

          <div class="sequio__dashboard-content-container3">
            <div class="sequio__dashboard-content-container-grid3-item">
              <p>WoW score growth</p>

              <div>
                {imageUrl && <img src={imageUrl} alt="Generated Image" id="performance_graph" />}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
