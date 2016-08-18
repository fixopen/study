window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.href;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    renderPersonInfo();
    renderFriendLink();
    renderMyMessage();
}, false)
//输出当前用户信息
function renderPersonInfo() {
    var personInfo = getPersonInfo();
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(dataToElement(personInfo, getTemplate('personInfo')))
}
//获取当前用户信息
function getPersonInfo() {
    var personInfo = {
        "photo": "images/headImage.jpg",
        // "href":"update_person.html",
        "myName": "简单式",
        "scoreCount": 473,
        "uploadRes": 50,
        "likeRes": 66,
        "friendCount": 88,
        "starLevel": generateStarLevel(3.5, ""),
        "description": "努力不一定成功，但放弃必定失败!"
    }
    return personInfo;
}
//输出当前用户的所有消息
function renderMyMessage() {
    var myMessage = getMyMessage();
    var messageContainer = document.getElementById('message-tbody')
    var count = myMessage.length
    var template = getTemplate('message-tr')
    for (var i = 0; i < count; ++i) {
        messageContainer.appendChild(dataToElement(myMessage[i], template))
    }
}
//获取所有消息
function getMyMessage() {
    var myMessage = [
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
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        }
    ]
    return myMessage;
}

