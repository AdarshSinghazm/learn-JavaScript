function addDetails(){
    const name = document.querySelector("#name").value
    const subject = document.querySelector('#subject').value
    const marks = document.querySelector('#marks').value

    const card = document.createElement('div')
    document.querySelector('.cardContainer').appendChild(card)

    const studentName = document.createElement('span')
    studentName.innerText=name
    card.appendChild(studentName)

    const studentSubject = document.createElement('span')
    studentSubject.innerText=subject
    card.appendChild(studentSubject)
    
    const studentMarks = document.createElement('span')
    studentMarks.innerText=marks
    card.appendChild(studentMarks)
    let badge = document.createElement('span')
    if(marks>=90){
        badge.innerText='A'
        card.appendChild(badge)
        card.style.border="2px solid green"
    }
    else if(marks>=75 && marks<90){
        badge.innerText='B'
        card.appendChild(badge)
    }
    else if(marks>=60 && marks<75){
        badge.innerText='C'
        card.appendChild(badge)
    }
    else if(marks>=50 && marks<60){
        badge.innerText='D'
        card.appendChild(badge)
    }
    else{
        badge.innerText='F'
        card.appendChild(badge)
        card.style.border="2px solid red"
    }
    const Promotebtn = document.createElement('button')
    Promotebtn.innerText='Promote'
    card.appendChild(Promotebtn)

    Promotebtn.onclick = function(){
        badge.innerText='Promoted ✅'
        this.remove()
    }

    const Removebtn = document.createElement('button')
    Removebtn.innerText='Remove'
    card.appendChild(Removebtn)

    Removebtn.onclick=function(){
        deleteCard(this)
    }

    card.classList.add('card')

    return false

}

function deleteCard(btn){
   btn.parentElement.remove()
}