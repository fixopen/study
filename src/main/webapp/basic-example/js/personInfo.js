var _ps = 100, _pn, _parent;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.importPersonInfoTop(g.user.currentUser.id);
        g.importPersonInfoLeft();
        g.stages.loadData();
        g.types.loadData();
        g.editions.loadData();
        g.subjects.loadData();
        init(evt);

        getFavorites(_rootId);
        g.importFooter()
    });
}, false)

function init(evt) {
    $('#btnEditOk').click(onEdit);
    $('#btnSelectOk').click(onSelected);
}

var _folders;
var _curFavorites;
var _rootId = '15761872542653701';
var _paths = [];

var currentElement;

//输出当前用户所收藏的资源
function renderFavorites(datas) {
    var collectionResContainer = document.getElementById('resource-container');
    collectionResContainer.innerHTML = "";
    var count = datas.length
    //render folder
    for (var i = 0; i < count; ++i) {
        var template = null
        var data = datas[i];
        if ((data.subKind == 1 || data.subKind == 0)) {
            template = g.getTemplate('folder-tpl');
            data.coverFile = '/images/folder.png';
            var ele = g.dataToElement(data, template);
            collectionResContainer.appendChild(ele);
        }
    }
    //render resource
    for (var i = 0; i < count; ++i) {
        var template = null
        var data = datas[i];
//        var pd = {}
//        g.parseDataRef(datas, data, pd)
//        if ((pd.subKind == 6 || pd.subKind == 7) && pd.resource) {
//            template = g.getTemplate('resource-tpl');
//            pd.coverFile = pd.resource.coverFile;
//            //if (data.resource.$ref) {
//            //    data.resource = g.getJsonRefObject(datas, data.resource.$ref);
//            //}
//            //    g.parseResourceCaption(pd, datas);
//            pd.subjectCaption = pd.resource.subjectCaption;
//            pd.versionCaption = pd.resource.versionCaption;
//            pd.gradeTermCaption = pd.resource.gradeTermCaption;
//            var href = 'resource-detail.html?id=' + pd.resource.id;
//            pd.href = href;
//            var ele = g.dataToElement(pd, template);
//            collectionResContainer.appendChild(ele);
//        }
        if ((data.subKind == 6 || data.subKind == 7) && data.resource) {
            template = g.getTemplate('resource-tpl');
            data.coverFile = data.resource.coverFile;
            data.subjectCaption = data.resource.subjectCaption;
            data.versionCaption = data.resource.versionCaption;
            data.gradeTermCaption = data.resource.gradeTermCaption;
            var href = 'resource-detail.html?id=' + data.resource.id;
            data.href = href;
            var ele = g.dataToElement(data, template);
            collectionResContainer.appendChild(ele);
        }
    }
    renderPaths();
}

function renderOneFolder(data) {
    var collectionResContainer = document.getElementById('resource-container');
    var template = g.getTemplate('folder-tpl');
    data.coverFile = '/images/folder.png';
    var ele = g.dataToElement(data, template);
    $(collectionResContainer).prepend(ele);
}

function renderPaths() {
    var container = document.getElementById('pathContainer');
    var html = '';
    if (_paths.length > 0) {
        html += "<a node-type='crumbs-item' href='javascript:void(0);' onClick='folderClick(\"-1\")' class='item' style='font-size: 16px;'>返回上一级</a> |";
        for (var i = 0; i < _paths.length; i++) {
            var folder = _paths[i];
            if (i < _paths.length - 1) {
                html += "<a href='javascript:void(0);' onClick=\"folderClick('" + folder.id + "')\" class='item' style='font-size: 14px;>" +folder.caption + "</a> &gt;"
            } else {
                html += "<span class='item' style='font-size: 16px;'>" + "当前文件夹："+ folder.caption + "</span>";
            }
        }
    }
    container.innerHTML = html;
}
//获取用户收藏的资源
function getFavorites(parentid) {
    if (!parentid)
        parentid = _rootId;
    var userId = g.getCookie('userId')
    _curFavorites = [];
    var filter = encodeURIComponent(JSON.stringify({
        parentId: parentid,
        kind: 2,
        subKind: 1
    }));
    var url = 'api/users/' + userId + '/favorites?filter=' + filter;
    url += '&offset=0&count=1000';
    g.getData(url, function (result) {
        if (result.state == 200) {
            _curFavorites = result.data;
        }
    })
    filter = encodeURIComponent(JSON.stringify({
        userId: userId,
        parentId: parentid,
        kind: 2,
        subKind: 7
    }));
    url = 'api/users/' + userId + '/favorites?filter=' + filter;
    url += '&offset=0&count=1000';
    g.getData(url, function (result) {
        if (result.state == 200) {
            _curFavorites = _curFavorites.concat(result.data);
        }
    })
    renderFavorites(_curFavorites);
}

function folderClick(id) {
    var tmp = [];
    var flag = false;
    if (id == '-1') { //返回上一级
        if (_paths.length > 0) {
            _paths = _paths.slice(0, _paths.length - 1);
            if (_paths.length > 0)
                id = _paths[_paths.length - 1].id;
            else
                id = _rootId;
        }
    } else {
        for (var i = 0; i < _paths.length; i++) {
            var p = _paths[i];
            tmp.push(p);
            if (p.id == id) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            var folder = _curFavorites.find({
                id: id
            })[0];
            tmp.push(folder);
        }
        _paths = tmp;
    }
    getFavorites(id);
    renderPaths();
}
//获取所有文件夹
function getAllFolders() {
    var userId = g.getCookie('userId')
    var filter = encodeURIComponent(JSON.stringify({
        subKind: 1,
        kind: 2
    }));
    var url = 'api/users/' + userId + '/favorites?filter=' + filter;
    url += '&offset=0&count=1000';
    g.getData(url, function (result) {
        if (result.state == 200) {
            _folders = result.data;
            _folders.push({id: '15761872542653701', caption: '我的收藏'});
        }
    })
}
//输出文件夹树
// function renderFolderTree(folders) {
//     var root = {
//         id: '15761872542653701',
//         caption: '我的收藏',
//         idPath: ',15761872542653701,',
//         pathInfo: ',15761872542653701:我的收藏,'
//     };
//     var nodes = buildCatalogueTreeData(folders);
//     var treeData = [{
//         id: '15761872542653701',
//         text: '我的收藏',
//         children: nodes,
//         tag: root
//     }];
//     $('#tt').tree({
//         data: nodes,
//         // animate: true,
//         method: 'get',
//         dnd: true,
//         lines: true,
//         onClick: function(node) {
//             getCollectionRes(node.id);
//         },
//         onContextMenu: function(e, node) {
//             e.preventDefault();
//             $(this).tree('select', node.target);
//             $('#mm').menu('show', {
//                 left: e.pageX,
//                 top: e.pageY
//             });
//         },
//         onDrop: function(target, source, point) {
//             var uid = getCookie('uid');
//             var node = $(this).tree('getNode', target);
//             var data = source.tag;
//             data.parentId = node.id;
//             patchData('api/users/' + uid + '/favorites/' + data.id, data, function(result) {
//                 if (result.state == 200 || result.state == 201) {}
//             });
//         }
//     });
// }

function addFolder() {
    _editFlag = 0;
    $('#inputTitle').val('');
    $('#editModal').modal('show');
}
var _curEditId;
var _curEditEle;
function editFolder(id) {
    _editFlag = 1;
    _curEditId = id;
    var event = window.event || arguments.callee.caller.arguments[0];
    _curEditEle = event.target;
    var data = _curFavorites.find({
        id: id
    })[0];
    $('#inputTitle').val(data.caption);
    $('#editModal').modal('show');
}

function onEdit() {
    //var t = $('#tt');
    //var node = t.tree('getSelected');
    var title = $('#inputTitle').val();
    if (!title) {
        alert('请输入名称');
        return;
    }
    var userId = g.getCookie('userId');
    if (_editFlag == 0) {
        var parentId = _rootId;
        if (_paths.length > 0) {
            parentId = _paths[_paths.length - 1].id;
        }
        var data = {
            caption: title,
            kind: 2,
            subKind: 1,
            parentId: parentId,
            userId: userId
        };
        g.postData('api/users/' + userId + '/favorites', data, function (result) {
            if (result.state == 200 || result.state == 201) {
                data.id = result.id;
                _curFavorites.push(data);
                renderOneFolder(data);
                // t.tree('append', {
                //     parent: (node ? node.target : null),
                //     data: [{
                //         id: data.id,
                //         tag: data,
                //         text: title
                //     }]
                // });
            }
        });
    } else {
        var data = _curFavorites.find({
            id: _curEditId
        })[0];
        data.caption = title;
        if (data.parent && data.parent.id)
            data.parentId = data.parent.id;
        if (data.user && data.user.id)
            data.userId = data.user.id;
        if (data.resource && data.resource.id)
            data.resourceId = data.resource.id;
        g.patchData('api/users/' + userId + '/favorites/' + data.id, data, function (result) {
            if (result.state == 200 || result.state == 201) {
                $(_curEditEle).parents('.folder-tpl').find('[name="caption"]').text(title);
            }
        });
    }
    $('#editModal').modal('hide');
}

var _isSelectFolderTreeRendered = false;
//输出文件夹选项树
function renderSelectFolderTree() {
    if (_isSelectFolderTreeRendered)
        return;
    getAllFolders();
    var nodes = g.buildCatalogueTreeData(_folders);
    $('#selectTree').tree({
        data: nodes,
        dnd: false,
        lines: true
    });
}
//移动到
function onSelected() {
    var t = $('#selectTree');
    var node = t.tree('getSelected');
    var data = _curFavorites.find({
        id: _curMoveId
    });
    var userId = g.getCookie('userId')
    if (data.length > 0) {
        data = data[0];
        data.parentId = node.id;
        if (data.user && data.user.id)
            data.userId = data.user.id;
        if (data.resource && data.resource.id)
            data.resourceId = data.resource.id;
        g.patchData('api/users/' + userId + '/favorites/' + data.id, data, function (result) {
            if (result.state == 200 || result.state == 201) {
                $(_curMoveEle).parents("div[class$='-tpl']").remove();
            }
        });
    }
    $('#selectFolderModal').modal('hide');
}
var _curMoveId;
var _curMoveEle;

function onMoveRes(id) {
    _curMoveId = id;
    renderSelectFolderTree();
    var event = window.event || arguments.callee.caller.arguments[0];
    _curMoveEle = event.target;
    $('#selectFolderModal').modal('show');
}

function onDeleteRes(id) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var favorite = _curFavorites.find({
        id: id
    })[0];
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    var e = theEvent;
    var userId = g.getCookie('userId');
    g.deleteData('api/users/' + userId + '/favorites/' + id, function (result) {
        if (result.state == 200 || result.state == 201) {
            $(e.target).parents("div[class$='-tpl']").remove();
        }
    })
}