//this establishes the map options
var mylatlng = { lat: 38.346, lng: -0.4907 };
var mapOptions = {
	center: mylatlng,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// this creates the map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

// this creates an object to be used with the route method and to receive a result for the request.
var directionService = new google.maps.DirectionsService();

// this displays the route 
var directionsDisplay = new google.maps.DirectionsRenderer(); 

directionsDisplay.setMap(map);

function calcRoute() {
    var request = { 
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING,// can change to walking, cycling or transit
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
}