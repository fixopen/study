window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
    });
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
            userName: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            userName: {
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
var _sections;

function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/sections/' + id, function (result) {
            if (result.state == 200) {
                _sections = result.data;
                bindData(_sections);
            }
        })
    }
}

function bindData(sections) {
    $('#caption').val(sections.caption);
    $('#schemeId').val(sections.scheme.caption);
}

function collectData() {
    var sections = _sections || {};
    sections.caption = $('#caption').val();
    return sections;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _sections = collectData();
    var api = '/api/sections';
    if (_sections.id) {
        g.patchData(api + '/' + _sections.id, _sections, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                window.location.href = 'studySection-manage.html';
            }

        })
    } else {
        g.postData(api, _sections, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                _sections.id = result.id;
                window.location.href = 'studySection-manage.html';
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
    _sections = null;
}




















