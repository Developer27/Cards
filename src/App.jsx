import CardsContainer from "./componetns/CardsContainer/CardsContainer"
import AddForm from "./componetns/AddForm/AddForm"
import './App.css';
import { useEffect, useState } from "react"
import NavBar from "./componetns/NavBar/NavBar";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {db} from './firebase';
import GameBoard from "./componetns/GameBoard/GameBoard";
import { Route, Routes } from "react-router-dom";

const q = query(collection(db, 'cards'), orderBy('timestamp', 'desc'));

function App() {
  const [showAll, setShowAll] = useState(false);
  const [cards, setCards] = useState([]);
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(4);
  const [thirdValue, setThirdValue] = useState(8);
  const [page, setPage] = useState(1);
  const [isGame, setIsGame] = useState(false);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setCards(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })
  }, []);

  function isFirst() {
  return page === 1;
} 

function isLast() {
  return thirdValue >= cards.length;
}

function showAllCards() {
    setShowAll(!showAll);
    setFirstColumn(cards.slice(firstValue,secondValue));
    setSecondColumn(cards.slice(secondValue,thirdValue)); 
  }

  function nextCards() {
    setColumns('increment');
    setFirstColumn(cards.slice(firstValue+8,secondValue+8));
    setSecondColumn(cards.slice(secondValue+8,thirdValue+8));
    setPage(prevPage => prevPage+1); 
  }

  function previousCards() {
    setColumns('decrement')
    setFirstColumn(cards.slice(firstValue-8,secondValue-8));
    setSecondColumn(cards.slice(secondValue-8,thirdValue-8));
    setPage(prevPage => prevPage-1);
  }

  function setColumns(action) {
    if(action === 'increment') {
      setFirstValue(firstValue+8);
      setSecondValue(secondValue+8);
      setThirdValue(thirdValue+8);
    }
    if(action === 'decrement') {
      setFirstValue(firstValue-8);
      setSecondValue(secondValue-8);
      setThirdValue(thirdValue-8);
    }
  }

  function setGameHandler() {
    console.log('set')
    setIsGame(!isGame);
  }

  return (
    <div className="wrapper">
      <NavBar  setIsGame={setIsGame} isGame={isGame} setGameHandler={setGameHandler}/>
      <Routes>
        <Route path="/" element ={ 
          <>
            {!showAll ? <AddForm /> : ''}
            <CardsContainer 
              showAllCards={showAllCards}
              cards={cards} 
              firstColumn={firstColumn} 
              secondColumn={secondColumn} 
              showAll={showAll} 
              nextCards={nextCards} 
              previousCards={previousCards} 
              isLast={isLast} 
              isFirst={isFirst}
              setFirstColumn={setFirstColumn}
              setSecondColumn={setSecondColumn}
            />
          </>}
        />
        <Route path="/train" element={<GameBoard cards={cards}/>}/>
      </Routes>
    </div>
  )
}

export default App
