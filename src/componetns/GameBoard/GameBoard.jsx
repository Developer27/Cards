/* eslint-disable react/prop-types */
import './GameBoard.css';
import Card from '../Card/Card';
import { useEffect, useRef, useState } from 'react';
import Timer from '../Timer/Timer';

export default function GameBoard(props) {
  const [isStart, setIsStart] = useState(false);
  
  const [answer, setAnswer] = useState('');
  const [cardsLeft, setCardsLeft] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [cloneCards, setCloneCards] = useState([]);
  const [randomCard, setRandomCard] = useState({});
  const [isOver, setIsOver] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(0);
  const progressRef = useRef(null);
  const btnRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRestartTimer, setIsRestartTimer] = useState(false);
  
  useEffect(() => {
    setCloneCards([...props.cards]);
    setTimerStyles(); 
  }, [props.cards])

  useEffect(() => {
    setCardsLeft(cloneCards.length)
  }, [cloneCards.length])

  useEffect(() => {
    if(isOver === props.cards.length) {
      setIsGameOver(!isGameOver);
    }
      getRandomCard(); 
      if(cloneCards.length !== 0) {
        setIsLoading(false);
        
      } 
  }, [cloneCards.length])
   
  function resetStates() {
    setCloneCards([...props.cards]);
    setCardsLeft(cloneCards.length);
    setCorrectAnswers(0);
    setProgress(0);
  }
   
  function startGame() {
    if(isOver  >= 1) {
      setIsRestartTimer(!isRestartTimer);
      setIsOver(0);
      if(isOver === props.cards.length) {
        setIsGameOver(!isGameOver);
      }
      setIsLoading(!isLoading);
      if(!isLoading) {
        setTimeout(() => {
          progressRef.current.setAttribute('role', 'progressbar');
          progressRef.current.setAttribute('aria-valuenow', 0);
          progressRef.current.setAttribute('aria-live', 'polite');
          progressRef.current.style.setProperty('--progress', 0 + '%');
        })
      }
      
    
      resetStates();
      
   
     
    } else {
      setIsStart(!isStart);
      if(isTimeOver) {
        setIsTimeOver(!isTimeOver)
      }
      
      setResult(Math.ceil((1 / cloneCards.length) * 100));
      setTimerStyles();

    }
  }

function setTimerStyles() {
  setTimeout(() => {
    progressRef.current.setAttribute('role', 'progressbar');
    progressRef.current.setAttribute('aria-valuenow', 0);
    progressRef.current.setAttribute('aria-live', 'polite');
    progressRef.current.style.setProperty('--progress', 0 + '%');
  })
}
    
function getRandomCard() {
  setRandomCard(cloneCards[calcRandom()]); 
}

function calcRandom() {
  return Math.floor(Math.random() * ((cloneCards.length-1) - 0 + 1) + 0);
}
  
function checkAnswer() {
  console.log( randomCard.item.translation)
  const card = document.getElementsByClassName('flip-card')[0];
  if(answer === randomCard.item.translation) {
    setProgress(progress + result)
    setIsOver(isOver+1);
    card.classList.add('glow', 'correct');
    btnRef.current.setAttribute('disabled', true)
    if((progress + result) >= 100) {
      progressRef.current.setAttribute('aria-valuenow', 100)
      progressRef.current.style.setProperty('--progress', 100 + '%');
    } else {
      progressRef.current.setAttribute('aria-valuenow', (progress + result))
      progressRef.current.style.setProperty('--progress', (progress + result) + '%');
    }
    
    setTimeout(() => {
      card.classList.remove('glow', 'correct');
      setCloneCards(cloneCards.filter(e => e.id !== randomCard.id));
      setCorrectAnswers(prevCorrectAnswer => prevCorrectAnswer + 1);
      setAnswer('');
      btnRef.current.removeAttribute('disabled')
    }, 1000)
  } else {
    card.classList.add('glow', 'wrong');
    setTimeout(() => {
      card.classList.remove('glow', 'wrong');
    }, 1000)
  }
}


  return (
    <div className='game-board-wrapper'>
      <div className="game-btn-wrapper">
        <button onClick={startGame} className="start-game-btn"> {!isStart ? 'Start' : 'Restart' }</button>
      </div>
          <div className='game-board'> 
           
             {!isGameOver ?  
              !isTimeOver ? 
              <>
                <div className="display-card-wrapper">
               <div>Time left:<Timer isRestartTimer={isRestartTimer} setIsTimeOver={setIsTimeOver} isTimeOver={isTimeOver}/></div> 
                {!isLoading ? 
                  <Card
                    title={randomCard.item.title}
                    translation={randomCard.item.translation}
                    id={randomCard.item.id} 
                    isGame={true}
                    isGameCard={true}
                  /> 
                : <p>Loading</p>}
                  <div className="answer-wrapper">
                    <input type="text" className='answer-input' 
                      placeholder='Type translation to the word...' 
                      onChange={(e) => setAnswer(e.target.value)}
                      value={answer}
                    />
                    
                    <button ref={btnRef} onClick={checkAnswer}  className={`${!isStart ? 'disabled' : ''} answer-btn`}>Answer</button>
                  </div>
                </div>
                <div className="counts-wrraper">
             
                  <div ref={progressRef} className="progressbar"></div>
                  <p className="correct-answers">Correct answers: {correctAnswers}</p>
                  <p className="correct-answers">Cards left: {cardsLeft}</p>
                </div> 
            </> : <p>Time is over</p>
          : <p>The game is over!</p> }
          </div>
        </div>  
  )
}


