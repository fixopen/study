window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents1();
        loadData1();
    });
}, false)
function bindEvents1() {
    var fc = document.getElementById('file_upload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('file_upload', 'imgPreview')
    }, false)
    $('#btnSubmit').click(doSubmit);
    $('#btnOnReset').click(onReset);
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
var _decorate, _target;
function loadData1() {
    var id = g.getUrlParameter('id');
    var targetid = g.getUrlParameter('targetid');
    if (id) {
        g.getData('/api/decorates/' + id, function (result) {
            if (result.state == 200) {
                _decorate = result.data;
                targetid = _decorate.targetId;
                $('#caption').val(_decorate.caption);
                $('#describe').val(_decorate.describe);
                $('#imgPreview').attr('src', _decorate.imageFile);
            }
        })
    }
    if (targetid) {
        g.getData('/api/news/' + targetid, function (result) {
            if (result.state == 200) {
                _target = result.data;
                if (!_decorate) {
                    $('#caption').val(_target.caption);
                    $('#describe').val(_target.caption);
                }
//                $('#btnSelecttarget').css("display","none");
            }
        })
    }
}
function collectData() {
    var decorate = _decorate || {};
    decorate.caption = $('#caption').val();
    decorate.describe = $('#describe').val();
    decorate.imageFile = $('#imgPreview').attr('src');
    decorate.targetId = _target.id;
    decorate.kind = 3;
    decorate.targetType = 90;
    return decorate;
}
function doSubmit() {
    if (!_target) {
        alert('请选择要推荐的资源，或者从资源管理选择配图！');
        return;
    }
    validateForm();
}
function ajaxSubmit() {
    _target = collectData();
    var api = '/api/decorates';
    if (_target.id) {
        g.patchData(api + '/' + _target.id, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'newsImg-manage.html';
            }
        })
    } else {
        g.postData(api, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _target.id = result.id;
                window.location.href = 'newsImg-manage.html';
            }
        })
    }
}
function onReset() {
    $("#mainForm").clear();
    _target = null;
}
