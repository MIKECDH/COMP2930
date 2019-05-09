var query = firebase.database().ref("Users").orderByKey();
        query.once("value")
          .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var name0 = childSnapshot.val();
              
              console.log(name0);
              
              childSnapshot.child('posts').forEach(function (snapshot) {
                var val = snapshot.val();
                console.log(val.description);          
                // Creating a table and tr element using JSDOM
                var table = document.getElementById('mainTable');
                var tr = document.createElement('tr');
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
                tr.appendChild(td);
                tr.appendChild(td0);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.className = 'clickable-row';
                tr.setAttribute('data-url', 'volunteering_details.html');
                table.appendChild(tr);

                jQuery(document).ready(function ($) {
                    $(".clickable-row").click(function () {
                        window.location = $(this).data("url");
                    });
                  });

                console.log('success');               
              });
            });
          });

       