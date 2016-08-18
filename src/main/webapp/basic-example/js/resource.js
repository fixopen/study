var c, sc;
window.addEventListener('load', function (evt) {
    init(evt);
    loadData(evt);
}, false)
function init(evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    $('#btnQuery').click(query);
}
function query() {
    var varsion = $('#queryVersion').val();
    var href = 'resource-search.html?version=' + escape(varsion) + '&' + c + '=' + escape(sc);
    window.location.href = href;
}
function loadData(evt) {
    c = getUrlParameter('c');
    if (!c)
        c = 'type';
    $('#sidebar-' + c).addClass('active');
    sc = getUrlParameter('sc');
    var subcatalogs = catalogs[c];
    if (!sc)
        sc = subcatalogs[0];
    var ps = 6;
    var pn = getUrlParameter('pn');
    if (!pn)
        pn = 1;
    var tabContainer = document.getElementById('nav-tabs')
    var tabtemplate = getTemplate('tab-tpl');

    for (var i = 0; i < subcatalogs.length; i++) {
        var ele = dataToElement({ subcatalog: subcatalogs[i] }, tabtemplate);
        if (sc == subcatalogs[i]) {
            ele.className = 'active';
        }
        var href = 'resource.html?c=' + c + '&sc=' + escape(subcatalogs[i]);
        ele.getElementsByTagName('a')[0].setAttribute('href', href);
        tabContainer.appendChild(ele);
    }

    var resourceContainer = document.getElementById('resources-container')
    var template = getTemplate('resource-tpl')
    var resources = getResources(c, sc);
    var tp = Math.ceil(resources.length / ps);

    for (var i = (pn - 1) * ps; i < Math.min(resources.length, pn * ps); i++) {
        var resource = resources[i];
        var href = 'resource-detail.html?id=' + resource.id;
        resource.href = href;
        var ele = dataToElement(resource, template);
        resourceContainer.appendChild(ele)
    }
    var pagecontainer = document.getElementById('pagicontainer')
    pagecontainer.innerHTML = '';
    var firstpagitemplate = getTemplate('firstpagili');
    var lastpagitemplate = getTemplate('lastpagili');
    var pagitemplate = getTemplate('pagili');
    var href = "resource.html?c=" + c + "&pn=1&tp=" + tp + "&sc=" + escape(sc);
    var ele = dataToElement({ href: href }, firstpagitemplate);
    pagecontainer.appendChild(ele)
    for (var i = 1; i <= tp; i++) {
        href = "resource.html?c=" + c + "&pn=" + i + "&tp=" + tp + "&sc=" + escape(sc);
        var data = {
            pn: i,
            href: href
        };
        ele = dataToElement(data, pagitemplate);
        if (i == pn)
            ele.className = 'active';
        pagecontainer.appendChild(ele)
    }
    href = "resource.html?c=" + c + "&pn=" + tp + "&tp=" + tp + "&sc=" + escape(sc);
    ele = dataToElement({ href: href }, lastpagitemplate);
    pagecontainer.appendChild(ele)
}

	
	
		
		
	