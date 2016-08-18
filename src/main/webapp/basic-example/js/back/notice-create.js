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
            },
            message: {
                required: true,
                minlength: 0
            }
        },
        messages: {
            caption: {
                required: "请输入2个数字",
                minlength: "2个字符"
            },
            message: {
                required: "请输入消息,消息不能为空",
                minlength: "消息不能为空"
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
    $('#btnSubmit').on('click', doSubmit);
    $('#btnOnReset').on('click', onReset);
    $('#btnPreview').on('click', preview);
}
//预览效果
function preview() {
    $('#previewMessage').val($('#message').val())
    $('#previewCaption').val($('#caption').val())
}
var _notice;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/notices/' + id, function (result) {
            if (result.state == 200) {
                _notice = result.data;
                bindData(_notice);
            }
        })
    }
}

function bindData(notice) {
    $('#caption').val(notice.caption);
    $('#message').val(notice.message);
}

function collectData() {
    var notice = _notice || {};
    notice.caption = $('#caption').val();
    notice.message = $('#message').val();
    notice.m
    return notice;
}
function doSubmit() {
    if (!window.confirm('你确定要发布吗？')) {
        return;
    }
    validateForm();
}
function ajaxSubmit() {
    _notice = collectData();
    var api = '/api/notices';
    if (_notice.id) {
        g.patchData(api + '/' + _notice.id, _notice, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('修改成功');
                window.location.href = 'notice-manage.html';
            }

        })
    } else {
        g.postData(api, _notice, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('发布成功');
                _notice.id = result.id;
                window.location.href = 'notice-manage.html';
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
    _notice = null;
}



