var friend_tplHtml = "<div class='col-xs-3 friendlinks' style='margin-bottom: 15px;'><a href='${urlAddr}' target='_blank'><img src='${imageFile}' alt=''style='width:100%;height:43px;'/></a></div>";

window.addEventListener('load', function (evt) {
    getFriendLink();
}, false)
//获取友情链接
function getFriendLink() {
    var filter = encodeURIComponent(JSON.stringify({
        kind: 9
    }));
    var api = 'api/decorates?filter=' + filter;
    getData(api, function (result) {
        if (result.state == 200) {
            renderFriendLink(result.data);
        }
    })
}
//输出友情链接
function renderFriendLink(datas) {
    if (!datas || datas.length == 0)
        return;
    var friendLinks = datas;
    var friendLinkContainer = document.getElementById('friendlink-container')
    var count = friendLinks.length
    var template = $(friend_tplHtml)[0];
    for (var i = 0; i < count; ++i) {
        friendLinkContainer.appendChild(dataToElement(friendLinks[i], template))
    }
}
