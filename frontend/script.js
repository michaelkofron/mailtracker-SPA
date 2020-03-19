//function getAndPushKey(){
    //fetch('http://localhost:3000/link').then(response => response.text()).then(text => {
    //    document.body.innerHTML = `${text}`
    //})    
//}

function addGoogleMap() {
    let script = document.getElementById("googlescript")
    script.src = `http://maps.googleapis.com/maps/api/js?key=${MAPKEY}&callback=initMap`
}

function initMap(centerCoord = {lat: 39.82, lng: -98}) {

    // Map centers at centerCoord input, if none, defaults to USA
    let map = new google.maps.Map(
        document.getElementById("map"), {zoom: 4, center: centerCoord, mapTypeId: google.maps.MapTypeId.ROADMAP});
    // The marker, positioned at Uluru
    let marker = new google.maps.Marker({position: centerCoord, map: map});

    let dragMarker = new google.maps.Marker({
        position: {lat: 38, lng: -97},
        map: map,
        draggable: true,
        icon: {                             
            url: "https://i.imgur.com/sUr046W.png"                          
        },
        title:"Drag me home!"
    })

    let popupContent = "<h1>hello</h1>"

    let infoWindow = new google.maps.InfoWindow({content: popupContent})

    infoWindow.open(map, dragMarker)

    google.maps.event.addListener(dragMarker, 'click', function() {
        infoWindow.open(map, dragMarker)       
    });

    

    





}



let dynamicLibrary = {


    //creates necessary HTML objects to add tracking numbers
    addToSearch: (string)=>{
        const trackingDiv = document.getElementById("tracking-numbers-div")
        const numberDiv = document.createElement('div')
        numberDiv.setAttribute("class", "tracking-number")
        const carrier = document.createElement('div')
        carrier.setAttribute("class", "carrier")
        carrier.innerHTML = "<img class='carrier-pic' src='trash.png'>"
        const number = document.createElement('div')
        number.setAttribute("class", "number")
        const numberContainer = document.createElement('div')
        numberContainer.setAttribute("class", "number-container")
        const p = document.createElement('p')
        p.innerText = string

        numberDiv.appendChild(carrier)
        trackingDiv.appendChild(numberDiv).appendChild(number).appendChild(numberContainer).appendChild(p)

        listenerLibrary.deleteTrackingNumber(carrier)
    },

    //changes color bar for an error, displays error, else displays a good message in blue

    messageBar: (message, color)=>{
        const bar = document.getElementById("top-head")
        document.getElementById("p-top-head").innerText = message
        let barColor

        if (color === "blue"){
            barColor = "rgb(50, 120, 254)"
        } else {
            barColor = "red"
        }
    
        bar.style.backgroundColor = barColor

        bar.style.display = "flex"

        setTimeout(function(){
            bar.style.display = "none"
        }, 5000)
    },

    //currently clears account divs, doesnt do anything else (used after successful login)
    hideOnLogin: ()=>{

        const loginMainDiv = document.getElementsByClassName("login")
        const loginButton = document.getElementById("login-icon")
        const loginBox = document.getElementById("login-box")
        const accountDiv = document.getElementById("logged-in")
        loginMainDiv[0].style.display = "none"
        loginBox.style.display = "none"
        accountDiv.style.display = "flex"
        loginButton.style.display = "flex"
        // add function that when a user is logged in, clears the user button and shows log out only
        //what is written right now is temporary
    },

    //displays search bar on load, can still be exited
    showSearchOnLoad: ()=>{
        const searchMainDiv = document.getElementsByClassName("search")
        const searchButton = document.getElementById("search-icon")

        searchMainDiv[0].style.display = "inline-flex"
        searchButton.style.display = "none"
    },

    clearSearch: function(){
        document.getElementById("tracking-numbers-div").innerHTML = ""
        document.getElementById("search-input").value = ""
    }
    
}

let listenerLibrary = {

    showTrackingNumbersOnEntry: (userName)=>{

        let configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
                username: `${userName}`
            })
        }

        fetch("http://localhost:3000/loadnumbers", configurationObject)
            .then(function(response){
                return response.json()
            })
            .then(function(object){
                console.log(object)

                for (i = 0; i < object.length; i++){
                    dynamicLibrary.addToSearch(object[i].number)
                }
            })
            .catch(function(error){
                console.log(error)
                alert("error")
            })
    },


    addTrackingNumber: ()=>{
        document.getElementById("search-submit-icon").addEventListener("click", function(){
            const searchValue = document.getElementById("search-input").value
            const userName = document.getElementById("master").innerText

            const trackingAmount = document.getElementsByClassName("number-container").length

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

                if (object["number"]["user_id"] == null){
                    dynamicLibrary.messageBar("You must be logged in", "red")
                } else if (object["number"]["id"] == null){
                    dynamicLibrary.messageBar(object["errors"]["number"][0], "red")
                } else {
                    dynamicLibrary.addToSearch(object["number"]["number"])
                }

            })
            .catch(function(error){
                console.log(error)
                alert('error')
            })

           

            

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
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`, "blue")
                        dynamicLibrary.hideOnLogin()
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
                    } else {
                        if (object["errors"]["password"]){
                            dynamicLibrary.messageBar(`Password ${object["errors"]["password"][0]}`, "red")
                        } else if (object["errors"]["username"]){
                            dynamicLibrary.messageBar(`Username ${object["errors"]["username"][0]}`, "red")
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
    loginAccount: ()=>{
        document.getElementById("enter").addEventListener("click", function(){
            console.log("click")
            const username = document.getElementById("login-username-input").value
            const password = document.getElementById("login-password-input").value

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
                    dynamicLibrary.clearSearch()
                    if (object["user"]["id"] !== null){
                        dynamicLibrary.messageBar(`Welcome, ${object["user"]["username"]}!`, "blue")
                        dynamicLibrary.hideOnLogin()
                        listenerLibrary.showTrackingNumbersOnEntry(object["user"]["username"]) //find this users numbers
                        document.getElementById("master").innerText = object["user"]["username"] //store current username
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

document.addEventListener("DOMContentLoaded", (events) => {
    console.log(Object.keys(listenerLibrary))

    addGoogleMap()

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