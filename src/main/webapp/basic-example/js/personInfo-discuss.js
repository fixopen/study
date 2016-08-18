var _ps = 5, _pn;
var userId = g.getCookie('userId');
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.importPersonInfoTop(g.user.currentUser.id);
        g.importPersonInfoLeft();
        getDiscuss();
        g.importFooter()
    });
}, false)

//输出当前用户的所有评论
function renderDiscuss(datas, total, pn) {
    if (!pn)
        pn = 1;
    var discussContainer = document.getElementById('discuss-container')
    discussContainer.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('discuss-template')
    for (var i = 0; i < count; ++i) {
        var data = datas[i]
        if (data.resource.$ref) {
            data.resource = g.getJsonRefObject(datas, data.resource.$ref);
        }
        data.resourceName = data.resource.caption;
        discussContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowDel').click(del);
}

//分页动作
function goPage(pn) {
    _pn = pn;
    getDiscuss(pn);
}
function del(evt) {
    if (window.confirm('你确定要删除吗？')) {
        var id = evt.target.attributes['rowid'].value;
        g.deleteData('/api/users/' + userId + '/comments/' + id, function (data) {
            if (data.state == 200) {
                goPage(_pn);
            }
        })
    }
}

//获取当前用户的所有评论
function getDiscuss(pn) {
    if (!pn)
        pn = 1;
    var url = 'api/users/' + userId + '/comments/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = 'api/users/' + userId + '/comments?';
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                renderDiscuss(result.data, total, pn);
                }
            })
        }
    })
}