var _ps = 5, _pn;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        query();
    });
}, false)

function bindEvents() {
    $('#btnQuery').click(loadData);
    $('#btnNew').click(create);
}

function query() {
    loadData();
}

function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('normalNotices')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('normalNotice')
    for (var i = 0; i < count; ++i) {
        var data = datas[i]
        if (data.creator.$ref) {
            data.creator = g.getJsonRefObject(datas, data.creator.$ref);
        }
        data.creatorName = data.creator.userName;
        container.appendChild(g.dataToElement(data, template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowEdit').click(edit);
    $('.btn-rowDelete').click(delRow);
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

function create() {
    window.location.href = 'create-notice.html';
}

function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-notice.html?id=' + id);
}

function delRow(evt) {
    var id = evt.target.attributes['rowid'].value;
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    g.deleteData('/api/notices/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}

function loadData(pn) {
    if (!pn)
        pn = 1;
//    var textQuery = document.getElementById("txtQuery").value;
    var filter;
//    if (textQuery)
//        filter = encodeURIComponent(JSON.stringify({"caption": textQuery}));
    var url = '/api/notices/statistics/count';
    if (filter)
        url += '?filter=' + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/notices';
            if (filter) {
                url += '?filter=' + filter + '&';
            } else {
                url += '?';
            }
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    render(result2.data, total, pn);
                }
            });
        }
    });
}
