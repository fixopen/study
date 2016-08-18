window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
function del() {//单条删除
}
function selectAll(evt) {
    $('#logs-tbody').find("input[type='checkbox']").each(
        function () {
            $(this).prop('checked', evt.target.checked);
        }
    );
}
function query() {
    var pn = getUrlParameter('pn');
    if (!pn)
        pn = 1;
    var logdatas = [
        {
            'id': 1,
            "logLevel": "错误",
            "logContent": "文件权限错误",
            "logTime": "2014-05-20 11:09"
        },
        {
            'id': 2,
            "logLevel": "失败",
            "logContent": "文件权限错误",
            "logTime": "2014-05-20 11:09"
        },
        {
            'id': 3,
            "logLevel": "警告",
            "logContent": "文件权限错误",
            "logTime": "2014-05-20 11:09"
        },
        ,
        {
            'id': 4,
            "logLevel": "成功",
            "logContent": "文件设置成功",
            "logTime": "2014-05-20 11:09"
        }
    ];

    var container = document.getElementById('logs-tbody')
    container.innerHTML = '';
    var count = logdatas.length
    var template = getTemplate('logs-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(logdatas[i], template))
    }

    var pagecontainer = document.getElementById('pagicontainer')
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

    $('.btn-rowdel').click(del);
}