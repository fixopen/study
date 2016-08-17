window.addEventListener('load', function (evt) {
    bindEvents();
    init();
}, false)

function init() {
    var id = getUrlParameter('id');
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

var _region;
function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/regions/' + id, function (result) {
            if (result.state == 200) {
                _region = result.data;
                bindData(_region);
            }
        })
    }
}

function bindData(region) {
    $('#caption').val(region.caption);
    $('#parentId').val(region.parentId);
    $('#zipcode').val(region.zipcode);
    $('#regionType').val(region.regionType);
}

function collectData() {
    var region = _region || {};
    region.caption = $('#caption').val();
    region.parentId = $('#parentId').val();
    region.zipcode = $('#zipcode').val();
    region.regionType = $('#regionType').val();
    region.idPath = '';
    region.pathInfo = '';
    return region;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _region = collectData();
    var api = '/api/regions';
    if (_region.id) {
        patchData(api + '/' + _region.id, _region, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'area-manage.html';
            }
        })
    } else {
        postData(api, _region, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _region.id = result.id;
                window.location.href = 'area-manage.html';
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
    _region = null;
}
