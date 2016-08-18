window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents1();
        query()
        loadData1();
    });
}, false)
var _pn, _ps = 12;
function bindEvents1() {
    var fc = document.getElementById('file_upload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('file_upload', 'imgPreview')
    }, false)
    $('#btnSubmit').click(doSubmit);
    $('#btnOnReset').click(onReset);
    $('#btnQuery').click(query);
}
function query() {
    loadRes();
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
var _decorate, _target;
function loadData1() {
    var id = g.getUrlParameter('id');
    var targetid = g.getUrlParameter('targetid');
    if (id) {
        g.getData('/api/decorates/' + id, function (result) {
            if (result.state == 200) {
                _decorate = result.data;
                targetid = _decorate.targetId;
                $('#caption').val(_decorate.caption);
                $('#describe').val(_decorate.describe);
                $('#imgPreview').attr('src', _decorate.imageFile);
            }
        })
    }
    if (targetid) {
        g.getData('/api/resources/' + targetid, function (result) {
            if (result.state == 200) {
                _target = result.data;
                if (!_decorate) {
                    $('#caption').val(_target.caption);
                    $('#describe').val(_target.caption);
                }
//                $('#btnSelectNews').css("display", "none");
            }
        })
    }
}
function collectData() {
    var decorate = _decorate || {};
    decorate.caption = $('#caption').val();
    decorate.describe = $('#describe').val();
    decorate.imageFile = $('#imgPreview').attr('src');
    decorate.targetId = _target.id;
    decorate.kind = 1;
    decorate.targetType = 90;
    return decorate;
}
function doSubmit() {
    if (!_target) {
        alert('请选择要推荐的资源，或者从资源管理选择配图！');
        return;
    }
    validateForm();
}
function ajaxSubmit() {
    _target = collectData();
    var api = '/api/decorates';
    if (_target.id) {
        g.patchData(api + '/' + _target.id, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                window.location.href = 'resource-manage.html';
            }
        })
    } else {
        g.postData(api, _target, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('保存成功');
                _target.id = result.id;
                window.location.href = 'resource-manage.html';
            }
        })
    }
}
function onReset() {
    $("#mainForm").clear();
    _target = null;
}

//查询资源
function loadRes(pn) {
    if (!pn)
        pn = 1;
    var txtQuery = document.getElementById("txtQuery").value;
    var filter = ''
    if (txtQuery) {
        filter = encodeURIComponent(JSON.stringify({'caption': txtQuery}));
    }
    var url = '/api/resources/statistics/count';
    if (filter != '') {
        url += '?filter=' + filter
    }
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            if (total == 0) {
                alert("未找到相关资源！")
                $("#txtQuery").val('');
            }
            var offset = _ps * (pn - 1);
            var url = '/api/resources?offset=' + offset + '&count=' + _ps;
            if (filter)
                url += "&filter=" + filter;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    render(result2.data, total, pn);
                }
            });
        }
    });
}
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('resource-tbody')
    $(container).empty();
    var template = g.getTemplate('resource-tr');
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        g.parseResourceCaption(data, datas);
        var ele = g.dataToElement(data, template);
        container.appendChild(ele);
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);

    $('.btn-rowselect').click(select);//选择
}
function goPage(pn) {
    _pn = pn;
    loadRes(pn);
}
//选择
function select(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('hotresimg-resManage-create.html?targetid=' + id);
}