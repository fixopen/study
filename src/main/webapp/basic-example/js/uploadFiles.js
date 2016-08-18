function uploadFileViaFormData(fileControl, imageControl) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var href = JSON.parse(xhr.responseText).filelink
            document.getElementById(imageControl).src = href
            window.mediaUri = href
        }
    }
    xhr.open("POST", "/api/medias", false)
    var f = document.getElementById(fileControl).files[0]
    //xhr.setRequestHeader("Content-Type", f.type)
    //xhr.setRequestHeader("Content-Length", f.size)
    //xhr.setRequestHeader("Content-Type", 'multipart/form-data')
    var formData = new FormData();
    formData.append("file", f);
    //xhr.setRequestHeader("Content-Length", formData.size)
    xhr.send(formData)
}

/*new version, not test*/
function readFileContent(file) {
    var fileContent = null
    if (file.webkitSlice) {
        fileContent = file.webkitSlice(0, file.size, "application/octet-stream")
    } else if (file.mozSlice) {
        fileContent = file.mozSlice(0, file.size, "application/octet-stream")
    } else if (file.slice) {
        fileContent = file.slice(0, file.size, "application/octect-stream")
    } else {
        alert('browser not support')
    }
    var fileReader = new FileReader()
    fileReader.readAsBinaryString(fileContent)
    return fileContent
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

/*used version, tested*/
//files upload
function uploadFiles(files) {
    var fileCount = files.length
    for (var i = 0; i < fileCount; i++) {
        var f = files[i];
        fileReader.onload = (function (aFile) {
            return function (e) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/resources", false);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var href = JSON.parse(xhr.responseText).location;
                        window.currentCategory.image = href;
                        document.getElementById('categoryPhoto').src = href;
                    }
                }
                xhr.setRequestHeader("Content-Type", aFile.type);
                xhr.send(window.uploadContent);
            };
        })(f);
        var fileContent;
        if (f.webkitSlice) {
            fileContent = f.webkitSlice(0, f.size, "application/octet-stream");
        } else if (f.mozSlice) {
            fileContent = f.mozSlice(0, f.size, "application/octet-stream");
        } else if (f.slice) {
            fileContent = f.slice(0, f.size, "application/octect-stream");
        } else {
            alert('browser not support');
        }
        var fileReader = new FileReader();
        fileReader.readAsBinaryString(fileContent);
        window.uploadContent = fileContent;
    }
}

function dropIt(e) {
    e.stopPropagation();
    e.preventDefault();
    uploadFiles(e.dataTransfer.files);
}


//<img id="categoryPhoto" src="" alt="Drag & drop category photo" ondragenter="return false" ondragover="return false" ondrop="dropIt(event)" />
//<p class="text-center">
//    <button id="choose-files-button" class="btn">choose files</button>
//    <input type="file" id="files-input" size="10" accept="image/*" multiple="multiple" style="display: none" />
//</p>

$("#choose-files-button").on('click', function (evt) {
    $("#files-input").click()
});

$("#files-input").on('change', function (evt) {
    uploadFiles(evt.target.files)
});
