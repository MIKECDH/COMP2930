//The following function is for our easter egg on the main index page
function team() {
    "use strict";
    
    let key = [84, 69, 65, 77];
    let ck = 0;
    let max = key.length;

    let team = function () {

        var shock = document.createElement('div');
        var img = new Image();
        img.src = data;
        img.style.width = '1050px';
        img.style.height = '300px';
        img.style.transition = '15s all';
        img.style.position = 'fixed';
        img.style.left = '-1100px';
        img.style.bottom = 'calc(-50% + 420px)';
        img.style.zIndex = 999999;

        document.body.appendChild(img);

        window.setTimeout(function () {
        img.style.left = 'calc(100% + 500px)';
        }, 50);

        window.setTimeout(function () {
        img.parentNode.removeChild(img);
        }, 7300);

    };

    let record = function (e) {

        if (e.which === key[ck]) {
        ck++;
        } else {
        ck = 0;
        }

        if (ck >= max) {
        team();
        ck = 0;
        }

    };

    let init = function (data) {
        document.addEventListener('keyup', record);
    };

    let data = 'PICTURE/index_easteregg.gif';

    init(data);
    }
    team();


    function roll() {
    "use strict";

    let key = [82, 79, 76, 76];
    let ck = 0;
    let max = key.length;

    let roll = function () {

        document.body.style.animation="roll 4s 1";
    };

    let record = function (e) {

        if (e.which === key[ck]) {
        ck++;
        } else {
        ck = 0;
        }

        if (ck >= max) {
        roll();
        ck = 0;
        }

    };

    let init = function () {
        document.addEventListener('keyup', record);
    };

    init();
    }
    roll();

    function myFunction() {
        if(this.hash !=="") {
            event.preventDefault();

            var hash=this.hash;

            $('html, body').animate({
                scrollTop:$(hash).offset().top
            }, 900, function() {
                window.location.hash='#services';
            });
        }
    }
    
