window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        init();
    });
}, false)

function init() {
    var id = g.getUrlParameter('id');
    if (id) {
        loadData(id);
    }
}
function validateForm() {
    $("#mainForm").validate({
        submitHandler: function () {
            ajaxSubmit();
        },
        rules: {
            code: {
                required: true,
                minlength: 2
            },
            caption: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            code: {
                required: "请输入名称",
                minlength: "最少2个字符"
            },
            caption: {
                required: "请输入2个数字",
                minlength: "2个字符"
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
//绑定事件
function bindEvents() {
    $('#btnSubmit').click(doSubmit);
    $('#btnOnReset').click(onReset);
}

var _subject;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/subjects/' + id, function (result) {
            if (result.state == 200) {
                _subject = result.data;
                bindData(_subject);
            }
        })
    }
}

function bindData(subject) {
    $('#caption').val(subject.caption);
    $('#code').val(subject.code);
}

function collectData() {
    var subject = _subject || {};
    subject.caption = $('#caption').val();
    subject.code = $('#code').val();
    return subject;
}

function doSubmit() {
    validateForm();
}
function ajaxSubmit() {
    _subject = collectData();
    var api = '/api/subjects';
    if (_subject.id) {
        g.patchData(api + '/' + _subject.id, _subject, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'subject-manage.html';
            }

        })
    } else {
        g.postData(api, _subject, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _subject.id = result.id;
                window.location.href = 'subject-manage.html';
            }
        })

    }
}

function onReset() {
    $(':input', '#mainForm')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    _subject = null;
}
