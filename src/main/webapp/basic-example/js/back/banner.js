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
    window.location.href = 'create-banner.html';
}
function del() {
}
function selectAll(evt) {
    $('#banner-tbody').find("input[type='checkbox']").each(
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
            'location': '首页',
            'link': '否',
            'display': '自动轮播',
            'data': '2014-07-29',
        },
        {
            'id': 2,
            'location': '资源中心首页',
            'link': '否',
            'display': '自动轮播',
            'data': '2014-07-29',
        },
        {
            'id': 3,
            'location': '首页',
            'link': '否',
            'display': '自动轮播',
            'data': '2014-07-29',
        },
        {
            'id': 4,
            'location': '首页',
            'link': '否',
            'display': '自动轮播',
            'data': '2014-07-29',
        },
    ];

    var container = document.getElementById('banner-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('banner-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

    $('.btn-rowedit').click(edit);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('banner-redact.html?id=' + id);
}





