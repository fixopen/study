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
    window.location.href = 'create-schoolYear.html';
}

function query() {
    loadData();
}
function loadData() {
    var url = '/api/years?filter=';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            var total = result2.data.length;
            render(result2.data);
        }
    });
}
//function ChangeDateFormat(time) {
//    if (time != null) {
//        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
//        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
//        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//        return date.getFullYear() + "-" + month + "-" + currentDate;
//    }
//    return "";
//}
//输出
function render(datas) {
    var container = document.getElementById('schoolYear-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('schoolYear-tr')
    for (var i = 0; i < count; ++i) {
//       datas[i].beginDate=ChangeDateFormat(datas[i].beginDate);
        if (datas[i].term == 1)datas[i].term = "上学期";
        else if (datas[i].term == 2)datas[i].term = "下学期";
        container.appendChild(g.dataToElement(datas[i], template))
    }

    $('.btn-rowEdit').click(edit);
    $('.btn-rowDelete').click(delRow);
}

//编辑
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-schoolYear.html?id=' + id);
}

function delRow(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    g.deleteData('/api/years/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功')
            loadData();
        }
    })
}