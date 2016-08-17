window.addEventListener('load', function (evt) {
    bindEvents();
    query();
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').click(query);
    //$('#btnNew').click(create);
    // $('#btnDelete').click(del);
    $('#chkSelectAll').click(selectAll);
}
/*function create(){
 //window.location.href='column.html';
 }
 function del(){
 }*/
function selectAll(evt) {
    $('#column-tbody').find("input[type='checkbox']").each(
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
            'sectionName': '首页',
            'columnName': '新闻快讯',
            'number': '8',
            'displayMode': '新闻',
        },
        {
            'id': 2,
            'sectionName': '首页',
            'columnName': '新闻快讯',
            'number': '8',
            'displayMode': '新闻',
        } ,
        {
            'id': 3,
            'sectionName': '学习社区',
            'columnName': '你言我语',
            'number': '8',
            'displayMode': '热门话题',
        } ,
        {
            'id': 4,
            'sectionName': '首页',
            'columnName': '新闻快讯',
            'number': '8',
            'displayMode': '新闻',
        }
    ];

    var container = document.getElementById('column-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('column-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }


    $('.btn-rowedit').click(edit);
    $('.btn-rowdelete').click(detele);
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    alert(id);
}





