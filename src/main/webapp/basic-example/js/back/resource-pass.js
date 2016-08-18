var _ps = 5, _pn;
window.addEventListener('load', function (evt) {
    bindEvents();
    loadData();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(loadData);
    $('#btnAudit').click(audit);
    $('#btnStatePass').click(statePass);
    $('#btnStateNotpass').click(statenotpass);
}
//未审核 页面
function audit() {
    window.location.href = 'resource-audit.html';
}
//通过
function statePass() {
    window.location.href = 'resource-pass.html';
}
//未通过
function statenotpass() {
    window.location.href = 'resource-notpass.html';
}

//查询资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('resource-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('resource-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
    renderPage('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowPreview').click(preview);//预览
    $('.btn-rowSend').click(send);//推送
    $('.btn-rowDelete').click(del);//删除
}

//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}
//推送
function send(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}
//删除
function del(evt) {
    var id = evt.target.attributes['rowid'].value;
    deleteData('/api/resources/' + id, function (data) {
        if (data.state == 200) {
            goPage(_pn);
        }
    })
}
function goPage(pn) {
    _pn = pn;
    loadData(pn);
}


//查询输入框中 id=“title”
function loadData(pn) {
    if (!pn)
        pn = 1;
    var textQuery = document.getElementById("title").value;
    var filter = {"caption": textQuery};
    var url = '/api/resources/statistics/count';
    if (filter)
        url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
    getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * pn;
            url = '/api/resources';
            if (filter)
                url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'offset=' + offset + '&count=' + _ps;
            getData(url, function (result2) {
                if (result2.state == 200) {
                    render(result2.data, total, pn);
                }
            });
        }
    });
}