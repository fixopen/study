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
    $('.input-daterange').datepicker({format: 'yyyy-mm-dd' });
}

var _year;
function loadData() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/years/' + id, function (result) {
            if (result.state == 200) {
                _year = result.data;
                bindData(_year);
            }
        })
    }
}

function bindData(year) {
    $('#caption').val(year.caption);
    $('#term').val(year.term);
//    $('#begin').datepicker({startDate: year.beginDate});
//    $('#end').datepicker({endDate: year.endDate});
    $('#begin').val(year.beginDate);
    $('#end').val(year.endDate);

}

function collectData() {
    var year = _year || {};
    year.caption = $('#caption').val();
    year.term = $('#term').val();
    year.begin = $('#begin').val();
    year.end = $('#end').val();
    return year;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _year = collectData();
    var api = '/api/years';
    if (_year.id) {
        g.patchData(api + '/' + _year.id, _year, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'schoolYear-manage.html';
            }

        })
    } else {
        g.postData(api, _year, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _year.id = result.id;
                window.location.href = 'schoolYear-manage.html';
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
    _year = null;
}
