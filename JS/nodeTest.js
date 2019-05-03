var config = {
    apiKey: "AIzaSyCnWEHvBytIj-gxgiE2XeM2Wg9rWRJ25oM",
    authDomain: "volunteerstudio-ccb6f.firebaseapp.com",
    databaseURL: "https://volunteerstudio-ccb6f.firebaseio.com",
    projectId: "volunteerstudio-ccb6f",
    storageBucket: "volunteerstudio-ccb6f.appspot.com",
    messagingSenderId: "218989674613"
  };
  firebase.initializeApp(config);

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var db = admin.database();
// var ref = db.ref("server/saving-data/fireblog");

