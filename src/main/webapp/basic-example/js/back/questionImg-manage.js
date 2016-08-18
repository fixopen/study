window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        query();
    });
}, false)
//绑定事件
var _total;
function bindEvents() {
    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
}
function create() {
    if (_total == 0) {
        window.location.href = 'create-questionImg.html';
    } else {
        alert("首页只能显示一个问卷调查，请点击编辑修改")
    }
}

function delRow(e) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = $(e.target).attr('rowid');
    g.deleteData('/api/decorates/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}

function query() {
    loadData();
}

function loadData() {
    var filter = encodeURIComponent(JSON.stringify({"kind": 4}));
    var url = '/api/decorates?filter=' + filter;
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            _total = result2.data.length;
            render(result2.data);
        }
    });
}
//查询资源
function render(datas) {
    var container = document.getElementById('question-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('question-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(g.dataToElement(datas[i], template))
    }
    $('.btn-rowedit').click(edit);
    $('.btn-rowdelete').click(delRow);
}
//编辑
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-questionImg.html?id=' + id);
}