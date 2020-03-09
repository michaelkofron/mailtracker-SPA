//function getAndPushKey(){
    //fetch('http://localhost:3000/link').then(response => response.text()).then(text => {
    //    document.body.innerHTML = `${text}`
    //})    
//}

class Key {
    get key(){

        fetch('http://localhost:3000/link').then(response => response.text()).then(text => {
            document.getElementById("key").innerText = `${text}`
        })  
    }


}

if (window.location.href !== 'http://localhost:8080/'){
    console.log("what")
}

console.log("hello")

document.addEventListener("DOMContentLoaded", (events) => {
    let key = new Key
    key.key
    
    document.getElementById("new-key").addEventListener("click", function(){
        if (confirm("If you change your key you will lose all current tracking information. Continue?")){
            key.key
        }
    })

    document.getElementById("search").addEventListener("click", function(){
        let searchButton = document.getElementsByClassName("flex-container")
        let searchMainDiv = document.getElementsByClassName("search")
        let searchSubDiv = document.getElementById("box")
        searchButton[0].style.display = "none"
        searchMainDiv[0].style.display = "flex"


    })

    //only do this if window.location.href is the blank route
    //else we need to find all data and load it
})