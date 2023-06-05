import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../asset/homepage.css";
import { Link } from "react-router-dom";
import Stopwatch from "./Stopwatch";
import Header from "./Header";

function Homepage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizTimer, setQuizTimer] = useState(0);
  const [restartQuiz, setRestartQuiz] = useState(false);
  const [wrong, setWrong] = useState(null);
  const [inputs, setInputs] = useState("");
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8085/api/get-questions").then((res) => {
      console.log(res);
      setQuestions(res.data.data);
    });
  }, []);

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setStartTimer(true);
    setQuizTimer(0);
    setRestartQuiz(true);
  };

  const handleStart = () => {
    setStartTimer(true);
  };
  const handleStopwatchFinish = (time) => {
    setStartTimer(false);
    setShowResult(true);
    setQuizTimer(time);
  };

  const handleFinish = () => {
    return (
      <>
        <p>Time complete: {quizTimer}</p>
      </>
    );
  };

  const renderAnswer = () => {
    if (showAnswer == true) {
      if (questions.length > 0 && current <= questions.length) {
        return questions.map((value) => {
          return (
            <>
              <tr>
                <td>Question : {value.question}</td>
                <td>
                  Answer :{" "}
                  {value.answerCorrect == 1
                    ? value.answer1
                    : value.answerCorrect == 2
                    ? value.answer2
                    : value.answerCorrect == 3
                    ? value.answer3
                    : value.answer4}
                </td>
              </tr>
            </>
          );
        });
      }
    } else {
      return null;
    }
  };
  const renderSelected = () => {
    if (showAnswer === true) {
      console.log(answer);
      if (Object.keys(answer).length > 0) {
        return Object.keys(answer).map((key) => {
          console.log(answer[key]);
          return (
            <tr>
              <td>Selected answer: {answer[key].ans}</td>
            </tr>
          );
        });
      }
    } else {
      return null;
    }
  };

  const renderQuestion = () => {
    if (questions.length > 0 && current < questions.length) {
      return (
        <>
          <Stopwatch
            start={handleStart}
            active={startTimer}
            onFinish={handleStopwatchFinish}
            onTick={setQuizTimer}
            key={restartQuiz}
          />
          <h1 style={{ color: "white" }}>Test Quiz</h1>
          <h3 style={{ color: "white" }}>Current Score {score}</h3>
          <div className="testquiz-content">
            <h2>
              Question {current + 1} out of {questions.length}
            </h2>
            <p>{questions[current].question}</p>
            <ul>
              <li
                value="1"
                onClick={(e) => {
                  if (check == false) {
                    checkAnswer(
                      questions[current].id,
                      e,
                      questions[current].answer1
                    );
                  }
                }}
              >
                {questions[current].answer1}
              </li>
              <li
                value="2"
                onClick={(e) => {
                  if (check == false) {
                    checkAnswer(
                      questions[current].id,
                      e,
                      questions[current].answer2
                    );
                  }
                }}
              >
                {questions[current].answer2}
              </li>
              <li
                value="3"
                onClick={(e) => {
                  if (check == false) {
                    checkAnswer(
                      questions[current].id,
                      e,
                      questions[current].answer3
                    );
                  }
                }}
              >
                {questions[current].answer3}
              </li>
              <li
                value="4"
                onClick={(e) => {
                  if (check == false) {
                    checkAnswer(
                      questions[current].id,
                      e,
                      questions[current].answer4
                    );
                  }
                }}
              >
                {questions[current].answer4}
              </li>
            </ul>
            {wrong == false ? (
              <p style={{ color: "red" }}>Bạn đã trả lời sai</p>
            ) : wrong == null ? null : (
              <p>Chúc mừng bạn làm đúng</p>
            )}
            <button
              style={{ padding: "20px 40px", borderRadius: 10, marginTop: 10 }}
              onClick={() => continueTest()}
            >
              Next
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Stopwatch active={false} />
          <h1 style={{ color: "white" }}>Test Quiz</h1>
          <h3 style={{ color: "white" }}>Current Score {score}</h3>
          <div className="testquiz-content" style={{ lineHeight: 2 }}>
            <h1>Final Results</h1>
            <p style={{ marginBottom: 30, color: "#e8ef17" }}>
              You got {score} out of {questions.length} correct
            </p>
            {handleFinish()}
            {score > questions.length / 2 ? (
              <>
                <p>Congratulations on passing the test</p>
              </>
            ) : (
              <>
                <p>Wish you luck next time</p>
              </>
            )}
            <button
              style={{ marginTop: 20 }}
              onClick={() => {
                restart();
                setShowAnswer(false);
              }}
              className="restart"
            >
              Retry
            </button>
            <button
              style={{ marginTop: 20 }}
              onClick={() => {
                setShowAnswer(true);
              }}
              className="repeatTest"
            >
              See the answer
            </button>
            {showAnswer == true ? (
              <>
                <div className="table-container">
                  <table className="table-answer">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Answer</th>
                      </tr>
                    </thead>
                    <tbody>{renderAnswer()}</tbody>
                  </table>

                  <table className="table-answer">
                    <thead>
                      <tr>
                        <th>Selected answer</th>
                      </tr>
                    </thead>
                    <tbody>{renderSelected()}</tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </>
      );
    }
  };
  const checkAnswer = (id, e, ans) => {
    let answer = e.target.value.toString();
    const filteredQuestions = questions.filter((value) => value.id === id);
    if (filteredQuestions[0].answerCorrect === answer) {
      setCheck(true);
      setInputs((state) => ({ ...state, [id]: answer }));
      setWrong(true);
      setAnswer((prev) => ({
        ...prev,
        [id]: { ans, answer },
      }));
    } else {
      setCheck(true);
      setInputs((state) => ({ ...state, [id]: answer }));
      setWrong(false);
      setAnswer((prev) => ({
        ...prev,
        [id]: { ans, answer },
      }));
    }
  };
  const continueTest = () => {
    if (wrong == true) {
      setScore(score + 1);
      setCurrent(current + 1);
      setWrong(null);
      setCheck(false);
    } else if (wrong == false) {
      setScore(score + 0);
      setCurrent(current + 1);
      setWrong(null);
      setCheck(false);
    }
  };
  return (
    <div className="container">
      <Header />
      {show == false ? (
        <>
          {showTime == true ? (
            <Stopwatch active={startTimer} onFinish={handleStopwatchFinish} />
          ) : null}
          <div className="formTest">
            <div className="create">
              <Link to="/test">
                <button
                  className="initialization"
                  onClick={() => {
                    setShow(true);
                    setStartTimer(true);
                    setShowTime(true);
                  }}
                >
                  Start
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="testquiz">
          {restartQuiz ? (
            <div key={restartQuiz}>
              {setRestartQuiz(false)}
              {renderQuestion()}
            </div>
          ) : (
            renderQuestion()
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;
