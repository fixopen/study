window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        init();
        loadData();
        bindEvents();
    });
}, false)
function bindEvents() {
    $('#btnSubmit').click(doSubmit);
}

function init() {
    renderSelect();
}
//学科
function querySubject(e) {
    var id = $('#querySubject').val();
    loadData();
}
//输出查询部分
function renderSelect() {
    g.subjects.loadData()
    g.editions.loadData()
    g.bindVersionSelect('queryVersion');
    g.bindSubjectSelect('querySubject');
}

function validateForm() {
    $("#mainForm").validate({
        submitHandler: function () {
            ajaxSubmit();
        },
        rules: {
            caption: {
                required: true
            }
        },
        messages: {
            caption: {
                required: "请输出教材名字"
            }
        },
        errorPlacement: function (error, element) {
            if (element.is(':radio') || element.is(':checkbox')) {
                error.appendTo(element.parent().parent());
            } else {
                error.appendTo(element.parent());
            }
        }
    });
}
var _book

function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/books/' + id, function (result) {
            if (result.state == 200) {
                _book = result.data;
                bindData(_book);
            }
        })
    }
}

function bindData(books) {
    $('#caption').val(books.caption);
    if (books.textbookVersion) {
        $('#queryVersion').val(books.textbookVersion.id);
    }
    if (books.subject) {
        $('#querySubject').val(books.subject.id);
    }
    var stages = books.gradeTerms.split(',');
    for (var i = 0; i < stages.length; i++) {
        var stage = stages[i];
        var gt = stage.split(':')
        if (gt[1] == 0) {
            var stage1 = gt[0] + ':1'
            var ckb = $("[value='" + stage1 + "']");
            if (ckb) {
                $(ckb).attr('checked', true);
            }
            var stage2 = gt[0] + ':2'
            var ckb = $("[value='" + stage2 + "']");
            if (ckb) {
                $(ckb).attr('checked', true);
            }
        } else {
            var ckb = $("[value='" + stage + "']");
            if (ckb) {
                $(ckb).attr('checked', true);
            }
        }
    }
}

function collectData() {
    var books = _book || {};
    books.caption = $('#caption').val();
    books.versionId = $('#queryVersion').val();
    books.subjectId = $('#querySubject').val();
    var stages = []
    $("[name='stageChks']:checked").each(function (c) {
        var i = $(this).val()
        var gt = i.split(':')
        var has = false
        for (var i = 0, c = stages.length; i < c; ++i) {
            if (stages[i].grade == gt[0]) {
                stages[i].term = 0
                has = true
            }
        }
       if (!has) {
            stages.push({"grade": gt[0], "term": gt[1]})
        }
    })
    var stage = ',';
    stages.forEach(function(i){
        stage += i.grade + ":" + i.term + ",";
    });
    if (stage == ',') {
        stage = ''
    }
    books.gradeTerms = stage;
    return books;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    var book = collectData();
    if (!book.gradeTerms) {
        alert('请选择年级');
        return;
    }
    var api = '/api/books';
    if (book.id && book.id != '-1') {
        if (!book.subjectId) {
            book.subjectId = book.subject ? book.subject.id : book.subjectId;
        }
        if (!book.versionId) {
            book.versionId = book.textbookVersion ? book.textbookVersion.id : book.versionId;
        }
        g.patchData(api + '/' + book.id, book, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                window.location.href = 'catalogue-manage.html';
            }

        })
    } else {
        g.postData(api, book, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                book.id = result.id;
                window.location.href = 'catalogue-manage.html';
            }
        })
    }
}