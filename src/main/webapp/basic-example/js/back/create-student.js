window.addEventListener('load', function (evt) {
    bindEvents();
    init();
}, false)

function init() {
    var id = getUrlParameter('id');
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
            caption: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            caption: {
                required: "请输入名称",
                minlength: "最少两个字符"
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

var _student;
function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/students/' + id, function (result) {
            if (result.state == 200) {
                _student = result.data;
                bindData(_student);
            }
        })
    }
}

function bindData(student) {
    $('#caption').val(student.caption);

}

function collectData() {
    var student = _student || {};
    student.caption = $('#caption').val();
    return student;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _student = collectData();
    var api = '/api/students';
    if (_student.id) {
        patchData(api + '/' + _student.id, _student, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'student-manage.html';
            }

        })
    } else {
        postData(api, _student, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _student.id = result.id;
                window.location.href = 'student-manage.html';
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
    _student = null;
}
