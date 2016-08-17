window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        g.types.loadData();
        g.subjects.loadData();
        g.stages.loadData();
        g._terms;
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
var _decorate = {}, _target;
function loadData1() {
    var id = g.getUrlParameter('id');
    if (id) {
        g.getData('/api/decorates/' + id, function (result) {
            if (result.state == 200) {
                _decorate = result.data;
                $('#caption').val(_decorate.caption);
                $('#describe').val(_decorate.describe);
                $('#imgPreview').attr('src', _decorate.imageFile);
                g.getData('/api/resources/'+_decorate.targetId, function(d) {
                    if (d.state == 200 || d.state == 201) {
                        _target = d.data
                    }
                })
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
    decorate.urlAddr = '' + _target.kind
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
    _decorate = collectData();
    var api = '/api/decorates';
    var postOrPatchResRecommend =function(){
        g.patchData('/api/resources/'+_target.id, {"recommend": 1,"checkState":2}, function(d) {
            if (d.state == 200 || d.state == 201) {
                alert('保存成功');
                window.location.href = 'hotResImg-manage.html';
            }
        })
    }
    if (_decorate.id) {
        g.patchData(api + '/' + _decorate.id, _decorate, function (result) {
            if (result.state == 200 || result.state == 201) {
                postOrPatchResRecommend();
                alert('保存成功');
                window.location.href = 'hotResImg-manage.html';
            }
        })
    } else {
        g.postData(api, _decorate, function (result) {
            if (result.state == 200 || result.state == 201) {
                postOrPatchResRecommend();
            }
        })
    }
}
function onReset() {
    $("#mainForm").clear();
    _target = null;
}

function loadRes(pn) {
    if (!pn)
        pn = 1;
    var filter = {}
    filter.recommend = 0
    var txtQuery = document.getElementById("txtQuery").value
    if (txtQuery) {
        filter.caption = txtQuery
    }
    var filterString = 'filter=' + encodeURIComponent(JSON.stringify(filter))
    var url = '/api/resources/statistics/count?' + filterString
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            if (total == 0) {
                alert("未找到相关资源！")
                $("#txtQuery").val('');
            }
            var offset = _ps * (pn - 1);
            var url = '/api/resources?offset=' + offset + '&count=' + _ps;
            url += '&' + filterString
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    _resources = result2.data
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
    _target = _resources.find({id: id})[0]
    _decorate.targetId = _target.id
    _decorate.caption = _target.caption
    _decorate.describe = _target.describe
    _decorate.kind = 1;
    _decorate.targetType = 90;
    _decorate.urlAddr = '' + _target.kind
    $('#caption').val(_target.caption);
    $('#describe').val(_target.describe);
    $('#selectReshot').modal('hide')
    //window.location.replace('create-hotresimg.html?targetid=' + id);
}