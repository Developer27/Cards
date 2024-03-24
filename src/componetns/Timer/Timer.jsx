/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import './Timer.css';

export default function Timer(props) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isDisplay, setIsDisplay] = useState(true);
  const countToDate = new Date().setMinutes(new Date().getMinutes() + 1);

useEffect(() => {
  if(props.isRestartTimer) {
    setMinutes(0);
    setSeconds(0);
  }

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countToDate - now;
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    if((Math.floor((distance % (1000 * 60)) / 1000)) === 0) {
      setIsDisplay(false);
      props.setIsTimeOver(!props.isTimeOver)
    }
   
  },1000)

 if(!isDisplay) {
  clearInterval(timer)
} 
    return () => clearInterval(timer)
}, [isDisplay, props.isRestartTimer]);


  return (
    <div className="container">
      {isDisplay ? 
       <p className="minutes"> {minutes < 10? "0"+minutes : minutes}:{seconds < 10 ? "0"+seconds : seconds} </p>
       : 
       <p>Time is over!</p>
    } 
    </div>
  )
}
