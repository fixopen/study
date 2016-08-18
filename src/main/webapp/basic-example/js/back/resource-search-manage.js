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
        var ele = g.dataToElement(data, template);
        container.appendChild(ele);
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);

}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

function getUrl() {
    var href = "resource-search-manage.html?";
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