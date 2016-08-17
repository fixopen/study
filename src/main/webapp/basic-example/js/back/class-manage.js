window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        var statsUrl = '/api/classes/statistics/count'
        g.getData(statsUrl, function (r) {
            if (r.state == 200) {
                window.total = r.data
            }
        })
        query();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
//    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
//    $('#chkSelectAll').click(selectAll);
}
//function create(){
//    window.location.href='create-class.html';
//}
//function del(){
//    $('#classs-tbody').find("input[type='checkbox']:checked").each(
//        function () {
//            var id=$(this).attr('rowid');
//            deleteData('/api/classs/' + id, function(data) {
//                if(data.state==200){
//                    goPage(_pn);
//                }
//            })
//        }
//    );
//}
//function selectAll(evt) {
//    $('#classs-tbody').find("input[type='checkbox']").each(
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
//    var textQuery=document.getElementById("txtQuery").value;
    var schoolId = g.getUrlParameter('schoolId');
    var gradeId = g.getUrlParameter('gradeId');
    var filter = {schoolId: schoolId, gradeId: gradeId}
    if (schoolId == null || gradeId == null) {
        window.location.href = "error.html";
    } else {
//        if (textQuery) {
//            filter.textQuery = 'xx'
//        }
        var u = document.getElementById('upperLevel')
        u.href = 'grade-manage.html?schoolId=' + schoolId

        filter = encodeURIComponent(JSON.stringify(filter))
        var offset = _ps * (pn - 1);
        var statsUrl = '/api/classes/statistics/count'
        if (filter) {
            statsUrl += '?filter=' + filter
        }
        g.getData(statsUrl, function (r) {
            if (r.state == 200) {
                var total = r.data
                var url = '/api/classes';
                if (filter)
                    url += '?filter=' + filter;
                if (url.indexOf('?') == -1) {
                    url += '?';
                } else {
                    url += '&';
                }
                url += 'offset=' + offset + '&count=' + _ps;
                g.getData(url, function (result2) {
                    if (result2.state == 200) {
                        //var total=result2.data.length;
                        render(result2.data, total, pn);
                    }
                });

            }
        })
    }

}

//输出查询的班级
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('class-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('class-tr')
    for (var i = 0; i < count; ++i) {
        var data = datas[i]
        if (data.grade.$ref) {
            data.grade = g.getJsonRefObject(datas, data.grade.$ref);
        }
        data.gradeName = data.grade.caption;
        if (data.grade.school.$ref) {
            data.grade.school = g.getJsonRefObject(datas, data.grade.school.$ref);
        }
        data.schoolName = data.grade.school.caption;
        container.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
//    $('.btn-rowEdit').click(edit);//编辑
//    $('.btn-rowDelete').click(del);//删除
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

//function edit(evt){
//    id=evt.target.attributes['rowid'].val;
//    window.location.replace('create-class.html?id='+id);
//}
//function del(evt){
//      if(!window.confrim('你确定要删除吗？')){
//          return;
//      }
//    var id= evt.target.attributes['rowid'].value;
//    deleteData('/api/classs/' + id, function(data) {
//        if(data.state==200){
//            alert('删除成功')
//            goPage(_pn);
//        }
//    })
//}
