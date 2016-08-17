window.addEventListener('load', function (evt) {
    bindEvents();
    var statsUrl = '/api/students/statistics/count'
    //if (filter) {
    //    statsUrl += '?filter=' + filter
    //}
    getData(statsUrl, function (r) {
        if (r.state == 200) {
            window.total = r.data
        }
    })
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
//    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
//    $('#chkSelectAll').click(selectAll);
}
//function create() {
//    window.location.href = 'create-student.html';
//}
//function del(){
//    $('#students-tbody').find("input[type='checkbox']:checked").each(
//        function () {
//            var id=$(this).attr('rowid');
//            deleteData('/api/students/' + id, function(data) {
//                if(data.state==200){
//                    goPage(_pn);
//                }
//            })
//        }
//    );
//}
//function selectAll(evt) {
//    $('#students-tbody').find("input[type='checkbox']").each(
//        function () {
//            $(this).prop('checked', evt.target.checked);
//        }
//    );
//}
function query() {
    loadData(1);
}
var _ps = 6, _pn;
function loadData(pn) {
    var textQuery = document.getElementById("txtQuery").value;
    var filter;
    if (textQuery)
        filter = encodeURIComponent(JSON.stringify({"caption": textQuery}));

    var offset = _ps * (pn - 1);
    var statsUrl = '/api/students/statistics/count'
    if (filter) {
        statsUrl += '?filter=' + filter
    }
    getData(statsUrl, function (r) {
        if (r.state == 200) {
            var total = r.data
            var url = '/api/students';
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
                    //var total=result2.data.length;
                    render(result2.data, total, pn);
                }
            });

        }
    })
}

//查询资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('school-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('school-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
    renderPage('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowEdit').click(edit);//编辑
    $('.btn-rowDelete').click(del);//删除
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

function edit() {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-student.html?id=' + id);
}
function del(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    deleteData('/api/students/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功');
            goPage(_pn);
        }
    })
}
