window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    $('#btnNew').click(create);
    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
function create() {
    window.location.href = 'create-school.html';
}
function del() {
}
function selectAll(evt) {
    $('#school-tbody').find("input[type='checkbox']").each(
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
            'schoolName': '中关村一小',
            'stage': '小学'
        },
        {
            'id': 2,
            'schoolName': '人大附中',
            'stage': '初中'
        }
    ];

    var container = document.getElementById('school-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('school-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

    /*var pagecontainer = document.getElementById('pagicontainer')
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
     */
    $('.btn-rowedit').click(edit);
    $('.btn-rowsee').click(preview);
    $('.btn-rowcreateClass').click(createClass);
    $('.btn-rowimportClass').click(importClass);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-class.html?id=' + id);
}
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}
function createClass(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-class.html?id=' + id);
}
function importClass(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}