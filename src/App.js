import React, { useEffect, useState } from 'react'
import './App.css';
import { SingleCard } from './components/singleCard/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceTwo(null)
    setChoiceOne(null)
    setCards(shuffledCards)
    setTurns(0)  
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare the choices  
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if(card.src === choiceTwo.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        choiceOne.matched = true
        choiceTwo.matched = true
        resetTurn()
      } else {
        
        setTimeout(() => {
          resetTurn()
        }, 1000);
        
      }      
    }
    
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prev) => prev + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  },[])
  

  return (
    <div className="App">
      <h1>Memory Magic</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (   
                
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={
                card === choiceOne || 
                card === choiceTwo || 
                card.matched
              }
              disabled={disabled}
            />
          
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
