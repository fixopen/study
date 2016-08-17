var _ps = 2, _pn;
var say;//个人动态
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        //renderPersonInfo();
        getPersonInfo();
        renderFriendLink();
        getFriendMessage();//好友动态
        bindEvents();
        g.importFooter()
    });
}, false)

function bindEvents() {//发表说说
    $("#issue").click(issue);
}

//输出当前用户信息
function renderPersonInfo(datas) {
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(g.dataToElement(datas, g.getTemplate('personInfo')))
}
//输出当前用户好友的动态

function renderFriendMessage(datas, total, pn) {
    if (!pn)
        pn = 1;
    var friendContainer = document.getElementById('friendMessage')
    friendContainer.innerHTML = '';
    var count = datas.length;
    var template = g.getTemplate('friendMessage');
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
    $(".friendManage-discuss").click(doDiscuss);
    $(".friendManage-good").click(doGood);
}

//分页动作
function goPage(pn) {
    _pn = pn;
    getFriendMessage(pn);
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
//获取当前用户的好友动态
function getFriendMessage(pn) {
    var url = 'api/friendSays好友动态/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn;
            var url = 'api/friendSays好友动态';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderFriendMessage(result.data, total, pn);
                }
            })
        }
    })
}
//点击评论
function doDiscuss() {
    alert('评论成功');
}
//点击赞
function doGood() {
    alert('赞成功');
}
//发表按钮
function issue() {
    //获取说说内容
    var sayDesciption = document.getElementById("sayDesciption").value;
    var uid = getCookie('uid');//获取当前ID
    //个人动态={"content":sayDesciption,"id":uid}
    g.postData('api/', sayDesciption, function (data) {
    })
}