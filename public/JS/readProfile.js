

var database = firebase.database();
var postRef; 
var user;

// Read current user name from firebase and display
firebase.auth().onAuthStateChanged(function (user) {
  console.log(user.displayName);
  $('#name').html(user.displayName);
  });
    
  
  // Listen for form submit
  document.getElementById('saveprofile').addEventListener('click', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
    var name = getInputVal('name');
    var description = getInputVal('description');
    console.log('grabbed data');

    if (name !="" && description !=""){
        saveMessage(name, description);
        console.log('saved data');
        document.getElementById('saveprofile').reset();
    }else{
        // alert("Please input all the blank!");
    }
  }

  
  // Save message to firebase
  function saveMessage(name, description){
    var newPostsRef = postRef.push();
    newPostsRef.set({
      name: name,
      description: description
    });

    
  }


