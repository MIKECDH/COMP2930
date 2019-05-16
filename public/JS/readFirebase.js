var x = 0;
var postRef;
var database = firebase.database();

var query = firebase.database().ref("Users").orderByKey();
query.once("value")
  .then(function (snapshot0) {
    snapshot0.forEach(function (childSnapshot) {
      var name = childSnapshot.val();
      console.log(name);
      
      childSnapshot.child('posts').forEach(function (snapshot) {
        // POSTS
        var val = snapshot.val();
        // Creating a table and tr element using JSDOM
        var table = document.getElementById('mainTable');
        var tr = document.createElement('tr');
        // The first cell in the row grabbing poster name from database
        var td4 = document.createElement('td');
        var node4 = document.createTextNode(x);
        td4.appendChild(node4);
        // The first cell in the row grabbing poster name from database
        var td = document.createElement('td');
        var node = document.createTextNode(name.name);
        td.appendChild(node);
        // The second cell in the row grabbing the event name from database
        var td0 = document.createElement('td');
        var node0 = document.createTextNode(val.eventName);
        td0.appendChild(node0);
        // The third cell in the row grabbing the city from database
        var td1 = document.createElement('td');
        var node1 = document.createTextNode(val.city);
        td1.appendChild(node1);
        // The fourth cell in the row grabbing the date of the event from database
        var td2 = document.createElement('td');
        var node2 = document.createTextNode(val.date);
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
          $.getScript( '../JS/geolocation.js');
          $('#script').attr('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDaqqjObPbLckB-N709lZtUOBmhZhgajGA&callback=initMap');
          var divOneText = $('.HideOnClick').html();
          var divTwoText = $('.ShowOnClick').html();
          if (divOneText != '' && divTwoText != '') {
            $('.HideOnClick').html(divTwoText).css("display", "block");
            $('.ShowOnClick').html(divOneText);
            $('#tableRow').html('');
          }
          //
          $('#buttonCategory').html(val.category);
          //

          $('#descriptPara').html(val.description);
          $('#rolePara').html(val.role);
          $('#userEmail').html(name.email);
          $('#theLocation').html(val.city);
          $('#theNumber').html(val.volunteers);
          // Grabs number of applicants from database
          $('#applicants').html(val.applicants + ' people are applied in this opportunity.');

          // Gives applybuttons unique ids
          $('#applyButton').attr('id', 'applyButton' + x);
          $('#firstButton').click(function () {
            $('#theLabel').html('To: ' + name.email);
          })

          $('#applyButton' + x).click(function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                //console.log(user.email);
                //post uid
                //console.log(snapshot.key);
                //post owner uid
                //console.log(childSnapshot.key);

                postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/applicants');

                postsRef.transaction(function (currentApplicants) {
                  return (currentApplicants + 1);
                });

                var postsRef2 = database.ref('Users/' + user.uid + '/apply');
                newPostsRef2 = postsRef2.push();
                newPostsRef2.set({
                  email: name.email,
                  postOwner: name.name,
                  event: val.eventName
                })

                window.setTimeout(function () {
                  window.open('volunteerpage.html', '_self');
                }, 500);

              } else {
                alert('please login to apply');
              }
            });
          })
          $('#backButton').click(function () {
            window.open('volunteerpage.html', '_self');
          });
        });
        x++;
      });
    });
  });




function sortCategory(category) {
  $('#' + category).click(function () {
    x = 0;
    var table = document.getElementById('mainTable');
    table.innerHTML = '';
    var query1 = firebase.database().ref("Users").orderByKey();
    query1.once("value")
      .then(function (snapshot0) {
        //console.log(snapshot0);
        snapshot0.forEach(function (snapshot1) {
          snapshot1.child('posts').forEach(function (snapshot2) {
            var value = snapshot2.val();
           //console.log(value);

            if (value.category == category) {
              // Creating a table and tr element using JSDOM
              var table = document.getElementById('mainTable');
              var tr = document.createElement('tr');
              // The first cell in the row grabbing poster name from database
              var td4 = document.createElement('td');
              var node4 = document.createTextNode(x);
              td4.appendChild(node4);
              // The first cell in the row grabbing poster name from database
              var td = document.createElement('td');
              var node = document.createTextNode(snapshot1.val().name);
              td.appendChild(node);
              // The second cell in the row grabbing the event name from database
              var td0 = document.createElement('td');
              var node0 = document.createTextNode(value.eventName);
              td0.appendChild(node0);
              // The third cell in the row grabbing the city from database
              var td1 = document.createElement('td');
              var node1 = document.createTextNode(value.city);
              td1.appendChild(node1);
              // The fourth cell in the row grabbing the date of the event from database
              var td2 = document.createElement('td');
              var node2 = document.createTextNode(value.date);
              td2.appendChild(node2);
              // The fifth cell in the row grabbing the number of volunteers needed
              var td3 = document.createElement('td');
              var node3 = document.createTextNode(value.volunteers);
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
                  $('#tableRow').html('');
                }

                $('#descriptPara').html(value.description);
                $('#rolePara').html(value.role);
                $('#userEmail').html(snapshot1.email)
                // Grabs number of applicants from database
                $('#applicants').html(value.applicants + ' people are applied in this opportunity.');
                // Gives applybuttons unique ids
                $('#applyButton').attr('id', 'applyButton' + x);

                $('#firstButton').click(function () {
                  $('#theLabel').html('To: ' + snapshot1.email);
                })

                $('#applyButton' + x).click(function () {
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      //post uid
                      //console.log(snapshot.key);
                      //post owner uid
                      //console.log(childSnapshot.key);

                      postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/applicants');

                      postsRef.transaction(function (currentApplicants) {
                        return (currentApplicants + 1);
                      });


                      var postsRef2 = database.ref('Users/' + user.uid + '/apply');
                      newPostsRef2 = postsRef2.push();
                      newPostsRef2.set({
                        email: snapshot1.email,
                        postOwner: snapshot1.name,
                        event: value.eventName
                      })
                      window.setTimeout(function () {
                        window.open('volunteerpage.html', '_self');
                      }, 500);

                    } else {
                      alert('please login to apply');
                    }
                  });
                })
                $('#backButton').click(function () {
                  window.open('volunteerpage.html', '_self');
                });
              });
              x++;
            }
          });
        });
      });
  });
}
sortCategory('Seniors');
sortCategory('Disabilities');
sortCategory('Sports');
sortCategory('YouthDevelopment');
sortCategory('Environment');
sortCategory('Education');