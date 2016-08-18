var _ps = 6, _books;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        init();
        bindEvents()
        getBooks();
    });
}, false)
//初始化
function init() {
    renderSelect();
    $('#querySubject').change(getBooks);
    $('#queryVersion').change(getBooks);
    $('#queryTermNum').change(getBooks);
    $('#queryClassNum').change(getBooks);
}
//绑定事件
function bindEvents() {
    $('#btnNew').click(create);
}
//添加
function create() {
    window.location.href = 'create-book.html';
}
//编辑教材
function editBook(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('create-book.html?id=' + id);
}
//编辑目录
function editCatalogue(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('edit-catalogua.html?id=' + id);
}
function delRow(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    g.deleteData('/api/books/' + id, function (data) {
        if (data.state == 200) {
            alert('删除成功');
            getBooks();
        }
    })
}
//获取当前书
function getBooks() {
    _book = null;
    var subjectId = $('#querySubject').val();
    var classNum = $('#queryClassNum').val();
    var editionId = $('#queryVersion').val();
    var termNum = $('#queryTermNum').val();
    var filter = {};

    if (subjectId && subjectId != '-1') {
        filter.subjectId = subjectId;
    }
    if (editionId && editionId != '-1') {
        filter.editionId = editionId;
    }
    if (classNum && classNum != '-1') {
        filter.classNum = classNum;
    }
    if (termNum && termNum != '-1') {
        filter.termNum = termNum;
    }
    filter = JSON.stringify(filter);
    var url = '/api/books?filter=' + encodeURIComponent(filter);
    g.getData(url, function (result) {
        if (result.state == 200) {
            _books = result.data;
            renderBooks(_books);
        }
    });
}

function renderBooks(datas) {
    var container = document.getElementById('book-container');
    container.innerHTML = "";
    var template = g.getTemplate('book-tr')
    for (var i = 0; i < datas.length; ++i) {
        container.appendChild(g.dataToElement(datas[i], template))
    }
    $('.btn-rowedit').click(editBook);//编辑教材
    $('.btn-rowcatalogue').click(editCatalogue);//编辑目录;
    $('.btn-rowdelete').click(delRow);//删除
}
//输出查询部分
function renderSelect() {
    $('#queryClassNum').append("<option value='-1' >全部</option>")
    $('#queryVersion').append("<option value='-1' >全部</option>")
    $('#querySubject').append("<option value='-1' >全部</option>")
    $('#queryTermNum').append("<option value='-1' >全部</option>")
    g.subjects.loadData()
    g.editions.loadData()
    g.stages.loadData()
    g.bindVersionSelect('queryVersion');
    g.bindSubjectSelect('querySubject');
    g.bindStageSelect('queryClassNum');
    g.bindTermSelect('queryTermNum');
}
