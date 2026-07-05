const body = document.querySelector('body')
const toogleBtn = document.querySelector('.toggleMode')
const userInput = document.querySelector('#userInput')
const addBtn = document.querySelector('.add')
const allBtn = document.querySelector('.all')
const completeBtn = document.querySelector('.completed')
const taskCount = document.querySelector('.count')
const noTask = document.querySelector('.noTask')
const checkBox = document.querySelector('.checkbox')
const timeInput=document.querySelector('#taskTime')
const taskList = document.querySelector('.taskList')
const task = document.querySelector('.task')
const taskText = document.querySelector('.taskText')
const delBtn = document.querySelector('.delete')
const count = document.querySelector('.count')

let noOfTask=0;
function checkInput(){
     if(userInput.value.trim() === ''){
        return false
    }
    else return true
}


addBtn.addEventListener('click',function(){
    if(checkInput()==false) return
    addTask()
    resetEverything()
})

userInput.addEventListener('keydown',function(e){
    if(e.key=== 'Enter'){
        addBtn.click()
    }
    else if(e.key==='Escape'){
        userInput.value=''
    }
})

function addTask(){
    noOfTask++;
    count.innerHTML=`${noOfTask} task`

    noTask.style.display='none'
   
    const task = document.createElement('div')
    task.className='task'
    taskList.appendChild(task)

    const checkbox = document.createElement('input')
    checkbox.type='checkbox'
    checkbox.className='checkbox'
    task.appendChild(checkbox)

    const taskText = document.createElement('div')
    taskText.className='taskText'
    task.appendChild(taskText)

    const title = document.createElement('p')
    title.className='title'
    title.innerHTML=userInput.value
    taskText.appendChild(title)
  

    const time = document.createElement('div')
    time.className='time'
    if(timeInput.value==='') time.innerHTML="⭐Anytime"
    else time.innerHTML=`⭐${timeInput.value}`
    task.appendChild(time)

    const del = document.createElement('div')
    del.className='delete'
    del.innerHTML=`✕`
    task.appendChild(del)


    const taskId = Date.now()
    task.dataset.id=taskId
    const newTask = {
    id: taskId,
    text: userInput.value,
    completed: false
}
}

taskList.addEventListener('click',function(e){
    if(e.target.classList.contains('delete')){
        e.target.closest('.task').remove()
        noOfTask--;
        count.innerHTML=`${noOfTask} task`
        if(noOfTask==0) noTask.style.display='block'
    }
    if(e.target.classList.contains('checkbox')){
        const thisTask = e.target.closest('.task')
        thisTask.classList.toggle('taskComplete')
        const thisTitle = thisTask.querySelector('.title')
        thisTitle.classList.toggle('taskCompleted')
    }
})

completeBtn.addEventListener('click',function(e){
    completeBtn.classList.toggle("active")
    allBtn.classList.remove("active")
    let c=0;
    const ar = document.querySelectorAll('.task')
    
    ar.forEach(function(task){
        if(!task.classList.contains('taskComplete')){
            task.style.display='none'
        }
        else c++;
    })
    count.innerHTML=`${c} task`  

    if(c==0) noTask.style.display='block'
    
})
allBtn.addEventListener('click',function(e){
    if(noOfTask!=0) noTask.style.display='none'
    allBtn.classList.toggle("active")
    completeBtn.classList.remove("active")
    const ar = document.querySelectorAll('.task')
   
    ar.forEach(function(task){
          task.style.display='flex'
    })
     count.innerHTML=`${noOfTask} task`
     
})

function resetEverything(){
    userInput.value=''
    timeInput.value=''
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

