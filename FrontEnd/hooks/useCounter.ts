import { useState, useEffect } from 'react';
const useCounter = (countTo: number, speed: number, start: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (start) {
      setCount(0);
      let tracker = 0;
      let timer = setInterval(() => {
        if (tracker === countTo) clearInterval(timer);
        else {
          setCount((prev) => prev + 1);
          tracker++;
        }
      }, speed);
    }
  }, [countTo, start]);

  return { count };
};

export default useCounter;
