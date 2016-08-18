var firstpage_tplHtml = "<li class='firstpagili'><a href='javascript:void(0)' pn=1>&laquo;</a></li>";
var page_tplHtml = "<li class='pagili'><a href='javascript:void(0)' pn=${pn}>${pn}</a></li>";
var lastpage_tplHtml = "<li class='lastpagili'><a href='javascript:void(0)' pn=${pn}>&raquo;</a></li>";

//输出分页,pn:页号，tr:总行数
function renderPage(id, ps, pn, tr, handler) {
    var tp = Math.ceil(tr / ps);
    var pagecontainer = document.getElementById(id)
    pagecontainer.innerHTML = '';
    var firstpagitemplate = $(firstpage_tplHtml)[0];// getTemplate('firstpagili');
    var lastpagitemplate = $(lastpage_tplHtml)[0];// getTemplate('lastpagili');
    var pagitemplate = $(page_tplHtml)[0];// getTemplate('pagili');
    var ele = g.dataToElement({}, firstpagitemplate);
    pagecontainer.appendChild(ele)
    var initpn = 1;

    if (pn > 5) {
        if (pn > tp - 5) {
            initpn = tp - 10;
        } else {
            initpn = pn - 5;
        }
    }
    if (initpn < 1)
        initpn = 1;

    var end = initpn + 9;
    for (var i = initpn; i <= Math.min(end, tp); i++) {
        var data = {
            pn: i
        };
        ele = g.dataToElement(data, pagitemplate);
        if (i == pn)
            ele.className = 'active';
        pagecontainer.appendChild(ele)
    }
    ele = g.dataToElement({ pn: tp }, lastpagitemplate);
    pagecontainer.appendChild(ele);
    $(pagecontainer).find('a').click(function (e) {
        var pn = e.target.attributes['pn'].value;
        handler(pn);
    });
}