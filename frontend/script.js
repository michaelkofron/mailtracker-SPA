

document.addEventListener("DOMContentLoaded", (events) => {

    let sessionKey = Math.random().toString(36).substring(3)
    document.getElementById('session-key').innerText = sessionKey

    googleMapsLibrary.addGoogleMap()

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