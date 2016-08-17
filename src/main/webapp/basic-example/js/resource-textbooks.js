var _ps = 6, _stage, _subject, _version;
window.addEventListener('load', function (evt) {
    init();
    renderCondition();
    getData();
    $('#btnQuery').click(queryClick);
}, false)
//初始化
function init() {
    _stage = getUrlParameter('stage');
    _subject = getUrlParameter('subject');
    _version = getUrlParameter('version');
    _catalogueitem = getUrlParameter('item');
}
//查询资源数据
function getData(pn) {
    if (!pn)
        pn = 1;
    var cond = {};
    if (_stage && _stage != '-1')
        cond.stage = _stage;
    if (_subject && _subject != '-1')
        cond.subject = _subject;
    if (_version && _version != '-1')
        cond.version = _version;
    getData('api/books/statistict/count', function (result) {
        if (result.state == 200) {
            var total = result.data;
            getData('api/books', function (result2) {
                if (result2.state == 200) {
                    var books = result2.data;
                    render(books, total, pn);
                } else {
                    alert('获取教材出错')
                }
            })
        } else {
            alert('获取教材总数出错')
        }
    })
}
//输出查询条件
function renderCondition() {
    $('#queryStage').append("<option value='-1' >全部</option>")
    bindStageSelect('queryStage');
    if (_stage) {
        $('#queryStage').val(_stage);
    }
    $('#queryVersion').append("<option value='-1' >全部</option>")
    bindVersionSelect('queryVersion');
    if (_version)
        $('#queryVersion').val(_version);
    $('#querySubject').append("<option value='-1' >全部</option>")
    bindSubjectSelect('querySubject');
    if (_subject)
        $('#querySubject').val(_subject);
}
//查询按钮事件
function queryClick() {
    query(1);
}
//查询动作
function query(p) {
    if (!p)
        p = 1;
    pn = p;
    _stage = $('#queryStage').val();
    _subject = $('#querySubject').val();
    _version = $('#queryVersion').val();
    var href = getUrl();
    window.location.replace(href);
}
//输出资源列表
function render(datas, total, pn) {
    var resourceContainer = document.getElementById('resource-container');
    resourceContainer.innerHTML = "";
    var template = getTemplate('resource-tpl')
    for (var i = 0; i < datas.length; i++) {
        var resource = datas[i];
        var href = 'resource-catalogue.html?id=' + resource.id;
        resource.href = href;
        var ele = dataToElement(resource, template);
        resourceContainer.appendChild(ele)
    }
    renderPage('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    getData(pn);
}
//获取查询url
function getUrl() {
    var href = "resource-textBooks.html?";
    if (_stage && _stage != -1) {
        href += "stage=" + escape(_stage) + "&";
    }
    if (_version && _version != -1) {
        href += "version=" + escape(_version) + "&";
    }
    if (_subject && _subject != -1) {
        href += "subject=" + escape(_subject) + "&";
    }
    href = href.substr(0, href.length - 1);
    return href;
}