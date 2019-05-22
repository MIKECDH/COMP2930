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
        var city = getInputVal('city');
        // var email = getInputVal('email');
        var category = getInputVal('category').replace(/\s/g, '');
        console.log(getInputVal('category').replace(/\s/g, ''));
        var eventName = getInputVal('eventName');
        var role = getInputVal('role');
        var volunteers = getInputVal('volunteerCount');
        var description = getInputVal('description');
        var date = getInputVal('date');
        // var image = getInputVal('file1');
        console.log('grabbed data');
        if (phone !="" && address !="" && city != "" && eventName !="" && role !="" && category !="" && volunteers !="" && description !="" && date != ""){
            saveMessage(phone, address, city, eventName, role, category, volunteers, description, date);
            console.log('saved data');
            alert('Posted successfully');
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
      function saveMessage(phone, address, city, eventName, role, category, volunteers, description, date){
        var newPostsRef = postsRef.push();
        newPostsRef.set({
          eventName: eventName,
          category: category,
          role: role,
          phone:phone,
          address: address,
          city: city,
          volunteers: volunteers,
          description: description,
          applicants: 0,
          date: date
        });
    
        
      }
