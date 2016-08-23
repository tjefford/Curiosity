/*
** Curiosity - Location Detection
** Version 2.1 - August 22, 2016
** Tyler Jefford (tylerjefford.com)
*/

(function($){

	$.fn.Curiosity = function (){

		// Variables
		var userLocation = [],
        geocoder
				$this = (this);

		// Get the Lat / Lon pass to codeLatLng function
		function successFunction(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    codeLatLng(lat, lng)
		}

    // Log Errors to the Console, please.
		function errorFunction(){
			console.log('Curiosity had an issue locating you, please refresh');
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		}

		// Initialize Location
		window.onload = function initialize() {
			geocoder = new google.maps.Geocoder();
		}

		// Reverse Lookup
		function codeLatLng(lat, lng) {
		  var latlng = new google.maps.LatLng(lat, lng);
      if(!geocoder){ //If the onload fails to initiate, start up a new geocoder instance.
			  geocoder = new google.maps.Geocoder();
		  }

      geocoder.geocode({'latLng': latlng}, function(results, status) {
				//If google retuerns 200
				if (status == google.maps.GeocoderStatus.OK) {

					// Set location data into variables
					// Picker will hold the standard address data provided by google
					// There is more data returned, and you can see it by dumping `results`
				  var Picker = results[0].address_components;

					// Each location has unique attributes, so lets loop through all of them
					// and pick the data we want to use.
					for(var p = 0; p < Picker.length; p++){

						// Street Number (approx.) Data
						if( Picker[p].types == 'street_number' ){
							userLocation.street_number = Picker[p].long_name;
						}

						// Street Name Data
						if( Picker[p].types == 'route' ){
							userLocation.street = Picker[p].long_name;
						}

						// Neighborhood Data
						if( Picker[p].types == 'neighborhood,political' ){
							userLocation.neighborhood = Picker[p].long_name;
						}

						// County Name Data
						if( Picker[p].types == 'administrative_area_level_2,political' ){
							userLocation.county = Picker[p].long_name;
						}

						// Zip Code Data
						if( Picker[p].types == 'postal_code' ){
							userLocation.zip = Picker[p].long_name;
							userLocation.zone = userLocation.zip.substring(0, 3);
						}

						// City Name Data
						if( Picker[p].types == 'locality,political' ){
							userLocation.city = Picker[p].long_name;
						}

						// State Data
						if( Picker[p].types == 'administrative_area_level_1,political' ){
							userLocation.state = Picker[p].long_name;
							userLocation.state_short = Picker[p].short_name;
						}

						// Country Data
						if( Picker[p].types == 'country,political' ){
							userLocation.country = Picker[p].short_name;
						}

						// Formatted Address Data (aprox.)
						if( results[0].formatted_address != "" ){
							userLocation.formetted_address = results[0].formatted_address;
						}

						// Include the LatLng too.
						userLocation.latitude = lat;
						userLocation.longitude = lng;
					}

          // Do anything you want now. You have the data!!
					console.log(userLocation);

				}else{
  				// Something didnt work with google. Try something else
  				errorFunction();
				}
		  });
		}

	} //End Curiosity

}(jQuery));
