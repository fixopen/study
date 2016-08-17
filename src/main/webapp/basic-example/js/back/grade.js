window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnNew').click(create);
    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
function create() {
    window.location.href = 'create-grade.html';
}
function del() {
}
function selectAll(evt) {
    $('#grade-tbody').find("input[type='checkbox']").each(
        function () {
            $(this).prop('checked', evt.target.checked);
        }
    );
}
//查询资源
function query() {
    var pn = getUrlParameter('pn');
    if (!pn)
        pn = 1;
    var datas = [
        {
            'id': 1,
            'grade': '2013-2014学年',
            'term': '上学期',
            'startTime': '2014-03-01',
            'endTime': '2014-07-05',
            'status': '准备中'
        },
        {
            'id': 2,
            'grade': '2013-2014学年',
            'term': '下学期',
            'startTime': '2014-09-01',
            'endTime': '2014-01-15',
            'status': '进行中'
        },
        {
            'id': 3,
            'grade': '2012-2013学年',
            'term': '上学期',
            'startTime': '2013-03-01',
            'endTime': '2013-07-15',
            'status': '结束'
        }
    ];

    var container = document.getElementById('grade-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('grade-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

    /* var pagecontainer = document.getElementById('pagicontainer')
     pagecontainer.innerHTML = '';
     var firstpagitemplate = getTemplate('firstpagili');
     var lastpagitemplate = getTemplate('lastpagili');
     var pagitemplate = getTemplate('pagili');
     var tp = 10;
     pagecontainer.appendChild(dataToElement({ tp: tp }, firstpagitemplate))
     for (var i = 1; i <= tp; i++) {
     var data = {
     pn: i,
     tp: tp
     };
     var tmpNode = dataToElement(data, pagitemplate);
     if (i == pn)
     tmpNode.className = 'active';
     pagecontainer.appendChild(tmpNode)
     }
     pagecontainer.appendChild(dataToElement({ tp: tp }, lastpagitemplate))


     $('.btn-rowpublish').click(publish);*/
    $('.btn-rowedit').click(edit);
    $('.btn-rowpreview').click(preview);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-grade.html?id=' + id);
}
//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}