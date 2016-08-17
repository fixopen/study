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
}

function create() {
    window.location.href = 'create-subject.html';
}

function query() {
    loadData();
}
function loadData() {
    var url = '/api/subjects';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            var total = result2.data.length;
            render(result2.data);
        }
    });
}
//查询资源
function render(datas) {
    var container = document.getElementById('subject-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('subject-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(g.dataToElement(datas[i], template))
    }

    $('.btn-rowEdit').click(edit);
    $('.btn-rowDelete').click(delRow);
}

//编辑
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-subject.html?id=' + id);
}

function delRow(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    g.deleteData('/api/subjects/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}