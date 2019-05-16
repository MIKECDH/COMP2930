    // Reference messages collection
    var database = firebase.database();
    //   var currentUser;
      var postRef; 
      
      
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        // currentUser = user.uid;
        // console.log(currentUser);
         postsRef = database.ref('Users/' + user.uid);
         postsRef.on('value', function(snapshot) {
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
      function editForm(e){
        e.preventDefault();
      
        // Get values
        // var name = getInputVal('name');
        var editName = getInputVal('editName');
        var editDescription = getInputVal('editDescription');
        
        console.log('grabbed data');

        if (editName !="" && editDescription !=""){
            saveMessage(editName, editDescription);
            console.log('saved data');
            // Clear form
            // document.getElementById('postForm').reset();
        }else{
            alert("Please input all the blank!");
        }

        

      }
      
      // Function to get get form values
      function getInputVal(id){
        console.log('grabbed ' + id);
        return document.getElementById(id).value;
        console.log(document.getElementById(id).value);
      }
      
      // Save message to firebase
      function saveMessage(editName, editDescription){
        var newPostsRef = postsRef; 
        newPostsRef.update({
          name: editName,
          description:editDescription
        });        


      }



