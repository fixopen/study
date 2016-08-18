var _ps = 5, _pn, _pn1;
var userId = g.getCookie('userId');
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        getPersonInfo();
        getNotices();//已读
        getWillReadNotices();//未读
        g.importFooter()
    });
}, false)

//获取当前用户的已读通知
function getNotices(pn) {
    if (!pn)
        pn = 1;
    var isReadFilter = encodeURIComponent(JSON.stringify({"isRead": "true"}));
    var url = 'api/users/' + userId + '/notices/statistics/count?filter=' + isReadFilter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = 'api/users/' + userId + '/notices?filter=' + isReadFilter;
            url += '&offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderNotices(result.data, total, pn);
                }
            })
        }
    })
}
//获取当前用户未读通知
function getWillReadNotices(pn) {
    if (!pn)
        pn = 1;
    var noReadFilter = encodeURIComponent(JSON.stringify({"isRead": "false"}));
    var url = 'api/users/' + userId + '/notices/statistics/count?filter=' + noReadFilter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = 'api/users/' + userId + '/notices?filter=' + noReadFilter;
            url += '&offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    readerWillReadNotices(result.data, total, pn);
                }
            })
        }
    })
}

//输出当前用户已读通知
function renderNotices(datas, total, pn) {
    if (!pn)
        pn = 1;
    var messageContainer = document.getElementById('noticeRead-tbody')
    messageContainer.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('notice-tr')
    for (var i = 0; i < count; ++i) {
        messageContainer.appendChild(g.dataToElement(datas[i], template))
    }
    renderPage('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowdelete').click(delRow);
}
//分页动作
function goPage(pn) {
    _pn = pn;
    getNotices(pn);
}
//输出当前用户未读通知
function readerWillReadNotices(datas, total, pn) {
    if (!pn)
        pn = 1;
    var messageContainer = document.getElementById('noticeWillRead-tbody')
    messageContainer.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('notice-tr')
    for (var i = 0; i < count; ++i) {
        messageContainer.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer1', _ps, pn, total, goPage1);
    $('.btn-rowdelete').click(delRow);
    $('.btn-setRead').click(setRead)
}
//分页动作
function goPage1(pn) {
    _pn1 = pn;
    getWillReadNotices(pn);
}
function delRow(evt) {
    var id = evt.target.attributes['rowid'].value;
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    g.deleteData('/api/users/' + userId + '/notices/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            getNotices();//已读
            getWillReadNotices();//未读
        }
    })
}

function setRead(evt) {
    var id = evt.target.attributes['rowid'].value;
    var data = {};
    g.patchData('/api/users/' + userId + '/notices/isRead/' + id, data, function (result) {
        if (result.state == 200) {
            getOneNotice(id);
            getWillReadNotices();
        }
    })
}
function getOneNotice(id) {
    g.getData('/api/users/' + userId + '/notices/' + id, function (result) {
        if (result.state == 200) {
            renderOneNotice(result.data);
        }
    })
}
function renderOneNotice(data) {
    $("#messageName").val(data.caption);
    $("#messages").val(data.message);
    $("#messageDate").val(data.dateCreated);
}