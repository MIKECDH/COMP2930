var config = {
  apiKey: "AIzaSyCnWEHvBytIj-gxgiE2XeM2Wg9rWRJ25oM",
  authDomain: "volunteerstudio-ccb6f.firebaseapp.com",
  databaseURL: "https://volunteerstudio-ccb6f.firebaseio.com",
  projectId: "volunteerstudio-ccb6f",
  storageBucket: "volunteerstudio-ccb6f.appspot.com",
  messagingSenderId: "218989674613",
  appId: "1:218989674613:web:748f631cc88eac08"
};
firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// SIGN IN FOR FIREBASE
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      $('#user_login').modal('hide');

      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

// The start method will wait until the DOM is loaded.
// Inject the login interface into the HTML
ui.start("#firebaseui-auth-container", uiConfig);

// STATE CHANGED
firebase.auth().onAuthStateChanged(function (user) {
  firebase.database().ref("Users/" + user.uid).update({
    "name": user.displayName,
    "email": user.email
  });
});

function logout() {
  firebase.auth().signOut().then(function () {
    localStorage.setItem('uid', "");
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
  location.href = "index.html"

}

function checkProfileExists(success, fail) {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      let currentUser = firebase.auth().currentUser;
      //Check if the the Profile has been created yet in the database
      firebase.database().ref("Users/" + currentUser.uid).once("value", snapshot => {
        if (snapshot.exists()) {
          //The user already exists in Firebase.
          success(); //Call the success() function if the profile exists.
        } else {
          fail(); //Call the fail() function if the profile does not exist.
        }
      });
    } else {
      //The user is not logged in.
    }
  });
}

function checkLoggedIn(success, fail) {

  let user = firebase.auth().currentUser;
  if (user) {
    success();
    //The user is logged in, call the success function passed

  } else {
    fail();
    //The user is not logged in, call the fail function passed.
  }

}
/* function that changes the navbar based on if your logged in or not */
/* ALL PAGES USE THIS FUNCTION */
function loadnavbar() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //User is logged in
      $("#signup").hide();
      $("#signup2").hide();
      $("#login").hide();
      $("#login2").hide();
      $("#myprofile").show();
      $("#myprofile2").show();
      $("#logout").show();
      $("#logout2").show();
      $("#mylistings").show();
      $("#mylistings2").show();

      var navb = document.getElementsByClassName("navbar-nav");
      navb[0].style.visibility = "visible";
    } else {

      $("#myprofile").hide();
      $("#myprofile2").hide();
      $("#mylistings").hide();
      $("#mylistings2").hide();
      $("#logout").hide();
      $("#logout2").hide();
      $("#signup").show();
      $("#signup2").show();
      $("#login").show();
      $("#login2").show();
      var navb = document.getElementsByClassName("navbar-nav");
      navb[0].style.visibility = "visible";
    }
  });
}
// Called here because everypage has the navbar and needs this function to run
loadnavbar();