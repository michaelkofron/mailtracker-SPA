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

let listenerLibrary = {

    searchIconClick: function(){
        document.getElementById("search").addEventListener("click", function(){
            let originalContent = document.getElementsByClassName("flex-container")
            let searchMainDiv = document.getElementsByClassName("search")
            let searchButton = document.getElementById("search-icon")
            if (searchMainDiv[0].style.display == "flex"){
                searchMainDiv[0].style.display = "none"
            } else {
                searchButton.style.display = "none"
                originalContent[0].setAttribute("style", "animation: 0.1s ease-out 0s 1 slideDown")
                searchMainDiv[0].style.display = "flex"
            }
        })
    },

    loginIconClick: function(){
        document.getElementById("login").addEventListener("click", function(){
            let loginMainDiv = document.getElementsByClassName("login")
            let loginButton = document.getElementById("login-icon")
            if (loginMainDiv[0].style.display == "flex"){
                loginMainDiv[0].style.display = "none"
            } else {
                loginButton.style.display = "none"
                loginMainDiv[0].style.display = "flex "
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", (events) => {
    let key = new Key
    key.key

    listenerLibrary.loginIconClick()
    listenerLibrary.searchIconClick()
    
    document.getElementById("new-key").addEventListener("click", function(){
        if (confirm("If you change your key you will lose all current tracking information. Continue?")){
            key.key
        }
    })
})