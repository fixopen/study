window.addEventListener('load', function (evt) {
    init();
    bindEvents();
}, false)
function bindEvents() {

}
function init() {
    var loginname = getLoginName();
    var self_info = {
        "photo": "../images/1234567.png",
        "name": loginname,
        "score": 473,
        "starLevel": generateStarLevel(3.5, "../")
    }
    var selfinfoContainer = document.getElementById('self_info')
    selfinfoContainer.appendChild(dataToElement(self_info, getTemplate('update_self_info')));


    $("#choose-thumbimg-button").on('click', function (evt) {
        $("#thumbimg-input").click();
    });

    $("#thumbimg-input").on('change', function (evt) {
        uploadThumb(evt)
    });

    $.validator.setDefaults({
        submitHandler: submit
    });
    $("#mainForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            file: {
                required: true
            }
        },
        messages: {
            title: {
                required: "请输入名称",
                minlength: "最少两个字符"
            },
            file: {
                required: "请选择文件"
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
function submit() {
    var serializeObj = $("#mainForm").serializeJson();
    alert(serializeObj.name);
}
function uploadThumb(evt) {
    var files = evt.target.files;
    uploadFiles(files);
}
function uploadResourceFile() {
}

function readFileContent(file) {
//    var fileContent = null
//    if (file.webkitSlice) {
//        fileContent = file.webkitSlice(0, file.size, "application/octet-stream")
//    } else if (file.mozSlice) {
//        fileContent = file.mozSlice(0, file.size, "application/octet-stream")
//    } else if (file.slice) {
//        fileContent = file.slice(0, file.size, "application/octect-stream")
//    } else {
//        alert('browser not support')
//    }
    var fileReader = new FileReader()
    fileContent = fileReader.readAsBinaryString(file)
    return fileContent;
}

function uploadFile(fileType, content) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/resources", false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //var href = JSON.parse(xhr.responseText).location
            //window.currentCategory.image = href
            //document.getElementById('categoryPhoto').src = href
        }
    }
    xhr.setRequestHeader("Content-Type", fileType)
    xhr.send(content)
}

function uploadFiles(files) {
    var fileCount = files.length
    for (var i = 0; i < fileCount; i++) {
        var content = readFileContent(files[i])
        uploadFile(file.type, content)
    }
}

function dropIt(e) {
    e.stopPropagation();
    e.preventDefault();
    uploadFiles(e.dataTransfer.files);
}