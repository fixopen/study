window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
    });
}, false)

function bindEvents() {
    var fc = document.getElementById('file_upload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('file_upload', 'imgPreview')
    }, false)

    $('#btnSubmit').click(doSubmit);
    $('#btnOnRest').click(onReset);
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
            },
            linkurl: {
                required: true
            }
        },
        messages: {
            caption: {
                required: "请输入名称",
                minlength: "最少两个字符"
            },
            caption: {
                required: "请输入连接地址"
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
var _decorate, _target;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/decorates/' + id, function (result) {
            if (result.state == 200) {
                _decorate = result.data;
                $('#caption').val(_decorate.caption);
                $('#linkurl').val(_decorate.urlAddr);
                $('#imgPreview').attr('src', _decorate.imageFile);
            }
        })
    }
}

function collectData() {
    var decorate = _decorate || {};
    decorate.caption = $('#caption').val();
    decorate.imageFile = $('#imgPreview').attr('src');
    decorate.urlAddr = $('#linkurl').val();
    decorate.kind = 4;
    decorate.targetType = 90;
    return decorate;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _target = collectData();
    var api = '/api/decorates';
    if (_target.id) {
        g.patchData(api + '/' + _target.id, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'questionImg-manage.html';
            }
        })
    } else {
        g.postData(api, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _target.id = result.id;
                window.location.href = 'questionImg-manage.html';
            }
        })
    }
}

function onReset() {
    $("#mainForm").clear();
    _target = null;
}
