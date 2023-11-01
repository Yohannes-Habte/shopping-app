import React, { useEffect, useState } from 'react';

const CountDown = () => {
  // calculateTimeLeft is a function
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Use Effect Hook
  useEffect(() => {
    // setTimeout function
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date('2023-11-04') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Timer components
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span style={{color: "red"}}>
        {timeLeft[interval]} {interval}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span> Time is up!</span>}
    </div>
  );
};

export default CountDown;
