let randomNumber = Math.floor(Math.random()*100)+1
const inputFeild = document.getElementById('guessField')
const submit = document.getElementById('sbt')
const prevGuess = document.querySelector('#prevGuesses')
const remainingGuess = document.querySelector('#guessRemaining')
const msg = document.querySelector('.message')

let noOfGuess=1
let prev =[]
const p = document.createElement('p')
let playGame = true

if(playGame){
   submit.addEventListener('click',function (e){
     e.preventDefault()
     const input = parseInt(inputFeild.value)
     console.log(input);
     validInput(input)
   })
}

function validInput(input){
    if(isNaN(input)){
        alert("Only numbers are allowed")
        return
    }
    if(input<1){
        alert("Input less than 1 is not allowed")
        return
    }
    else if(input>100){
        alert("Input greater than 100 is not allowed")
        return
    }
    else{
         prev.push(input)
         if(noOfGuess==10){
            displayGuess(input)
            displayMessage(`Khel khatam beta , Number was ${randomNumber}`)
            endGame()
         }
         else{
            displayGuess(input)
            checkGuess(input)
         }
    }

}
function checkGuess(input){
   if(input===randomNumber){
     displayMessage('you Guessed it right')
     endGame()
   }
   else if(input>randomNumber){
    displayMessage('Number is lower')
   }
   else if(input<randomNumber){
    displayMessage('Number is Higher')
   }
}
function displayGuess(guess){
    inputFeild.value=''
    prevGuess.innerHTML+=`${guess}  `  
    noOfGuess++;
    remainingGuess.innerHTML=`${10 - noOfGuess}`
}
function displayMessage(message){
     msg.innerHTML=`${message}`
}
function endGame(){

   inputFeild.value = ''

   inputFeild.setAttribute('disabled','')

   playGame = false

   p.classList.add('button')

   p.innerHTML = '<h2 id="newGame">Start New Game</h2>'

   document.querySelector('.result').appendChild(p)

   startGame()
}
function startGame(){

   const newGameButton = document.querySelector('#newGame')

   newGameButton.addEventListener('click', function(){

      randomNumber = Math.floor(Math.random()*100) + 1

      noOfGuess = 1

      prev = []

      prevGuess.innerHTML = ''

      remainingGuess.innerHTML = '10'

      msg.innerHTML = ''

      inputFeild.removeAttribute('disabled')

      p.remove()

      playGame = true

   })

}
