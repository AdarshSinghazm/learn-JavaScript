const body = document.querySelector('body')
const toggleMode = document.querySelector('.toggleMode')

toggleMode.addEventListener('click', function(){
    if(toggleMode.textContent === '☀️Light'){
        toggleMode.textContent = '🌙Dark'
    }
    else{
        toggleMode.textContent = '☀️Light'
    }
    body.classList.toggle('light-mode')
})