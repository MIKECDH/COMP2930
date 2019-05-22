var database = firebase.database();
var postRef;
//The following code builds the profile page based on the logged in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //The following references the KEY that stores the value of the users profile picture stored in firebase storage
    var firebaseRef = firebase.database().ref("Users/" + user.uid + '/userImage');
    firebaseRef.once('value').then(function (snapshot) {
      if (snapshot.val() != '') {
        document.querySelectorAll('img')[1].src = snapshot.val();
      }
    });
    
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
        //The following code alerts you when the file loading is complete
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
            }, 750);
          });
        }
      });
    });
  }
});


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    postsRef = database.ref('Users/' + user.uid);
    postsRef.on('value', function (snapshot) {
      $('#nameUser').html(snapshot.val().name);
      $('#descriptionUser').html(snapshot.val().description);
    });
  }
});

// Listen for form submit
document.getElementById('saveButton').addEventListener('click', editForm);

// Submit form
function editForm(e) {
  e.preventDefault();
  var editDescription = getInputVal('editDescription');
  if (editDescription != "") {
    saveMessage(editDescription);
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

//The following code ensures the user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    postsRef = database.ref('Users/' + user.uid);
    postsRef.once('value').then(function (snapshot) {
      //Upon confirmation of user login we build their profile from database
      snapshot.child('experience').forEach(function (snapshot1) {
        //The following code builds the portfolio via JSDOM based on values from the database
        var mainDiv = document.getElementById('experienceVolunteer');
        var divTitleRow = document.createElement('div');
        var divRoleRow = document.createElement('div');
        var divDateRow = document.createElement('div');
        $(divTitleRow).attr('class', 'row');
        $(divRoleRow).attr('class', 'row');
        $(divDateRow).attr('class', 'row');
        var node = document.createElement('h4');
        var node1Text = document.createTextNode(snapshot1.val().eventName);
        node.appendChild(node1Text);
        divTitleRow.appendChild(node);
        divTitleRow.style.marginBottom="20px";
        divTitleRow.style.textAlign="center";

        var divFirst=document.createElement('div');
        var roleTitle = document.createElement('div');
        var roleNode = document.createTextNode('Roles');
        roleTitle.appendChild(roleNode);
        roleTitle.style.fontWeight="bold";
        $(divFirst).attr('class', 'col-xs-3');
        divFirst.appendChild(roleTitle);
        divRoleRow.appendChild(divFirst);
        var divSecond=document.createElement('div');
        var node2 = document.createElement('p');
        var node2Text = document.createTextNode(snapshot1.val().role);
        node2.appendChild(node2Text);
        $(divSecond).attr('class', 'col-xs-9');
        divSecond.appendChild(node2);
        divRoleRow.appendChild(divSecond);
        divRoleRow.style.textAlign="left";

        var divThird=document.createElement('div');
        var dateTitle = document.createElement('div');
        var dateNode = document.createTextNode('Date');
        dateTitle.appendChild(dateNode);
        dateTitle.style.fontWeight="bold";
        $(divThird).attr('class', 'col-xs-3');
        divThird.appendChild(dateTitle);
        divDateRow.appendChild(divThird);
        var divFourth=document.createElement('div');
        var node3 = document.createElement('p');
        var node3Text = document.createTextNode(snapshot1.val().date);
        node3.appendChild(node3Text);
        $(divFourth).attr('class', 'col-xs-9');
        divFourth.appendChild(node3);
        divDateRow.appendChild(divFourth);
        divDateRow.style.textAlign="left";

        var bar=document.createElement('hr');
        mainDiv.appendChild(divTitleRow);
        mainDiv.appendChild(divRoleRow);
        mainDiv.appendChild(divDateRow);
        mainDiv.appendChild(bar);
      });
    });
  }
});
//The following function ensures the document is ready and hides the modal on click
$(document).ready(function () {
  $(document).on('click', '#buttonSave', function () {
    changeButtonAction();
  });
  $('#buttonClose').click(function () {
    $('#myModal2').modal('hide');
  });
  $('#buttonClose1').click(function () {
    $('#myModal2').modal('hide');
  });
});

