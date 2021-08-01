var myLatLng = { lat: 33.81223, lng: -117.91893 };
var mapOptions = {
	center: myLatLng,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//this creates the map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

var directionsService = new google.maps.DirectionsService();

//this displays  the route
var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
	var request = {
		origin: document.getElementById("from").value,
		destination: document.getElementById("to").value,
		travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
		unitSystem: google.maps.UnitSystem.IMPERIAL,
	};

	//pass the request to the route method
	directionsService.route(request, function (result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			//Get distance and time
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
			//this delete route from map
			directionsDisplay.setDirections({ routes: [] });
			map.setCenter(myLatLng);

			//this shows the error message
			output.innerHTML =
				"<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
		}
	});
}

//create autocomplete objects for all inputs
var options = {
	types: ["(cities)"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
