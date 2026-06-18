var c=0;
function addMovie(){
     
    c++;
    const name = document.querySelector('#name').value
    const genre = document.querySelector('#genre').value
    const rating = document.querySelector('#rating').value

   
    const card = document.createElement('div')
    document.querySelector('#cardContainer').appendChild(card)

    if(rating<=3){
        card.style.border = '2px solid yellow'
    }

    const movieName =document.createElement('span')
    movieName.innerText=name
    card.appendChild(movieName)

    const movieGenre = document.createElement('span')
    movieGenre.innerText=genre
    card.appendChild(movieGenre)

    const movieRating = document.createElement('span')
    let star=''
    if(rating>=0 && rating <=5){
        for(let i=0;i<rating;i++){
        star+='⭐'
    }}
    else star+='invalid rating'
    
    movieRating.innerText=star
    card.appendChild(movieRating)

    const watchedBtn = document.createElement('button')
    watchedBtn.innerText='Watched'
    card.appendChild(watchedBtn)

    watchedBtn.onclick = function(){
        watchedBtn.replaceWith('✅')
    }

    const removeBtn = document.createElement('button')
    removeBtn.innerText='Remove'
    card.appendChild(removeBtn)

    removeBtn.onclick = function(){
        deleteCard(this)
    }
 
    card.classList.add('card')


    const count = document.createTextNode(c)
    document.querySelector('.idCounter').innerText=c

    return false
   
}

function deleteCard(removeBtn){
    c--;
    const count = document.createTextNode(c)
    document.querySelector('.idCounter').innerText=c
    removeBtn.parentElement.remove()
}