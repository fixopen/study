window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        query();
    });
}, false)
//绑定事件
function bindEvents() {
//    $('#btnDelete').click(del);
}

function query() {
    loadData();
}
function loadData() {
    var schoolId = g.getUrlParameter('schoolId')
    if (schoolId == null) {
        window.location.href = "error.html"
    }
    else {
        filter = encodeURIComponent(JSON.stringify({"schoolId": schoolId}));
        var url = '/api/grades?filter=' + filter;
        g.getData(url, function (result2) {
            if (result2.state == 200) {
                var total = result2.data.length;
                render(result2.data);
            }
        });
    }

}

//输出年级
function render(datas) {
    var schoolName = datas[0].school.caption
    var container = document.getElementById('grade-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('grade-tr')
//    var schoolName = datas[0].school.caption
    for (var i = 0; i < count; ++i) {
        datas[i].schoolName = schoolName
        container.appendChild(g.dataToElement(datas[i], template))
    }
    $('.btn-rowInter').click(interClass);//进入
//    $('.btn-rowEdit').click(edit);//编辑
//    $('.btn-rowDelete').click(delRow);//删除
}

function interClass(evt) {
    var schoolId = g.getUrlParameter('schoolId');
    var gradeId = evt.target.attributes['rowid'].value;
    window.location.replace('class-manage.html?schoolId=' + schoolId + '&gradeId=' + gradeId);
}
//function edit(evt) {
//    var id = evt.target.attributes['rowid'].value;
//    window.location.replace('createPerUser.html?id=' + id);
//}
//function delRow(evt){
//    var id = evt.target.attributes['rowid'].value;
//    deleteData('/api/roles/' + id, function(data) {
//        if(data.state==200){
//            loadData();
//        }
//    })
//}