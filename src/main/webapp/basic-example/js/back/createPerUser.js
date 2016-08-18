window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        init();
        bindEvents();
        loadData();
        getAllModules();
    });
}, false)

function getAllModules() {
    var id = g.getUrlParameter('roleId');
    var url = "/api/users/privileges";
    g.getData(url, function (result) {
        if (result.state == 200) {
            g.getData("/api/roles/" + id + "/module", function (result2) {
                if (result2.state == 200) {
                    renderAllModules(result.data, result2.data);
                } else {
                    renderAllModules(result.data);
                }
            })
        }
    })
}
var topModules = []
function renderAllModules(data, data2) {
    var container = document.getElementById('permissionList');
    container.innerHTML = '';
    var count = data.length;
    var template = g.getTemplate('permission')
    for (var i = 0; i < count; ++i) {
        if (data[i].kind == 0) {
            topModules.push(data[i].id);
        } else {
            container.appendChild(g.dataToElement(data[i], template))
        }
    }
    if (data2) {
        for (var j = 0; j < data2.length; ++j) {
            var ckb = $("[value='" + data2[j].module.id + "']");
            if (ckb) {
                $(ckb).attr('checked', true);
            }
        }
    }

}

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
var _roles;
function loadData() {
    var id = g.getUrlParameter('roleId');
    if (id) {
        g.getData('/api/roles/' + id, function (result) {
            if (result.state == 200) {
                _roles = result.data;
                g.getData("/api/roles/" + id + "/module", function (result2) {
                    if (result2.state == 200) {
                        bindData(_roles, result2.data);
                    }
                })
            }
        })
    }
}

function bindData(roles, data) {
    $('#caption').val(roles.caption);
    $('#type').val(roles.type);

}

function collectData() {
    var stage = [];
    var roles = _roles || {};
    roles.caption = $('#caption').val();
    roles.type = $('#type').val();
    var stageChks = $("[name='select']:checked").each(function (c) {
        stage.push($(this).val())
    });
    if (stage != "") {
        var topModuleCount = topModules.length
        for (var i = 0; i < topModuleCount; ++i) {
            stage.push(topModules[i]);
        }
    }
    ;
    roles.modules = stage;
    return roles;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _roles = collectData();
    var api = '/api/roles';
    if (_roles.id) {
        g.patchData(api + '/' + _roles.id, _roles, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'role-manage.html';
            }

        })
    } else {
        g.postData(api, _roles, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _roles.id = result.id;
                window.location.href = 'role-manage.html';
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
    _roles = null;
}