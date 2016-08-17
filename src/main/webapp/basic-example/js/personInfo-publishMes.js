var _ps = 2, _pn, _pn1;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        getFriendsLogs();
        getPersonInfo();
        //renderPersonInfo();
        renderFriendLink();
        init(evt);
        g.importFooter()
    });
}, false)
//初始化，事件绑定
function init(evt) {
    //$("#btnMessage").click(saveMessage);
    $("#addFriend").click(addFriend);
}
//输出所有好友
function renderMyFriends(datas, total, pn) {
    if (!pn)
        pn = 1;
    var myfriendsContainer = document.getElementById('myFriends');
    myfriendsContainer.innerHTML = "";
    var count = datas.length
    var template = g.getTemplate('myFriends')
    for (var i = 0; i < count; ++i) {
        myfriendsContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer1', _ps, pn, total, goPage1);
}
//分页动作
function goPage1(pn) {
    _pn1 = pn;
    getMyFriends(pn);
}
function renderFriendLogs(datas, total, pn) {
    if (!pn)
        pn = 1;
    var myfriendsContainer = document.getElementById('friendMessage');
    myfriendsContainer.innerHTML = "";
    var count = datas.length
    var template = g.getTemplate('friendMessage')
    for (var i = 0; i < count; ++i) {
        myfriendsContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}
function goPage(pn) {
    _pn = pn;
    getMyFriends(pn);
}
//输出当前用户信息
function renderPersonInfo(datas) {
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(dataToElement(datas, getTemplate('personInfo')))
}


//获取当前用户信息
function getPersonInfo() {
    var url = 'api/users';
    g.getData(url, function (result) {
        if (result.state == 200) {
            renderPersonInfo(result.data);
        }
    })
// var personInfo = {
    //  "photo": "images/headImage.jpg",
    // "myName":"简单式",
    // "scoreCount": 473,
    // "uploadRes":50,
    // "likeRes":66,
    //  "friendCount":88,
    //  "starLevel": generateStarLevel(3.5, ""),
    // "description": "努力不一定成功，但放弃必定失败!"
    // }
    // return personInfo;

}
//获取当前用户的全部好友
function getFriends() {
    var url = 'api/users/' + uid + '/follower/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn1;
            var url = 'api/users/' + uid + '/follower?';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderMyFriends(result.data, total, pn1);
                }
            })
        }
    })
}
//获取好友日志
function getFriendsLogs() {
    var url = 'api/users/' + uid + '/好友日志/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn;
            var url = 'api/users/' + uid + '/好友日志';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderFriendLogs(result.data, total, pn);
                }
            })
        }
    })
}
//添加好友
function addFriend() {
    window.location.replace("personInfo-addFriend.html");
}