let roundCount = 1;
let your =0
let comp =0
const ar =["ROCK","PAPER","SCESSIOR"]

const roundNo = document.querySelector('#roundNo')
const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scessior = document.querySelector('.scessior')
const yourChoice = document.querySelector('#yourChoice')
const computerChoice = document.querySelector('#computerChoice')
const roundWinner = document.querySelector('#winner')
const yourScore = document.querySelector('#yourScore')
const computerScore = document.querySelector('#computerScore')
const overallWinner = document.querySelector('#overallWinner')
const p = document.querySelector('.last')
const container = document.querySelector('.container')

let computer = 0
console.log(computer);

setupRound()

function setupRound(){
roundNo.innerHTML=roundCount
rock.removeAttribute('disabled')
paper.removeAttribute('disabled')
scessior.removeAttribute('disabled')

computer = (Math.floor(Math.random()*3))
console.log(computer);

}

rock.addEventListener('click',function(e){
play('ROCK',e)
})

paper.addEventListener('click',function(e){
play('PAPER',e)
})

scessior.addEventListener('click',function(e){
play('SCESSIOR',e)
})

function play(choice,e){
compareChoice(choice,computer)
yourChoice.innerHTML=e.target.innerHTML
computerChoice.innerHTML=ar[computer]
}

function compareChoice(u,c){
rock.setAttribute('disabled','')
paper.setAttribute('disabled','')
scessior.setAttribute('disabled','')

if(u===ar[c]){
    roundWinner.innerHTML='Tie'
}
else if((u==='ROCK' && c===2) || (u==='PAPER' && c===0) || (u=='SCESSIOR'&& c==1)){
  roundWinner.innerHTML='You'
  your++;
  yourScore.innerHTML=your
}
else{
    roundWinner.innerHTML='Computer'
    comp++;
    computerScore.innerHTML=comp
}

overallWinner.innerHTML=`Round left => ${5-roundCount}`
endRound()
}

function endRound(){
const button = document.createElement('button')
button.classList.add('lastButton')
button.innerHTML='Next Round'

container.appendChild(button)

button.addEventListener('click',function(e){
cleanUp()
button.remove()
})
}

function cleanUp(){
yourChoice.innerHTML=''
computerChoice.innerHTML=''
roundWinner.innerHTML=''

roundCount++;

if(roundCount>5){

showWinner()

const playButton =document.createElement('button')

playButton.innerHTML='Play Again'

playButton.classList.add('playButton')

container.appendChild(playButton)

playButton.addEventListener('click', function(){
allCleanup()
setupRound()
playButton.remove()
})

return
}

setupRound()
}

function showWinner(){
let win =''

if(your>comp) win='YOU'
else if(your<comp) win='COMPUTER'
else win='TIE'

overallWinner.innerHTML=win
}

function allCleanup(){
roundCount=1
your=0
comp=0

roundNo.innerHTML='1'
yourChoice.innerHTML=''
computerChoice.innerHTML=''
roundWinner.innerHTML=''
yourScore.innerHTML='0'
computerScore.innerHTML='0'
}

// isPlay is a state variable

// true  => allow user actions
// false => block user actions

// useful when:
// 1. waiting for next round
// 2. waiting for API response
// 3. game over
// 4. preventing double clicks

// disabled buttons = visual protection
// isPlay = logical protection

// many real projects use BOTH