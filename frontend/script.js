//function getAndPushKey(){
    //fetch('http://localhost:3000/link').then(response => response.text()).then(text => {
    //    document.body.innerHTML = `${text}`
    //})    
//}

let dynamicLibrary = {

    //changes color bar for an error, displays error, else displays a good message in blue

    messageBar: function(message){
        let bar = document.getElementById("top-head")
        document.getElementById("p-top-head").innerText = message
        if (message.includes("Password") || message.includes("Username")){
            bar.style.backgroundColor = "red"
        } else {
            bar.style.backgroundColor = "rgb(50, 120, 254)"
        }

        bar.style.display = "flex"

        setTimeout(function(){
            bar.style.display = "none"
        }, 5000)
    },

    //currently clears account divs, doesnt do anything else (used after successful login)
    hideOnLogin: function(){

        let loginMainDiv = document.getElementsByClassName("login")
        let loginButton = document.getElementById("login-icon")
        let loginBox = document.getElementById("login-box")
        let accountDiv = document.getElementById("logged-in")
        loginMainDiv[0].style.display = "none"
        loginBox.style.display = "none"
        accountDiv.style.display = "flex"
        loginButton.style.display = "flex"
        // add function that when a user is logged in, clears the user button and shows log out only
        //what is written right now is temporary
    },

    //displays search bar on load, can still be exited
    showSearchOnLoad: function(){
        let searchMainDiv = document.getElementsByClassName("search")
        let searchButton = document.getElementById("search-icon")

        searchMainDiv[0].style.display = "flex"
        searchButton.style.display = "none"
    }
    
}

let listenerLibrary = {

    

    addTrackingNumber: function(){
        document.getElementById("search-submit-icon").addEventListener("click", function(){
            let searchValue = document.getElementById("search-input").value
            let userName = document.getElementById("master").innerText

            let configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    number: `${searchValue}`,
                    username: `${userName}`
                })
            }

            fetch("http://localhost:3000/submitnumber", configurationObject)
                .then(function(response){
                    return response.json()
                })
                .then(function(object){
                    console.log(object)

                    console.log(object["number"]["number"])

                })
                .catch(function(error){
                    console.log(error)
                    alert('error')
                })


        })
    },

    //handles search or 'add tracking number' icon

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

    //handles login click, displays user account if already logged in (if there is a loaded name)
    loginIconClick: function(){
        document.getElementById("login").addEventListener("click", function(){

            let loginMainDiv = document.getElementsByClassName("login")
            let loginButton = document.getElementById("login-icon")
            let loginBox = document.getElementById("login-box")
            let accountDiv = document.getElementById("logged-in")
            if (document.getElementById("master").innerText === ""){
                loginButton.style.display = "none"
                accountDiv.style.display = "none"
                loginBox.style.display = "flex"
                loginMainDiv[0].style.display = "flex"
            } else {
                loginButton.style.display = "none"
                loginMainDiv[0].style.display = "flex"
                accountDiv.style.display = "flex"

            }

        })
    },

    //x button for search
    xButtonOnSearch: function(){
        document.getElementById("x-button").addEventListener("click", function(){
            let searchMainDiv = document.getElementsByClassName("search")
            let searchButton = document.getElementById("search-icon")
            searchMainDiv[0].style.display = "none"
            searchButton.style.display = "flex"
    
        })
    },
    
    //x button for accounts information
    xButtonOnAccounts: function(){
        document.getElementById("x-button-account").addEventListener("click", function(){
            let loginMainDiv = document.getElementsByClassName("login")
            let loginButton = document.getElementById("login-icon")
            loginMainDiv[0].style.display = "none"
            loginButton.style.display = "flex"
        })
    },

    //goes to create account when clicked
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

    //goes to sign in when clicked
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

    //back button functionality for create an account
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

    //back button functionality for log in
    loginBackButton: function(){
        document.getElementById("login-back-button").addEventListener("click", function(){
            let loginDiv = document.getElementById("login-options")
            let ogDiv = document.getElementById("create-account-selection")
            let ogDiv2 = document.getElementById("login-selection")
            loginDiv.style.display = "none"
            ogDiv.style.display = "flex"
            ogDiv2.style.display = "flex"
            
        })
    },

    //sends account creation POST to API and returns dynamic library message based on returned JSON
    createAccount: function(){
        document.getElementById("create").addEventListener("click", function(){
            let username = document.getElementById("create-username-input").value
            let password = document.getElementById("create-password-input").value

            let configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`
                })
            }

            fetch("http://localhost:3000/signup", configurationObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    console.log(object)
                    if (object["user"]["id"] !== null){
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`)
                        dynamicLibrary.hideOnLogin()
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
                    } else {
                        if (object["errors"]["password"]){
                            dynamicLibrary.messageBar(`Password ${object["errors"]["password"][0]}`)
                        } else if (object["errors"]["username"]){
                            dynamicLibrary.messageBar(`Username ${object["errors"]["username"][0]}`)
                        }
                    }

                })
                .catch(function(error) {
                    alert("error");
                    console.log(error.message);
                });
        })
    },

    //sends account login POST, checks password, displays dynamic library message based on API returned JSON
    loginAccount: function(){
        document.getElementById("enter").addEventListener("click", function(){
            console.log("click")
            let username = document.getElementById("login-username-input").value
            let password = document.getElementById("login-password-input").value

            let configurationObject = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`
                })
            }

            fetch("http://localhost:3000/login", configurationObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    console.log(object)
                    if (object["user"]["id"] !== null){
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`)
                        dynamicLibrary.hideOnLogin()
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
                    } else {
                        if (object["errors"]){
                            dynamicLibrary.messageBar(`${object["errors"]}`)
                        } 
                    }

                })
                .catch(function(error) {
                    alert("error");
                    console.log(error.message);
                });


        })

    },

    logOut: function(){
        document.getElementById("logout").addEventListener("click", function(){
            document.getElementById("master").innerText = ""
            let inputs = document.getElementsByTagName("input")
            Array.from(inputs).forEach(function(element){
                element.value = ""
            })
            document.getElementById("x-button-account").click()

        })
    }
}

document.addEventListener("DOMContentLoaded", (events) => {

    console.log(Object.keys(listenerLibrary))

    dynamicLibrary.showSearchOnLoad()

    listenerLibrary.addTrackingNumber()

    listenerLibrary.loginIconClick()
    listenerLibrary.searchIconClick()

    listenerLibrary.xButtonOnSearch() 
    listenerLibrary.xButtonOnAccounts()

    listenerLibrary.createAnAccountTransition()
    listenerLibrary.loginTransition()

    listenerLibrary.createAccountBackButton()
    listenerLibrary.loginBackButton()

    listenerLibrary.createAccount()
    listenerLibrary.loginAccount()
    listenerLibrary.logOut()

})