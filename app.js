//this establishes the map options
var mylatlng = { lat: 38.346, lng: -0.4907 };
var mapOptions = {
	center: mylatlng,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// this creates the map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
