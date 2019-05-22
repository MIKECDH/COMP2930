
//The following variables are declared as counters used below
var x = 0;
var y = 0;
var postRef, userProfilePic, emailFirst, emailSecond;
var database = firebase.database();

//The following code references our database and navigates through it to grab data
var query = firebase.database().ref("Users").orderByKey();
query.once("value")
  .then(function (snapshot0) {
    //The following line goes through each user in the database
    snapshot0.forEach(function (childSnapshot) {
      var name = childSnapshot.val();
      //The following line goes through each users posts
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
        var node1 = document.createTextNode(val.city);
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
        //The following line gives each table row a unique id by using the x as a counter
        tr.className = 'clickable-row' + x;
        table.appendChild(tr);
        //The following line gives each table row a unique click function by referencing x
        $(".clickable-row" + x).click(function () {
          initLittleMap();
          //The following lines hide the original table and displays the hidden details HTML div
          var divOneText = $('.HideOnClick').html();
          var divTwoText = $('.ShowOnClick').html();
          if (divOneText != '' && divTwoText != '') {
            $('.HideOnClick').html(divTwoText).css("display", "block");
            $('.ShowOnClick').html(divOneText);
            $('#tableRow').html('');
            (function (window, location) {
              history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
              history.pushState(null, document.title, location.pathname);

              window.addEventListener("popstate", function () {
                if (location.hash === "#!/stealingyourhistory") {
                  history.replaceState(null, document.title, location.pathname);
                  setTimeout(function () {
                    location.replace("volunteerpage.html");
                  }, 0);
                }
              }, false);
            }(window, location));
          }
          //JQUERY calls to put database values into respective IDS
          $('#titlePara').html(val.eventName);
          $('#descriptPara').html(val.description);
          $('#rolePara').html(val.role);
          $('#userEmail').html(name.email);
          $('#buttonCategory').html(val.category);
          $('#theLocation').html(val.address);
          $('#theNumber').html(val.volunteers);
          // Grabs number of applicants from database
          $('#applicants').html(val.applicants + ' people have applied to this post.');
          // The following code displays the modal of applicants when the div applicants is clicked.
          $('#applicants').click(function () {
            //Creating a table via JSDOM
            var applicantList = document.getElementById('listTableBody');
            applicantList.innerHTML = '';
            var email = name.email;
            snapshot.child('people').forEach(function (snapshot3) {
              var user = firebase.auth().currentUser;
              var div = document.createElement('div');
              div.setAttribute('class', 'col-sm-12');
              var applicantImg = document.createElement('img');
              $(applicantImg).attr('class', 'profilePic');
              //Grabbing applicant profile picture from firebase storage
              $(applicantImg).attr('src', snapshot3.val().userImage);
              $(applicantImg).css({
                'width': '100px',
                'height': '100px'
              });
              var heading = document.createElement('h4');
              heading.setAttribute('class', 'text-center');
              var name2 = document.createTextNode(snapshot3.val().name);
              var br = document.createElement('br');
              heading.appendChild(name2);
              div.appendChild(applicantImg);
              div.appendChild(heading);
              div.appendChild(br);
              //The following if statement checks if the user logged in is the post owner,
              //This then creates a button for the owner to click that can confirm volunteers and write to their respective database
              if (user.email == email) {
                var button = document.createElement('button');
                div.appendChild(button);
                $(button).attr('id', 'confirmButton' + y);
                $(button).attr('type', 'button');
                $(button).addClass('btn btn-warning');
                $(button).html('confirm');
                console.log('success');
                //Adds event to button when document is loaded, this writes to the database and adds to the volunteers experiences
                $(document).on('click', '#confirmButton' + y, function () {
                  console.log(snapshot3.val().uid);
                  var newPath = database.ref('Users/' + snapshot3.val().uid + '/experience');
                  var newPath2 = newPath.push();
                  newPath2.set({
                    eventName: val.eventName,
                    role: val.role,
                    date: val.date
                  });
                  $(button).html('Done').attr('disabled', true);
                });
              } else {
                console.log('You are not the owner of this post');
              }
              //The following function displays the applicants profile when their image is clicked
              //We also give each image a unique id by using the y increment counter
              applicantImg.setAttribute('id', 'user' + y);
              applicantList.appendChild(div);
              $('#user' + y).click(function () {
                $('#usersPortfolio').html(snapshot3.val().name + '\'s Portfolio');
                $('#applicantPortfolio').css('display', 'block');
                $('#hideEverything').css('display', 'none');
                $('#myModal').modal('hide');
                $('#userImage').attr('src', snapshot3.val().userImage);
                //The following line grabs the volunteers description from the database as it is not stored at the same level
                var descriptionRef = firebase.database().ref('Users/' + snapshot3.val().uid);
                descriptionRef.once('value').then(function (descriptionSnapshot) {
                  $('#descriptionUser').html(descriptionSnapshot.val().description);
                });
                $('#nameUser').html(snapshot3.val().name);
                var ref = firebase.database().ref('Users/' + snapshot3.val().uid + '/experience');
                ref.once('value').then(function (profileSnapshot) {
                  //The following for each loop goes through each users experiences and adds it to the HTML using DOM
                  profileSnapshot.forEach(function (childProfileSnapshot) {
                    var mainDiv = document.getElementById('experienceVolunteer');
                    var divTitleRow = document.createElement('div');
                    var divRoleRow = document.createElement('div');
                    var divDateRow = document.createElement('div');
                    $(divTitleRow).attr('class', 'row');
                    $(divRoleRow).attr('class', 'row');
                    $(divDateRow).attr('class', 'row');

                    var node = document.createElement('h4');
                    var node1Text = document.createTextNode(childProfileSnapshot.val().eventName);
                    node.appendChild(node1Text);

                    divTitleRow.appendChild(node);
                    divTitleRow.style.marginBottom = "20px";
                    divTitleRow.style.textAlign = "center";

                    var divFirst = document.createElement('div');
                    var roleTitle = document.createElement('div');
                    var roleNode = document.createTextNode('Roles');
                    roleTitle.appendChild(roleNode);
                    roleTitle.style.fontWeight = "bold";
                    $(divFirst).attr('class', 'col-xs-3');
                    divFirst.appendChild(roleTitle);
                    divRoleRow.appendChild(divFirst);

                    var divSecond = document.createElement('div');
                    var node2 = document.createElement('p');
                    var node2Text = document.createTextNode(childProfileSnapshot.val().role);
                    node2.appendChild(node2Text);
                    $(divSecond).attr('class', 'col-xs-9');
                    divSecond.appendChild(node2);
                    divRoleRow.appendChild(divSecond);
                    divRoleRow.style.textAlign = "left";

                    var divThird = document.createElement('div');
                    var dateTitle = document.createElement('div');
                    var dateNode = document.createTextNode('Date');
                    dateTitle.appendChild(dateNode);
                    dateTitle.style.fontWeight = "bold";
                    $(divThird).attr('class', 'col-xs-3');
                    divThird.appendChild(dateTitle);
                    divDateRow.appendChild(divThird);

                    var divFourth = document.createElement('div');
                    var node3 = document.createElement('p');
                    var node3Text = document.createTextNode(childProfileSnapshot.val().date);
                    node3.appendChild(node3Text);
                    $(divFourth).attr('class', 'col-xs-9');
                    divFourth.appendChild(node3);
                    divDateRow.appendChild(divFourth);
                    divDateRow.style.textAlign = "left";

                    var bar = document.createElement('hr');
                    mainDiv.appendChild(divTitleRow);
                    mainDiv.appendChild(divRoleRow);
                    mainDiv.appendChild(divDateRow);
                    mainDiv.appendChild(bar);
                  });
                });
              });
              y++;
            });
          });

          // Gives applybuttons unique ids
          $('#applyButton').attr('id', 'applyButton' + x);
          $('#firstButton').click(function () {
            $('#theLabel').html('To: ' + name.email);
          });

          // Once the Apply Button is Hit
          $('#applyButton' + x).click(function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
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
                  userProfilePic.once('value').then(function (snapshot4) {
                    postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/people');
                    newPostsRef = postsRef.push();
                    newPostsRef.set({
                      name: user.displayName,
                      email: user.email,
                      uid: user.uid,
                      userImage: snapshot4.val().userImage
                    });
                  });
                  // Set Time so that the window Refresh
                  window.setTimeout(function () {
                    window.open('volunteerpage.html', '_self');
                  }, 500);
                }
              } else {
                alert('please login to apply');
              }
            });
          });
          $('#backButton').click(function () {
            window.open('volunteerpage.html', '_self');
          });
        });
        x++;
      });
    });
  });

// Loads maps api when the show map button is pressed
$('#showMap').click(function () {
  if (document.getElementById('gMap').style.display === 'block') {
    $('#gMap').css('display', 'none');
    $('#hideTable').css('display', 'table');
  } else {
    $('#gMap').css('display', 'block');
    $('#hideTable').css('display', 'none');
  }
});

//The following code sorts the list by category based on the categories pressed.
//It is a repeat of the original code but we didn't write the initial code as a function due to snapshot references.
function sortCategory(category) {
  $('#' + category).click(function () {
    $('#hideTable').css('display', 'table');
    $('#gMap').css('display', 'none');
    x = 0;
    var table = document.getElementById('mainTable');
    table.innerHTML = '';
    var query1 = firebase.database().ref("Users").orderByKey();
    query1.once("value")
      .then(function (snapshot0) {
        snapshot0.forEach(function (childSnapshot) {
          var name = childSnapshot.val();
          childSnapshot.child('posts').forEach(function (snapshot) {
            // POSTS
            var val = snapshot.val();
            // Creating a table and tr element using JSDOM
            var table = document.getElementById('mainTable');
            if (val.category == category) {
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
              var node1 = document.createTextNode(val.city);
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
                initLittleMap();
                var divOneText = $('.HideOnClick').html();
                var divTwoText = $('.ShowOnClick').html();
                if (divOneText != '' && divTwoText != '') {
                  $('.HideOnClick').html(divTwoText).css("display", "block");
                  $('.ShowOnClick').html(divOneText);
                  $('#tableRow').html('');
                  (function (window, location) {
                    history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
                    history.pushState(null, document.title, location.pathname);

                    window.addEventListener("popstate", function () {
                      if (location.hash === "#!/stealingyourhistory") {
                        history.replaceState(null, document.title, location.pathname);
                        setTimeout(function () {
                          location.replace("volunteerpage.html");
                        }, 0);
                      }
                    }, false);
                  }(window, location));
                }
                //The following fills the respective id elements with their corresponding value from our database
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
                    var user = firebase.auth().currentUser;

                    var div = document.createElement('div');
                    div.setAttribute('class', 'col-sm-12');
                    var applicantImg = document.createElement('img');
                    $(applicantImg).attr('class', 'profilePic');
                    $(applicantImg).attr('src', snapshot3.val().userImage);
                    $(applicantImg).css({
                      'width': '100px',
                      'height': '100px'
                    });
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
                        });
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
                      //The following function displays the applicants profile when their image is clicked
                      $('#applicantPortfolio').css('display', 'block');
                      $('#hideEverything').css('display', 'none');
                      $('#myModal').modal('hide');
                      $('#userImage').attr('src', snapshot3.val().userImage);
                      $('#nameUser').html(snapshot3.val().name);
                      var descriptionRef = firebase.database().ref('Users/' + snapshot3.val().uid);
                      descriptionRef.once('value').then(function (descriptionSnapshot) {
                        $('#descriptionUser').html(descriptionSnapshot.val().description);
                      });
                      var ref = firebase.database().ref('Users/' + snapshot3.val().uid + '/experience');
                      ref.once('value').then(function (profileSnapshot) {
                        //The following code builds the HTML via JSDOM based on the experiences each user has
                        profileSnapshot.forEach(function (childProfileSnapshot) {
                          var mainDiv = document.getElementById('experienceVolunteer');
                          var divTitleRow = document.createElement('div');
                          var divRoleRow = document.createElement('div');
                          var divDateRow = document.createElement('div');
                          $(divTitleRow).attr('class', 'row');
                          $(divRoleRow).attr('class', 'row');
                          $(divDateRow).attr('class', 'row');
                          //This code creates the text node for the event name and grabs it from the database
                          var node = document.createElement('h4');
                          var node1Text = document.createTextNode(childProfileSnapshot.val().eventName);
                          node.appendChild(node1Text);
                          divTitleRow.appendChild(node);
                          divTitleRow.style.marginBottom = "20px";
                          divTitleRow.style.textAlign = "center";

                          var divFirst = document.createElement('div');
                          var roleTitle = document.createElement('div');
                          var roleNode = document.createTextNode('Roles');
                          roleTitle.appendChild(roleNode);
                          roleTitle.style.fontWeight = "bold";
                          $(divFirst).attr('class', 'col-xs-3');
                          divFirst.appendChild(roleTitle);
                          divRoleRow.appendChild(divFirst);
                          //This code creates the text node for the role required from the volunteer from the database
                          var divSecond = document.createElement('div');
                          var node2 = document.createElement('p');
                          var node2Text = document.createTextNode(childProfileSnapshot.val().role);
                          node2.appendChild(node2Text);
                          $(divSecond).attr('class', 'col-xs-9');
                          divSecond.appendChild(node2);
                          divRoleRow.appendChild(divSecond);
                          divRoleRow.style.textAlign = "left";

                          var divThird = document.createElement('div');
                          var dateTitle = document.createElement('div');
                          var dateNode = document.createTextNode('Date');
                          dateTitle.appendChild(dateNode);
                          dateTitle.style.fontWeight = "bold";
                          $(divThird).attr('class', 'col-xs-3');
                          divThird.appendChild(dateTitle);
                          divDateRow.appendChild(divThird);
                          //This code creates the text node for the date of the event from the database
                          var divFourth = document.createElement('div');
                          var node3 = document.createElement('p');
                          var node3Text = document.createTextNode(childProfileSnapshot.val().date);
                          node3.appendChild(node3Text);
                          $(divFourth).attr('class', 'col-xs-9');
                          divFourth.appendChild(node3);
                          divDateRow.appendChild(divFourth);
                          divDateRow.style.textAlign="left";

                          var bar = document.createElement('hr');
                          mainDiv.appendChild(divTitleRow);
                          mainDiv.appendChild(divRoleRow);
                          mainDiv.appendChild(divDateRow);
                          mainDiv.appendChild(bar);
                        });
                      });
                    });
                    y++;
                  });
                });

                // Gives applybuttons unique ids
                $('#applyButton').attr('id', 'applyButton' + x);
                $('#firstButton').click(function () {
                  $('#theLabel').html('To: ' + name.email);
                });

                // Once the Apply Button is Hit
                $('#applyButton' + x).click(function () {
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
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
                        userProfilePic.once('value').then(function (snapshot4) {
                          postsRef = database.ref('Users/' + childSnapshot.key + '/posts/' + snapshot.key + '/people');
                          newPostsRef = postsRef.push();
                          newPostsRef.set({
                            name: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            userImage: snapshot4.val().userImage
                          });
                        });
                        // Set Time so that the window Refresh
                        window.setTimeout(function () {
                          window.open('volunteerpage.html', '_self');
                        }, 500);
                      }
                    } else {
                      alert('please login to apply');
                    }
                  });
                });
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
//We initialize the sort category function with the respective inputs
sortCategory('Seniors');
sortCategory('Disabilities');
sortCategory('Sports');
sortCategory('YouthDevelopment');
sortCategory('Environment');
sortCategory('Education');