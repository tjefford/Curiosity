## Synopsis

A jQuery plugin to detect a users location, ping google for a reverse lookup and return detailed data about the location. (street, state, zip, etc.)

## Getting Started

Include jQuery, Google Maps js API and Curiosity.jQuery.js in your project.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<YOUR KEY HERE>" async=""></script>
<script type="text/javascript" src="Curiosity.jQuery.js"></script>
```
Next just call the function in your javascript. In our example, we have it embedded in the index.html file.

```js
$(‘html’).Curiosity();
```

## Data Returned
Data will var based on your location (obviously)

- Street Number
- Street Name
- Neighborhood
- City
- County
- State
- State Short
- Country
- Zip
- Zone (first three digits of zipcode)
- Formatted address
- Latitude / Longitude

## Tests

You should have your location services turned on, otherwise chrome will display this message:

```
Curiosity had an issue locating you, please refresh
```

Within Chrome you can emulate sensors which will allow you to test different locations based on a Lat/Lon pair, This will allow you to test for many types of locations, not just where you are working.

## License

Use it, Don't complain.
