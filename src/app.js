console.log("JavaScript is Connected!");

/*  Constants  */


/*  DOM Elements */

const startTab = document.getElementById('start')
const endTab = document.getElementById('end')

/*  User Flow  */



let searchInput = document.getElementById("");

/* Function Declarations */

function initMap() {

    const directionsService = new google.maps.DirectionsService; // Creating the directions Service instance
    const directionsDisplay = new google.maps.DirectionsRenderer; // Create Renderer to render directions line on map
    const ourMap = new google.maps.Map(document.getElementById('map'), { // Our Map object
        zoom: 15,
        // center: {lat: 41.85, lng: -87.65}
        center: {lat: 40.699765, lng: -73.941055} // Marcy Lab
    });

    directionsDisplay.setMap(ourMap); 

    const onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    startTab.addEventListener('change', onChangeHandler); //when changed recalc the distance(1st param) and then render the blue directions line(2nd param)
    endTab.addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed', status);
            console.log(status)
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("General Position:", position);
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            return {latitude: lat, longitude: long}
        })
    }
}

function placeMarkers() {
    let dothat = getBathrooms();
    dothat.forEach(bathroom => {
        const newMarker = new google.maps.Marker({
            position: {
                lat: bathroom.latitude,
                lng: bathroom.longitude
            },
            map: ourMap,
            title: bathroom.description + "/n" + bathroom.comment
        })
        console.log(newMarker.position)
    });
}

function getBathrooms() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("General Position:", position);
            var long = position.coords.longitude;
            var lat = position.coords.latitude;
            var userData = {latitude: lat, longitude: long}
            return userData
        })
    }
    
    let url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?per_page=10&unisex=true&lat=${userData['latitude']}&lng=${userData['longitude']}`;

    fetch(url)
        .then(res => res.json())
        .then(bathrooms => {
            return bathrooms.map(bathroom => {
                return {
                    id: bathroom.id,
                    name: bathroom.name,
                    street: bathroom.street,
                    city: bathroom.city,
                    state: bathroom.state,
                    latitude: bathroom.latitude,
                    longitude: bathroom.longitude,
                    approved: bathroom.approved,
                    unisex: bathroom.unisex,
                    description: bathroom.directions,
                    comment: bathroom.comment
                }
            })
        })
}


    /*  Function Delcarations  -->  News + Relevant Info  */
