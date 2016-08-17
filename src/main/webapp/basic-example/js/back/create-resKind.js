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

var _resKind;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/resKinds/' + id, function (result) {
            if (result.state == 200) {
                _resKind = result.data;
                bindData(_resKind);
            }
        })
    }
}

function bindData(resKind) {
    $('#caption').val(resKind.caption);
}

function collectData() {
    var resKind = _resKind || {};
    resKind.caption = $('#caption').val();
    return resKind;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _resKind = collectData();
    var api = '/api/resKinds';
    if (_resKind.id) {
        g.patchData(api + '/' + _resKind.id, _resKind, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'resKind-manage.html';
            }

        })
    } else {
        g.postData(api, _resKind, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _resKind.id = result.id;
                window.location.href = 'resKind-manage.html';
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
    _resKind = null;
}
