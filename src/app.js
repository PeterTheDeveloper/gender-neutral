/*----- constants -----*/

    /*  DOM Elements */

const startTab = document.getElementById('start') // Delete from global space eventually
const endTab = document.getElementById('end')


/*------ Classes ------*/


class Session {
    constructor() {
        this.bathrooms = ['']
        this.userLocation = {
            'latitude': 0,
            'longitude': 0
        }
        this.bathroomCount = 0
    }
    addMarker(bathroomObj) {
        console.log("new location", bathroomObj);
        this.bathrooms.push(bathroomObj)
    }
}
        /* Test */
 
const ourSession = new Session();
    // console.log(ourSession)
console.log(ourSession);
    // console.log(ourSession)
    
    
/*----- app's state -----*/
    
console.log("JavaScript is Connected!");
alert("Never know which bathroom to go in ? Fear no more! There are Gender-Neutral bathroom's everywhere!");

if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			
			initMap(lat, long);
		});
}

/*----- functions -----*/

function initMap(lat, lng){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			
			console.log(lat, long);
			
			const ourMap = new google.maps.Map(document.getElementById('map'), { // Our Map object
                zoom: 18,
                center: {lat: lat, lng: long}
                 //center: {lat: 40.699765, lng: -73.941055}
            });

            const newMarker = new google.maps.Marker({
                  position: {
                      lat: lat,
                      lng: long
                  },
                  map: ourMap,
                  title: 'Bathroom',
              });
            
            getBathrooms(lat, long)
                .then(bathrooms => bathrooms.forEach(bathroom => {
                    const newMarker = new google.maps.Marker({
                        position: {
                           lat: bathroom.latitude,
                           lng: bathroom.longitude,
                        },
                        map: ourMap,
                        title: 'Bathroom',
                    })
                    return newMarker;
                }
            ));
		});
}
}

function getBathrooms(lat, long){
    const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?per_page=30&unisex=true&lat=${lat}&lng=${long}`;
    
    return (fetch(url)
        .then(res=>res.json())
        .then(bathrooms => bathrooms.map(bathroom => {
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
            }.addEventListener("click");
    }))
);
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

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             console.log("General Position:", position);
//             const long = position.coords.longitude;
//             const lat = position.coords.latitude;
//             return {latitude: lat, longitude: long}
//         })
//     }
// }

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




    /*  Function Delcarations  -->  News + Relevant Info  */


let searchInput = document.getElementById("");

/* Function Declarations */

function initMap(){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			
			console.log(lat, long);
			
			const ourMap = new google.maps.Map(document.getElementById('map'), { // Our Map object
                zoom: 18,
                center: {lat: lat, lng: long}
                 //center: {lat: 40.699765, lng: -73.941055}
            });

            const newMarker = new google.maps.Marker({
                  position: {
                      lat: lat,
                      lng: long
                  },
                  map: ourMap,
                  title: 'Bathroom',
              });
            
            getBathrooms(lat, long)
                .then(bathrooms => bathrooms.forEach(bathroom => {
                    const newMarker = new google.maps.Marker({
                        position: {
                           lat: bathroom.latitude,
                           lng: bathroom.longitude,
                        },
                        map: ourMap,
                        title: 'Bathroom',
                    })
                    return newMarker;
                }
            ));
		});
}
}

function getBathrooms(lat, long){
    const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?per_page=30&unisex=true&lat=${lat}&lng=${long}`;
    
    return (fetch(url)
        .then(res=>res.json())
        .then(bathrooms => bathrooms.map(bathroom => {
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
            };
    }))
);
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

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             console.log("General Position:", position);
//             const long = position.coords.longitude;
//             const lat = position.coords.latitude;
//             return {latitude: lat, longitude: long}
//         })
//     }
// }

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


    /*  Function Delcarations  -->  News + Relevant Info  */


/* Reverse Geocoding API */

// const locationiqApiKey = "48447f262ef7c7";
// const lat = 41.85, long = -87.65;

// // const url = `https://us1.locationiq.com/v1/search.php?key=${locationiqApiKey}&q=Empire%20State%20Building&format=json`

// fetch(`https://us1.locationiq.com/v1/reverse.php?key=${locationiqApiKey}&lat=${lat}&lon=${long}&format=json`)
// .then(response => response.json())
// .then(json => console.log(json.display_name))


    
    
