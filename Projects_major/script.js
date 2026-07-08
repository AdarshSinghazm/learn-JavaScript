const body = document.querySelector('body')
const toggleMode = document.querySelector('.toggleMode')
const navItems = document.querySelectorAll('.navItem')
const projectFrame = document.querySelector('.projectFrame')

toggleMode.addEventListener('click', function(){
    if(toggleMode.textContent === '☀️Light'){
        toggleMode.textContent = '🌙Dark'
    }
    else{
        toggleMode.textContent = '☀️Light'
    }
    body.classList.toggle('light-mode')
})

navItems.forEach(function(item){
    item.addEventListener('click', function(){
        navItems.forEach(function(nav){
            nav.classList.remove('active')
        })
        item.classList.add('active')
        projectFrame.src = item.dataset.src
    })
})