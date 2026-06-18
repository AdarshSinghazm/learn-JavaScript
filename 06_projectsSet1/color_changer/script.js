const boxes = document.querySelectorAll('.box')
console.log(boxes)
const body = document.querySelector('body')

boxes.forEach(function (box){
   box.addEventListener('click',function (e){
    console.log(e);
    console.log(e.target);
    if(e.target.id==="yellow"){
        body.style.backgroundColor=e.target.id
    }
    else if(e.target.id==="pink"){
        body.style.backgroundColor=e.target.id
    }
   else if(e.target.id==="steelblue"){
        body.style.backgroundColor=e.target.id
    }
    else if(e.target.id==="red"){
        body.style.backgroundColor=e.target.id
    }
    
   })
})