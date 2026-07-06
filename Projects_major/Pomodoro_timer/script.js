const modes = document.querySelector('.modes')
const pomodoro = document.querySelector('.pomodoro')
const shortBreak = document.querySelector('.shortBreak')
const longBreak = document.querySelector('.longBreak')

const buttons = document.querySelector('.buttons')
const timer = document.querySelector('.timer')
const settingsBox = document.querySelector('.settingsBox')
const pomodoroInput = document.querySelector('#pomodoroInput')
const longBreakInput = document.querySelector('#longBreakInput')
const shortBreakInput = document.querySelector('#shortBreakInput')
const saveBtn = document.querySelector('.save')
const overlay = document.querySelector('.overlay')
const settingsBtn = document.querySelector('.settings')
const toggleMode = document.querySelector('.toggleMode')
const body = document.querySelector('body')


let timeMinutes
let totalSeconds
let pomodoroActive = true
let shortActive = false
let longActive = false
let t
let isRunning = false

// ---- MODE SWITCHING ----
modes.addEventListener('click', function(e){
    if(e.target.classList.contains('pomodoro')){
        pomodoroActive = true
        shortActive = false
        longActive = false
    }
    else if(e.target.classList.contains('shortBreak')){
        pomodoroActive = false
        shortActive = true
        longActive = false
    }
    else if(e.target.classList.contains('longBreak')){
        pomodoroActive = false
        shortActive = false
        longActive = true
    }
    stopTimer()   // switching mode should stop any running countdown
    setTime()
})

// ---- SET TIME BASED ON ACTIVE MODE ----
function setTime(){
    if(pomodoroActive){
        timeMinutes = pomodoroInput.value
    }
    else if(shortActive){
        timeMinutes = shortBreakInput.value
    }
    else if(longActive){
        timeMinutes = longBreakInput.value
    }
    if(timeMinutes > 60){
        alert("This is FocusFlow, not FocusForever. 60 min max.")
        timeMinutes=60
    }
    totalSeconds = timeMinutes * 60
    timer.textContent = formatTime(totalSeconds)

}

// ---- FORMAT SECONDS INTO MM:SS ----
function formatTime(totalSeconds){
    let mins = Math.floor(totalSeconds / 60)
    let secs = totalSeconds % 60
    return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`
}

setTime() // run once on page load so timer isn't blank/NaN

// ---- BUTTONS: start / settings / refresh ----
buttons.addEventListener('click', function(e){
    if(e.target.closest('.start')){
        timerStart()
    }
    else if(e.target.closest('.settings')){
        overlay.classList.add('active')
    }
    else if(e.target.closest('.refresh')){
        timerRefresh()
    }
})

// ---- START / COUNTDOWN ----
function timerStart(){
    if(isRunning) return
    isRunning = true
    t = setInterval(function(){
        totalSeconds--
        timer.textContent = formatTime(totalSeconds)
        if(totalSeconds <= 0){
            stopTimer()   // don't let it go negative
        }
    }, 1000)
}

// ---- STOP HELPER (clears interval + resets flag) ----
function stopTimer(){
    clearInterval(t)
    isRunning = false
}

// ---- REFRESH: stop countdown, reset back to full time for current mode ----
function timerRefresh(){
    stopTimer()
    setTime()
}

// ---- SAVE SETTINGS ----
saveBtn.addEventListener('click', function(){
    setTime()
    overlay.classList.remove('active')
})

// ---- OPEN SETTINGS----
settingsBtn.addEventListener('click', function(){
    overlay.classList.add('active')
})

toggleMode.addEventListener('click',function(e){
    if(e.target.textContent==='☀️Light'){
        body.classList.toggle('light-mode')
        e.target.textContent='🌙Dark'
    }
    else if(e.target.textContent==='🌙Dark'){
        body.classList.toggle('light-mode')
        e.target.textContent='☀️Light'
    }
})