// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow,latitude,longitude, geocoder;

var query = firebase.database().ref("Users").orderByKey();
query.once("value")
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        childSnapshot.child('posts').forEach(function(posts){
            console.log(posts.val().address);
        })
    });
});

geocoder = new google.maps.Geocoder();
var add = "3700 willingdon ave";

geocoder.geocode( { 'address': add}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.long();
    console.log(latitude);
    console.log(longitude);    
    } 
}); 

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 49.2827,
            lng: -123.1207,
        },
        zoom: 12,
        disableDefaultUI: true
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var posMarker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your current position'
            });

            posMarker.addListener('click', function () {
                let posMarkerContent = 'Current Location';
                infoWindow.setContent(posMarkerContent);
                infoWindow.open(map, posMarker);
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location.');
            map.setCenter(pos);
            infoWindow.open(map);
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    let metrotownLatLng = {
        lat: 49.2276,
        lng: -123.0076
    };
    var marker = new google.maps.Marker({
        position: metrotownLatLng,
        map: map,
        title: 'Volunteer Here!'
    });
    marker.addListener('click', function () {
        let contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3 id="firstHeading" class="firstHeading">Canadian Blood Services</h3>' +
            '<div id="bodyContent">' +
            '<p>We are looking for individuals to help us find blood donors! Did you know....</p>' +
            '<p>For more information click the following, <a href="https://www.blood.ca/en">' +
            'https://www.blood.ca/en</a></p>' +
            '</div>' +
            '</div>';
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
