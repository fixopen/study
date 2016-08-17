window.addEventListener('load', function (evt) {
    init();
    bindEvents();
    loadData();
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
var _activitys;

function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/activitys/' + id, function (result) {
            if (result.state == 200) {
                _activitys = result.data;
                bindData(_activitys);
            }
        })
    }
}

function bindData(activitys) {
    $('#caption').val(activitys.caption);
    $('#editor').val(activitys.editor);
    $('#sourceCaption').val(activitys.sourceCaption);
    $('#sourceUrl').val(activitys.sourceUrl);
    $('#tags').val(activitys.tags);
    $('#content').redactor('set', activitys.content);
}

function collectData() {
    var activitys = _activitys || {};
    activitys.caption = $('#caption').val();
    activitys.editor = $('#editor').val();
    activitys.sourceCaption = $('#sourceCaption').val();
    activitys.sourceUrl = $('#sourceUrl').val();
    activitys.tags = $('#tags').val();
    activitys.content = $('#content').redactor('get');
    return activitys;
}

function doSubmit() {
    _saveAndNew = false;
    validateForm();
}
var _saveAndNew = false;
function doSubmitAndNew() {
    _saveAndNew = true;
    validateForm();
}

function ajaxSubmit() {
    _activitys = collectData();
    var api = '/api/activitys';
    if (_activitys.id) {
        patchData(api, _activitys, function (result) {
            if (result.state == 200 || result.state == 201) {
                if (_saveAndNew)
                    alert('保存成功');
                window.location.href = 'activity-manage.html'
            }

        })
    } else {
        postData(api, _activitys, function (result) {
            if (result.state == 200 || result.state == 201) {
                _activitys.id = result.id;
                if (_saveAndNew)
                    alert('保存成功');
                window.location.href = 'activity-manage.html'
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
    _activitys = null;
}