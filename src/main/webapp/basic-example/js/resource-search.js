//var condition={},_pn,_ps=24;
//
//window.addEventListener('load', function (evt) {
//    init(evt);
//    initCondition(evt);
//	getStages();
//	getSubjects();
//	getVersions();
//	getKinds();
//    getScopes();
//	loadData(_pn);
//}, false)
//function init(evt) {
//    var loginButton = document.getElementById('login')
//    if (loginButton) {
//        loginButton.addEventListener('click', function (evt) {
//            var path = window.location.pathname;
//            window.location.replace("login.html?url=" + encodeURI(path));
//        }, false);
//    }
//	$('.navbar-form').find('button').unbind();
//	$('.navbar-form').find('button').click(search);
//}
//function initCondition() {
//    var caption =unescape(getUrlParameter('caption'));
//    var stage=unescape(getUrlParameter('stage'));
//    var subject=unescape(getUrlParameter('subject'));
//    var version=unescape(getUrlParameter('version'));
//    var type=unescape(getUrlParameter('type'));
//    var scope=unescape(getUrlParameter('scope'));
//    _pn = getUrlParameter('pn');
//
//    if(stage&&stage!='null'){
//        if(stage!=-1)
//            condition.stage=stage;
//    }
//    if(subject&&subject!='null'){
//        if(subject!=-1)
//            condition.subject=subject;
//    }
//    if(version&&version!='null'){
//        if(version!=-1)
//            condition.version=version;
//    }
//    if(type&&type!='null'){
//        if(type!=-1)
//            condition.type=type;
//    }
//    if(scope&&scope!='null'){
//        if(scope!=-1)
//            condition.scope=scope;
//    }
//    if(caption&&caption!='null'){
//        $($('.navbar-form').find('input')[0]).val(caption)
//        condition.caption=caption;
//    }
//}
////查询资源
//function loadData(pn){
//    if(!pn)
//        pn=1;
//    var url='api/resources/statistics/count';
//    var filter;
//    var condStr = JSON.stringify(condition);
//    if(condStr!='{}'){
//        filter=encodeURIComponent(condStr);
//        url+="?filter="+filter;
//    }
//    g.getData(url,function(result){
//        if(result.state==200){
//            var total=result.data;
//            var offset=_ps*(pn-1);
//            url='api/resources?offset='+offset+'&count='+_ps;
//            if(filter)
//                url+="&filter="+filter;
//            g.getData(url,function(result2){
//        		if(result2.state==200){
//        			render(result2.data,total,pn);
//        		}
//        	});
//        }
//    });
//}
////获取所有年级
//function getStages(){
//        renderConditionRegin(_stages,'stage');
//        if(condition.stage){
//            var tmp=_stages.find({id:condition.stage});
//            var title='';
//            if(tmp&&tmp.length>0)
//                title=tmp[0].caption;
//            renderSelected(condition.stage,title,"stage");
//        }
//}
////获取所有学科
//function getSubjects(){
//        renderConditionRegin(_subjects,'subject');
//        if(condition.subject){
//            var tmp=_subjects.find({id:condition.subject});
//            var title='';
//            if(tmp&&tmp.length>0)
//                title=tmp[0].caption;
//            renderSelected(condition.subject,title,"subject");
//        }
//}
////获取所有版本
//function getVersions(){
//            renderConditionRegin(_versions,'version');
//            if(condition.version){
//                var tmp=_versions.find({id:condition.version});
//                var title='';
//                if(tmp&&tmp.length>0)
//                    title=tmp[0].caption;
//                renderSelected(condition.version,title,"version");
//            }
//}
////获取所有类型
//function getKinds(){
//            renderConditionRegin(_types,'type');
//            if(condition.type){
//                var tmp=_types.find({id:condition.type});
//                var title='';
//                if(tmp&&tmp.length>0)
//                    title=tmp[0].caption;
//                renderSelected(condition.type,title,"type");
//            }
//}
////获取所有类型
//function getScopes(){
//    renderConditionRegin(_scopes,'scope');
//    if(condition.scope){
//        var tmp=_scopes.find({id:condition.scope});
//        var title='';
//        if(tmp&&tmp.length>0)
//            title=tmp[0].caption;
//        renderSelected(condition.scope,title,"scope");
//    }
//}
//function renderConditionRegin(datas,catalog){
//	var container = document.getElementById(catalog+'-Container');
//    var template = g.getTemplate('condition-tpl');
//    var ele = g.dataToElement({id:-1,title:'全部',catalog:catalog}, template);
//    container.appendChild(ele);
//    for (var i = 0; i < datas.length; i++) {
//		var data={id:datas[i].id,title:datas[i].caption,catalog:catalog};
//        ele = g.dataToElement(data, template);
//        container.appendChild(ele);
//    }
//	$(container).find("a[name='condition']").click(conditionClick);
//}
//function renderSelected(id,title,catalog){
//	if(id=='-1')
//		title='全部';
//    var container = document.getElementById('selected-Container')
//    $(container).find("[catalog='"+catalog+"']").parent().remove();
//	var template = g.getTemplate('selected-tpl');
//	var ele = g.dataToElement({id:id,catalog:catalog,title:title}, template);
//	container.appendChild(ele);
//	$(ele).click(remove);
//}
//function conditionClick(evt){
//	var ele=$(evt.target);
//	var id=ele.prop('id');
//	var catalog=ele.attr('catalog');
//	var title=ele.html();
//	condition[catalog]=id;
//	var href=getUrl();
//	window.location.href=href;
//}
//function remove(evt){
//	var id=$($(evt.target)).attr('id') || $($(evt.target).parent()).attr('id');
//	var catalog=$(evt.target).attr('catalog')||$($(evt.target).parent()).attr('catalog');
//	delete condition[catalog];
//	var href=getUrl();
//	window.location.href=href;
//}
//
//function render(datas,total,pn){
//	var ps = _ps;
//    if (!pn)
//        pn = 1;
//    var tp =Math.ceil(total / ps);
//    var container = document.getElementById('resource-container')
//	$(container).empty();
//    var template = g.getTemplate('resource-tpl');
//    for (var i = 0; i < datas.length; i++) {
//		var data=datas[i];
//        g.parseResourceCaption(data,datas);
//        var href = 'resource-detail.html?id='+data.id;
//		data.href=href;
//        var ele = g.dataToElement(data, template);
//        container.appendChild(ele);
//    }
//
//	var pagecontainer = document.getElementById('pagicontainer')
//    pagecontainer.innerHTML = '';
//    var firstpagitemplate = g.getTemplate('firstpagili');
//    var lastpagitemplate = g.getTemplate('lastpagili');
//    var pagitemplate = g.getTemplate('pagili');
//    var url=getUrl();
//    if(url.indexOf('?')==-1)
//    	url+="?";
//    else
//    	url+="&";
//
//    var href = url+"pn=1";
//    var ele = g.dataToElement({ href: href }, firstpagitemplate);
//    pagecontainer.appendChild(ele)
//    var initpn = 1;
//    if(pn > 5){
//        if(pn > tp - 5){
//            initpn = tp - 10;
//        }else{
//            initpn = pn - 5;
//        }
//    }
//    if(initpn < 1)
//    	initpn=1;
//
//    var end = initpn+9;
//    for (var i = initpn; i <=Math.min(end,tp); i++) {
//        href = url+ "pn=" + i;
//        var data = {
//            pn: i,
//            href:href
//        };
//        ele = dataToElement(data, pagitemplate);
//        if (i == pn)
//            ele.className = 'active';
//        pagecontainer.appendChild(ele)
//    }
//    href = url+ "pn=" + tp;
//    ele = g.dataToElement({ href: href }, lastpagitemplate);
//    pagecontainer.appendChild(ele)
//}
//function getUrl(){
//	var href = "resource-search.html?";
//	for(var key in condition){
//		href+= key+"="+escape(condition[key])+"&";
//	}
//	href = href.substring(0,href.length-1);
//	return href;
//}
//
//function search(){
//   var caption=$($('.navbar-form').find('input')[0]).val();
//   condition.caption=caption;
//   var href=getUrl();
//   window.location.href=href;
//}


//function(containerId, templateId, uri, postReceiveData, extraDataParams, preRenderElement, extraElementParams, secondContainerId, secondTemplateId)
g.resourceIndex = {
    subject: new g.Part('subject-Container', 'condition-tpl', '/api/subjects', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "subject";
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            var catalog = evt.target.getAttribute("catalog")
            location.href = "resource-search.html?" + catalog + "=" + encodeURI(evt.target.getAttribute('id'));
        }, false);
        return result
    }, g.nullElementParams),
    stage: new g.Part('stage-Container', 'condition-tpl', '/api/stages', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "stage";
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            var catalog = evt.target.getAttribute("catalog")
            location.href = "resource-search.html?" + catalog + "=" + encodeURI(evt.target.getAttribute('id'));
        }, false);
        return result
    }, g.nullElementParams),
    type: new g.Part('type-Container', 'condition-tpl', '/api/resources/types', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "scope";
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            var catalog = evt.target.getAttribute("catalog")
            location.href = "resource-search.html?" + catalog + "=" + encodeURI(evt.target.getAttribute('id'));
        }, false);
        return result
    }, g.nullElementParams),
    version: new g.Part('version-Container', 'condition-tpl', '/api/editions', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "version";
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            var catalog = evt.target.getAttribute("catalog")
            location.href = "resource-search.html?" + catalog + "=" + encodeURI(evt.target.getAttribute('id'));
        }, false);
        return result
    }, g.nullElementParams),
    scopes: {
        render: function () {
            var container = document.getElementById('scope-Container')
            var template = g.getTemplate("condition-tpl")
            var data = g._scopes
            for (var i = 0; i < data.length; ++i) {
                data[i].title = data[i].caption;
                data[i].catalog = "scope";
                var element = g.dataToElement(data[i], template)
                container.appendChild(element)
                element.querySelector('span').addEventListener('click', function (evt) {
                    var catalog = evt.target.getAttribute("catalog")
                    location.href = "resource-search.html?" + catalog + "=" + encodeURI(evt.target.getAttribute('id'));
                }, false)
            }
        }
    },
    renderContent: function () {
        var tabContainer = document.getElementById('panel-container')
//        var tabtemplate = g.getTemplate('panel-tpl');
//        var typeData = g.resourceIndex.type.data
//        for (var i = 0; i < typeData.length; i++) {
//            var sc = typeData[i];
//            var href = 'resource-search.html?type=' + escape(sc.id);
//            sc.href = href;
        var ele = g.dataToElement(sc, tabtemplate);
//            tabContainer.appendChild(ele);

        var resourceContainer = $(ele).find('.books-container')[0];
        var template = g.getTemplate('resource-tpl')
//            var filter = encodeURIComponent(JSON.stringify({type: sc.id}))
        g.getData('/api/resources?offset=0&count=6&filter=' + filter, function (result) {
            if (result.state == 200) {
                var reses = result.data;
                for (var j = 0; j < Math.min(reses.length, 6); j++) {
                    var data = reses[j];
                    g.parseResourceCaption(data, reses);
                    if (data.caption.length > 14) {
                        data.caption = data.caption.slice(0, 17) + '...';
                    }

                    var href = 'resource-detail.html?id=' + data.id;
                    data.href = href;
                    var ele = g.dataToElement(data, template);
                    resourceContainer.appendChild(ele)
                }
            }
        })
//        }
    }
}

window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.resourceIndex.subject.loadData();
        g.resourceIndex.subject.render();
        g.resourceIndex.stage.loadData();
        g.resourceIndex.stage.render();
        g.resourceIndex.type.loadData();
        g.resourceIndex.type.render();
        g.resourceIndex.scopes.render();
        g.resourceIndex.version.loadData();
        g.resourceIndex.version.render();
        g.resourceIndex.renderContent()
        g.importFooter()
    });
}, false)
