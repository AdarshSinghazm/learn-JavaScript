const btn = document.querySelector(".toggleMode");

btn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        btn.innerHTML="🌙 Dark";
    }
    else{
        btn.innerHTML="☀️ Light";
    }

});