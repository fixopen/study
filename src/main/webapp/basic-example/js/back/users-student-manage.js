window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    $('#btnNew').click(create);
    $('#btnImport').click(batchImport);
    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
function create() {
    window.location.href = 'create-student.html';
}
function batchImport() {
}
function del() {
}
function selectAll(evt) {
    $('#student-tbody').find("input[type='checkbox']").each(
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
            'studentName': '王海',
            'region': '海淀区',
            'school': '海淀小学',
            'grade': '五年级',
            'subject': '语文'
        },
        {
            'id': 2,
            'studentName': '王海',
            'region': '海淀区',
            'school': '海淀小学',
            'grade': '五年级',
            'subject': '语文'
        },
        {
            'id': 3,
            'studentName': '王海',
            'region': '海淀区',
            'school': '海淀小学',
            'grade': '五年级',
            'subject': '语文'
        },
        {
            'id': 4,
            'studentName': '王海',
            'region': '海淀区',
            'school': '海淀小学',
            'grade': '五年级',
            'subject': '语文'
        },
        {
            'id': 5,
            'studentName': '王海',
            'region': '海淀区',
            'school': '海淀小学',
            'grade': '五年级',
            'subject': '语文'
        }
    ];

    var container = document.getElementById('student-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('student-tr')
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
     pagecontainer.appendChild(dataToElement({ tp: tp }, lastpagitemplate))*/

    $('.btn-rowedit').click(edit);
    $('.btn-rowpreview').click(preview);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-student.html?id=' + id);
}
//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}
