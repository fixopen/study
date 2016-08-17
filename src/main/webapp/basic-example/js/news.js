var _ps = 13, pn;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
//        getSlideNews();
        getNewsList();
        g.importFooter();
    });
}, false)

//获取滚动新闻
//function getSlideNews() {
//    var filter = encodeURIComponent(JSON.stringify({kind: 3}));
//    var api = 'api/decorates?filter=' + filter;
//    g.getData(api, function (result) {
//        if (result.state == 200) {
//            renderNewsSlideRegion(result.data);
//        }
//    })
//}
//获取新闻列表
function getNewsList(pn) {
    if (!pn)
        pn = 1;
    var filter = encodeURIComponent(JSON.stringify({"rowState": 1}));
    var url = '/api/news/statistics/count';
    url += '?filter=' + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/news?filter=' + filter;
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    renderNewsListRegion(result2.data, total, pn);
                }
            });
        }
    });
}
//输出滚动新闻区域
//function renderNewsSlideRegion(newses) {
//    var indicatorContainer = document.getElementById('news-indicator-container');
//    var wrapperContainer = document.getElementById('news-wrapper-container');
//    var indicatorTpl = g.getTemplate('news-indicator-tpl');
//    var wrapperTpl = g.getTemplate('news-wrapper-tpl');
//    for (var i = 0; i < newses.length; i++) {
//        var news = newses[i];
//        var href = 'news-detail.html?id=' + news.targetId;
//        news.href = href;
//        var ele = g.dataToElement(news, indicatorTpl);
//        indicatorContainer.appendChild(ele);
//        $(ele).attr('data-slide-to', i)
//        if (i == 0)
//            $(ele).addClass('active');
//        ele = g.dataToElement(news, wrapperTpl);
//        wrapperContainer.appendChild(ele);
//        if (i == 0)
//            $(ele).addClass('active');
//    }
//}

function renderNewsListRegion(newses, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('news-list-container');
    container.innerHTML = '';
    var count = newses.length;
    var tpl = g.getTemplate('news-item');
    for (var i = 0; i < count; i++) {
        var news = newses[i];
        var href = 'news-detail.html?id=' + news.id;
        news.href = href;
        //news.dateCreated=new Date(news.dateCreated);
        var ele = g.dataToElement(news, tpl);
        container.appendChild(ele);
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}

function goPage(pn) {
    _pn = pn;
    getNewsList(pn);
}