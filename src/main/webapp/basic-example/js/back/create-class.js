window.addEventListener('load', function (evt) {
    bindEvents();
    init();
}, false)

function init() {
    var id = getUrlParameter('id');
    if (id) {
        loadData(id);
    }
    renderSelect();
}
//输出查询部分
function renderSelect() {
    $('#queryClassNum').append("<option value='-1' >全部</option>")
    bindStageSelect('queryClassNum');
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

var _classes;
function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/classess/' + id, function (result) {
            if (result.state == 200) {
                _classes = result.data;
                bindData(_classes);
            }
        })
    }
}

function bindData(classes) {
    $('#caption').val(classes.caption);
    $('#school').val(classes.school);
    $('#classNumber').val(classes.classNumber);
    $('#grade').val(classes.grade);
}

function collectData() {
    var classes = _classes || {};
    classes.caption = $('#caption').val();
    classes.school = $('#school').val();
    classes.classNumber = $('#classNumber').val();
    classes.grade = $('#grade').val();
    return classes;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _classes = collectData();
    var api = '/api/classess';
    if (_classes.id) {
        patchData(api + '/' + _classes.id, _classes, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'area-manage.html';
            }
        })
    } else {
        postData(api, _classes, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _classes.id = result.id;
                window.location.href = 'area-manage.html';
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
    _classes = null;
}
