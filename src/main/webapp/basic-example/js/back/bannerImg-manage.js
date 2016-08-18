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
function create() {
    window.location.href = 'create-bannerimg.html';
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
    var filter = encodeURIComponent(JSON.stringify({"kind": 0}));
    var url = '/api/decorates?filter=' + filter;
    url += '&offset=0&count=100';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            var total = result2.data.length;
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
    window.location.replace('create-bannerimg.html?id=' + id);
}