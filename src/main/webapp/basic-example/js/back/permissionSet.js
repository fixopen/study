window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    $('#chkSelectAll').click(selectAll);
    $('#btnAllShow').click(allShow);
    $('#btnShow').click(show);
    $('#btnReturn').click(btnReturn);

}
function show() {
    window.location.href = 'empower.html';
}
function btnReturn() {
    javascript :history.back(-1);
}

function allShow() {
    alert('授权成功');
}
function selectAll(evt) {
    $('#permission-tbody').find("input[type='checkbox']").each(
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
            'name': '王一',
            'username': 'wangyi',
            'jobName': '教师',
            'subject': '数学',
            'address': '海淀区',
            'school': '中关村一小',
            'permission': '无'
        }
    ];

    var container = document.getElementById('permission-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('permission-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
}