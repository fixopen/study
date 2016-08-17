window.addEventListener('load', function (evt) {
    bindEvents();
    init();

}, false)
function init() {
    var id = getUrlParameter('id');
    if (id) {
        loadData(id);
    }
    _region = getUrlParameter('_region');
    renderSelect();
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

var _school;
function loadData() {
    var id = getUrlParameter('id');
    if (id) {
        getData('/api/schools/' + id, function (result) {
            if (result.state == 200) {
                _school = result.data;
                bindData(_school);
            }
        })
    }
}

function bindData(school) {
    $('#caption').val(school.caption);
    $('#code').val(school.code);
    $('#region').val(school.region);
    $('#address').val(school.address);
    $('#regionCode').val(school.regionCode);
    $('#regionName').val(school.regionName);
    $('#email').val(school.email);
    $('#schoolState').val(school.schoolState);

}

function collectData() {
    var school = _school || {};
    school.caption = $('#caption').val();
    school.code = $('#code').val();
    school.region = $('#queryRegion').val();
    school.address = $('#address').val();
    school.enregionCoded = $('#regionCode').val();
    school.regionName = $('#regionName').val();
    school.email = $('#email').val();
    school.schoolState = $('#schoolState').val();
    return school;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _school = collectData();
    var api = '/api/schools';
    if (_school.id) {
        patchData(api + '/' + _school.id, _school, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'school-manage.html';
            }

        })
    } else {
        postData(api, _school, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _school.id = result.id;
                window.location.href = 'school-manage.html';
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
    _school = null;
}
//、区域
function queryRegion(e) {
    var id = $('#queryRegion').val();
    _region = id;
}

//输出查询部分
function renderSelect() {
    bindRegionSelect('queryRegion');
    if (_region)
        $('#queryRegion').val(_region);
    else
        _region = _region[0].id;
}








