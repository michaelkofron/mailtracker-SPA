let dynamicLibrary = {


    //creates necessary HTML objects to add tracking numbers
    addToSearch: (string)=>{
        const trackingDiv = document.getElementById("tracking-numbers-div")
        const numberDiv = document.createElement('div')
        numberDiv.setAttribute("class", "tracking-number")
        const carrier = document.createElement('div')
        carrier.setAttribute("class", "carrier")
        carrier.innerHTML = "<img class='carrier-pic' src='/icons/trash.png'>"
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

    //red for error, blue for good news, displays a message

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
        }, 10000)
    },

    //clears account divs for replacement by "logout" div
    hideOnLogin: ()=>{

        const loginMainDiv = document.getElementsByClassName("login")
        const loginButton = document.getElementById("login-icon")
        const loginBox = document.getElementById("login-box")
        const accountDiv = document.getElementById("logged-in")
        loginMainDiv[0].style.display = "none"
        loginBox.style.display = "none"
        accountDiv.style.display = "flex"
        loginButton.style.display = "flex"
    },

    //displays search bar on load, can still be exited
    showSearchOnLoad: ()=>{
        const searchMainDiv = document.getElementsByClassName("search")
        const searchButton = document.getElementById("search-icon")

        searchMainDiv[0].style.display = "inline-flex"
        searchButton.style.display = "none"
    },

    clearSearch: () => {
        document.getElementById("tracking-numbers-div").innerHTML = ""
        document.getElementById("search-input").value = ""
    },

    keyPress: (event, item) => {
        if (event.keyCode == 13){
            document.getElementById(item).click()
        }
    }
    
}