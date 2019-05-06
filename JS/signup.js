
          // firebase email authentification global variable
          var firebaseEmailAuth;
          // firebase db module global variable
          var firebaseDatabase;
          // information of user. object type
          var userInfo;

          // Initialize Firebase
          var firebaseConfig = {
            apiKey: "AIzaSyBxb3hn6W44rYdwKBrIuDYrwRRAzWz_vmc",
            authDomain: "test-b1607.firebaseapp.com",
            databaseURL: "https://test-b1607.firebaseio.com",
            projectId: "test-b1607",
            storageBucket: "test-b1607.appspot.com",
            messagingSenderId: "1086932596636",
            appId: "1:1086932596636:web:ebb10fad65864e36"
          };
          firebase.initializeApp(firebaseConfig);

          firebaseEmailAuth = firebase.auth;
          firebaseDatabase = firebase.database;
          

          $(document).ready(function() {

            // function working when submit button is clicked
            $(document).on('click', '.join', function() {
              var email=$('#email').val();
              var password=$('#pwd').val();
              name=$('#name').val();

              
              firebaseEmailAuth.createUserWithEmailAndPassword(email,password).then(function(user) {

                userInfo = user;

                console.log("userInfo/"+userInfo);
                console.log("userInfo.currentUser/"+userInfo.currentUser);
                console.log("userInfo.uid/"+userInfo.uid);

                //working when it successes
                logUser();

              }, function(error) {
                //working when it fails
                var errorCode=error.code;
                var errorMessage=error.message;
                alert(errorMessage);
              });

              function logUser() {
                var ref=firebaseDatabase.ref("user/"+userInfo.uid);

                //type of saving
                var obj={
                  name:name,
                  userkey:userInfo.uid
                };

                ref.set(obj);
                alert("success");

                window.location.href = "/index.html"                
              }

            });
          });