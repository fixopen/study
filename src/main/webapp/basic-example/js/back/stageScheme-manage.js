window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
}
function create() {
    window.location.href = 'create-stageScheme.html';
}

function query() {
    loadData();
}
function loadData() {
    var url = '/api/schemas'
    getData(url, function (result2) {
        if (result2.state == 200) {
            var total = result2.data.length;
            render(result2.data);
        }
    });
}
//查询资源
function render(datas) {
    var container = document.getElementById('stageScheme-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('stageScheme-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
    $('.btn-rowEdit').click(edit);//编辑
    $('.btn-rowDelete').click(delRow);//删除
}

function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-stageScheme.html?id=' + id);
}
function delRow(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    deleteData('/api/schemas/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}