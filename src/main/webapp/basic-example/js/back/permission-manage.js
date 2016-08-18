window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        query();
    });
}, false)

//绑定事件
function bindEvents() {
    $('#btnNew').click(create);
    //$('#btnDelete').click(del);
}

function create() {
    window.location.href = 'createPerUser.html';
}

function query() {
    loadData();
}

function loadData() {
    var url = '/api/roles?filter=';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            var total = result2.data.length;
            render(result2.data);
        }
    });
}

//查询资源
function render(datas) {
    var container = document.getElementById('permission-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('permission-tr')
    for (var i = 0; i < count; ++i) {
        if (datas[i].roleType == 0) datas[i].roleType = "系统设置";
        else if (datas[i].roleType == 1) datas[i].roleType = "用户自定义";
        container.appendChild(g.dataToElement(datas[i], template))
    }
    $('.btn-rowEdit').click(edit);//编辑
    $('.btn-rowRoleEmpower').click(roleEmpower);//权限设置
    $('.btn-rowDelete').click(delRow);//删除
}

function roleEmpower(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('role-empower.html?roleId=' + id);
}

function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('createPerUser.html?roleId=' + id);
}

function delRow(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    g.deleteData('/api/roles/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}
