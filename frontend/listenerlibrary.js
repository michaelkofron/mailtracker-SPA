let listenerLibrary = {

    showTrackingNumbersOnEntry: (userName)=>{
        dynamicLibrary.messageBar("Loading your numbers...", "blue")
        const sessionKey = document.getElementById("session-key").innerText

        let configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
                username: `${userName}`,
                sessionkey: `${sessionKey}`
            })
        }

        fetch("http://localhost:3000/loadnumbers", configurationObject)
            .then(function(response){
                return response.json()
            })
            .then(function(object){
                console.log(object)
                dynamicLibrary.messageBar("Success!", "blue")
                for (i = 0; i < object.length; i++){
                    dynamicLibrary.addToSearch(object[i].number)
                    googleMapsLibrary.addMarker(object[i].coordinates.current_coords, object[i].info, object[i].number)
                }
            })
            .catch(function(error){
                console.log(error)
                alert("error")
            })
    },

    addTrackingNumber: ()=>{
        document.getElementById("search-submit-icon").addEventListener("click", function(){
            let searchValue = document.getElementById("search-input").value.replace(/\s/g, "")
            const userName = document.getElementById("master").innerText
            const sessionKey = document.getElementById("session-key").innerText

            let configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    number: `${searchValue}`,
                    username: `${userName}`,
                    sessionkey: `${sessionKey}`
                })
            }
            if (searchValue !== ""){
                dynamicLibrary.messageBar("Loading...", "blue")
                fetch("http://localhost:3000/submitnumber", configurationObject)
                .then(function(response){
                    return response.json()
                })
                .then(function(object){
                    console.log(object)
                    if (object["status"]){
                        dynamicLibrary.messageBar("You must be logged in", "red")  
                    } else if (object["number"]["user_id"] == null){
                        dynamicLibrary.messageBar("You must be logged in", "red")
                    } else if (object["number"]["id"] == null){
                        dynamicLibrary.messageBar(object["errors"]["number"][0], "red")
                    } else if (object["number_limit"]){
                        dynamicLibrary.messageBar(object["number_limit"])
                    } else {
                        document.getElementById("search-input").value = ""
                        dynamicLibrary.messageBar("Success!", "blue")
                        googleMapsLibrary.addMarker(object["coordinates"]["current_coords"], object["info"], object["number"]["number"]) // false marker right now
                        dynamicLibrary.addToSearch(object["number"]["number"])
                    }

                })
            } else {
                dynamicLibrary.messageBar("Tracking number can't be blank", "red")
            }
        })
    },

    deleteTrackingNumber: (div)=>{
        div.addEventListener("click", function(){
            const number = div.parentElement.children[1].innerText
            const userName = document.getElementById("master").innerText

            let configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    number: `${number}`,
                    username: `${userName}`
                })
            }

            fetch("http://localhost:3000/deletenumber", configurationObject)
                .then(function(response){
                    return response.json()
                })
                .then(function(object){
                    document.getElementById("search-input").value = ""
                    let marker = markers.filter(element => element._numberValue == number)
                    marker[marker.length-1].setMap(null)
                    div.style.display = "none"
                    div.parentElement.style.display = "none"
                })
                .catch(function(error){
                    console.log(error)
                    alert('error')
                })
        })
    },

    //handles search or 'add tracking number' icon

    searchIconClick: ()=>{
        document.getElementById("search").addEventListener("click", function(){
            const originalContent = document.getElementsByClassName("flex-container")
            const searchMainDiv = document.getElementsByClassName("search")
            const searchButton = document.getElementById("search-icon")
            if (searchMainDiv[0].style.display == "flex"){
                searchMainDiv[0].style.display = "none"
            } else {
                searchButton.style.display = "none"
                originalContent[0].setAttribute("style", "animation: 0.1s ease-out 0s 1 slideDown")
                searchMainDiv[0].style.display = "inline-flex"
            }
        })
    },

    //handles login click, displays user account if already logged in (if there is a loaded name)
    loginIconClick: ()=>{
        document.getElementById("login").addEventListener("click", function(){

            const loginMainDiv = document.getElementsByClassName("login")
            const loginButton = document.getElementById("login-icon")
            const loginBox = document.getElementById("login-box")
            const accountDiv = document.getElementById("logged-in")
            if (document.getElementById("master").innerText === ""){
                loginButton.style.display = "none"
                accountDiv.style.display = "none"
                loginBox.style.display = "inline-flex"
                loginMainDiv[0].style.display = "inline-flex"
            } else {
                loginButton.style.display = "none"
                loginMainDiv[0].style.display = "inline-flex"
                accountDiv.style.display = "inline-flex"

            }

        })
    },

    //x button for search
    xButtonOnSearch: ()=>{
        document.getElementById("x-button").addEventListener("click", function(){
            const searchMainDiv = document.getElementsByClassName("search")
            const searchButton = document.getElementById("search-icon")
            searchMainDiv[0].style.display = "none"
            searchButton.style.display = "flex"
    
        })
    },
    
    //x button for accounts information
    xButtonOnAccounts: ()=>{
        document.getElementById("x-button-account").addEventListener("click", function(){
            const loginMainDiv = document.getElementsByClassName("login")
            const loginButton = document.getElementById("login-icon")
            loginMainDiv[0].style.display = "none"
            loginButton.style.display = "flex"
        })
    },

    //goes to create account when clicked
    createAnAccountTransition: ()=>{
        document.getElementById("create-account-click").addEventListener("click", function(){
            const createAccountDiv = document.getElementById("create-account-options")
            const ogDiv = document.getElementById("create-account-selection")
            const ogDiv2 = document.getElementById("login-selection")
            ogDiv.style.display = "none"
            ogDiv2.style.display = "none"
            createAccountDiv.style.display = "flex"
        })
    }, 

    //goes to sign in when clicked
    loginTransition: ()=>{
        document.getElementById("login-click").addEventListener("click", function(){
            const loginDiv = document.getElementById("login-options")
            const ogDiv = document.getElementById("create-account-selection")
            const ogDiv2 = document.getElementById("login-selection")
            ogDiv.style.display = "none"
            ogDiv2.style.display = "none"
            loginDiv.style.display = "flex"
        })
    },

    //back button functionality for create an account
    createAccountBackButton: ()=>{
        document.getElementById("account-back-button").addEventListener("click", function(){
            const createAccountDiv = document.getElementById("create-account-options")
            const ogDiv = document.getElementById("create-account-selection")
            const ogDiv2 = document.getElementById("login-selection")
            createAccountDiv.style.display = "none"
            ogDiv.style.display = "flex"
            ogDiv2.style.display = "flex"
        })
    },

    //back button functionality for log in
    loginBackButton: ()=>{
        document.getElementById("login-back-button").addEventListener("click", function(){
            const loginDiv = document.getElementById("login-options")
            const ogDiv = document.getElementById("create-account-selection")
            const ogDiv2 = document.getElementById("login-selection")
            loginDiv.style.display = "none"
            ogDiv.style.display = "flex"
            ogDiv2.style.display = "flex"
            
        })
    },

    //sends account creation POST to API and returns dynamic library message based on returned JSON
    createAccount: ()=>{
        document.getElementById("create").addEventListener("click", function(){
            const username = document.getElementById("create-username-input").value
            const password = document.getElementById("create-password-input").value
            const sessionKey = document.getElementById("session-key").innerText

            let configurationObject = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`,
                    sessionkey: `${sessionKey}`
                })
            }

            fetch("http://localhost:3000/signup", configurationObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    console.log(object)
                    if (object["errors"]["password"] || object["errors"]["username"]){
                        if (object["errors"]["password"]){
                            dynamicLibrary.messageBar(`Password ${object["errors"]["password"][0]}`, "red")
                        } else if (object["errors"]["username"]){
                            dynamicLibrary.messageBar(`Username ${object["errors"]["username"][0]}`, "red")
                        }
                    } else {
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`, "blue")
                        dynamicLibrary.hideOnLogin()
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
                        googleMapsLibrary.homeMarkerSaveOnEntry()
                    }
                })
                .catch(function(error) {
                    alert("error");
                    console.log(error.message);
                });
        })
    },

    //sends account login POST, checks password, displays dynamic library message based on API returned JSON
    loginAccount: ()=>{
        document.getElementById("enter").addEventListener("click", function(){
            console.log("click")
            const username = document.getElementById("login-username-input").value
            const password = document.getElementById("login-password-input").value
            const sessionKey = document.getElementById("session-key").innerText

            let configurationObject = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`,
                    sessionkey: `${sessionKey}`
                })
            }

            fetch("http://localhost:3000/login", configurationObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(object) {
                    console.log(object)
                    dynamicLibrary.clearSearch()
                    if (object["user"]["id"] !== null){
                        let latitude = parseFloat(object["user"]["home_marker_lat"])
                        let longitude = parseFloat(object["user"]["home_marker_lng"])
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`, "blue")
                        window.userDragMarker.setPosition({lat: latitude, lng: longitude})
                        if (document.getElementById('home') !== null){
                            document.getElementById('home').innerText = `Welcome back ${username}!`
                        }
                        dynamicLibrary.hideOnLogin()
                        listenerLibrary.showTrackingNumbersOnEntry(object["user"]["username"])//find this users numbers
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
                        setTimeout(function(){
                            document.getElementById('home').innerText = "put me somewhere new, or keep me here!"
                        }, 6500)

                    } else {
                        if (object["errors"]){
                            dynamicLibrary.messageBar(`${object["errors"]}`, "red")
                        } 
                    }

                })
                .catch(function(error) {
                    alert("error");
                    console.log(error.message);
                });


        })

    },

    logOut: ()=>{
        document.getElementById("logout").addEventListener("click", function(){
            //googleMapsLibrary.homeMarkerSaveOnExit()
            googleMapsLibrary.clearMarkers()
            document.getElementById("master").innerText = ""
            dynamicLibrary.clearSearch()
            const inputs = document.getElementsByTagName("input")
            Array.from(inputs).forEach(function(element){
                element.value = ""
            })
            document.getElementById("x-button-account").click()

        })
    }
}