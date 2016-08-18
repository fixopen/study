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
    window.location.href = 'create-resType.html';
}
function batchImport() {
}
function del() {
}
function selectAll(evt) {
    $('#resType-tbody').find("input[type='checkbox']").each(
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
            'resourceType': '电子教材',
            'types': '转换型、交互型、媒体型',
        },
        {
            'id': 2,
            'resourceType': '教学素材',
            'types': '文本、音频、视频、动画',
        },
    ];

    var container = document.getElementById('resType-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('resType-tr')
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
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-news.html?id=' + id);
}