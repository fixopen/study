window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    var self_info = {
        "photo": "../images/1234567.png",
        "name": "笑笑",
        "score": 473,
        "starLevel": generateStarLevel(3.5, '../')
    }
    var selfinfoContainer = document.getElementById('self_info')
    selfinfoContainer.appendChild(dataToElement(self_info, getTemplate('update_self_info')))


    var message_contents = [
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        }
    ]

    var messageContainer = document.getElementById('message-tbody')
    var count = message_contents.length
    var template = getTemplate('message-tr')
    for (var i = 0; i < count; ++i) {
        messageContainer.appendChild(dataToElement(message_contents[i], template))
    }


}, false)