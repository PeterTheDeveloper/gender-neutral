/*----- constants -----*/
/*
// Steps goign forward.
1. create a new layer above map
    1.1 layer contains the following
        1.1.1 A section that LOOKS like a button but will just tell the current location reverse geolocated. fake button is at the top
            1.1.1.2 use ourMap.panTo(marker.getPosition());  so when its click it'll go back to the center. this is niche
        1.1.2 A section to append Transit App like cards to part of the page(pick a corner and still with that), when clicked it gives directions to the pin.
    1.2 this replaces start end tab
*/
/*  DOM Elements */
const startTab = document.getElementById('start') // Delete from global space eventually
const endTab = document.getElementById('end')


/*------ Classes ------*/


class Session {
    constructor() {
        this.bathrooms = []
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

/*----- app's state -----*/

console.log("JavaScript is Connected!");
alert("Never know which bathroom to go in ? Fear no more! There are Gender-Neutral bathroom's everywhere!");

const ourSession = new Session(); // Create Session 

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        ourSession.userLocation['latitude'] = lat;
        ourSession.userLocation['longitude'] = long;

        initMap(lat, long);
    });
}

/* Function Declarations */

function initMap() {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('My General Position:', position);

            const ourMap = new google.maps.Map(document.getElementById('map'), { // Our Map object
                zoom: 14,
                center: {
                    lat: ourSession.userLocation['latitude'],
                    lng: ourSession.userLocation['longitude']
                }
                //center: {lat: 40.699765, lng: -73.941055}
            });


            const currentLocation = new google.maps.Marker({
                position: {
                    lat: ourSession.userLocation['latitude'],
                    lng: ourSession.userLocation['longitude']
                },
                map: ourMap,
                title: 'Current Location',
                icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
            });
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');

            google.maps.event.addListener(currentLocation, 'click', function() {
                ourMap.setZoom(17);
                ourMap.setCenter(currentLocation.getPosition());
            });

            directionsDisplay.setMap(ourMap);

            var onChangeHandler = function() {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            startTab.addEventListener('change', onChangeHandler);
            endTab.addEventListener('change', onChangeHandler);

            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                directionsService.route({
                    origin: document.getElementById('start').value,
                    destination: document.getElementById('end').value,
                    travelMode: 'DRIVING'
                }, function(response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            getBathrooms(ourSession.userLocation['latitude'], ourSession.userLocation['longitude'])
                .then(bathrooms => bathrooms.forEach(bathroom => {

                    const infowindow = new google.maps.InfoWindow();
                    const contentString = `This location is ${reverseGeocoding(bathroom['latitude'], bathroom['longitude'])}`;;
                    const newMarker = new google.maps.Marker({
                        position: {
                            lat: bathroom['latitude'],
                            lng: bathroom['longitude'],
                        },
                        map: ourMap,
                        title: ourSession.bathrooms[bathroom.name],
                    })

                    google.maps.event.addListener(newMarker, 'click', function() {
                        // ourMap.setZoom(15);
                        // ourMap.setCenter(newMarker.getPosition());
                    });

                    return makeInfoWindowEvent(ourMap, infowindow, contentString, newMarker)
                    return newMarker;
                }));
        });
    }
}

function getBathrooms(lat, long) {
    const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?per_page=30&unisex=true&lat=${lat}&lng=${long}`;

    return (fetch(url)
        .then(res => res.json())
        .then(bathrooms => bathrooms.map(bathroom => {
            ourSession.bathroomCount += 1
            ourSession.bathrooms.push((({
                id,
                name,
                street,
                city,
                state,
                latitude,
                longitude,
                distance,
                approved,
                unisex,
                comment
            }) => ({
                id,
                name,
                street,
                city,
                state,
                latitude,
                longitude,
                distance,
                approved,
                unisex,
                comment
            }))(bathroom))
            
            return (({
                id,
                name,
                street,
                city,
                state,
                latitude,
                longitude,
                distance,
                approved,
                unisex,
                comment
            }) => ({
                id,
                name,
                street,
                city,
                state,
                latitude,
                longitude,
                distance,
                approved,
                unisex,
                comment
            }))(bathroom);
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

/*  Function Delcarations  -->  News + Relevant Info  */


// function getMarkerDirectino() {
//     google.maps.event.addListener(newMarker, 'click', function() {

//     const directionsService = new google.maps.DirectionsService;
//     const directionsRenderer = new google.maps.DirectionsRenderer;

//     directionsRenderer.setMap(ourMap);
//     calculateAndDisplayRoute(directionsService, directionsRenderer);


//         directionsService.route({
//         origin: document.getElementById('start').value,
//         destination: reverseGeocoding(newMarker.getPosition().lat(), newMarker.getPosition().lng()),
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: 'DRIVING'
//       }, function(response, status) {
//         if (status === 'OK') {
//           directionsRenderer.setDirections(response);
//           var route = response.routes[0];
//           var summaryPanel = document.getElementById('directions-panel');
//           summaryPanel.innerHTML = '';
//           // For each route, display summary information.
//           for (var i = 0; i < route.legs.length; i++) {
//             var routeSegment = i + 1;
//             summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
//                 '</b><br>';
//             summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//             summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//             summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//           }
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       });


//   });
// }

function makeInfoWindowEvent(map, infowindow, contentString, newMarker) {
    google.maps.event.addListener(newMarker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}

function reverseGeocoding(lat, long) {

    fetch(`https://us1.locationiq.com/v1/reverse.php?key=48447f262ef7c7&lat=${lat}&lon=${long}&format=json`)
        .then(response => response.json())
        .then(json => {
            // console.log(json.display_name)
            return json.display_name;
        })
}

/*  Function Delcarations  -->  News + Relevant Info  */


/* Reverse Geocoding API */




//