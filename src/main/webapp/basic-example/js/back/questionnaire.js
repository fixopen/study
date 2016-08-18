window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    $('#btnNew').click(create);
    $('#btnPublishQues').click(publishQues);
    $('#btnPreviewsQues').click(previewsQues);
    $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
function create() {
    window.location.href = 'questionnaire-create.html';
}
function publishQues() {
    window.location.href = 'questionnaire-publish.html';
}
function previewsQues() {
    window.location.href = 'questionnaire-preview.html';
}
function del() {
}
function selectAll(evt) {
    $('#questionnaire-tbody').find("input[type='checkbox']").each(
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
            'questionnaireName': '课程教材资源网需要改进的地方',
            "time": "2014-08-21 15:35",
        },
        {
            'id': 2,
            'questionnaireName': '如何登陆到课程教材资源网？',
            "time": "2014-08-21 15:35",
        },
        {
            'id': 3,
            'questionnaireName': '微课为什么放不了？',
            "time": "2014-08-21 15:35",
        },
        {
            'id': 4,
            'questionnaireName': '你觉得这个主题怎么样？',
            "time": "2014-08-21 15:35",
        }
    ];

    var container = document.getElementById('questionnaire-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('questionnaire-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }
    $('.btn-rowlook').click(look);
    $('.btn-rowedit').click(edit);
    $('.btn-rowdelete').click(detele);
}
//查看问卷调查
function look(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('questionnaire-details.html');
}
//编辑问卷调查
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('questionnaire-create.html?id=' + id);
}
//删除
function delete1(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}





