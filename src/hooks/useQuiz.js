import { useState, useRef, useEffect } from "react";

import { data } from "@data/data.js";
import { useTimer } from "./useTimer";

export const useQuiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null),
    Option2 = useRef(null),
    Option3 = useRef(null),
    Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  const { time, start, reset: resetTimer } = useTimer(15, () => {
    setLock(true);
    optionArray[question.answer - 1].current.classList.add("correct");
  });

  const checkAnswer = (e, answer) => {
    if (!lock) {
      if (question.answer === answer) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.answer - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(false);

      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });

      resetTimer();
      start();
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    resetTimer();
    start();
  };

  useEffect(() => {
    start();
  }, [start]);

  return {
    index,
    question,
    score,
    result,
    optionArray,
    checkAnswer,
    next,
    reset,
    time,
    total: data.length,
  };
};
