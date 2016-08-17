var _ps = 8, _pn;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        getPersonInfo();
        //renderPersonInfo();
        renderFriendLink();
        getUploadRes();
        g.importFooter()
        //renderUploadRes();
    });
}, false)

//输出当前用户信息
function renderPersonInfo(datas) {
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(g.dataToElement(datas, g.getTemplate('personInfo')))
}
//输出当前用户上传的资源
function renderUploadRes(datas, total, pn) {
    if (!pn)
        pn = 1;
    var updateResContainer = document.getElementById('updateRes');
    updateResContainer.innerHTML = "";
    var count = datas.length
    var template = g.getTemplate('update-res')
    for (var i = 0; i < count; ++i) {
        updateResContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    _pn = pn;
    getUploadRes(pn);
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
//获取用户上传的资源
function getUploadRes(pn) {
    var url = 'api/users/' + uid + '/upload/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn;
            var url = 'api/users/' + uid + '/upload';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderUploadRes(result.data, total, pn);
                }
            })
        }
    })
}