import { useEffect, useState } from "react";
import "../asset/newtest.css";
import axios from "axios";
import { Link } from "react-router-dom";
function NewTest() {
  const [question, setQuestion] = useState([]);
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {});
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const addQuestion = (e) => {
    e.preventDefault();
    let error = {};
    let flag = true;
    if (
      inputs.question === undefined ||
      inputs.question === "" ||
      inputs.question == null
    ) {
      flag = false;
      error.question = "You have not entered a question";
    }
    if (
      inputs.answer1 == null ||
      inputs.answer1 === "" ||
      inputs.answer1 === undefined
    ) {
      flag = false;
      error.answer1 = "You have not entered your answer 1";
    }
    if (
      inputs.answer2 == null ||
      inputs.answer2 === undefined ||
      inputs.answer2 === ""
    ) {
      flag = false;
      error.answer2 = "You have not entered your answer 2";
    }
    if (
      inputs.answer3 == null ||
      inputs.answer3 === undefined ||
      inputs.answer3 === ""
    ) {
      flag = false;
      error.answer3 = "You have not entered your answer 3";
    }
    if (
      inputs.answer4 == null ||
      inputs.answer4 === undefined ||
      inputs.answer4 === ""
    ) {
      flag = false;
      error.answer4 = "You have not entered your answer 4";
    }
    if (
      inputs.answerCorrect == null ||
      inputs.answerCorrect === undefined ||
      inputs.answerCorrect === ""
    ) {
      flag = false;
      error.answerCorrect = "You have not entered the correct answer";
    }
    if (!flag) {
      setErrors(error);
    } else {
      alert("You have successfully added your question");
      setQuestion([...question, inputs]);
      setInputs({
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answerCorrect: "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8085/api/create-question", question)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode === 0) {
          alert("The test has been saved ");
        }
      });
  };

  return (
    <>
      {/* {show == true ? <ModalAllQues show={true}/> : null} */}
      <div className="formTest">
        <form onSubmit={handleSubmit}>
          <div className="question">
            <textarea
              id="question_input"
              placeholder="Enter question..."
              name="question"
              value={inputs.question}
              onChange={handleInput}
            ></textarea>
            <div className="fbutton">
              <button className="fbutton btn-create" onClick={addQuestion}>
                Create more
              </button>
              <button className="fbutton btn-submit" type="submit">
                Completed
              </button>
              <Link to="/listques">
                <button style={{textDecoration:"none"}} className="fbutton btn-submit">Question created</button>
              </Link>
            </div>
          </div>
          <p style={{ color: "red", marginBottom: 20, marginLeft: 15 }}>
            {errors.question}
          </p>
          <div className="answer">
            <ul>
              <li style={{ background: "#2d70ae", width: "23%" }}>
                <div>
                  <input
                    type="radio"
                    name="answerCorrect"
                    style={{ transform: "scale(1.5)" }}
                    value="1"
                    onChange={handleInput}
                  ></input>
                  <textarea
                    onChange={handleInput}
                    style={{
                      background: "#2d70ae",
                      border: "5px solid #2d80ae",
                    }}
                    wrap="physical"
                    placeholder="Enter answer 1"
                    name="answer1"
                    value={inputs.answer1}
                  ></textarea>
                  <p style={{ color: "red" }}>{errors.answer1}</p>
                </div>
              </li>
              <li style={{ background: "#2d9da6", width: "23%" }}>
                <div>
                  <input
                    type="radio"
                    name="answerCorrect"
                    style={{ transform: "scale(1.5)" }}
                    value="2"
                    onChange={handleInput}
                  ></input>
                  <textarea
                    onChange={handleInput}
                    style={{
                      background: "#2d9da6",
                      border: "5px solid #2daea6",
                    }}
                    placeholder="Enter answer 2"
                    name="answer2"
                    value={inputs.answer2}
                  ></textarea>
                  <p style={{ color: "red" }}>{errors.answer2}</p>
                </div>
              </li>
              <li style={{ background: "#efa929", width: "23%" }}>
                <div>
                  <input
                    type="radio"
                    name="answerCorrect"
                    style={{ transform: "scale(1.5)" }}
                    value="3"
                    onChange={handleInput}
                  ></input>
                  <textarea
                    onChange={handleInput}
                    style={{
                      background: "#efa929",
                      border: "5px solid #ffaa29",
                    }}
                    placeholder="Enter answer 3"
                    name="answer3"
                    value={inputs.answer3}
                  ></textarea>
                  <p style={{ color: "red" }}>{errors.answer3}</p>
                </div>
              </li>
              <li style={{ background: "#d5546d", width: "23%" }}>
                <div>
                  <input
                    type="radio"
                    name="answerCorrect"
                    style={{ transform: "scale(1.5)" }}
                    value="4"
                    onChange={handleInput}
                  ></input>
                  <textarea
                    onChange={handleInput}
                    style={{
                      background: "#d5546d",
                      border: "5px solid #e5546d",
                    }}
                    placeholder="Enter answer 4"
                    name="answer4"
                    value={inputs.answer4}
                  ></textarea>
                  <p style={{ color: "red" }}>{errors.answer4}</p>
                </div>
              </li>
            </ul>
          </div>
          <p style={{ color: "red", marginTop: 20, marginLeft: 15 }}>
            {errors.answerCorrect}
          </p>
        </form>
      </div>
    </>
  );
}
export default NewTest;
