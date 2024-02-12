import "./Quiz.css";
import { useState, useRef, useEffect } from "react";
import { data } from "../../assets/data";

const Quiz = () => {
  const timerDuration = 20;  
  const pointsPerQuestion = 20;  
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [timeLeft, setTimeLeft] = useState(timerDuration);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + pointsPerQuestion);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  // next que
  const nextQuestion = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      setTimeLeft(timerDuration);
      option_array.forEach((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("incorrect");
      });
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimeLeft(timerDuration);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0 && !lock) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, lock]);

  return (
    <div className="container">
      <h1> Quiz Application</h1>
      <div className="timer-container">
        <div className="progress-bar" style={{ width: `${(timeLeft / timerDuration) * 100}%` }}></div>
        <div className="time-left"> timeleft  {timeLeft}</div> {}
      </div>

      

      {result ? (
        <>
          <h2>
            quiz finished. <br />
            your score {score} out of {data.length * pointsPerQuestion} points
          </h2>
          <button onClick={resetQuiz}>RESET</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion}>Next Que</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;


