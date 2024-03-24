/* eslint-disable react/prop-types */
import './CardsContainer.css'
import Card from '../Card/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Cards(props) {
  console.log('showAll', props.showAll)


  return (
    <>
      <div className='cards-wrapper' style={ props.showAll ? {height : '100%'} : {}}>  
        <p className="title-text">{props.showAll ? `All cards: ${props.cards.length}`: 'Last added cards:'} </p>
        {props.showAll ? 
        <>
          <div className="columns-wrapper">
            <div className="column">
              {props.firstColumn.map(card => {
              return <Card 
                key={card.id} 
                deleteId={card.id} 
                id={card.item.id} 
                title={card.item.title}
                firstColumn={props.firstColumn}
                translation={card.item.translation}
                setFirstColumn={props.setFirstColumn}
                isFirstCol={true}
              />
            })}
            </div>
            <div className="column">
              {props.secondColumn.map(card => {
                return <Card 
                  key={card.id} 
                  deleteId={card.id} 
                  id={card.item.id} 
                  title={card.item.title} 
                  translation={card.item.translation}
                  secondColumn={props.secondColumn}
                  setSecondColumn={props.setSecondColumn}
                  isSecondCol={true}
                />
              })}
            </div>
          </div>
          
          <div className="button-next-wrapper">
            <FontAwesomeIcon className={` ${props.isFirst() ? 'disabled' : ''}`} 
              icon = {faChevronLeft} 
              onClick={() => props.previousCards()}
            />
            <FontAwesomeIcon className={`${props.isLast() ? 'disabled' : ''}`} 
              icon = {faChevronRight} 
              onClick={() => props.nextCards()}
            />
          </div>
          
        </>
      : 
      <div className="latest-cards-wrapper">
        { props.cards.map((card, i) => {
          if(i < 4) {
            return <Card key={card.id} 
              deleteId={card.id} 
              id={card.item.id} 
              title={card.item.title} 
              translation={card.item.translation}/>
          }
        })}
        
      </div>
      }
       <button onClick={props.showAllCards} className='show-all-cards-btn'>{!props.showAll ? 'Show all cards' : 'Show last added'} </button>
      </div>
     
    </>
  )
}
