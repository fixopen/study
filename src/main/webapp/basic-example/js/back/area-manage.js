window.addEventListener('load', function (e) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        init();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnEditOk').click(onEdit);
}
var _regionTree;
function init() {
    getRegion();
}
//获取当前区域
function getRegion() {
    g.getData('/api/regions', function (result) {
        if (result.state == 200) {
            _regionTree = result.data;
            renderTree(_regionTree);
        }
    });
}

var _editFlag = 0;
//输出文件夹树
function renderTree(datas) {
    var nodes = g.buildCatalogueTreeData(datas);
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
            var uid = getCookie('uid');
            var node = $(this).tree('getNode', target);
            var data = source.tag;
            if (!node || !node.isRoot) {
                data.parentId = node ? node.id : '';
            } else {
                data.parentId = null;
            }
            g.patchData('/api/regions/' + data.id, data, function (result) {
                if (result.state == 200) {
                }
            });
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
    if (node.isRoot) {
        alert('根目录，不能编辑');
        return;
    }
    $('#inputTitle').val(node.text);
    $('#editModal').modal('show');
}

function onEdit() {
    var t = $('#tt');
    var node = t.tree('getSelected');
    var parentId = null;
    if (!node || !node.isRoot) {
        parentId = node.id;
    }
    var title = $('#inputTitle').val();
    if (!title) {
        alert('请输入名称');
        return;
    }
    var uid = getCookie('uid');
    if (_editFlag == 0) {
        var data = {caption: title, parentId: parentId};
        g.postData('/api/regions', data, function (result) {
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
        g.patchData('/api/regions/' + data.id, data, function (result) {
            if (result.state == 200) {
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
    if (node.isRoot) {
        alert('根目录，不能编辑');
        return;
    }
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var uid = getLoginId();
    g.deleteData('/api/regions/' + node.id, function (result) {
        if (result.state == 200) {
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