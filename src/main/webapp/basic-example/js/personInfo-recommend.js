var _ps = 4, _pn;
var userId = g.getCookie('userId');
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.importPersonInfoTop(g.user.currentUser.id);
        g.importPersonInfoLeft();
        g.types.loadData();
        getRecommendRes();
        g.importFooter();
    });
}, false)

//输出当前用户推荐的资源
function renderRecommendRes(datas, total, pn) {
    var recommendResContainer = document.getElementById('recommendRes');
    recommendResContainer.innerHTML = "";
    var count = datas.length
    for (var i = 0; i < count; ++i) {
        var recomments = datas[i];
        g.parseResourceCaption(recomments, datas);
        var href = 'resource-detail.html?id=' + recomments.id;
        recomments.href = href;
        var template = g.getTemplate('resource');
        recommendResContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    _pn = pn;
    getRecommendRes(pn);
}

//获取用户推荐的资源
function getRecommendRes(pn) {
    if (!pn)
        pn = 1;
    var url = 'api/users/' + userId + '/recommendResources/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = 'api/users/' + userId + '/recommendResources' + '?';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderRecommendRes(result.data, total, pn);
                }
            })
        }
    })
}