var _score = {};
var _resource = null;
var _files = [];
var _ps = 3;
var _pn;
var _id = '';
var _comment = null;

var getResource = function(resourceId) {
//    _id = g.getUrlParameter('id')
    g.x = new g.GenericProcessor({
        data: '/api/resources/' + resourceId,
        dataPostprocess: function(data, index, params) {
           // var jsonString = JSON.stringify(data)
            var pd = data //{}
            //g.parseDataRef(data, data, pd)
            g.parseResourceCaption(pd, pd)
            return pd
        },
        renderScenes: [
            {container: 'resourceContainer'}
        ]
    })
    g.x.load()
    //在收藏分享的方法中用到
    _resource = g.x.data;
    //电子教材显示手机下载按钮
    if(_resource.kind == 1){
        document.getElementById('phoneDownload').style.display='block'
    }
//    if(_resource.files.length>0){
//        for(var i=0;_resource.files.length>i;i++){
//            g.getFileIcon(_resource.files[i]);
//        }
//    }
}
//根据资源id获取二维码
function getQrcode() {
    g.getData('api/resources/' + _id + '/qrcode', function (result) {
        if (result.state == 200) {
            document.getElementById("image").src = result.data;
        }
    })
    $('#phoneImage').modal('show');
}
//获取资源的所有文件,pn:页号
function getFiles() {
    // getData('api/resources/'+resource.id+'/files/statistics/count',function(result){
    // 	if(result.state==200){
    // 		var total=result.data;
    var url = 'api/resources/' + _id + '/files';
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            _files = result2.data;
            renderFiles(result2.data);
            if (_files.length > 0)
                //renderFilePreview(_files[0]);
                g.getFileIcon(_files[0]);
        }
    })
    // 	}
    // })
}
//x.data.files = []
//获取资源的所有历史评论,pn:页号
var _commentAllDatas;
function getComments() {
    g.getData('api/resources/' + _id + '/comments', function (result) {
        if (result.state == 200) {
            _commentAllDatas = result.data
            getFilterCommentsDatas();
        }
    })
}
//获取过滤完的评论数据数据
var _filtertdatas;
function getFilterCommentsDatas(pn) {
    if (!pn)
        pn = 1;
    _filtertdatas = [];
    for (var i = 0; i < _commentAllDatas.length; ++i) {
        if (_commentAllDatas[i].shield == 0) {
            _filtertdatas.push(_commentAllDatas[i])
        }
    }
    var total = _filtertdatas.length;
    var offset = _ps * (pn - 1);
    var r = []
    var count = 0;
    if (total < _ps) {
        count = total;
    } else {
        count = offset + _ps
    }
    for (var j = offset; j < count; ++j) {
        r.push(_filtertdatas[j])
    }
    renderComments(r, pn, total)
}
//获取推荐资源
function getRecommentReses() {
    g.getData('api/resources/' + _id + '/relationResources', function (result) {
        if (result.state == 200) {
            renderRecomments(result.data);
        }
    });
}

//保存评论
function saveComment() {
    if (!_comment)
        _comment = {};
    _comment.content = $("#txtComment").val();
    if (!_comment.content) {
        alert('请输入评论内容');
        return;
    }

    _comment.kind = $("input[name='commenttype']:checked").val();
    _comment.resourceId = _id;
    for (var key in _score)
        _comment[key] = _score[key];
    if (_comment[key] == null) {
        alert('请输入评分');
        return;
    }
    if (!_comment.id) {
        g.postData('api/resources/' + _id + '/comments', _comment, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('您的评论已经提交，谢谢您的参与！');
                $("#txtComment").val('');
                _comment.id = result.id;
                getComments();
            }
        });
    } else {
        g.patchData('api/resources/' + _id + '/comments/' + _comment.id, _comment, function (result) {
            if (result.state == 200) {
                alert('您的评论已经提交，谢谢您的参与！');
                $("#txtComment").val('');
                getComments();
            }
        });
    }
}
function doPreview(e) {
    var id = e.target.attributes['rid'].value;
    if (id) {
        var files = _files.find({id: id});
        if (files.length > 0) {
            var file = files[0];
            renderFilePreview(file);
        }
    }
}
//评分
function rClick(evt) {
    var score = $(evt.target).attr('score');
    var name = $(evt.target).attr('name');
    $("span[name='" + name + "']").removeClass("glyphicon-star");
    $("span[name='" + name + "']").removeClass("glyphicon-star-empty");
    $("span[name='" + name + "']").each(function () {
        if ($(this).attr('score') <= score) {
            $(this).addClass("glyphicon-star");
        } else {
            $(this).addClass("glyphicon-star-empty");
        }
    });
    switch (name) {
        case 'score01': //资源评价
            break;
        case 'score02': //资源质量
            break;
        case 'score03': //媒体质量
            break;
        case 'score04': //查找快捷
            break;
        case 'score05': //相 关 性
            break;
    }
    _score[name] = score;

}
//建议
function commentChange() {
    var curLength = $("#txtComment").val().length;
    $("#comment-inputInfo").removeClass('red');
    if (curLength > 100) {
        var num = $("#txtComment").val().substr(0, 100);
        $("#txtComment").val(num);
        $("#comment-inputInfo").text("0");
        $("#comment-inputInfo").addClass('red');
    } else {
        $("#comment-inputInfo").text(100 - $("#txtComment").val().length);
    }
}
var _report;
//保存举报
function saveReport() {
    if (!_report)
        _report = {};
    _report.content = $("#txtReport").val();
    if (!_report.content) {
        alert('请输入举报内容');
        return;
    }
    //_report.resourceId=_resource.id;
    if (!_report.id) {
        g.postData('api/resources/' + _id + '/reports', _report, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert('您的举报已经提交，谢谢您的参与！');
                $("#txtReport").val('');
                _report.id = result.id;
            }
        });
    } else {
        g.patchData('api/resources/' + _id + '/reports/' + _report.id, _report, function (result) {
            if (result.state == 200) {
                alert('您的举报已经提交，谢谢您的参与！');
                $("#txtReport").val('');
            }
        });
    }
}
//举报
function reportChange() {
    var curLength = $("#txtReport").val().length;
    $("#report-inputInfo").removeClass('red');
    if (curLength > 100) {
        var num = $("#txtReport").val().substr(0, 100);
        $("#txtReport").val(num);
        $("#report-inputInfo").text("0");
        $("#report-inputInfo").addClass('red');
    } else {
        $("#report-inputInfo").text(100 - $("#txtReport").val().length);
    }
}

//输出资源预览
function renderFilePreview(file) {
    if (file) {
        var tpl = 'doc-media-tpl';
        if (file.mimeType == 'application/pdf' || file.mimeType == 'application/rtf'
            || file.mimeType == 'application/msword' || file.mimeType == 'application/doc' || file.mimeType == 'application/vnd.ms-works'
            || file.mimeType == 'application/vnd.ms-excel'
            || file.mimeType == 'application/vnd.ms-powerpoint' || file.mimeType == 'application/ppt'
            || file.mimeType == 'text/html'
            || file.mimeType == 'text/plain' || file.mimeType == 'text/richtext'
            || file.mimeType == 'application/swf') {
            tpl = 'doc-media-tpl';
        } else if (file.mimeType == 'image/bmp' || file.mimeType == 'image/gif' || file.mimeType == 'image/jpg' || file.mimeType == 'image/jpeg' || file.mimeType == 'image/tiff') {
            tpl = 'image-media-tpl';
        } else if (file.mimeType == 'application/zip' || file.mimeType == 'application/x-compress') {
            tpl = '';
        } else if (file.mimeType == 'audio/basic' || file.mimeType == 'audio/mpeg' || file.mimeType == 'audio/x-mpeg' || file.mimeType == 'audio/x-wav') {
            tpl = 'video-media-tpl';
        } else if (file.mimeType == 'video/mp4' || file.mimeType == 'application/mpg' || file.mimeType == 'video/x-msvideo' || file.mimeType == 'application/x-shockwave-flash' || file.mimeType == 'video/quicktime' || file.mimeType == 'video/mpeg' || file.mimeType == 'video/x-sgi-movie') {
            tpl = 'video-media-tpl';
        } else {
            tpl = '';
        }
        if (tpl == '') {
            alert('未知的文档类型,请下载预览');
            return;
        }
        var container = document.getElementById('preview-Container');
        container.innerHTML = "";
        var template = g.getTemplate(tpl);
        var ele = g.dataToElement(file, template);
        container.appendChild(ele);
        if (tpl == 'doc-media-tpl')
            viewSwf(file.id);
    }
}
//输出资源详情
function renderResourceDetail(resource) {
    if (resource) {
        //g.parseResourceCaption(resource,g.types.data)
        resource.typeCaption =g.types.data.find({
            id: resource.kind.toString()
        })[0].caption;
        resource.subjectCaption = /*resource.subject.caption ||*/ '';
        resource.ownerCaption = /*resource.creator.userName || */'';
        resource.versionCaption = /*resource.textbookVersion.Caption ||*/ '';
        resource.gradeTermCaption = /*g.parseGradeCaption(resource.gradeTerms)*/'';
        var downUri = '/download.whtml?t=2&src=' + resource.id;
        resource.downUri = downUri;
        var detailContainer = document.getElementById('detailTab');
        var template = g.getTemplate('detail-tpl');
        var deltailele = g.dataToElement(resource, template);
        detailContainer.appendChild(deltailele);

        var score = resource.score || 4;
        $($(deltailele).find('#level-Container')).find("span").each(function (i) {
            if (i < score) {
                $(this).removeClass("glyphicon-star-empty");
                $(this).addClass("glyphicon-star");
            }
        });

        $('#comment-Container').text(_resource.summary);
//        $('#btnFavoriteResource').click(function (e) {
//            favoriteResource();
//        });
    }
}
//分享至班级空间
function doShareToBBs() {
    var resId = _id;
    //todo:调用班级空间接口
    g.getData('/learn/community/share/shareLink.htm?url=http://www.bjct.net.cn/resource-detail.html?id=' + resId, function (result) {
        if (result == 1) {
            alert('分享成功')
        } else {
            alert(result);
        }
    });
}
//输出资源文件列表,
function renderFiles(files) {
    var container = document.getElementById('files-Container');
    container.innerHTML = '';
    var template = g.getTemplate('file-tpl');
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.size > 1024 * 1024) {
            file.size = (file.size / (1024 * 1024)).toFixed(2);
            file.size = file.size + 'MB';
        } else {
            file.size = (file.size / 1024).toFixed(2);
            file.size = file.size + 'KB';
        }
        g.getFileIcon(file);
//        file.fileName
        var downUri =  file.storeName;
        file.downUri = downUri;
//        var previewUri = '/download.whtml?t=0&src=' + file.id;
//        file.previewUri = previewUri;
        var ele = g.dataToElement(file, template);
        container.appendChild(ele);
    }
    //浏览器预览文件
    //$('.btnPreview').click(doPreview);
    //renderPage('pagicontainer',_ps,pn,total,goPageFile);
}
//分页动作
// function goPageFile(pn){
// 	getFiles(_resource,pn);
// }
//输出推荐资源
function renderRecomments(recomments) {
    var recommentContainer = document.getElementById('recommend-Container');
    var recommentTp = g.getTemplate('recommend-tpl');
    for (var i = 0; i < Math.min(8, recomments.length); i++) {
        var resource = recomments[i];
        g.parseResourceCaption(resource, recomments);
        var href = 'resource-detail.html?id=' + resource.id;
        resource.href = href;
        if (resource.id == _id)
            continue;
        var downUri = '/download.whtml?t=2&src=' + resource.id;
        resource.downUri = downUri;
        g.parseResourceCaption(resource, recomments);
        var ele = g.dataToElement(resource, recommentTp);
        recommentContainer.appendChild(ele)
        var score = resource.score09 || 0;
        $($(ele).find('#level-Container')).find("span").each(function (i) {
            if (i < score) {
                $(this).removeClass("glyphicon-star-empty");
                $(this).addClass("glyphicon-star");
            }
        });
    }
}
var _folders;
//获取所有文件夹
function getAllFolders() {
    if (_folders) {
        renderSelectFolderTree(_folders);
        return;
    }
    var uid = g.getCookie('userId')
    var filter = encodeURIComponent(JSON.stringify({subKind: 1, kind: 2}));
    var url = 'api/users/' + uid + '/favorites?filter=' + filter;
    url += '&offset=0&count=1000';
    g.getData(url, function (result) {
        if (result.state == 200) {
            _folders = result.data;
            _folders.push({id: '15761872542653701', caption: '我的收藏'});
            renderSelectFolderTree(result.data);
        }
    })
}
function renderSelectFolderTree() {
    var nodes = g.buildCatalogueTreeData(_folders);
    $('#tt').tree({
        data: nodes,
        // animate: true,
        method: 'get',
        dnd: true,
        lines: true,
        onClick: function (node) {
        },
        onContextMenu: function (e, node) {
            e.preventDefault();
            $(this).tree('select', node.target);
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        },
        onDrop: function (target, source, point) {
            var uid = g.getCookie('userId');
            var node = $(this).tree('getNode', target);
            var data = source.tag;
            data.parentId = node.id;
            g.patchData('api/users/' + uid + '/favorites/' + data.id, data, function (result) {
                if (result.state == 200) {
                }
            });
        }
    });
}
//
//收藏资源
function favoriteResource() {
    getAllFolders();
    $('#selectFolderModal').modal('show');
}
function onSelected() {
    var t = $('#tt');
    var node = t.tree('getSelected');
    if (!node)
        return;
    var data = {resourceId: _id};
    var uid = g.user.getLoginId();
    data.subKind = 7;
    data.kind = 2;
    data.caption = _resource.caption ? _resource.caption : '无题';
    data.parentId = node.id;
    data.userId = uid;
    g.postData('api/users/' + uid + '/favorites', data, function (result) {
        if (result.state == 200 || result.state == 201) {
            alert('收藏成功！');
            $('#selectFolderModal').modal('hide');
        }
    });

}
function addFolder() {
    _editFlag = 0;
    $('#inputTitle').val('');
    $('#editModal').modal('show');
}

function editFolder() {
    _editFlag = 1;
    var t = $('#tt');
    var node = t.tree('getSelected');
    if (!node) {
        return;
    }
    if (node.tag.caption == "我的收藏") {
        alert('系统文件夹，不能编辑');
        return;
    }
    $('#inputTitle').val(node.text);
    $('#editModal').modal('show');
}

function onEdit() {
    var t = $('#tt');
    var node = t.tree('getSelected');
    var title = $('#inputTitle').val();
    if (!title) {
        alert('请输入名称');
        return;
    }
    var uid = g.getCookie('userId');
    if (_editFlag == 0) {
        var data = {caption: title, kind: 2, subKind: 1, parentId: node.id, userId: uid};
        g.postData('api/users/' + uid + '/favorites', data, function (result) {
            if (result.state == 200 || result.state == 201) {
                data.id = result.id;
                t.tree('append', {
                    parent: (node ? node.target : null),
                    data: [
                        {
                            id: data.id,
                            tag: data,
                            text: title
                        }
                    ]
                });
            }
        });
    } else {
        var data = node.tag;
        data.caption = title;
        if (data.parent && data.parent.id)
            data.parentId = data.parent.id;
        if (data.user && data.user.id)
            data.userId = data.user.id;
        if (data.resource && data.resource.id)
            data.resourceId = data.resource.id;
        g.patchData('api/users/' + uid + '/favorites/' + data.id, data, function (result) {
            if (result.state == 200 || result.state == 201) {
                t.tree('update', {
                    target: node.target,
                    text: title
                });
            }
        });
    }
    $('#editModal').modal('hide');
}
function removeFolder() {
    var node = $('#tt').tree('getSelected');
    if (!node)
        return;
    if (node.tag.caption == "我的收藏") {
        alert('系统文件夹，不能删除');
        return;
    }
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var uid = g.user.getLoginId();
    g.deleteData('api/users/' + uid + '/favorites/' + node.id, function (result) {
        if (result.state == 200 || result.state == 201) {
            alert('删除成功')
            $('#tt').tree('remove', node.target);
        }
    })
}

function collapse() {
    var node = $('#tt').tree('getSelected');
    $('#tt').tree('collapse', node.target);
}

function expand() {
    var node = $('#tt').tree('getSelected');
    $('#tt').tree('expand', node.target);
}
//输出历史评论,pn:页号
function renderComments(comments, pn, total) {
    var commentsContainer = document.getElementById('comments-Container');
    commentsContainer.innerHTML = '';
    var commenttemplate = g.getTemplate('comment-tpl');
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];

        var creator = comment.creator;

        if (creator.$ref) {
            creator = g.getJsonRefObject(_commentAllDatas, creator.$ref)
        }
        if (creator) {
            comment.ownerCaption = creator.userName;
            comment.avatarUri = creator.avatarUri;
        }
        var ele = g.dataToElement(comment, commenttemplate);
        commentsContainer.appendChild(ele);

        var score = comment.score01 + comment.score02 + comment.score03 + comment.score04 + comment.score05;
        score = Math.round(score / 5);
        $($(ele).find('#score-Container')).find("span").each(function (i) {
            if (i < score) {
                $(this).removeClass("glyphicon-star-empty");
                $(this).addClass("glyphicon-star");
            }
        });
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    _pn = pn;
    var total = _filtertdatas.length;
    var offset = _ps * (pn - 1);
    var r = []
    for (var i = offset; i < offset + _ps; ++i) {
        if (i >= total) {
            break
        }
        r.push(_filtertdatas[i])
    }
    renderComments(r, pn, total);
}

function viewSwf(id) {
    var previewUri = escape('/download.whtml?src=' + id + '&t=0');
    $('#documentViewer').FlexPaperViewer(
        { config: {
            SWFFile: previewUri,
            Scale: 0.6,
            ZoomTransition: 'easeOut',
            ZoomTime: 0.5,
            ZoomInterval: 0.2,
            FitPageOnLoad: true,
            FitWidthOnLoad: false,
            FullScreenAsMaxWindow: false,
            ProgressiveLoading: false,
            MinZoomSize: 0.2,
            MaxZoomSize: 5,
            SearchMatchAll: false,
            InitViewMode: 'Portrait',
            RenderingOrder: 'flash',
            StartAtPage: '',

            ViewModeToolsVisible: true,
            ZoomToolsVisible: true,
            NavToolsVisible: true,
            CursorToolsVisible: true,
            SearchToolsVisible: true,
            WMode: 'window',
            localeChain: 'en_US'
        }}
    );
}
//添加预览
function onlineView(){
    for(var i=0 ;i<_resource.files.length ; i++ ){
        var a=_resource.files[i].previewFile
//        var a='/img/qqqq.swf'
        if(a!=undefined){
            break
        }
    }
    if(a!=undefined){
        var kind= a.lastIndexOf('.swf')
        if(kind != -1 ){
            document.getElementById('previewContainer').data = 'FlexPaperViewer.swf?SwfFile='+encodeURI(a)
            document.getElementById('previewContainer').querySelector('param').value = 'FlexPaperViewer.swf?SwfFile='+encodeURI(a)
        }else{
            document.getElementById('previewContainer').data ="flvplayer.swf?file="+ a
            document.getElementById('previewContainer').querySelector('param').value="flvplayer.swf?file="+ a
        }
        $('#view').modal('show');
    }else{
        alert('没有预览文件')
    }

}
function renderShair(){
    var resourceContainer = document.getElementById('share');
    resourceContainer.innerHTML = "";
    var template = g.getTemplate('bdshare_t')
    resourceContainer.appendChild(template)
    if (document.getElementById("bdshell_js"))
        document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
}
g.resourceDetail={
    id : '',
    init :function(){
            _id = g.getUrlParameter('id')
            g.types.loadData()
            g.stages.loadData()
    },
    click :function(){
            $(".score").click(rClick);
            $("#txtComment").keyup(commentChange);
            $("#btnComment").click(saveComment);
            $("#txtReport").keyup(reportChange);
            document.getElementById('btnReport').addEventListener('click',function(){
                saveReport();
            }, false)
            document.getElementById('btnEditOk').addEventListener('click', function (evt) {
                onEdit();
            }, false);
            document.getElementById('btnSelectOk').addEventListener('click', function (evt) {
                onSelected();
            }, false);
    }
}
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.resourceDetail.init()
        getResource(_id)
        g.x.render()
//    资源分享
        renderShair()
        g.resourceDetail.click()
        renderFiles(g.x.data.files);
        document.getElementById('btnFavoriteResource').addEventListener('click', function (evt) {
            favoriteResource();
        }, false);
        document.getElementById('phoneDownload').addEventListener('click', function (evt) {
            getQrcode();
        }, false);
        document.getElementById('onlineView').addEventListener('click', function (evt) {
            onlineView();
        }, false);
        document.getElementById('doShareToBBs').addEventListener('click',function(evt){
            doShareToBBs();
        })
        getComments(g.x.data);
        getRecommentReses(g.x.data);
        g.importFooter()
    });
}, false)
