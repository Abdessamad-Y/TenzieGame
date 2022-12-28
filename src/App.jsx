import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import Dice from './Componenets/dice'
import { nanoid } from 'nanoid' 
import Confetti from 'react-confetti'

function App() {
  const [dice,setDice] = useState(allnewDice())
  const [tenzies,setTenzies] = useState(false)

  useEffect( function(){
    const allHeld = dice.every(dice=>dice.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(dice=>dice.value === firstValue)
    if(allHeld && sameValue){
      setTenzies(true)
    }},
    [dice])

  function newDiceGenerator(){
    const newDice = {
      id:nanoid(),
      value:Math.ceil(Math.random()*6),
      isHeld:false}
      return newDice
  }

  function allnewDice(){
    const newDice = []
    for(let i = 0; i <10;i++){
      newDice.push(newDiceGenerator())
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld ? die : newDiceGenerator()
    }))}else{
      setTenzies(false)
      setDice(allnewDice())
    }
    
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

  const diceElement = dice.map(i=>
  <Dice key = {i.id}
   value ={i.value} 
   isHeld = {i.isHeld} 
   holdDice = {()=>holdDice(i.id)}/>)


  
  return (
    <main className='game-body'>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. 
    Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement} 
      </div>
      <button className='dice-button' onClick={rollDice}><h2>{tenzies?'Play Again':'Roll'}</h2></button>
    </main>
  )
}

export default App
