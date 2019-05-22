var map2, eventPosition, geocoder;

//This function initializes the small map when details of an event are clicked.
function initLittleMap() {
    //The following jquery is to ensure the DOM is ready before running the function.
    $(function () {
        console.log('initializing map');
        //The following declares a variable for googles geocode api
        geocoder = new google.maps.Geocoder();
        //The following line grabs the address of the post loaded from the database, we added vancouver to the end to increase accuracy
        var eventAddress = document.getElementById('theLocation').textContent + ' Vancouver';
        //The following line initializes googles map api and by defaults set the center to vancouver.
        map2 = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 49.2827,
                lng: -123.1207,
            },
            zoom: 12,
            disableDefaultUI: true
        });
        //The following line initializes geocode api and sends the post address and based on the result, creates a marker on the map
        //The marker created is based on the address sent, and the map is then centered to the received location
        geocoder.geocode({
            'address': eventAddress
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log('initializing marker');
                var marker = new google.maps.Marker({
                    map: map2,
                    position: results[0].geometry.location
                });
                eventPosition = results[0].geometry.location;
                map2.setCenter(eventPosition);
            }
        });
    });
}
//The following function is to handle errors when the user does not give permission to their location.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map2);
}