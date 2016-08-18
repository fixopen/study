var _ps = 4, _pn;
var userId = g.getCookie('userId');
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.importPersonInfoTop(g.user.currentUser.id);
        g.importPersonInfoLeft();
        g.types.loadData();
//    bindEvents();
        getRecommendRes();
        g.importFooter();
    });
}, false)

g.progressExecutor = {
    tid: 0,
    currentStep: 0,
    steps: [1,1,1,1,1,1,3, 3, 3, 5, 5, 5, 8, 8, 8, 15, 15, 15, 3, 3, 3, 10, 10, 10, 20, 20, 20, 8, 8, 8, 15, 15, 15, 30, 30, 30, 3, 3, 3, 5, 5, 5, 8, 8, 8, 15, 15, 15, 3, 3, 3, 10, 10, 10, 20, 20, 20, 8, 8, 8, 15, 15, 15, 30, 30, 30, 3, 3, 3, 5, 5, 5, 8, 8, 8, 15, 15, 15, 3, 3, 3, 10, 10, 10, 20, 20, 20, 8, 8, 8, 15, 15, 15, 30, 30, 30, 60, 60, 60, 120, 120, 120, 360, 480, 600],
    progressing: function () {
        var up = document.getElementById('uploadProgress')
        if (up) {
            var currentValue = up.getAttribute('aria-valuenow')
            ++currentValue
            up.setAttribute('aria-valuenow', currentValue)
            up.style.setProperty('width', currentValue + '%')
        }
        ++g.progressExecutor.currentStep
        g.progressExecutor.tid = setTimeout(g.progressExecutor.progressing, g.progressExecutor.steps[g.progressExecutor.currentStep] * 1000)
    },
    executeFinal: function() {
        var up = document.getElementById('uploadProgress')
        if (up) {
            var currentValue = up.getAttribute('aria-valuenow')
            ++currentValue
            up.setAttribute('aria-valuenow', 100)
            up.style.setProperty('width', 100 + '%')
            clearTimeout(g.progressExecutor.tid)
        }
    },
    clearState: function() {
        var up = document.getElementById('uploadProgress')
        if (up) {
            var currentValue = up.getAttribute('aria-valuenow')
            ++currentValue
            up.setAttribute('aria-valuenow', 1)
            up.style.setProperty('width', 1 + '%')
        }
    },
    run: function() {g.progressExecutor.tid = setTimeout(g.progressExecutor.progressing, g.progressExecutor.steps[g.progressExecutor.currentStep] * 1000)}
}

function upload(fileControlId) {
    var fileControl = document.getElementById(fileControlId)
    var file = fileControl.files[0]
    if(file != undefined){
        var s = file.size
        if (s!=undefined) {
            if (s < 300 * 1024 * 1024) {
                $('.progress').removeClass('hidden');
                g.progressExecutor.run();
                var xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        g.progressExecutor.executeFinal()
                        $('.progress').addClass('hidden');
                        g.progressExecutor.clearState()
                        alert('上传完成,请到我的消息中查看上传详细消息!');
                    }
                }
                var formData = new FormData();
                formData.append("file", file)
                xhr.open('POST', '/api/resources?sessionId=' + g.getCookie('sessionId'))
                xhr.send(formData)
            } else {
                alert('文件超过300M,无法上传！')
                $('.progress').addClass('hidden');
                g.progressExecutor.clearState()
            }
        }
    }else{
//        s = file.size
        alert('请选择合适的资源上传！')
    }
}
//
//function bindEvents() {
//    var sessionId = g.getCookie('sessionId');
//    $('#file_upload').uploadify({
//        'formData': {
//            'timestamp': '11111',
//            'token': 'dddd',
//            'sessionId': sessionId
//        },
//        'swf': '/js/libs/uploadify.swf',
//        'cancelImg': '/js/libs/uploadify-cancel.png',
//        'uploader': '/api/resources?sessionId=' + sessionId,
//        'auto': false,
//        'multi': true,
//        'fileExt ': '*.zip;*.rar',
//        'fileSizeLimit': '500MB',
//        'buttonText': '选择文件',
//        //scriptData: { sessionId: sessionId},
//        onInit: function () {
//
//        },
//        onSelect: function (event, queueID, fileObj) {
//
//        },
//        onAllComplete: function (filesUploaded, errors, allBytesLoaded, speed) {
//            alert('上传完成,请到我的消息中查看上传详细消息!');
//            getRecommendRes();
//        }
//    });
//}
//function upload(argument) {
//    $('#file_upload').uploadify('upload', '*');
//}
//function cancelUpload(argument) {
//    $('#file_upload').uploadify('cancel');
//}

//输出当前用户上传的资源
function renderRecommendRes(datas, total, pn) {
    var recommendResContainer = document.getElementById('uploadRes');
    recommendResContainer.innerHTML = "";
    var count = datas.length
    for (var i = 0; i < count; ++i) {
        var template = null
        var data = datas[i];
        template = g.getTemplate('resource-tpl');
        var href = 'resource-detail.html?id=' + data.id;
        data.href = href;
        var ele = g.dataToElement(data, template);
        recommendResContainer.appendChild(ele);
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    _pn = pn;
    getRecommendRes(pn);
}

//获取用户上传的资源
function getRecommendRes(pn) {
    if (!pn)
        pn = 1;
    var url = 'api/users/' + userId + '/uploads/statistics/count';
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = 'api/users/' + userId + '/uploads';
            url += '?offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result) {
                if (result.state == 200) {
                    renderRecommendRes(result.data, total, pn);
                }
            })
        }
    })
}