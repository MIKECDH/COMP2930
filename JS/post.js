// // Our web apps Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyCnWEHvBytIj-gxgiE2XeM2Wg9rWRJ25oM",
//     authDomain: "volunteerstudio-ccb6f.firebaseapp.com",
//     databaseURL: "https://volunteerstudio-ccb6f.firebaseio.com",
//     projectId: "volunteerstudio-ccb6f",
//     storageBucket: "volunteerstudio-ccb6f.appspot.com",
//     messagingSenderId: "218989674613",
//     appId: "1:218989674613:web:748f631cc88eac08"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
  // Reference messages collection
  var database = firebase.database();
//   var currentUser;
  var postRef;
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    // currentUser = user.uid;
    // console.log(currentUser);
     postsRef = database.ref('Users/' + user.uid + '/posts');
    } else {
      // User not logged in or has just logged out.
    }
  });
  
  // Listen for form submit
  document.getElementById('submitButton').addEventListener('click', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    // var name = getInputVal('name');
    var phone = getInputVal('phone');
    var address = getInputVal('address');
    // var email = getInputVal('email');
    var category = getInputVal('category');
    var eventName = getInputVal('eventName');
    var role = getInputVal('role');
    var volunteers = getInputVal('volunteerCount');
    var description = getInputVal('description');
    // var image = getInputVal('file1');
    console.log('grabbed data');
    if (phone !="" && address !="" && eventName !="" && role !="" && category !="" && volunteers !="" && description !=""){
        saveMessage(phone, address, eventName, role, category, volunteers, description);
        console.log('saved data');
        // Clear form
        document.getElementById('postForm').reset();
    }else{
        alert("Please input all the blank!");
    }
  }
  
  // Function to get get form values
  function getInputVal(id){
    console.log('grabbed ' + id);
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(phone, address, eventName, role, category, volunteers, description){
    var newPostsRef = postsRef.push();
    newPostsRef.set({
      eventName: eventName,
      category: category,
      role: role,
      phone:phone,
      address: address,
      volunteers: volunteers,
      description: description,
    });

    
  }

    // var rootRef = firebase.database().ref();
    // rootRef.once("value")
    //   .then(function(snapshot) {
    //     document.getElementById('thelabel').innerHTML = snapshot.child("posts/-LeEIGg-K9gInntyN72o/description").val();
    //   });