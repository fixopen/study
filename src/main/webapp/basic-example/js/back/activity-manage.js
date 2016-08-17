var _ps = 5, _pn;
window.addEventListener('load', function (evt) {
    init();
    bindEvents();
    loadData();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(loadData);
    $('#btnNew').click(create);
}
function init() {

}
//查询资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('activity-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('activity-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
    renderPage('pagicontainer', _ps, pn, total, goPage);

    $('.btn-rowdit').click(edit);//编辑
    $('.btn-rowpreview').click(preview);
    $('.btn-rowdelete').click(del);//删除
    $('.btn-rowdecorate').click(decorate);//配图
    $('.btn-rowselect').click(select);//选择
}
//编辑资源
function edit(evt) {
//    var id = evt.target.attributes['rowid'].value;
//    window.location.replace('hotresimg-resManage-create.html?targetid=' + id);
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}
function create() {
    window.location.href = 'create-resource.html';
}
//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}
function del(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return
    }
    var id = evt.target.attributes['rowid'].value;
    deleteData('/api/resources/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功');
            goPage(_pn);
        }
    })
}
//配图
function decorate(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-studyimg.html?targetid=' + id);
}
//选择
function select(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-studyimg.html?targetid=' + id);
}
//查询输入框中 id=“txtQuery”
function loadData(pn) {
    if (!pn)
        pn = 1;
    var textQuery = document.getElementById("txtQuery").value;
    var filter;
    if (textQuery)
        filter = encodeURIComponent(JSON.stringify({"caption": textQuery}));
    var url = '/api/activities/statistics/count';
    if (filter)
        url += '?filter=' + filter;
    getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/resources';
            if (filter)
                url += '?filter=' + filter;
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