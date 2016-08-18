var condition = {}, _pn, _ps = 12;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        g.stages.loadData();
        g.types.loadData();
        g.editions.loadData();
        g.subjects.loadData();

        init(evt);
        initCondition(evt);

        renderStages();
        renderSubjects();
        renderVersions();
        renderKinds();
        renderScopes();

        loadData(_pn);
    });
}, false)
function init(evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    $('#btnQuery').on('click', function (event) {
        loadData()
    });
    $('#btnNew').on('click', create);
    $('#btnAudit').on('click', audit);
//    $('.navbar-form').find('button').unbind();
//    $('.navbar-form').find('button').click(search);
}
function initCondition() {
    var stage = g.getUrlParameter('stage');
    var subject = (g.getUrlParameter('subject'));
    var version = (g.getUrlParameter('version'));
    var type = (g.getUrlParameter('type'));
    var scope = (g.getUrlParameter('scope'));
    _pn = g.getUrlParameter('pn');

    if (stage && stage != 'null') {
        if (stage != -1)
            condition.stage = stage;
    }
    if (subject && subject != 'null') {
        if (subject != -1)
            condition.subject = subject;
    }
    if (version && version != 'null') {
        if (version != -1)
            condition.version = version;
    }
    if (type && type != 'null') {
        if (type != -1)
            condition.type = type;
    }
    if (scope && scope != 'null') {
        if (scope != -1)
            condition.scope = scope;
    }
}
//查询资源
function loadData(pn) {
    if (!pn)
        pn = 1;
    var jsonFilter = {}
    jsonFilter = $.extend(jsonFilter, condition)
    var txtQuery = document.getElementById("txtQuery").value;
    if (txtQuery) {
        jsonFilter.caption = txtQuery
    }
    var filter = ''
    filter = encodeURIComponent(JSON.stringify(jsonFilter));
    var url = '/api/resources/statistics/count';
    if (filter != '') {
        url += '?filter=' + filter
    }
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            var url = '/api/resources?offset=' + offset + '&count=' + _ps;
            if (filter)
                url += "&filter=" + filter;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    render(result2.data, total, pn);
                }
            });
        }
    });
}
//获取所有年级
function renderStages() {
    renderConditionRegin(g.stages.data, 'stage');
    if (condition.stage) {
        var tmp = g.stages.data.find({id: condition.stage});
        var title = '';
        if (tmp && tmp.length > 0)
            title = tmp[0].caption;
        renderSelected(condition.stage, title, "stage");
    }
}
//获取所有学科
function renderSubjects() {
    renderConditionRegin(g.subjects.data, 'subject');
    if (condition.subject) {
        var tmp = g.subjects.data.find({id: condition.subject});
        var title = '';
        if (tmp && tmp.length > 0)
            title = tmp[0].caption;
        renderSelected(condition.subject, title, "subject");
    }
}
//获取所有版本
function renderVersions() {
    renderConditionRegin(g.editions.data, 'version');
    if (condition.version) {
        var tmp = g.editions.data.find({id: condition.version});
        var title = '';
        if (tmp && tmp.length > 0)
            title = tmp[0].caption;
        renderSelected(condition.version, title, "version");
    }
}
//获取所有类型
function renderKinds() {
    renderConditionRegin(g.types.data, 'type');
    if (condition.type) {
        var tmp = g.types.data.find({id: condition.type});
        var title = '';
        if (tmp && tmp.length > 0)
            title = tmp[0].caption;
        renderSelected(condition.type, title, "type");
    }
}
//获取所有类型
function renderScopes() {
    renderConditionRegin(g._scopes, 'scope');
    if (condition.scope) {
        var tmp = g._scopes.find({id: condition.scope});
        var title = '';
        if (tmp && tmp.length > 0)
            title = tmp[0].caption;
        renderSelected(condition.scope, title, "scope");
    }
}
function renderConditionRegin(datas, catalog) {
    var container = document.getElementById(catalog + '-Container');
    var template = g.getTemplate('condition-tpl');
    var ele = g.dataToElement({id: -1, title: '全部', catalog: catalog}, template);
    container.appendChild(ele);
    for (var i = 0; i < datas.length; i++) {
        var data = {id: datas[i].id, title: datas[i].caption, catalog: catalog};
        ele = g.dataToElement(data, template);
        container.appendChild(ele);
    }
    $(container).find("a[name='condition']").click(conditionClick);
}
function renderSelected(id, title, catalog) {
    if (id == '-1')
        title = '全部';
    var container = document.getElementById('selected-Container')
    $(container).find("[catalog='" + catalog + "']").parent().remove();
    var template = g.getTemplate('selected-tpl');
    var ele = g.dataToElement({id: id, catalog: catalog, title: title}, template);
    container.appendChild(ele);
    $(ele).click(remove);
}
function conditionClick(evt) {
    var ele = $(evt.target);
    var id = ele.prop('id');
    var catalog = ele.attr('catalog');
    var title = ele.html();
    condition[catalog] = id;
    var href = getUrl();
    window.location.href = href;
}
function remove(evt) {
    var id = $($(evt.target)).attr('id') || $($(evt.target).parent()).attr('id');
    var catalog = $(evt.target).attr('catalog') || $($(evt.target).parent()).attr('catalog');
    delete condition[catalog];
    var href = getUrl();
    window.location.href = href;
}

function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('resource-tbody')
    $(container).empty();
    var template = g.getTemplate('resource-tr');
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        g.parseResourceCaption(data, datas);
        if(data.recommend == 0)data.recommend ="未推荐";
        if(data.recommend == 1)data.recommend ="已推荐"
        var ele = g.dataToElement(data, template);
        container.appendChild(ele);
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);

    $('.btn-rowedit').click(edit);//编辑
    $('.btn-rowpreview').click(preview);
    $('.btn-rowdelete').click(del);//删除
    $('.btn-rowdecorate').click(decorate);//配图
}
//编辑资源
function edit(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('resource-edit.html?id=' + id);
}
function create() {
    window.location.href = 'create-resource.html';
}
//预览
function preview(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.open("/resource-detail.html?id=" + id);
}
function del(event) {
    if (confirm('你确定要删除吗？')) {
        var deleteRow = function () {
            var tr = event.target.parentNode.parentNode
            var tbody = tr.parentNode
            tbody.removeChild(tr)
            if (tbody.rows.length == 0) {
                g.renderPageNavigator('pagicontainer', _ps, 1, 0, goPage);
            }
        }
        var recommend = event.target.attributes['data-recommend'].value;
        var resId = event.target.attributes['rowid'].value;
        if(recommend == "未推荐"){
            g.deleteData('/api/resources/' + resId, function (data) {
            if (data.state == 200) {
                alert('删除成功')
                deleteRow()
            }
        })
        }else if(recommend = "已推荐"){
            g.getData('/api/decorates?filter=' + encodeURIComponent(JSON.stringify({"kind": 1})),function(r){
                if(r.state == 200){
                    decorateResData= r.data
                }
            })
            for(var i = 0;i<decorateResData.length;++i){
                if(decorateResData[i].targetId == resId){
                    decorateResId = decorateResData[i].id
                }
            }
            if(decorateResId)
                g.deleteData('/api/decorates/' + decorateResId, function (d) {
                    if (d.state == 200) {
                        g.deleteData('/api/resources/' + resId, function (data) {
                            if (data.state == 200) {
                                alert('删除成功')
                                //document.getElementById("txtQuery").value="";
                                //location.href = 'http://localhost:8080/backstage/resourceManage/resource-manage.html'
                                deleteRow()
                            }
                        })
                    }
                })
        }
    }
}
//配图
function decorate(evt) {
    var recommend = evt.target.attributes['data-recommend'].value;
    if(recommend == "已推荐"){
        alert("资源已推荐为热门资源！")
    }else if(recommend = "未推荐"){
        var filter = encodeURIComponent(JSON.stringify({"kind": 1}));
        var url = '/api/decorates?filter=' + filter;
        url += '&offset=0&count=100';
        var hotImgTotal = 0;
        g.getData(url, function (result2) {
            if (result2.state == 200) {
                hotImgTotal = result2.data.length;
            }
        });
        if (hotImgTotal > 92) {
            alert("首页热门推荐已超过最大数，请去首页热门资源管理中进行编辑管理！")
        } else {
            var id = evt.target.attributes['rowid'].value;
            window.location.replace('hotresimg-resManage-create.html?targetid=' + id);
        }
    }
}
//审核页
function audit() {
    window.location.href = 'resource-audit.html';
}
function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

function getUrl() {
    var href = "resource-manage.html?";
    for (var key in condition) {
        href += key + "=" + encodeURIComponent(condition[key]) + "&";
    }
    href = href.substring(0, href.length - 1);
    return href;
}

function search() {
    var caption = $($('.navbar-form').find('input')[0]).val();
    condition.caption = caption;
    var href = getUrl();
    window.location.href = href;
}