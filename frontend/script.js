//function getAndPushKey(){
    //fetch('http://localhost:3000/link').then(response => response.text()).then(text => {
    //    document.body.innerHTML = `${text}`
    //})    
//}

let listenerLibrary = {

    showSearchOnLoad: function(){
        let searchMainDiv = document.getElementsByClassName("search")
        let searchButton = document.getElementById("search-icon")

        searchMainDiv[0].style.display = "flex"
        searchButton.style.display = "none"
    },

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
    },

    xButtonOnSearch: function(){
        document.getElementById("x-button").addEventListener("click", function(){
            let searchMainDiv = document.getElementsByClassName("search")
            let searchButton = document.getElementById("search-icon")
            searchMainDiv[0].style.display = "none"
            searchButton.style.display = "flex"
    
        })
    },

    xButtonOnAccounts: function(){
        document.getElementById("x-button-account").addEventListener("click", function(){
            let loginMainDiv = document.getElementsByClassName("login")
            let loginButton = document.getElementById("login-icon")
            loginMainDiv[0].style.display = "none"
            loginButton.style.display = "flex"
        })
    },

    createAnAccountTransition: function(){
        document.getElementById("create-account-click").addEventListener("click", function(){
            let createAccountDiv = document.getElementById("create-account-options")
            let ogDiv = document.getElementById("create-account-selection")
            let ogDiv2 = document.getElementById("login-selection")
            ogDiv.style.display = "none"
            ogDiv2.style.display = "none"
            createAccountDiv.style.display = "flex"
        })
    }, 

    loginTransition: function(){
        document.getElementById("login-click").addEventListener("click", function(){
            let loginDiv = document.getElementById("login-options")
            let ogDiv = document.getElementById("create-account-selection")
            let ogDiv2 = document.getElementById("login-selection")
            ogDiv.style.display = "none"
            ogDiv2.style.display = "none"
            loginDiv.style.display = "flex"
        })
    },

    createAccountBackButton: function(){
        document.getElementById("account-back-button").addEventListener("click", function(){
            let createAccountDiv = document.getElementById("create-account-options")
            let ogDiv = document.getElementById("create-account-selection")
            let ogDiv2 = document.getElementById("login-selection")
            createAccountDiv.style.display = "none"
            ogDiv.style.display = "flex"
            ogDiv2.style.display = "flex"
        })
    },

    loginBackButton: function(){
        document.getElementById("login-back-button").addEventListener("click", function(){
            let loginDiv = document.getElementById("login-options")
            let ogDiv = document.getElementById("create-account-selection")
            let ogDiv2 = document.getElementById("login-selection")
            loginDiv.style.display = "none"
            ogDiv.style.display = "flex"
            ogDiv2.style.display = "flex"
            
        })
    }
}

document.addEventListener("DOMContentLoaded", (events) => {

    console.log(Object.keys(listenerLibrary))

    listenerLibrary.showSearchOnLoad()
    listenerLibrary.loginIconClick()
    listenerLibrary.searchIconClick()
    listenerLibrary.xButtonOnSearch() 
    listenerLibrary.xButtonOnAccounts()
    listenerLibrary.createAnAccountTransition()
    listenerLibrary.loginTransition()
    listenerLibrary.createAccountBackButton()
    listenerLibrary.loginBackButton()

})