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
		origin: document.getElementById("from").value,
		destination: document.getElementById("to").value,
		travelMode: google.maps.TravelMode.DRIVING, // can change to walking, cycling or transit
		unitSystem: google.maps.UnitSystem.IMPERIAL,
	};

	directionsService.route(request, function (result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			//this is for distance and time
			const output = document.querySelector("#output");
			output.innerHTML =
				"<div class='alert-info'>From: " +
				document.getElementById("from").value +
				".<br />To: " +
				document.getElementById("to").value +
				".<br /> Driving distance <i class='fas fa-road'></i> : " +
				result.routes[0].legs[0].distance.text +
				".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
				result.routes[0].legs[0].duration.text +
				".</div>";

			//this displays the route
			directionsDisplay.setDirections(result);
		} else {
			//this deletes the route from the map
			directionsDisplay.setDirections({ routes: [] });
			map.setCenter(myLatLng);
			output.innerHTML =
				"<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
		}
	});
}

// autocomplete for every input

var options = {
	types: ["(cities)"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
