window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        init();
        bindEvents();
        loadData();
    });
}, false)

function bindEvents() {
    $("#files-input").on('change', function (evt) {
        uploadFiles(evt.target.files, function (result) {
            document.getElementById('imgPreview').src = result[0].location;
        });
    });
    $('#btnSubmit').click(doSubmit);
    $('#btnOnReset').click(onReset);
}

function init() {
    $('#content').redactor({
        lang: 'zh_cn',
        imageUpload: '/api/medias',
        imageUploadCallback: function (image, json) {
            // image = this is DOM element of image
            //json = for example: { "filelink": "/images/img.jpg" }
            if (image && json && json.filelink) {
                image.src = json.filelink + "?a=" + Math.random(4);
            }
        },
        imageUploadErrorCallback: function (json) {
            // alert(json);
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
var _news, _content;

function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/news/' + id, function (result) {
            if (result.state == 200) {
                _news = result.data;
                _content = result.content;
                bindData(_news, _content);
            }
        })
    }
}
function bindData(news, content) {
    $('#caption').val(news.caption);
    $('#editor').val(news.editor);
    $('#sourceCaption').val(news.sourceCaption);
    $('#sourceUrl').val(news.sourceUrl);
    $('#tags').val(news.tags);
    $('#content').redactor('set', content.data);
}

function collectData() {
    var news = _news || {};
    news.caption = $('#caption').val();
    news.editor = $('#editor').val();
    news.sourceCaption = $('#sourceCaption').val();
    news.sourceUrl = $('#sourceUrl').val();
    news.tags = $('#tags').val();
    news.content = $('#content').redactor('get');
    news.isPassed = true || false;
    if (news.rowState == 1) {
        news.rowState = 1;
    } else {
        news.rowState = 0;
    }
    return news;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _news = collectData();
    var api = '/api/news';
    if (_news.id) {
        g.patchData(api + '/' + _news.id, _news, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'news-manage.html';
            }

        })
    } else {
        g.postData(api, _news, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _news.id = result.id;
                window.location.href = 'news-manage.html';
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
    _news = null;
}