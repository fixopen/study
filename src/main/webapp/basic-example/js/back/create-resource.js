window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser();
//    bindEvents();
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
//function bindEvents() {
//    // var fc = document.getElementById('file_upload')
//    // fc.addEventListener('change', function(evt) {
//    //     uploadFileViaFormData('file_upload', 'zip');
//    // }, false)
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
//        }
//    });
//}
//function upload(argument) {
//    $('#file_upload').uploadify('upload', '*');
//}
//
//function cancelUpload(argument) {
//    $('#file_upload').uploadify('cancel');
//}