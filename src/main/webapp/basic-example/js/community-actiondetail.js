window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }

    var shows = [
        {
            "photo": "images/activityProgram/community-show1.jpg",
            "score": "9.8"
        },
        {
            "photo": "images/activityProgram/community-show2.jpg",
            "score": "9.8"
        },
        {
            "photo": "images/activityProgram/community-show3.jpg",
            "score": "9.8"
        },
        {
            "photo": "images/activityProgram/community-show4.jpg",
            "score": "9.8"
        },
        {
            "photo": "images/activityProgram/community-show5.jpg",
            "score": "9.8"
        },
        {
            "photo": "images/activityProgram/community-show6.jpg",
            "score": "9.8"
        }
    ];


    var showsContainer = document.getElementById('activity-show')
    var count = shows.length
    var template = getTemplate('activity-temp')
    for (var i = 0; i < count; ++i) {
        showsContainer.appendChild(dataToElement(shows[i], template))
    }

}, false)