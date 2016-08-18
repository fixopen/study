var _resourceEdit;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        getResource();
        bindEvents()
    });
}, false)
function bindEvents() {
    $("#btnSubmit").on('click', doSubmit);
    $('#btnOnReset').click(onReset);
}

function doSubmit() {
    var data = collectData();
    var id = g.getUrlParameter('id');
    var url = '/api/resources/' + id;
    g.patchData(url, data, function (result) {
        if (result.state == 200) {
            alert('保存成功')
            window.location.href = "resource-manage.html"
        } else {
            alert("保存失败")
        }
    })
}

function onReset() {
    $(':input', '#mainForm')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    _resourceEdit = null;
}
//收集数据
function collectData() {
    var resource = _resourceEdit || {};
    resource.caption = $('#caption').val();
    resource.kind = $('#kind').val();
    resource.subject.caption = $('#subjectCaption').val();
    var stage = '';
    var stageChks = $("[name='stageChks']:checked").each(function (c) {
        stage += $(this).val() + ",";
    });
    if (stage != '') {
        stage = stage.substring(0, stage.length - 1);
    }
    resource.gradeTerms = stage;
    return resource;
}


function getResource() {
    var id = g.getUrlParameter('id');
    var url = '/api/resources/' + id;
    g.getData(url, function (result) {
        if (result.state == 200 || result.state == 201) {
            _resourceEdit = result.data;
            renderResource(_resourceEdit);
        }
    })
}

//输出查询部分
function renderResource(resource) {
    $("#caption").val(resource.caption);
    var resourceKind = resource.kind;
    var typeCaption = "";
    switch (resourceKind) {
        case 1:
            typeCaption = "电子教材";
            break;
        case 2:
            typeCaption = "课件";
            break;
        case 3:
            typeCaption = "微课";
            break;
        case 4:
            typeCaption = "教学游戏";
            break;
        case 5:
            typeCaption = "教学案例";
            break;
        case 6:
            typeCaption = "活动方案";
            break;
        case 7:
            typeCaption = "教学工具";
            break;
        case 8:
            typeCaption = "教学素材";
            break;
        default:
            break;
    }
    $("#typeCaption").val(typeCaption);
    $("#dateCreated").val(resource.dateCreated);
    $("#subjectCaption").val(resource.subject.caption);
    $("#creatorUserName").val(resource.creator.userName);
    bindData(resource.gradeTerms);
}

function bindData(gradeTerms) {
    var stages = gradeTerms.split(',');
    for (var i = 0; i < stages.length; i++) {
        var stage = stages[i];
        var ckb = $("[value='" + stage + "']");
        if (ckb) {
            $(ckb).attr('checked', true);
        }
    }
}
//返回上一界面
function resourceReturn() {
    // var q ;
    window.location.href = "resource-manage.html";
    //history.go(-1);
}
