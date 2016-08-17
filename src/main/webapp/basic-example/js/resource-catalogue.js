var _ps = 6, _catalogueitem, _stage, _books, _subject, _version, _term, _type, _bookid, _sort, _sorttype;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser();
    g.subjects.loadData()
    g.editions.loadData()
    g.types.loadData()
    g.subjects.data.unshift({'caption':'全部','id':'-1'})
    g.editions.data.unshift({'caption':'全部','id':'-1'})
    g.types.data.unshift({'caption':'全部','id':'-1'})
    g.resourceCatalogue.renderSelect();
    g.resourceCatalogue.renderTypes(g.types.data);
    $('#querySubject').change(g.resourceCatalogue.querySubject);
    $('#queryVersion').change(queryVersion);
    $('#queryBooks').change(queryCatalogue);
//    init();
    //移除 筛选条件
//    type-Container
//    document.getElementById('type-Container').querySelector('span').addEventListener('click', function (evt) {
//        document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['type'])
//        delete g.resourceIndex.condition['type']
//        delete g.resourceIndex.conditionElement['type']
//        g.resourceIndex.offset = 0
//        document.getElementById('book-container').innerHTML = '';
//        g.resourceIndex.getMore()
//    },false)

    getBooks();
    loadData(1);
    g.importFooter()
    document.getElementById('search').addEventListener('click', function (evt) {
//        g.resourceIndex.offset = 0
        document.getElementById('resource-container').innerHTML=''
        g.resourceCatalogue.condition['caption']=$('#searchCap').val()
        g.resourceCatalogue.filter()
        loadData(1)
    }, false);
}, false)
//初始化
g.resourceCatalogue={
    condition: {},
    filter :function(){
        var subject=$('#querySubject').val()
        var version=$('#queryVersion').val()
//        var type=$('#querySubject').val()
//        var catalog=$('#querySubject').val()
        var book=$('#queryBooks').val()
        if (_subject && _subject != '-1')
            g.resourceCatalogue.condition['subject'] = _subject;
        if (_version && _version != '-1')
            g.resourceCatalogue.condition['version'] = _version;
//        if (_type && _type != '-1')
//            g.resourceCatalogue.condition['type'] = _type;
//        if (_catalogueitem && _catalogueitem != '-1')
//            g.resourceCatalogue.condition['catalog'] = _catalogueitem;
        if (_bookid && _bookid != '-1')
            g.resourceCatalogue.condition['book'] = _bookid;
    },
    //输出查询部分
    renderSelect : function renderSelect() {
        g.bindVersionSelect('queryVersion');
        if (_version)
            $('#queryVersion').val(_version);
        else
            _version = g.editions.data[0].id;
        g.bindSubjectSelect('querySubject');
        if (_subject)
            $('#querySubject').val(_subject);
        else
            _subject = g.subjects.data[0].id;
    },
    //输出类型
    renderTypes : function renderTypes(datas) {
        var catalog = 'type';
        var container = document.getElementById(catalog + '-Container');
        var template = g.getTemplate('condition-tpl');
//        var ele = g.dataToElement({id: -1, title: '全部', catalog: catalog}, template);
//        container.appendChild(ele);
        for (var i = 0; i < datas.length; i++) {
            var data = {id: datas[i].id, title: datas[i].caption, catalog: catalog};
            var ele = g.dataToElement(data, template);
            container.appendChild(ele);
            //绑定筛选条件
//            document.getElementById('').querySelector('span').addEventListener('click', function (evt) {
//                g.resourceIndex.conditionProcess('type', g.types.data[i])
//            }, false);
        }
        $(container).find("a[name='condition']").click(queryType);
    },
    querySubject : function querySubject(e) {
        var subject=$('#querySubject').val()
        var version=$('#queryVersion').val()
        if (subject && subject != '-1')
            g.resourceCatalogue.condition['subject'] = subject;
        if (version && version != '-1')
            g.resourceCatalogue.condition['version'] = version;
        getBooks();
        loadData();
    }
}
//function init() {
//    _stage = g.getUrlParameter('stage');
//    _subject = g.getUrlParameter('subject');
//    _version = g.getUrlParameter('version');
//    _term = g.getUrlParameter('term');
//    //getRecommentReses();
//
////    $('#querySubject').change(querySubject);
////    $('#queryVersion').change(queryVersion);
////    $('#queryBooks').change(queryCatalogue);
////
//    // $('#queryStage').change(queryStage);
//    // $('#queryTerm').change(queryTerm);
//    $('#defaultSort').click(defaultSort);
//    $('#scortSort').click(scortSort);
//    $('#timeSort').click(timeSort);
//    $('#btnEditOk').click(onEdit);
//    $('#btnSelectOk').click(onSelected);
//}

function querySubject(e) {
    var subject=$('#querySubject').val()
    var version=$('#queryVersion').val()
    if (subject && subject != '-1')
        g.resourceCatalogue.condition['subject'] = subject;
    if (version && version != '-1')
        g.resourceCatalogue.condition['version'] = version;
    getBooks();
    loadData();
}
function queryVersion(e) {
    var id = $('#queryVersion').val();
//    _version = id;
    g.resourceCatalogue.condition.version=id;
    getBooks();
    loadData();
}
function queryCatalogue(e) {
    var id = $('#queryBooks').val();
    g.resourceCatalogue.condition.book=id;
    var books = _books.find({id: id});
    var book;
    _book = null;
    _catalogueitem = -1;
    if (books && books.length > 0) {
        book = books[0];
        _bookid = book.id;
    }
    getCatalogues(book);
    loadData();
}
// function queryStage(e){
// 	var id=$('#queryStage').val();
// 	_stage=id;
// 	getBooks();
// 	loadData();
// }
// function queryTerm(e){
// 	var id=$('#queryTerm').val();
// 	_term=id;
// 	loadData();
// }
function queryType(e) {
    var id = e.target.id;
    _type = id;
    loadData();
}
function queryCatalogueItem(item) {
    _catalogueitem = item;
    loadData();
}
function defaultSort(e) {
    _sort = null;
    if ($('#defaultSort span').hasClass('glyphicon-arrow-down')) {
        _sorttype = 'desc';
        $('#defaultSort span').removeClass('glyphicon-arrow-down');
        $('#defaultSort span').addClass('glyphicon-arrow-up')
    } else if ($('#defaultSort span').hasClass('glyphicon-arrow-up')) {
        _sorttype = 'asc';
        $('#defaultSort span').removeClass('glyphicon-arrow-up');
        $('#defaultSort span').addClass('glyphicon-arrow-down')
    }
    loadData();
}
function scortSort() {
    _sort = 'scort';
    if ($('#scortSort span').hasClass('glyphicon-arrow-down')) {
        _sorttype = 'desc';
        $('#scortSort span').removeClass('glyphicon-arrow-down');
        $('#scortSort span').addClass('glyphicon-arrow-up')
    } else if ($('#scortSort span').hasClass('glyphicon-arrow-up')) {
        _sorttype = 'asc';
        $('#scortSort span').removeClass('glyphicon-arrow-up');
        $('#scortSort span').addClass('glyphicon-arrow-down')
    }
    loadData();
}
function timeSort() {
    _sort = 'createdon';
    if ($('#timeSort span').hasClass('glyphicon-arrow-down')) {
        _sorttype = 'desc';
        $('#timeSort span').removeClass('glyphicon-arrow-down');
        $('#timeSort span').addClass('glyphicon-arrow-up')
    } else if ($('#timeSort span').hasClass('glyphicon-arrow-up')) {
        _sorttype = 'asc';
        $('#timeSort span').removeClass('glyphicon-arrow-up');
        $('#timeSort span').addClass('glyphicon-arrow-down')
    }
    loadData();
}
//获取当前书
function getBooks() {
    g.resourceCatalogue.filter()
    _book = null;
    _catalogueitem = -1;
    var filter = {};
    document.getElementById('tree').innerHTML = '';
    document.getElementById('queryBooks').innerHTML = '';
    if (!g.resourceCatalogue.condition.subject)
        return;
    if (!g.resourceCatalogue.condition.version)
        return;
    filter.subjectId = g.resourceCatalogue.condition.subject;
    filter.editionId = g.resourceCatalogue.condition.version;
    filter = JSON.stringify(filter);
    var url = 'api/books?filter=' + encodeURIComponent(filter);
    g.getData(url, function (result) {
        if (result.state == 200) {
            _books = result.data;
            renderBooksSelect(_books);
            if (_books.length > 0) {
                getCatalogues(_books[0]);
            }
        }
    });
}
function getCatalogues(book) {
    _catalogueitem = -1;
    document.getElementById('tree').innerHTML = '';
    if (!book)
        return;
    _book = book.id;
    var filter = encodeURIComponent(JSON.stringify({bookId: book.id}));
    var url = 'api/catalogs?filter=' + filter;
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            renderTree(book, result2.data);
        }
    });
}
function renderTree(book, catalogues) {
    var nodes = g.buildCatalogueTreeData(catalogues);
    var treeData = [
        {
            id: -1,
            text: book.caption,
            children: nodes
        }
    ];
    $('#tree').tree({
        data: treeData,
        // animate: true,
        method: 'get',
        dnd: false,
        lines: true,
        onClick: function (node) {
            queryCatalogueItem(node.id);
        }
    });
}
//查询资源数据
function loadData(pn) {
    if (!pn)
        pn = 1;
    var filter = {};
//    if (_subject && _subject != '-1')
//        filter.subject = _subject;
//    if (_version && _version != '-1')
//        filter.version = _version;
//    if (_type && _type != '-1')
//        filter.type = _type;
//    if (_catalogueitem && _catalogueitem != '-1')
//        filter.catalog = _catalogueitem;
//    if (_bookid && _bookid != '-1')
//        filter.book = _bookid;
    filter = JSON.stringify(g.resourceCatalogue.condition);
    var url = 'api/resources/statistics/count';
    if (filter != '{}')
        url += "?filter=" + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = 'api/resources?offset=' + offset + '&count=' + _ps;
            if (filter != '{}')
                url += "&filter=" + filter;
            g.getData(url, function (result2) {
                render(result2.data, total, pn);
            })
        }
    })
}
var _resources;
//输出资源列表
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var resourceContainer = document.getElementById('resource-container');
    resourceContainer.innerHTML = "";
    if (!datas)
        return;
    _resources = datas;
    var template = g.getTemplate('resource-tpl')
    for (var i = 0; i < datas.length; i++) {
        var resource = datas[i];
        var href = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/resource-detail.html?id=' + resource.id;
        resource.href = href;
//        var downUri = '/download.whtml?t=2&src=' + resource.id;
        var downUri=datas[i].zipFile;
        resource.downUri = downUri;
        g.parseResourceCaption(resource, datas);
        var ele = g.dataToElement(resource, template);
        resourceContainer.appendChild(ele)
    }
    $('.btnFavoriteResource').click(function (e) {
        var id = e.target.attributes['rid'].value;
        favoriteResource(id);
    });
    // $('body').append("<script type='text/javascript' id='bdshell_js'></script>");
    if (document.getElementById("bdshell_js"))
        document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
    renderPage('pagicontainer', _ps, pn, total, goPage);
}
//分页动作
function goPage(pn) {
    loadData(pn);
}

function renderBooksSelect(datas) {
    for (var i = 0; i < datas.length; i++) {
        var s = datas[i];
        var option = $("<option value='" + s.id + "'>" + s.caption + "</option>")
        $('#queryBooks').append(option);
    }
}
//获取推荐资源
function getRecommentReses() {
    g.getData('api/resources/relationResources', function (result) {
        if (result.state == 200 || result.state == 201) {
            renderRecomments(result.data);
        }
    });
}
//输出推荐资源
function renderRecomments(recomments) {
    var tmpReses = recomments;
    var recommentContainer = document.getElementById('recommend-Container');
    var recommentTp = g.getTemplate('recommend-tpl');
    for (var i = 0; i < 6; i++) {
        var resource = tmpReses[i];
        if (resource.id == _id)
            continue;
        var href = 'resource-detail.html?id=' + resource.id;
        resource.href = href;
        var ele = g.dataToElement(resource, recommentTp);
        recommentContainer.appendChild(ele)
        var score = resource.score || 4;
        $($(ele).find('#level-Container')).find("span").each(function (i) {
            if (i < score) {
                $(this).removeClass("glyphicon-star-empty");
                $(this).addClass("glyphicon-star");
            }
        });
    }
}

//---------------资源收藏begin-------------------------//
//--有时间抽成公共逻辑
var _folders;
//获取所有文件夹
function getAllFolders() {
    if (_folders) {
        renderSelectFolderTree(_folders);
        return;
    }
    var uid = g.getCookie('uid')
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
            var uid = g.getCookie('uid');
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
var _favoriteResourceId;
function favoriteResource(id) {
    _favoriteResourceId = id;
    getAllFolders();
    $('#selectFolderModal').modal('show');
}
function onSelected() {
    var t = $('#tt');
    var node = t.tree('getSelected');
    if (!node)
        return;
    var resource = _resources.find({id: _favoriteResourceId})[0];
    var data = {resourceId: _favoriteResourceId};
    var uid = g.getUID();
    data.subKind = 7;
    data.kind = 2;
    data.caption = resource.caption;
    data.parentId = node.id;
    data.userId = uid;
    g.postData('api/users/' + uid + '/favorites', data, function (result) {
        if (result.state == 200 || result.state == 201) {
            alert('收藏成功！');
            $('#selectFolderModal').modal('hide');
        }
    });

}
var _editFlag = 0;
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
    if (node.tag.subKind == 0) {
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
    var uid = g.getCookie('uid');
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
    if (node.tag.subKind == 0) {
        alert('系统文件夹，不能删除');
        return;
    }
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var uid = g.getUID();
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
//---------------资源收藏end-------------------------//