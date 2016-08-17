window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        var id = g.getUrlParameter('id');
        if (!id)
            return;
        var news = null;
        var filter = encodeURIComponent(JSON.stringify({"rowState": 1}));
        var url = '/api/news/' + id;
        if (filter)
            url += '?filter=' + filter;
        g.getData(url, function (result) {
            if (result.state == 200) {
                var news = result.data;
                news.content = result.content.data;
                var newContainer = document.getElementById('new-detail');
                var template = g.getTemplate('temNewsClass');
                newContainer.appendChild(g.dataToElement(news, template))
            }
        });
        g.importFooter();
    });
}, false)