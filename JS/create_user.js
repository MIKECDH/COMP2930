(function(){

    var firebase = app_firebase;

    // for the current user
    // create this user node in the datebase

    firebase.auth().onAuthStateChanged(function(user){
        console.log ("inside create_user.js line 9");
        database.ref("users/"+user.uid).update(
		{
        "name":user.displayName, 
         "email":user.email
        });
    });
})()
