window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        var statsUrl = '/api/schools/statistics/count'
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
    $('#btnNew').click(create);
//    $('#btnDelete').click(del);
//    $('#chkSelectAll').click(selectAll);
}
function create() {
    alert("学校数据从CMIS同步，不支持新建");
//    window.location.href='create-school.html';
}
//function del(){
//    $('#schools-tbody').find("input[type='checkbox']:checked").each(
//        function () {
//            var id=$(this).attr('rowid');
//            deleteData('/api/schools/' + id, function(data) {
//                if(data.state==200){
//                    goPage(_pn);
//                }
//            })
//        }
//    );
//}
//function selectAll(evt) {
//    $('#schools-tbody').find("input[type='checkbox']").each(
//        function () {
//            $(this).prop('checked', evt.target.checked);
//        }
//    );
//}
function query() {
    loadData(1);
}
var _ps = 6, _pn;
//function loadData(pn){
////    var regionId=getUrlParameter('regionId');
//    var textQuery=document.getElementById("txtQuery").value;
////    var filter = {regionId: regionId}
////    if(regionId==null){
////        window.location.href="error.html";
////    }
//   if(textQuery) {
//       filter.textQuery ='xx'
//   }
////        var  u =document.getElementById('upperLeverl')
////        u.href = 'school-manage.html?regionId=' + regionId;
//   var filter = encodeURIComponent(JSON.stringify(filter))
//
//    var offset = _ps * (pn - 1);
//    var statsUrl = '/api/schools/statistics/count'
//    if (filter) {
//        statsUrl += '?filter=' + filter
//    }
//    getData(statsUrl, function(r) {
//        if (r.state == 200) {
//            var total = r.data
//            var url='/api/schools';
//            if(filter)
//                url+='?filter=' +filter;
//            if(url.indexOf('?')==-1){
//                url+='?';
//            }else{
//                url+='&';
//            }
//            url+='offset=' + offset + '&count=' + _ps;
//            getData(url, function(result2){
//                if(result2.state==200){
//                    //var total=result2.data.length;
//                    render(result2.data,total,pn);
//                }
//            });
//
//        }
//    })
//}
//查询输入框中 id=“txtQuery”
function loadData(pn) {
    if (!pn)
        pn = 1;
//    var textQuery=document.getElementById("txtQuery").value;
    var filter;
//    if(textQuery)
//        filter = encodeURIComponent(JSON.stringify({"caption": textQuery}));
    var url = '/api/schools/statistics/count';
    if (filter)
        url += '?filter=' + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/schools';
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
                    render(result2.data, total, pn);
                }
            });
        }
    });
}

//查询资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('school-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('school-tr')
    for (var i = 0; i < count; ++i) {
        var url = '/api/schools/statistics/count?filter=' + {"regionId": datas[i].id}
        g.getData(url, function (result) {
            if (result.state == 200) {
                datas[i].count = result.data.length;
            }
        });
        container.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowInter').click(interGrade);//进入学校
    $('.btn-rowEdit').click(edit);//编辑
    $('.btn-rowDelete').click(del);//删除
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}
function interGrade(evt) {
    var schoolId = evt.target.attributes['rowid'].value;
    window.location.replace("grade-manage.html?schoolId=" + schoolId);
}
function edit(evt) {
    alert("学校数据从CMIS同步，不支持编辑");
//    var id = evt.target.attributes['rowid'].value;
//    window.location.replace('create-school.html?id=' + id);
}
function del(evt) {
    alert("学校数据从CMIS同步，不支持删除");
//    var id= evt.target.attributes['rowid'].value;
//    deleteData('/api/schools/' + id, function(data) {
//        if(data.state==200){
//            goPage(_pn);
//        }
//    })
}
