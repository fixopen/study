function renderPageIndex(id, pageSize, currentPage, total, handler) {
    var pageIndexContainer = document.getElementById(id)
    pageIndexContainer.innerHTML = ''

    var firstItemTemplate = $('<li class="firstpagili"><a href="javascript:void(0)" pn="1">&laquo;</a></li>')[0]
    var firstItem = g.dataToElement({}, firstItemTemplate);
    pageIndexContainer.appendChild(firstItem)

    var itemTemplate = $('<li class="pagili"><a href="javascript:void(0)" pn="${pn}">${pn}</a></li>')[0]
    var totalPage = Math.ceil(total / pageSize)
    var beginPageNo = 1
    if (currentPage > 5) {
        if (currentPage > totalPage - 5) {
            beginPageNo = totalPage - 10
        } else {
            beginPageNo = currentPage - 5
        }
    }
    if (beginPageNo < 1) {
        beginPageNo = 1
    }
    var endPageNo = beginPageNo + 9
    for (var i = beginPageNo; i <= Math.min(endPageNo, totalPage); ++i) {
        var data = {
            pn: i
        }
        item = g.dataToElement(data, itemTemplate)
        if (i == currentPage) {
            item.className = 'active'
        }
        pageIndexContainer.appendChild(item)
    }

    var lastItemTemplate = $('<li class="lastpagili"><a href="javascript:void(0)" pn="${pn}">&raquo;</a></li>')[0]
    var lastItem = g.dataToElement({ pn: totalPage }, lastItemTemplate)
    pageIndexContainer.appendChild(lastItem)

    $(pageIndexContainer).find('a').on('click', function (e) {
        var pn = e.target.attributes['pn'].value
        handler(pn)
    })
}

var auditInfo = {
    "total": 0,
    "isDirty": true,
    "pageSize": 6,
    "currentPage": 1,
    "currentResource": 0,
    "resources": [],
    "loadData": function (pageNo) {
        auditInfo.currentPage = pageNo

        var jsonFilter = {}
        jsonFilter = $.extend(jsonFilter, condition)
        var txtQuery = document.getElementById("txtQuery").value;
        if (txtQuery) {
            jsonFilter.caption = txtQuery
        }
        jsonFilter.checkState = 5;
        var queryString = 'filter='
        queryString += encodeURIComponent(JSON.stringify(jsonFilter));

        if (auditInfo.isDirty) {
            var statsUrl = '/api/resources/statistics/count'
            g.getData(statsUrl + '?' + queryString, function (s) {
                if (s.state == 200) {
                    auditInfo.total = s.data
                    auditInfo.isDirty = false
                }
            })
        }
        var offset = auditInfo.pageSize * (auditInfo.currentPage - 1)
        queryString += '&offset=' + offset + '&count=' + auditInfo.pageSize
        var url = '/api/resources'
        g.getData(url + '?' + queryString, function (u) {
            if (u.state == 200) {
                auditInfo.resources = u.data
            }
        })
    },
    "render": function () {
        var container = document.getElementById('resource-tbody')
        container.innerHTML = ''
        var template = g.getTemplate('resource-tr')
        var count = auditInfo.resources.length
        for (var i = 0; i < count; ++i) {
            switch (auditInfo.resources[i].checkState) {
                case 0:
                    auditInfo.resources[i].state = '未审核'
                    break
                case 1:
                    auditInfo.resources[i].state = '未通过'
                    break
                case 2:
                    auditInfo.resources[i].state = '已审核'
                    break
                default:
                    break
            }
            var data = auditInfo.resources[i];
//            var pd = {}
//            g.parseDataRef(auditInfo.resources, data, pd)
//            if (data.$ref) {
//                data = g.getJsonRefObject(auditInfo.resources, data.$ref);
//            }
            g.parseResourceCaption(data, auditInfo.resources);
            var item = g.dataToElement(data, template)
            $(item).find('.btn-pass').on('click', function (event) {
                var id = event.target.attributes['data-id'].value
                g.patchData('/api/resources/' + id, {"checkState": 2}, function (r) {
                    if (r.state == 200) {
                        alert('资源审核通过')
                        auditInfo.isDirty = true
                        auditInfo.loadData(auditInfo.currentPage)
                        auditInfo.render()
                    }
                })
            })
            $(item).find('.btn-nopass').on('click', function (event) {
                var self = event.target
                var id = self.attributes['data-id'].value
                g.patchData('/api/resources/' + id, {"checkState": 1}, function (r) {
                    if (r.state == 200) {
                        alert('资源审核未通过')
                        var resourceCount = auditInfo.resources.length
                        for (var i = 0; i < resourceCount; ++i) {
                            if (auditInfo.resources[i].id == id) {
                                auditInfo.resources[i].checkState = 1
                                auditInfo.resources[i].state = '未通过'
                                break
                            }
                        }
                        item.children[0].textContent = '未通过'
                        //auditInfo.loadData(auditInfo.currentPage)
                        //auditInfo.render()
                    }
                })
            })
            container.appendChild(item)
        }

        renderPageIndex('pagicontainer', auditInfo.pageSize, auditInfo.currentPage, auditInfo.total, function (pageNo) {
            auditInfo.loadData(pageNo)
            auditInfo.render()
        })
    }
}
var condition = {};
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        g.stages.loadData();
        g.types.loadData();
        g.editions.loadData();
        g.subjects.loadData();

        initCondition(evt);
        renderStages();
        renderSubjects();
        renderVersions();
        renderKinds();
        renderScopes();

        $('#btnQuery').on('click', function (event) {
            auditInfo.isDirty = true
            auditInfo.loadData(auditInfo.currentPage)
            auditInfo.render()
        })
        auditInfo.loadData(auditInfo.currentPage)
        auditInfo.render()
    });
}, false)

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
function getUrl() {
    var href = "resource-audit.html?";
    for (var key in condition) {
        href += key + "=" + escape(condition[key]) + "&";
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