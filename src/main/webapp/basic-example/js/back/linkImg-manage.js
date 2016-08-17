window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        query();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
var _linkImgTotal;
function create() {
    if (_linkImgTotal < 9) {
        window.location.href = 'create-linkImg.html';
    } else {
        alert("首页最多能显示8个友情链接，请点击编辑修改")
    }
}
function delRow() {
    $('#news-tbody').find("input[type='checkbox']:checked").each(
        function () {
            var id = $(this).attr('rowid');
            g.deleteData('/api/decorates/' + id, function (data) {
                if (data.state == 200) {
                    loadData();
                }
            })
        }
    );
}
function delRow(e) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = $(e.target).attr('rowid');
    g.deleteData('/api/decorates/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功');
            loadData();
        }
    })
}
function selectAll(evt) {
    $('#news-tbody').find("input[type='checkbox']").each(
        function () {
            $(this).prop('checked', evt.target.checked);
        }
    );
}
function query() {
    loadData();
}
function loadData() {
    var filter = encodeURIComponent(JSON.stringify({"kind": 9}));
    var url = '/api/decorates?filter=' + filter;
    url += '&offset=0&count=100';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            _linkImgTotal = result2.data.length;
            render(result2.data);
        }
    });
}
//查询资源
function render(datas) {
    var container = document.getElementById('news-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('news-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(g.dataToElement(datas[i], template))
    }
    $('.btn-rowedit').click(edit);
    $('.btn-rowdelete').click(delRow);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-linkImg.html?id=' + id);
}