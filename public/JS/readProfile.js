
var database = firebase.database();
var postRef;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var firebaseRef = firebase.database().ref("Users/" + user.uid + '/userImage');
    firebaseRef.once('value').then(function (snapshot) {
      if (snapshot.val() != '') {
        document.querySelectorAll('img')[1].src = snapshot.val();
      }
    })

    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener("change", function (e) {
      var file = e.target.files[0];
      //create storage ref to the firebase storage
      var storageRef = firebase.storage().ref('User Images').child(file.name);
      var task = storageRef.put(file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      task.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + percentage + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        if (percentage == 100) {
          alert("All Done Loading!");
          $('#saveButton').click(function () {
            storageRef.getDownloadURL().then(function (url) {
              firebaseRef.transaction(function () {
                return url;
              });
              document.querySelectorAll('img')[1].src = url;
            }).catch(function (error) {
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;

                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
            setTimeout(function () {
              window.open('portfolio.html', '_self');
            }, 1000);
          })
        }
      });
    });
  } else {
    //The user is not logged in.
  }
});


//RYANS FUNCTIONS
// Reference messages collection
//   var currentUser;


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // currentUser = user.uid;
    // console.log(currentUser);
    postsRef = database.ref('Users/' + user.uid);
    postsRef.on('value', function (snapshot) {
      console.log(snapshot);
      console.log(snapshot.val());
      $('#nameUser').html(snapshot.val().name);
      $('#descriptionUser').html(snapshot.val().description);
    })
    console.log(user);

  } else {
    // User not logged in or has just logged out.
  }
});

// Listen for form submit
document.getElementById('saveButton').addEventListener('click', editForm);

// Submit form
function editForm(e) {
  e.preventDefault();

  // Get values
  // var name = getInputVal('name');
  // var editName = getInputVal('editName');
  var editDescription = getInputVal('editDescription');

  console.log('grabbed data');

  if (editDescription != "") {
    console.log('working?');
    saveMessage(editDescription);
    console.log('saved data');
    // Clear form
    // document.getElementById('postForm').reset();
  } 
}

// Function to get get form values
function getInputVal(id) {
  console.log('grabbed ' + id);
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(editDescription) {
  var newPostsRef = postsRef;
  newPostsRef.update({
    description: editDescription
  });
}
