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
    window.location.href = 'create-stage.html';
}
function del() {
}
function selectAll(evt) {
    $('#news-tbody').find("input[type='checkbox']").each(
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
            'title': '小学',
            'studyYear': "6",
            'studyAge': "7",
            'grade': "一年级、二年级、三年级、四年级、五年级、六年级"
        },
        {
            'id': 2,
            'title': '初中',
            'studyYear': "3",
            'studyAge': "13",
            'grade': "七年级、八年级、九年级"
        }
    ];

    var container = document.getElementById('news-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('news-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

    $('.btn-rowedit').click(edit);

}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}