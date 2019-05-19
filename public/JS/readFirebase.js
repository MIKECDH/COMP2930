var x = 0;
var y = 0;
var postRef;
var database = firebase.database();
var userProfilePic;

/**
 * Yun's code for button
 * 
 */
var emailFirst;
var emailSecond;
// end of Yun's code

var query = firebase.database().ref("Users").orderByKey();
query.once("value")
  .then(function (snapshot0) {
    snapshot0.forEach(function (childSnapshot) {
      var name = childSnapshot.val();
      childSnapshot.child('posts').forEach(function (snapshot) {
        // POSTS
        var val = snapshot.val();
        // Creating a table and tr element using JSDOM
        var table = document.getElementById('mainTable');
        var tr = document.createElement('tr');
        // The first cell in the row grabbing poster name from database
        var td = document.createElement('td');
        var node = document.createTextNode(name.name);
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
        var node2 = document.createTextNode(val.date);
        td2.appendChild(node2);

        // Appending the previous cells to tr
        tr.appendChild(td);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.className = 'clickable-row' + x;
        table.appendChild(tr);

        $(".clickable-row" + x).click(function () {
          $.getScript('../JS/geolocation.js');
          $('#geo').attr('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDaqqjObPbLckB-N709lZtUOBmhZhgajGA&callback=initMap');
          var divOneText = $('.HideOnClick').html();
          var divTwoText = $('.ShowOnClick').html();
          if (divOneText != '' && divTwoText != '') {
            $('.HideOnClick').html(divTwoText).css("display", "block");
            $('.ShowOnClick').html(divOneText);
            $('#tableRow').html('');
          }

          $('#titlePara').html(val.eventName);
          $('#descriptPara').html(val.description);
          $('#rolePara').html(val.role);
          $('#userEmail').html(name.email);
          $('#buttonCategory').html(val.category);
          $('#theLocation').html(val.address);
          $('#theNumber').html(val.volunteers);

          // Grabs number of applicants from database
          $('#applicants').html(val.applicants + ' people have applied to this post.');

          $('#applicants').click(function () {
            var applicantList = document.getElementById('listTableBody');
            applicantList.innerHTML = '';
            var email = name.email;
            snapshot.child('people').forEach(function (snapshot3) {
              // console.log(snapshot3.val());
              var user = firebase.auth().currentUser;
              // console.log("current user" + user);
              // console.log("current user" + user.email);
              // console.log("post user" + email);

              var div = document.createElement('div');
              div.setAttribute('class', 'col-sm-12');
              var applicantImg = document.createElement('img');
              // img.setAttribute('class', 'img-responsive');
              // img.setAttribute('class', 'img-circle');
              $(applicantImg).attr('class', 'profilePic');
              $(applicantImg).attr('src', snapshot3.val().userImage);
              $(applicantImg).css({'width': '100px', 'height': '100px'});
              var heading = document.createElement('h4');
              heading.setAttribute('class', 'text-center');
              var name2 = document.createTextNode(snapshot3.val().name);
              var br = document.createElement('br');
              heading.appendChild(name2);
              div.appendChild(applicantImg);
              div.appendChild(heading);
              div.appendChild(br);

              if (user.email == email) {
                var button = document.createElement('button');
                div.appendChild(button);
                $(button).attr('id', 'confirmButton' + y);
                $(button).attr('type', 'button');
                $(button).addClass('btn btn-warning');
                $(button).html('confirm');
                console.log('success');

                $(document).on('click', '#confirmButton' + y, function () {
                  console.log(snapshot3.val().uid);
                  var newPath = database.ref('Users/' + snapshot3.val().uid + '/experience');
                  var newPath2 = newPath.push();
                  newPath2.set({
                    eventName: val.eventName,
                    role: val.role,
                    date: val.date
                  })
                  console.log("test");
                  $(button).html('Done').attr('disabled', true);
                  
                });
              } else {
                console.log('you are not owner');
              }

              //Yun' code
              applicantImg.setAttribute('id', 'user' + y);
              applicantList.appendChild(div);
              console.log(snapshot3.val());
              $('#user' + y).click(function () {
                //We will make this function recreate the html into the users portfolio
              })
              y++;
            })
          });

          // Gives applybuttons unique ids
          $('#applyButton').attr('id', 'applyButton' + x);
          $('#firstButton').click(function () {
            $('#theLabel').html('To: ' + name.email);
          })
          
          // Once the Apply Button is Hit
          $('#applyButton' + x).click(function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                //post owner
                //console.log(user.email);
                //post uid
                //console.log(snapshot.key);

                //This variable references whether or not the user has applied to the post or not
                var applied = false;

                //This for loop goes through the people who have applied to the post and sets applied to true if your email is found
                snapshot.child('people').forEach(function (snapshot3) {
                  postName = snapshot3.val();

                // To Tell The Applier that they APPLIED
                  if (postName.email == user.email) {
                    alert('You have already applied to this post!');
                    applied = true;
                    window.setTimeout(function () {
                      window.open('volunteerpage.html', '_self');
                    }, 500);
                  }
                });

                //You will only get added and increment applicants if applied was set to true through the previous for loop
                if (applied == false) {
                  postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/applicants');
                  postsRef.transaction(function (currentApplicants) {
                    return (currentApplicants + 1);
                  });

                // To Store The Person applying Image to the Applicants Modal
                  userProfilePic = database.ref('Users/' + user.uid);
                  userProfilePic.once('value').then(function(snapshot4){
                    postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/people');
                    newPostsRef = postsRef.push();
                    newPostsRef.set({
                      name: user.displayName,
                      email: user.email,
                      uid: user.uid,
                      userImage: snapshot4.val().userImage
                    })
                  })
                // Set Time so that the window Refresh
                  window.setTimeout(function () {
                    window.open('volunteerpage.html', '_self');
                  }, 500);
                }
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
                
                $('#titlePara').html(value.eventName);
                $('#buttonCategory').html(value.category);
                $('#descriptPara').html(value.description);
                $('#rolePara').html(value.role);
                $('#userEmail').html(snapshot1.val().email);
                $('#theLocation').html(value.address);
                $('#theNumber').html(value.volunteers);

                // Grabs number of applicants from database
                $('#applicants').html(value.applicants + ' people are applied in this opportunity.');

                // Gives applybuttons unique ids
                $('#applyButton').attr('id', 'applyButton' + x);

                $('#firstButton').click(function () {
                  $('#theLabel').html('To: ' + snapshot1.val().email);
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

                      // var postsRef2 = database.ref('Users/' + user.uid + '/apply');
                      // newPostsRef2 = postsRef2.push();
                      // newPostsRef2.set({
                      //   email: snapshot1.email,
                      //   postOwner: snapshot1.name,
                      //   event: value.eventName
                      // })

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