window.addEventListener('load', function (evt) {
    bindEvents();
    loadData();
}, false)

function bindEvents() {
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
                minlength: 3
            }
        },
        messages: {
            caption: {
                required: "请输入名称",
                minlength: "输入学制如633"
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
var _schemas;

function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/schemas/' + id, function (result) {
            if (result.state == 200) {
                _schemas = result.data;
                bindData(_schemas);
            }
        })
    }
}

function bindData(schemas) {
    $('#caption').val(schemas.caption);
}

function collectData() {
    var schemas = _schemas || {};
    schemas.caption = $('#caption').val();
    return schemas;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _schemas = collectData();
    var api = '/api/schemas';
    if (_schemas.id) {
        patchData(api + '/' + _schemas.id, _schemas, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                window.location.href = 'stageSchema-manage.html';
            }

        })
    } else {
        postData(api, _schemas, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                _schemas.id = result.id;
                window.location.href = 'stageSchema-manage.html';
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
    _schemas = null;
}




















