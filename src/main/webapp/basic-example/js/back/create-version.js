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

var _version;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/versions/' + id, function (result) {
            if (result.state == 200) {
                _version = result.data;
                bindData(_version);
            }
        })
    }
}

function bindData(version) {
    $('#caption').val(version.caption);
    $('#press').val(version.press);
}

function collectData() {
    var version = _version || {};
    version.caption = $('#caption').val();
    version.press = $('#press').val();
    return version;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _version = collectData();
    var api = '/api/versions';
    if (_version.id) {
        g.patchData(api + '/' + _version.id, _version, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'version-manage.html';
            }

        })
    } else {
        g.postData(api, _version, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _version.id = result.id;
                window.location.href = 'version-manage.html';
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
    _version = null;
}
