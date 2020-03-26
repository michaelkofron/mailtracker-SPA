let markers = []

//stores all of the sessions markers, global object meant to keep track, used for deleting

let googleMapsLibrary = {
    

    addGoogleMap: () => {
        let script = document.getElementById("googlescript")
        script.src = `http://maps.googleapis.com/maps/api/js?key=${MAPKEY}&callback=initFirstMap`
    },

    //sets google maps API 

    addMarker: (coords, info, number) => {
        let marker = new google.maps.Marker({position: coords, map: window.currentMap, _numberValue: number})
        //make the tracking number for the marker its main identifier for delition
        let marker_info = `<p id="marker-number">Tracking code: ${number}</p><p>${info["location"]}</p><p>${info["details"]}</p><p>${info["timestamp"].slice(0,10)}</p>`
        let popup = new google.maps.InfoWindow({content: marker_info})

        popup.open(window.currentMap, marker)

        google.maps.event.addListener(marker, 'click', function() {
            popup.open(window.currentMap, marker)       
        });

        markers.push(marker)
    },

    homeMarkerSaveOnEntry: () => {
        const userName = document.getElementById("master").innerText
        const sessionKey = document.getElementById("session-key").innerText
        const marker = window.userDragMarker
        const latitude = marker.getPosition().lat()
        const longitude = marker.getPosition().lng()

        let configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
                username: `${userName}`,
                sessionkey: `${sessionKey}`,
                lat: latitude,
                lng: longitude
            })
        }

        fetch("http://localhost:3000/savemarker", configurationObject)
            .then(function(response){
                return response.json()
            })
            .then(function(object){
                
            })
            .catch(function(error){
                
                dynamicLibrary.messageBar("Unknown error", "red")
            })

    },

    markerDragEnd: () => {
        google.maps.event.addListener(window.userDragMarker, "dragend", function(){
            const userName = document.getElementById("master").innerText
            const sessionKey = document.getElementById("session-key").innerText

            if (userName){
                const marker = window.userDragMarker
                const latitude = marker.getPosition().lat()
                const longitude = marker.getPosition().lng()

                let configurationObject = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        username: `${userName}`,
                        sessionkey: `${sessionKey}`,
                        lat: latitude,
                        lng: longitude
                    })
                }

                fetch("http://localhost:3000/savemarker", configurationObject)
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(object){
                        
                    })
                    .catch(function(error){
                        dynamicLibrary.messageBar("Unknown error", "red")
                    })

            }//
        })
    },

    //.setPosition(mylatlang) on login

    clearMarkers: () => {
        for(i=0; i < markers.length; i++){
            markers[i].setMap(null)
        }
    },

    homeMarkerTitleChanges: (username) => {
        let markerTitle = document.getElementById("home").innerText

        if (markerTitle != null){
            markerTitle = `Welcome back ${username}`

            setTimeout(function(){
                markerTitle = "put me somewhere new, or keep me here!"
            }, 2000)

        }

    }
}

function initFirstMap(centerCoord = {lat: 39.82, lng: -98}) {

    // Map centers at centerCoord input, if none, defaults to USA
    let map = new google.maps.Map(document.getElementById("map"), {zoom: 4, center: centerCoord, mapTypeId: google.maps.MapTypeId.ROADMAP});
    window.currentMap = map

    let dragMarker = new google.maps.Marker({
        position: {lat: 38, lng: -97},
        map: map,
        draggable: true,
        icon: {                             
            url: "https://i.imgur.com/sUr046W.png"                          
        },
        title:"Drag me home!"
    })

    window.userDragMarker = dragMarker

    let popupContent = "<p id='home'>Hello!</p>"

    let infoWindow = new google.maps.InfoWindow({content: popupContent})

    infoWindow.open(map, dragMarker)

    google.maps.event.addListener(dragMarker, 'click', function() {
        infoWindow.open(map, dragMarker)       
    });

    googleMapsLibrary.markerDragEnd()
}