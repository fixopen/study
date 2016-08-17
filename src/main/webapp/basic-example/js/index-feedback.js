window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        init();
        bindEvents();
        g.importFooter()
    });
}, false)

function bindEvents() {
    $("#files-input").on('change', function (evt) {
        uploadFiles(evt.target.files, function (result) {
            document.getElementById('imgPreview').src = result[0].location;
        });
    });
}

function init() {
    $('#content').redactor({
        lang: 'zh_cn',
        imageUpload: '/api/file/Upload4Redactor',
        imageUploadCallback: function (image, json) {
            // image = this is DOM element of image
            // json = for example: { "filelink": "/images/img.jpg" }
            alert('ok');
        },
        imageUploadErrorCallback: function (json) {
            alert(json);
        }
    });
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
var _feedback;
function collectData() {
    var sugKindContainer = document.getElementById('suggestionKind');
    var index = sugKindContainer.selectedIndex; //序号，取当前选中选项的序号
    var kind = sugKindContainer.options[index].value;
    var feedback = _feedback || {};
    feedback.caption = $('#caption').val();
    feedback.content = $('#sugContent').val();
    feedback.kind = kind;
    return feedback;
}

function doSubmit() {
    _saveAndNew = false;
    validateForm();
}

function ajaxSubmit() {
    _feedback = collectData();
    var userId = g.getCookie('userId');
    var api = '/api/users/' + userId + '/feedbacks';
    g.postData(api, _feedback, function (result) {
        if (result.state == 200 || result.state == 201) {
            alert('保存成功');
            _feedback.id = result.id;
            $('#caption').val('');
            $('#sugContent').val('');
        }
    })

}

function onReset() {
    $(':input', '#mainForm')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    _user = null;
}