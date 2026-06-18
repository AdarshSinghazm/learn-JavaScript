function addStudent() {
    const name = document.getElementById('name').value
    const score = document.getElementById('score').value
    console.log(name, score)
    
    const card = document.createElement('div')
    document.querySelector('#cardContainer').appendChild(card)

    const txt = document.createElement('span')
    txt.innerText=name
    card.appendChild(txt)
    
    const sc = document.createElement('span')
    sc.innerText=score
    card.appendChild(sc)

    if(score>=50){
        const result = document.createElement('span')
        result.innerText='PASS'
        card.appendChild(result)
    }
    else{
         const result = document.createElement('span')
         result.innerText='FAIL'
        card.appendChild(result)
    }
    card.classList.add('card')

    const btn = document.createElement('button')
    btn.innerText="Delete Student"
    card.appendChild(btn)
    
    btn.onclick = function(){
        delStudent(this)
        console.log(this);
        
    }

    return false
}
function delStudent(btn){
    btn.parentElement.remove()
}
