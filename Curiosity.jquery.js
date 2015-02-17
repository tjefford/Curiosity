/*
** Curiosity - Location Detection
** Version 1.0.5 - February 17, 2015
** Tyler Jefford (tjefford@me.com)
*/

(function($){
	
	$.fn.Curiosity = function (action){
		
		//Variables
		var user_streetNumber,
				user_street,
				user_zipCode,
				user_neighborhood,
				user_county,
				user_city,
				user_state,
				user_state_short,
				user_country,
				user_country_short,
				user_format_address,
				location_type,
				hault = 0, //This is for error counting
				Rover = this; //Rover refers to the element being being called with Curiosity.
				
		if(action === 'locate'){
		
			var geocoder;	 
		
			//Get the latitude and the longitude;
			function successFunction(position) {
			    var lat = position.coords.latitude;
			    var lng = position.coords.longitude;
			    codeLatLng(lat, lng)
			}
			
			//If error, log it
			function errorFunction(){
				console.log("Geocoder failed access to location");
				return Rover.html('We were unable to locate you.');
			}
			
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
			}
			
			//Initialize Location
			window.onload = function initialize() {
				geocoder = new google.maps.Geocoder();
			}
			
			//Reverse Lookup
			function codeLatLng(lat, lng) {
				var latlng = new google.maps.LatLng(lat, lng);
				if(!geocoder){ //If the onload fails to initiate, start up a new geocoder instance. 
					geocoder = new google.maps.Geocoder();
				}
				geocoder.geocode({'latLng': latlng}, function(results, status) {
					//If google retuerns 200
					if (status == google.maps.GeocoderStatus.OK) {

						//Set location data into variables
						var ZeroCounter = results[0].address_components.length;
						var Picker = results[0].address_components;
						
						//Loop through one data object to pick out a data type
						//This is much more accurate than using the data index
						for(var p = 0; p < ZeroCounter; p++){				
							
							//Address Data
							if( Picker[p].types == 'street_number' ){
								user_streetNumber = Picker[p].long_name;
							}
							
							//Street Name Data
							if( Picker[p].types == 'route' ){
								user_street = Picker[p].long_name;
							}
							
							//Zip Code Data
							if( Picker[p].types == 'postal_code' ){
								user_zipCode = Picker[p].long_name;
							}
							
							//Neighborhood Data
							if( Picker[p].types == 'neighborhood,political' ){
								user_neighborhood = Picker[p].long_name;
							}
							
							//County
							if( Picker[p].types == 'administrative_area_level_2,political' ){
								user_county = Picker[p].long_name;
							}
							
							//City Name Data
							if( Picker[p].types == 'locality,political' ){
								user_city = Picker[p].long_name;
							}
							
							//State Data
							if( Picker[p].types == 'administrative_area_level_1,political' ){
								user_state = Picker[p].long_name;
								user_state_short = Picker[p].short_name;
							}
							
							//Country Data
							if( Picker[p].types == 'country,political' ){
								user_country = Picker[p].long_name;
								user_country_short = Picker[p].short_name;
							}	
						}//end loop
						
						//Get additional information
						
						//Formatted Street Address
						if(results[0].formatted_address){
							user_format_address = results[0].formatted_address;
						}
						
						//Location Type
						if(results[0].geometry.location_type){
							location_type = results[0].geometry.location_type;
						}
						
						//Loop through all Zone Ranges
						if(hault == 0){
							
							var snap = new Object();
							
							if(user_streetNumber){
								snap.street_number = user_streetNumber;
							}
							
							if(user_street){
								snap.street_name = user_street;
							}
							
							if(user_city){
								snap.city = user_city;
							}
							
							if(user_state){
								snap.state = {'long': user_state, 'short': user_state_short};
							}
							
							if(user_zipCode){
								snap.zipcode = user_zipCode;
							}
							
							if(user_neighborhood){
								snap.neighborhood = user_neighborhood;
							}
							
							if(user_county){
								snap.county = user_county;
							}
							
							if(user_country){
								snap.country = {'long': user_country, 'short': user_country_short};
							}
							
							if(user_format_address){
								snap.full_address = user_format_address;
							}
							
							if(latlng){
								snap.latlon = {'latitude': latlng.k, 'longitude': latlng.D};
							}
							
							if(location_type){
								snap.location_type = location_type;
							}
							
							
							var json = JSON.stringify(snap);
							
							Rover.text(json);
							
						}
					}
					else{
						//If Google retuerns a status other than 200
						return Rover.html('We were unable to locate you.');
					}
				});
			}
			
		}//End of locate action
		
	} //End Curiosity
	
}(jQuery));