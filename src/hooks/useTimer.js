import { useState, useEffect, useCallback } from "react";

export const useTimer = (initialTime, onTimeOut) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setTime(initialTime);
    setIsActive(true);
  }, [initialTime]);

  const reset = useCallback(() => {
    setTime(initialTime);
    setIsActive(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    if (time === 0) {
      setIsActive(false);
      if (onTimeOut) onTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isActive, onTimeOut]);

  return { time, isActive, start, reset };
};
