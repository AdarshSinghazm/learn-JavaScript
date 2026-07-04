const paragraph = document.querySelector('.paragraph')
const userInput = document.querySelector('#input')
const timeLeft = document.querySelector('.timer')
const wpm = document.querySelector('.wpmScore')
const accuracy = document.querySelector('.accuracyScore')
const error = document.querySelector('.errorScore')
const startBtn = document.querySelector('.start')
const resetBtn = document.querySelector('.reset')
const progressBar = document.querySelector('.progressBar')
const durationOptions = document.querySelector('.durationOptions')
const toogleBtn = document.querySelector('.toggleMode')
const body = document.querySelector('body')
const progressFill = document.querySelector('.progressFill')

let timeRemaining = 30
let totalTime = 30
let timerValue
let errorCount = 0
let correctCount = 0
let accuracyPercentage = 0
let wpmScore = 0

let testRunning = false

const wordBank = [
  "the", "a", "an", "I", "you", "he", "she", "it", "we", "they",
  "is", "are", "was", "were", "be", "been", "am", "have", "has", "had",
  "do", "does", "did", "can", "could", "will", "would", "should", "may", "might",
  "go", "come", "run", "walk", "jump", "play", "work", "study", "learn", "read",
  "write", "type", "make", "take", "give", "find", "keep", "leave", "start", "stop",
  "look", "watch", "see", "hear", "know", "think", "feel", "want", "need", "like",
  "love", "help", "call", "tell", "ask", "use", "open", "close", "move", "turn",
  "today", "tomorrow", "yesterday", "morning", "afternoon", "evening", "night", "now", "later", "always",
  "never", "sometimes", "often", "again", "soon", "here", "there", "inside", "outside", "home",
  "school", "college", "office", "room", "house", "road", "park", "garden", "market", "city",
  "village", "country", "world", "family", "friend", "child", "parent", "teacher", "student", "people",
  "man", "woman", "boy", "girl", "baby", "dog", "cat", "bird", "fish", "tree",
  "flower", "grass", "sun", "moon", "star", "sky", "cloud", "rain", "wind", "water",
  "fire", "food", "fruit", "bread", "milk", "tea", "coffee", "rice", "apple", "banana",
  "book", "pen", "paper", "phone", "computer", "keyboard", "screen", "mouse", "table", "chair",
  "window", "door", "bag", "shirt", "shoe", "car", "bike", "bus", "train", "plane",
  "happy", "sad", "good", "bad", "best", "better", "big", "small", "long", "short",
  "high", "low", "old", "young", "new", "fast", "slow", "easy", "hard", "strong",
  "hot", "cold", "clean", "dirty", "rich", "poor", "right", "left", "first", "last",
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
];
function formatTime(totalSeconds){
    let mins = Math.floor(totalSeconds / 60)
    let secs = totalSeconds % 60
    return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`
}

durationOptions.addEventListener('click', function(e){
    if(testRunning) return
    if(!e.target.classList.contains('durationBtn')) return

    const allBtns = durationOptions.querySelectorAll('.durationBtn')
    allBtns.forEach(function(btn){ btn.classList.remove('active') })
    e.target.classList.add('active')

    if(e.target.textContent==='30'){
        timeRemaining=30
        totalTime=30
    }
    else if(e.target.textContent==='60'){
        timeRemaining=60
        totalTime=60
    }
    else if(e.target.textContent==='90'){
        timeRemaining=90
        totalTime=90
    }
    else if(e.target.textContent==='120'){
        timeRemaining=120
        totalTime=120
    }
    timeLeft.innerHTML = formatTime(timeRemaining)
    makeParaGraph(totalTime)
    renderParagraph()
})

let para = ''
function makeParaGraph(noOfWords){
    para = ''   // always reset first, so callers never need to remember to
    for(let i=0; i<noOfWords; i++){
        const num = Math.floor(Math.random()*200)
        para += wordBank[num] + " "
    }
}
makeParaGraph(totalTime)

function renderParagraph(){
    let text = para
    let html = ''
    for(let i=0; i<text.length; i++){
        html += `<span>${text[i]}</span>`
    }
    paragraph.innerHTML = html
}
renderParagraph()

startBtn.addEventListener('click', function(){
    startTest()
})
console.log(paragraph.textContent.length)
function startTest(){
    userInput.disabled=false
    userInput.focus()
    startBtn.disabled=true
    testRunning=true
    startTimer()
}

function startTimer(){
    timerValue = setInterval(function(){
        timeRemaining--
        timeLeft.innerHTML = formatTime(timeRemaining)
        if(timeRemaining==0){
            stopTimer()
            TestOver()
        }
    },1000)
}

let count=0
userInput.addEventListener('input', function(e){
    if(e.inputType === 'deleteContentBackward'){
        count--
        paragraph.children[count].style.color = ''
    } else {
        if(paragraph.children[count].textContent === e.data){
            paragraph.children[count].style.color = 'green'
        } else {
            paragraph.children[count].style.color = 'red'
        }
        count++
    }
    let percentTyped = (userInput.value.length / paragraph.textContent.length) * 100
    progressFill.style.width=percentTyped+"%"

    if(userInput.value.length >= paragraph.textContent.length){
        stopTimer()
        TestOver()
    }

    // NEW: auto-scroll to keep current typing position visible
    if(paragraph.children[count]){
        paragraph.children[count].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
})

function stopTimer(){
    clearInterval(timerValue)
}

function TestOver(){
    userInput.blur()
    userInput.disabled = true
    comparisonText()
}

function comparisonText(){
    const len = userInput.value.length
    for(let i=0;i<len;i++){
        if(userInput.value[i]===paragraph.children[i].textContent) {
            correctCount++
            paragraph.children[i].style.color = 'lightgreen'
        }
        else{
            paragraph.children[i].style.color = 'red'
            errorCount++
        }
    }
    calculateResult()
}

function calculateResult(){
    calculateWpm()
    calculateAccuracy()
    showResult()
}
function calculateWpm(){
    let secondsElapsed = totalTime - timeRemaining
    let minutesElapsed = secondsElapsed / 60
    if(minutesElapsed==0) return
    wpmScore = (correctCount/5)/minutesElapsed
}
function calculateAccuracy(){
    if(correctCount+errorCount == 0) return
    accuracyPercentage = (correctCount/(correctCount+errorCount))*100
}

function showResult(){
    wpm.innerHTML = Math.floor(wpmScore)
    accuracy.innerHTML = `${Math.floor(accuracyPercentage)}%`
    error.innerHTML = Math.floor(errorCount)
}

resetBtn.addEventListener('click', resetEverything)
function resetEverything(){
    startBtn.disabled=false
    paragraph.innerHTML=''
    userInput.value=''
    wpm.innerHTML=0
    accuracy.innerHTML="100%"
    error.innerHTML=0
    count=0
    userInput.disabled=true


    timeRemaining = totalTime
    timeLeft.innerHTML = formatTime(timeRemaining)

    errorCount = 0
    correctCount = 0
    accuracyPercentage = 0
    wpmScore = 0
    testRunning=false
    progressFill.style.width='0%'
    makeParaGraph(totalTime)
    renderParagraph()
    stopTimer()
}

toogleBtn.addEventListener('click',function(){
    if(toogleBtn.innerHTML==='☀️Light'){
        toogleBtn.innerHTML='🌙Dark'
    }
    else{
        toogleBtn.innerHTML='☀️Light'
    }
    body.classList.toggle('light-mode')
})
