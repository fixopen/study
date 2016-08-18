window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
    });
}, false)
function bindEvents() {
    $('.input-daterange').datepicker({format: 'yyyy-mm-dd'});
    var fc = document.getElementById('file_upload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('file_upload', 'systemLogo')
    }, false)
    $('#selectAll').click(selectAll);
    $('#btnSubmit').click(doSubmit);
    $('#btnOnReset').click(onReset);
}
//全选
function selectAll(evt) {
    $('#permission-tbody').find("input[type='checkbox']").each(
        function(){
            $(this).prop('checked', evt.target.checked);

        }
    );
}
//收集 选中数据的id值
function collectionData(){
    var stage=[];
    var stageChks=$("[name='select']:checked").each(function(c){
        stage.push($(this).val())
    });
    return stage;
}
var _target
function loadData() {

    $('#systemDescribe').redactor({
        lang: 'zh_cn',
        imageUpload: '/api/medias',
        imageUploadCallback: function (image, json) {
            // image = this is DOM element of image
            //json = for example: { "filelink": "/images/img.jpg" }
            if (image && json && json.filelink) {
                image.src = json.filelink + "?a=" + Math.random(4);
            }
        },
        imageUploadErrorCallback: function (json) {
            // alert(json);
        }
    });
    g.getData('/api/systems/parameter', function (result) {
        if (result.state == 200) {
            _target = result.data
            for (var i = 0; i < result.data.length; i++) {
                var data = result.data[i];
                if (data.name == 'systemName') {
                    $('#systemName').val(data.value);
                } else if (data.name == 'systemUrl') {
                    $('#systemUrl').val(data.value);
                } else if (data.name == 'systemLogo') {
                    $('#systemLogo').attr('src', data.value);
                } else if (data.name == 'systemDescribe') {
                    $('#systemDescribe').redactor('set',data.value);
                }
            }
        }
    })
    url="/api/system/operation";
    g.getData(url,function(result){
        if(result.state==200){
            renderOperation(result.data);
        }
    })
}
//收集系统名字
function collectData() {
    for (var i = 0; i < _target.length; i++) {
        var data = _target[i];
        if (data.name == 'systemName') {
            data.value = $('#systemName').val();
        } else if (data.name == 'systemUrl') {
            data.value = $('#systemUrl').val();
        } else if (data.name == 'systemLogo') {
            data.value = $('#systemLogo').attr('src');
        } else if (data.name == 'systemDescribe') {
            data.value  = $('#systemDescribe').redactor('get');
        }
    }
    return _target;
}
function doSubmit() {
    if (!window.confirm('是否要保存系统设置？')) {
        return;
    }
    ajaxSubmit();
    alert('保存成功')
}
function ajaxSubmit() {
    _target = collectData();
    var api = '/api/systems/parameter/';
    for (var i = 0; i < _target.length; i++) {
        g.patchData(api + _target[i].name, _target[i], function (result) {
            if (result.state == 200 || result.state == 201) {
            }
        })
    }
}
function onReset() {
    $("#mainForm").clear();
    _target = null;
}

var _authorization,_authorizationData;
//收集授权书的信息
function operationData(){
    var stage=[];
    var authorization=_authorization||{};
    authorization.timeLimit=$("#timeLimit").val();
    authorization.timeLimitBegin=$("#timeLimitBegin").val();
    authorization.timeLimitEnd=$("#timeLimitEnd").val();
    authorization.timesLimit=$("#timesLimit").val();
    authorization.userLimit=$("#userLimit").val();
    var stageChks=$("[name='select']:checked").each(function(c){
        stage.push($(this).val())
    });
    authorization.Limit=stage;
    authorization.devLimit=$("#devLimit").val();
    authorization.versionNum=$("#versionNum").val();
    authorization.issuer=$("#issuer").val();
    return authorization;
}
//生成授权证书
function operation(){
    _authorizationData=operationData();
    var url="/api/system/operation";
    g.patchData(url,_authorizationData,function(result){
        if(result.state==200){
            alert("授权证书更新成功");
            window.location.href="/backstage/system/system-manage.html";
        }
    })
}
function parameterData(){
    var parameterData={};
    parameterData.allow_download_times= $("#allow_download_times").val();
    parameterData.order_freedom_minute= $("#order_freedom_minute").val();
    parameterData.system_name= $("#system_name").val();
    parameterData.system_logo= '~' +window.mediaUri;
    return parameterData;
}
//生成系统参数
function parameter(){
    var url="/api/system/parameter";
    g.patchData(url,parameterData(),function(result){
        if(result.state==200){
            alert("系统参数修改成功");
            window.location.href="/backstage/system/system-manage.html";
        }
    })

}


//输出显示授权证书模板内容
function renderOperation(data){
    if(data.timeControl=="True"){
        // if(data.timeTotal==""){
        $("#timeLimitBegin").val(data.timeBegin);
        $("#timeLimitEnd").val(data.timeEnd);
        // }else{
        $("#timeLimit").val(data.timeTotal);
        // }
    }
    if(data.countControl=="True"){
        $("#timesLimit").val(data.countValue);
    }
    if(data.userBindControl=="True"){
        $("#userLimit").val(data.userBindValue);
    }
    if(data.devBindControl=="True"){
        $("#devLimit").val(data.devBindValue);
    }
    if(data.resBindControl=="True"){
        // $("#resourceLimit").val(data.resBindValue.value);
    }
    if(data.enablePrint=="True"){
        // $("#downloadTimes").val(data.enablePrint.value);
    }
    if(data.enableCopy=="True"){
        // $("#downloadTimes").val(data.enableCopy.value);
    }
    if(data.versionStr!=""){
        $("#versionNum").val(data.versionStr);
    }
    if(data.issuerStr!=""){
        $("#issuer").val(data.issuerStr);
    }
}






