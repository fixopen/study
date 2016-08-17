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
    window.location.href = 'create-area.html';
}
function del() {
}
function selectAll(evt) {
    $('#area-tbody').find("input[type='checkbox']").each(
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
            'city': '北京市',
            'zone': '海淀区',
            'schoolCount': '50'
        },
        {
            'id': 2,
            'city': '北京市',
            'zone': '朝阳区',
            'schoolCount': '50'
        },
        {
            'id': 3,
            'city': '北京市',
            'zone': '东城区',
            'schoolCount': '50'
        }
    ];

    var container = document.getElementById('area-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('area-tr')
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

     $('.btn-rowedit').click(edit);
     $('.btn-rowpreview').click(preview);
     $('.btn-rowpublish').click(publish);*/


    $('.btn-rowedit').click(edit);
    $('.btn-rowpreview').click(preview);
    $('.btn-rowcreateSchool').click(createSchool);
    $('.btn-rowimportSchool').click(importSchool);
}
//编辑
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-area.html?id=' + id);
}
//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('schoolList.html?id=' + id);
}
function createSchool(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-school.html?id=' + id);
}
function importSchool(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}

