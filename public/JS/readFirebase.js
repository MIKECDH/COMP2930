var x = 0;
var postRef;
var database = firebase.database();

var query = firebase.database().ref("Users").orderByKey();
query.once("value")
  .then(function (snapshot0) {
    snapshot0.forEach(function (childSnapshot) {
      var name0 = childSnapshot.val();

      console.log(name0);

      childSnapshot.child('posts').forEach(function (snapshot) {
        var val = snapshot.val();
        console.log(val.description);
        // Creating a table and tr element using JSDOM
        var table = document.getElementById('mainTable');
        var tr = document.createElement('tr');
        // The first cell in the row grabbing poster name from database
        var td4 = document.createElement('td');
        var node4 = document.createTextNode(x);
        td4.appendChild(node4);
        // The first cell in the row grabbing poster name from database
        var td = document.createElement('td');
        var node = document.createTextNode(name0.name);
        td.appendChild(node);
        // The second cell in the row grabbing the event name from database
        var td0 = document.createElement('td');
        var node0 = document.createTextNode(val.eventName);
        td0.appendChild(node0);
        // The third cell in the row grabbing the event address from database
        var td1 = document.createElement('td');
        var node1 = document.createTextNode(val.address);
        td1.appendChild(node1);
        // The fourth cell in the row grabbing the date of the event from database
        var td2 = document.createElement('td');
        var node2 = document.createTextNode('today!');
        td2.appendChild(node2);
        // The fifth cell in the row grabbing the number of volunteers needed
        var td3 = document.createElement('td');
        var node3 = document.createTextNode(val.volunteers);
        td3.appendChild(node3);

        // Appending the previous cells to tr
        tr.appendChild(td4);
        tr.appendChild(td);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.className = 'clickable-row' + x;
        table.appendChild(tr);

        $(".clickable-row" + x).click(function () {
          var divOneText = $('.HideOnClick').html();
          var divTwoText = $('.ShowOnClick').html();
          if (divOneText != '' && divTwoText != '') {
            $('.HideOnClick').html(divTwoText).css("display", "block");
            $('.ShowOnClick').html(divOneText);
          }
  
          $('#descriptPara').html(val.description);
          $('#rolePara').html(val.role);
          $('#userEmail').html(name0.email)

          $('#applyButton').attr('id', 'applyButton' + x);
          $('#applyButton' + x).click(function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {               
              console.log(user.email);
              //post uid
              console.log(snapshot.key);
              //post owner uid
              console.log(childSnapshot.key);
              postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/applicants');

              postsRef.transaction(function(currentApplicants) {               
                return (currentApplicants) + 1;
              });

              } else {
              }
            });
          })

        });

        
        x++;

        console.log('success');
      });
    });
  });