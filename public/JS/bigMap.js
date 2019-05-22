//The following are variables declared for later use (names are literal)
var map, infoWindow, geocoder;

//The following function initializes the map and loads markers based on data grabbed from the database.
function initMap() {
  //The following line initializes google maps and sets a default center at downtown vancouver
  map = new google.maps.Map(document.getElementById('gMap'), {
    center: {
      lat: 49.2827,
      lng: -123.1207,
    },
    zoom: 12,
    disableDefaultUI: true
  });
  //The info window is used to display the users current location if permission is allowed.
  infoWindow = new google.maps.InfoWindow();

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

  //The following for each loops reference our database and navigate through the data structure to grab data
  var query = firebase.database().ref("Users").orderByKey();
  query.once("value")
    //when a value is received from the query the nested function is run
    .then(function (snapshot) {
      //The following navigates through all of the users
      snapshot.forEach(function (childSnapshot) {
        //The following navigates through each users posts
        childSnapshot.child('posts').forEach(function (posts) {
          //initializes google geocoding
          geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            'address': posts.val().address
          }, function (results, status) {
            if (status == 'OK') {
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              marker.addListener('click', function () {
                let contentString = '<div id="content">' +
                  '<div id="siteNotice">' +
                  '</div>' +
                  '<h3 id="firstHeading" class="firstHeading"><b>' + childSnapshot.val().name + '</b></h3>' +
                  '<div id="bodyContent">' +
                  '<p>' + posts.val().address + '</p><br><b>Event Name :</b> ' + posts.val().eventName +
                  '</div>' +
                  '</div>';
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
              });
            } 
          });
        });
      });
    });

}