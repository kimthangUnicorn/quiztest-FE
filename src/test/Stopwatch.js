import React, { useState, useEffect } from "react";

const Stopwatch = ({ start, active, onFinish, onTick, key }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;

    if (active) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          onTick(newTimer);
          return newTimer;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      if (onFinish) {
        onFinish(timer);
      }
    }

    return () => clearInterval(interval);
  }, [active, onFinish, timer, onTick, key]);

  useEffect(() => {
    if (key) {
      setTimer(0); 
    }
  }, [key]);

  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="app">
      <h3 style={{color:"white"}}>Thời gian</h3>
      <div className="stopwatch-card">
        <p style={{color:"white"}}>{formatTime(timer)}</p>
      </div>
    </div>
  );
};

export default Stopwatch;
