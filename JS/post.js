// Our web apps Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCnWEHvBytIj-gxgiE2XeM2Wg9rWRJ25oM",
    authDomain: "volunteerstudio-ccb6f.firebaseapp.com",
    databaseURL: "https://volunteerstudio-ccb6f.firebaseio.com",
    projectId: "volunteerstudio-ccb6f",
    storageBucket: "volunteerstudio-ccb6f.appspot.com",
    messagingSenderId: "218989674613",
    appId: "1:218989674613:web:748f631cc88eac08"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference messages collection
  var database = firebase.database();
  var postsRef = database.ref('users/' + userId + '/posts');
  
  // Listen for form submit
  document.getElementById('submit').addEventListener('click', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var phone = getInputVal('phone');
    var location = getInputVal('location');
    var email = getInputVal('email');
    var eventName = getInputVal('eventName');
    var volunteers = getInputVal('volunteerCount');
    var description = getInputVal('description');
    var qualifications = getInputVal('qualification');
    var image = getInputVal('file1');
    console.log('grabbed data');
    
    // Save message
    saveMessage(name, phone, location, email, eventName, volunteers, description, qualifications, image);
    console.log('saved data');
  
    // Clear form
    document.getElementById('postForm').reset();
  }
  
  // Function to get get form values
  function getInputVal(id){
    console.log('grabbed ' + id);
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, phone, location, email, eventName, volunteers, description, qualifications, image){
    var newPostsRef = postsRef.push();
    newPostsRef.set({
      name: name,
      phone:phone,
      location: location,
      email: email,
      eventName: eventName,
      volunteers: volunteers,
      description: description,
      qualifications: qualifications,
      image: image
    });
  }

function getList(category){
    var dbRef = firebase.database().ref(category+ "/");
    var promise = dbRef.once('value', function(snap){
        list = snap.val();
    });
    promise.then(function(){
        Display
    })
}
  