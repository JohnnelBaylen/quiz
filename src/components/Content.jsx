import React from "react";

import { useQuiz } from "@hooks/useQuiz";

const Content = () => {
  const {
    index,
    question,
    score,
    result,
    optionArray,
    checkAnswer,
    next,
    reset,
    time,
    total,
  } = useQuiz();

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />

      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>

          <div className="timer">⏳ Time Left: {time}s</div>

          <ul>
            <li ref={optionArray[0]} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={optionArray[1]} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={optionArray[2]} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={optionArray[3]} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          <div className="coverage">
            {index + 1} of {total} Questions
          </div>
        </>
      ) : (
        <>
          <h2 className="score">
            Score : {score} out of {total}
          </h2>
          <button onClick={reset}>Restart</button>
        </>
      )}
    </div>
  );
};

export default Content;
