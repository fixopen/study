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
    _subject = getUrlParameter('subject');
    _version = getUrlParameter('version');
    ;
    renderSelect();
    $('#querySubject').change(querySubject);
    $('#queryVersion').change(queryVersion);
}
//学科
function querySubject(e) {
    var id = $('#querySubject').val();
    _subject = id;
    loadData();
}
//版本
function queryVersion(e) {
    var id = $('#queryVersion').val();
    _version = id;
    loadData();
}
//输出查询部分
function renderSelect() {
    //$('#queryStage').append("<option value='-1' >全部</option>")
    // bindStageSelect('queryStage');
    // if(_stage){
    // 	$('#queryStage').val(_stage);
    // }
    //$('#queryVersion').append("<option value='-1' >全部</option>")
    bindVersionSelect('queryVersion');
    if (_version)
        $('#queryVersion').val(_version);
    else
        _version = _versions[0].id;
    //$('#querySubject').append("<option value='-1' >全部</option>")
    bindSubjectSelect('querySubject');
    if (_subject)
        $('#querySubject').val(_subject);
    else
        _subject = _subjects[0].id;

    //$('#querySubject').append("<option value='-1' >全部</option>")
    // bindTermSelect('queryTerm');
    // if(_term)
    // 	$('#queryTerm').val(_term);

}

function validateForm() {
    $("#mainForm").validate({
        submitHandler: function () {
            ajaxSubmit();
        },
        rules: {
            queryVersion: {
                required: true
            }, querySubject: {
                required: true
            }
        },
        messages: {
            queryVersion: {
                required: "请选择"
            }, querySubject: {
                required: "请输入名称"
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
var _catalogues, _subject, _version;

function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/catalogues/' + id, function (result) {
            if (result.state == 200) {
                _catalogues = result.data;
                bindData(_catalogues);
            }
        })
    }
}

function bindData(catalogues) {
    $('#queryVersion').val(catalogues.version);
    $('#querySubject').val(catalogues.subject);
    $('#stageChks').val(catalogues.stage);
}

function collectData() {
    var catalogues = _catalogues || {};
    catalogues.version = $('#queryVersion').val();
    catalogues.subject = $('#querySubject').val();
    var stageChks = $("[name='stagechk'][checked]");
    var stage = '';
    for (var i = 0; i < stageChks.length; i++) {
        var stageChk = stageChks[0];
        stage += $(stageChk).val() + ",";
    }
    if (stage != '') {
        stage = stage.subString(0, stage.length - 1);
    }

    catalogues.stage = stage;

    return catalogues;
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
    _catalogues = collectData();
    var api = '/api/catalogues';
    if (_catalogues.id) {
        patchData(api + '/' + _catalogues.id, _catalogues, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                if (_saveAndNew)
                    onReset();
            }

        })
    } else {
        postData(api, _catalogues, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                _catalogues.id = result.id;
                if (_saveAndNew)
                    onReset();
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
    _catalogues = null;
}