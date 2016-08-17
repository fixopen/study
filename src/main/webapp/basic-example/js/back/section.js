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
    window.location.href = 'create-section.html';
}
function del() {
}
function selectAll(evt) {
    $('#section-tbody').find("input[type='checkbox']").each(
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
            'sectionName': '资源中心',
            'number': '00001',
            'displayMode': '列表',
            'text': '文本',
            'front': '是'
        },
        {
            'id': 2,
            'sectionName': '学习社区',
            'number': '00002',
            'displayMode': '缩略图',
            'text': '文本，图片列表',
            'front': '是'
        },
        {
            'id': 3,
            'sectionName': '我的资源',
            'number': '00003',
            'displayMode': '列表',
            'text': '图片列表',
            'front': '是'
        },
        {
            'id': 4,
            'sectionName': '新闻快讯',
            'number': '00004',
            'displayMode': '文本',
            'text': '文本，图片列表',
            'front': '是'
        }
    ];

    var container = document.getElementById('section-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('section-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

    $('.btn-rowedit').click(edit);
    $('.btn-rowdelete').click(detele);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-section.html?id=' + id);
}
//删除
function delete1(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}





