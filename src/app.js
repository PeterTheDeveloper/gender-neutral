console.log("JavaScript is Connected!");

  const startTab = document.getElementById('start')
  const endTab = document.getElementById('end')
  window.onload = function() {
    getLocation();
    
  }
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => console.log(position));
  }
  
  function initMap() { //stay in function declaration for map-related tasks.
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    const onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    startTab.addEventListener('change', onChangeHandler);
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
  
  
  
  
  
//   Use Bathroom API Below here;

//Get Users Location 
if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			
			
			getBathrooms(lat, long);
		});
};

function getBathrooms(lat, long){
    const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?per_page=10&unisex=true&lat=${lat}&lng=${long}`;
    
    return fetch(url).then(res=>res.json());
}