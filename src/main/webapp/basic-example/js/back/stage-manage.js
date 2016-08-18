var _ps = 2;
window.addEventListener('load', function (evt) {
    init(evt);
    render(evt);
}, false)
//绑定事件
function init(evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    //$('#btnNew').click(create);
    // $('#btnDelete').click(del);
    //$('#chkSelectAll').click(selectAll);
    $('#btnSaveStage').click(saveStage);//在创建学段方案页面  确认 提交事件 保存
    $('#btnCancel').click(cancel);//在创建学段方案 取消 提交事件
}

//function create(){
//  window.location.href='create-stage.html';
//  }
//function del(){
//}
/*function selectAll(evt) {
 $('#stage-tbody').find("input[type='checkbox']").each(
 function () {
 $(this).prop('checked', evt.target.checked);
 }
 );
 }*/
//在创建学段方案页面  确认 提交事件 保
function saveStage() {
}
//在创建学段方案 取消 提交事件
function cancel() {
}
//需要从后台 查询版本
function getStage(pn) {
    var stages = [
        {
            'id': 1,
            'status': '否',
            'stage': '6-3-3学制',
            'time': '无'
        },
        {
            'id': 2,
            'status': '否',
            'stage': '5-4-3学制',
            'time': '无'
        }
    ];
    var datas = stages;
    var total = datas.length;
    var resultData = [];
    for (var i = (pn - 1) * _ps; i < Math.min(datas.length, pn * _ps); i++) {
        resultData.push(datas[i]);
    }
    return {total: total, datas: resultData};
}
//输出
function render(evt) {
    renderStage();
}
//输出分页
function goPage(pn) {
    renderStage(pn);
}
function renderStage(pn) {
    if (!pn)
        pn = 1;
    var stages = getStage(pn);
    var container = document.getElementById('stage-tbody')
    container.innerHTML = '';
    var count = stages.datas.length
    var template = getTemplate('stage-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(stages.datas[i], template))
    }
    renderPage('pagicontainer', _ps, pn, stages.total, goPage);
    /*


     $('.btn-rowpreview').click(preview);
     $('.btn-rowpublish').click(publish);*/
    $('.btn-rowedit').click(edit);
}

//编辑
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-stage.html?id=' + id);
}


