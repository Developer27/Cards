/* eslint-disable react/prop-types */
import { useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons'
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, doc } from 'firebase/firestore';
import {db} from '../../firebase';

export default function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  function flip() {
    const frontSide = document.getElementById(props.id);
    const backSide = document.getElementById(props.id+1);
    if(!isFlipped) {
      frontSide.classList.add('rotateFront');
      backSide.classList.add('rotateBack');
      setIsFlipped(!isFlipped);
    } else {
      frontSide.classList.remove('rotateFront');
      backSide.classList.remove('rotateBack');
      setIsFlipped(!isFlipped);
    }
  }

  function deleteCard() {
    if(props.isFirstCol) {
      deleteDoc(doc(db, "cards", props.deleteId));
      props.setFirstColumn(props.firstColumn.filter(card => card.id !== props.deleteId));
    } else if(props.isSecondCol) {
      deleteDoc(doc(db, "cards", props.deleteId));
      props.setSecondColumn(props.secondColumn.filter(card => card.id !== props.deleteId));
    } else {
      deleteDoc(doc(db, "cards", props.deleteId));
    }
  }

  return (
    <div className='card-wrapper' style={ props.isGameCard ? {width : '80%'} : {}}>
      <div  className={` ${props.isGame ? 'no-event' : ''} flip-card`}>
        <div onClick={flip} id={props.id} className='flip-card__front-side '>
          <p className='card-title'>{props.title}</p>
          {!props.isGame ? <FontAwesomeIcon className='close-icon' icon = {faClose} onClick={deleteCard}/> : ''} 
        </div>
        <div onClick={flip} id={props.id+1} className="flip-card__back-side">
          <p className='card-title'>{props.translation}</p>
          {!props.isGame ? <FontAwesomeIcon className='close-icon' icon = {faClose} onClick={deleteCard}/> : ''} 
        </div>
      </div>
      
    </div>
  )
}
