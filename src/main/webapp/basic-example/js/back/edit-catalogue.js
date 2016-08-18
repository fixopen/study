window.addEventListener('load', function (e) {
    g.backstageHeadAndCheckUser(function () {
        bindEvents();
        init();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnEditOk').click(onEdit);
}
var _book, _bookId;
function init() {
    getBook();
}
//获取当前书
function getBook() {
    var id = g.getUrlParameter('id');
    if (!id)
        return;
    _bookId = id;
    g.getData('/api/books/' + id, function (result) {
        if (result.state == 200) {
            _book = result.data;
            getCatalogues(_book);
        }
    });
}
function getCatalogues(book) {
    if (!book)
        return;
    var filter = encodeURIComponent(JSON.stringify({bookId: _bookId}));
    var url = '/api/catalogs?filter=' + filter;
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            renderTree(book, result2.data);
        }
    });
}
var _editFlag = 0;
//输出文件夹树
function renderTree(book, datas) {
    var nodes = g.buildCatalogueTreeData(datas);
    var treeData = [
        {
            id: book.id,
            text: book.caption,
            children: nodes,
            tag: book,
            isRoot: true
        }
    ];
    $('#tt').tree({
        data: treeData,
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
            var node = $(this).tree('getNode', target);
            var data = source.tag;
            data.bookId = _bookId;
            if (point == "append") {
                var m = findMaxOrder(node)
                data.order = m + 1
                data.parentId = node.tag.id
                g.patchData('/api/catalogs/' + data.id, data, function (result) {
                    if (result.state == 200) {
                    }
                });
            } else {
                var nodeParent = $(this).tree('getParent', target)
                if (!nodeParent || !nodeParent.isRoot) {
                    data.parentId = nodeParent ? nodeParent.id : '';
                } else {
                    data.parentId = null;
                }
                if(point == "top") {
                    data.order = node.tag.order
                    g.patchData('/api/catalogs/' + data.id, data, function (result) {
                        if (result.state == 200) {
                        }
                    });
                    node.tag.order += 1
                    g.patchData('/api/catalogs/' + node.tag.id, node.tag, function (result) {
                        if (result.state == 200) {
                        }
                    });
                    //parentId = n AND order > m UPDATE order = order + 1
                    var lb = findLitterBrother(nodeParent.children, node.tag.order)
                    for (var i=0;i<lb.length;++i) {
                        lb[i].tag.order++;
                        g.patchData('/api/catalogs/' + lb[i].tag.id, lb[i].tag, function (result) {
                            if (result.state == 200) {
                            }
                        });
                    }
                } else if(point =="bottom") {
                    data.order = node.tag.order + 1
                    g.patchData('/api/catalogs/' + data.id, data, function (result) {
                        if (result.state == 200) {
                        }
                    });
                    var lb = findLitterBrother(nodeParent.children, node.tag.order)
                    for (var i=0;i<lb.length;++i) {
                        lb[i].tag.order++;
                        g.patchData('/api/catalogs/' + lb[i].tag.id, lb[i].tag, function (result) {
                            if (result.state == 200) {
                            }
                        });
                    }
                }
            }
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

//查询children中最大的order
function findMaxOrder(node) {
    var maxOrder = 0
    var childrenNodes = node.children
    if(childrenNodes)
    for (var i = 0, c = childrenNodes.length; i < c; ++i) {
        if (maxOrder < childrenNodes[i].tag.order) {
            maxOrder = childrenNodes[i].tag.order
        }
    }
    return maxOrder
}

//查询children中大于order的子集
function findLitterBrother(children, order) {
    var childrenNodes = []
    for (var i = 0, c = children.length; i < c; ++i) {
        if (order < children[i].tag.order) {
            childrenNodes.push(children[i])
        }
    }
    return childrenNodes
}

function onEdit() {
    var t = $('#tt');
    var node = t.tree('getSelected');
    var maxOrder = findMaxOrder(node);
    var newCreatNodeOrder = maxOrder + 1;
    var parentId = null;
    if (!node || !node.isRoot) {
        parentId = node.id;
    }
    var title = $('#inputTitle').val();
    if (!title) {
        alert('请输入名称');
        return;
    }
    if (_editFlag == 0) {
        var data = {caption: title, parentId: parentId, bookId: _bookId, order: newCreatNodeOrder};
        g.postData('/api/catalogs', data, function (result) {
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
        data.bookId = _bookId;
        g.patchData('/api/catalogs/' + data.id, data, function (result) {
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
    g.deleteData('/api/catalogs/' + node.id, function (result) {
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

//$(function () {
//    $('#root').tree({
//        url: 'category.jhtml?event=childrenName',
//        method: "post",
//        animate: true,
//        dnd: true,
//        onClick: function (node) {
//            $.ajax({
//                url: "category.jhtml",
//                data: {"event": "detail", "UUID": node.id},
//                type: "post",
//                success: function (datas) {
//                    $("#indexRight").html(datas);
//                    var nodeParent = $('#root').tree('getParent', node.target);
//                    $("#categoryInfoParentName").val(nodeParent.text);
//                    var date = new Date();
//                    var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//                    $("#categoryInfoUpdateTime").val(dateStr);
//                    $("#categoryInfoForm").submit(function () {
//                        $(this).ajaxSubmit(function (data) {
//                            alert(data);
//                            $('#root').tree('reload', nodeParent.target);
//                        });
//                        return false;
//                    })
//                }
//            });
//            $('#root').tree('expand', node.target);
//        },
//        onDrop: function (target, source, point) {
//            var targetNode = $('#root').tree('getNode', target);
//            var targetParentNode = $('#root').tree('getParent', target);
//            var sourceParentNode = $('#root').tree('find', source.attributes.parentUUID);
//            var targetParentUUID = targetNode.attributes.parentUUID;
//            var sourceParentUUID = source.attributes.parentUUID;
//            var targetOrd = targetNode.attributes.ord;
//            var sourceOrd = source.attributes.ord;
//            var dataForUpdate;
//            var dataForUpdateChildOrd;
//            var operatorName;
//            var changeOrd;
//            if (targetParentUUID == sourceParentUUID) {
//                console.log("A")
//                if (targetOrd > sourceOrd) {
//                    if ("top" == point) {
//                        targetOrd--;
//                    }
//                    operatorName = "bottom";
//                    changeOrd = function () {
//                        var children = getDirectChildren(targetParentNode.target);
//                        for (var i = 0; i < children.length; i++) {
//                            var divEle = $(children[i]).children()[0];
//                            var divID = $(divEle).attr("node-id");
//                            var childNode = $("#root").tree('find', divID);
//                            var dataOrd = childNode.attributes.ord;
//                            if (dataOrd > sourceOrd && dataOrd <= targetOrd) {
//                                childNode.attributes.ord--;
//                            }
//                        }
//                        source.attributes.ord = targetOrd;
//                    }
//                } else {
//                    if ("bottom" == point) {
//                        targetOrd++;
//                    }
//                    operatorName = "top";
//                    changeOrd = function () {
//                        var children = getDirectChildren(targetParentNode.target);
//                        for (var i = 0; i < children.length; i++) {
//                            var divEle = $(children[i]).children()[0];
//                            var divID = $(divEle).attr("node-id")
//                            console.log("divID -- " + divID)
//                            var childNode = $("#root").tree('find', divID);
//                            var dataOrd = childNode.attributes.ord;
//                            if (dataOrd < sourceOrd && dataOrd >= targetOrd) {
//                                childNode.attributes.ord++;
//                            }
//                        }
//                        source.attributes.ord = targetOrd;
//                    }
//                }
//                dataForUpdateChildOrd = {"event": "updateChildOrd", "parentUuid": targetParentUUID, "targetOrd": targetOrd, "sourceOrd": sourceOrd, "operatorName": operatorName};
//                dataForUpdate = {"event": "update", "uuid": source.id, "ord": targetOrd};
//            } else {
//                console.log("B")
//                operatorName = "append";
//                if ("bottom" == point) {
//                    targetOrd++;
//                }
//                dataForUpdate = {"event": "update", "uuid": source.id, "parentUuid": targetParentUUID, "ord": targetOrd};
//                dataForUpdateChildOrd = {"event": "updateChildOrd", "parentUuid": targetParentUUID + "#" + sourceParentUUID, "targetOrd": targetOrd, "sourceOrd": sourceOrd, "operatorName": operatorName};
//                changeOrd = function () {
//                    var sourceChildren = getDirectChildren(sourceParentNode.target);
//                    for (var i = 0; i < sourceChildren.length; i++) {
//                        var divEle = $(sourceChildren[i]).children()[0];
//                        var divID = $(divEle).attr("node-id")
//                        var childNode = $("#root").tree('find', divID);
//                        var dataOrd = childNode.attributes.ord;
//                        if (dataOrd > sourceOrd) {
//                            childNode.attributes.ord--;
//                            console.log(childNode.text + "-->" + childNode.attributes.ord)
//                        }
//                    }
//                    var targetChildren = getDirectChildren(targetParentNode.target);
//                    for (var i = 0; i < targetChildren.length; i++) {
//                        var divEle = $(targetChildren[i]).children()[0];
//                        var divID = $(divEle).attr("node-id")
//                        if (source.id != divID) {
//                            var childNode = $("#root").tree('find', divID);
//                            var dataOrd = childNode.attributes.ord;
//                            if (dataOrd >= targetOrd) {
//                                childNode.attributes.ord++;
//                                console.log(childNode.text + "-->" + childNode.attributes.ord)
//                            }
//                        }
//                    }
//                    source.attributes.parentUUID = targetParentUUID;
//                    source.attributes.ord = targetOrd;
//                }
//            }
//
//            $.ajax({
//                url: "category.jhtml",
//                data: dataForUpdateChildOrd,
//                type: "post",
//                success: function (data) {
//                    if ("true" == data) {
//
//                        $.ajax({
//                            url: "category.jhtml",
//                            data: dataForUpdate,
//                            type: "post",
//                            success: function (data) {
//                                if ("更新成功" == data) {
//                                    changeOrd();
//                                }
//                            }
//                        });
//                    }
//                }
//            })
//        }
//    })
//})
//
///*返回的是li对象*/
//function getDirectChildren(target) {
//    return $(target).next().children();
//}
//
//function append() {
//    var node = $('#root').tree('getSelected');
//    if (node) {
//        var ord = $(node.target).next().children().length;
//        console.log(ord);
//        $('#root').tree('append', {
//            parent: (node ? node.target : null),
//            data: [
//                {
//                    id: $.ajax({url: "category.jhtml?event=uuid&parentUUID=" + node.id + "&ord=" + ord, async: false}).responseText,
//                    text: '新建文件夹',
//                    iconCls: "icon-save",
//                    state: "closed",
//                    attributes: {"ord": ord, "parentUUID": node.id}
//                }
//            ]
//        });
//    } else {
//        alert("请先选择你要append到的节点....");
//    }
//}
//
//function remove() {
//    var node = $('#root').tree('getSelected');
//    var result = $.ajax({
//        url: "category.jhtml?event=delete&UUID=" + node.id,
//        async: false
//    }).responseText;
//    if (result) {
//        $('#root').tree('remove', node.target);
//        alert("删除成功")
//    } else {
//        alert("删除失败")
//    }
//}
//
//function reload(parentNode) {
//    if (parentNode) {
//        $('#root').tree('reload', parentNode.target);
//    } else {
//        $('#root').tree('reload');
//    }
//    console.log("reload");
////      $('#root').tree('expand',parentNode.target);
//}