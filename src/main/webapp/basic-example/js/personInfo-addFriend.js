var _ps = 2, _pn;
var _findFrind = 6;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        renderPersonInfo();
        renderFriendLink();
        getFindFriendMes();
        g.importFooter();
    });
}, false)

//输出当前用户信息
function renderPersonInfo() {
    var personInfo = getPersonInfo();
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(g.dataToElement(personInfo, g.getTemplate('personInfo')))
}
function renderFindFriend(pn) {
    if (!pn)
        pn = 1;
    var friendContainer = document.getElementById('friendFindMessage')
    friendContainer.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('friendFindMessage')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(g.dataToElement(findFriend.datas[i], template))
    }
    renderPage('pagicontainerFind', _findFrind, pn, total, goPageFind);
}
//输出当前用户信息
function renderPersonInfo() {
    var personInfo = getPersonInfo();
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(dataToElement(personInfo, getTemplate('personInfo')))
}
function renderFindFriend(pn) {
    if (!pn)
        pn = 1;
    var friendContainer = document.getElementById('friendFindMessage')
    friendContainer.innerHTML = '';
    var count = datas.length
    var template = getTemplate('friendFindMessage')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(findFriend.datas[i], template))
    }
    renderPage('pagicontainerFind', _findFrind, pn, total, goPageFind);
}
//分页动作
function goPageFind(pn) {
    _pn = pn;
    getFindFriendMes(pn);
}
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
function getFindFriendMes(pn) {
    var queryFriend = document.getElementById("title").value;
    var filter = {"queryMes": queryFriend};
    var url = 'api/根据queryFriend查询出来的好友/statistics/count';
    if (filter)
        url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn;
            url = 'api/根据queryFriend查询出来的好友';
            if (filter)
                url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    renderFindFriend(result2.data, total, pn);
                }
            });
        }
    });
}