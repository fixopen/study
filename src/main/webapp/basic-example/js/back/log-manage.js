var _ps = 10, _pn;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').on('click', function (event) {
        loadData()
    });
    $('.input-daterange').datepicker({format: 'yyyy-mm-dd' });
}
//查询资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('log-tbody')
    container.innerHTML = '';
    var count = datas.length;
    var template = g.getTemplate('log-tr')
    for (var i = 0; i < count; ++i) {
        var data = datas[i]
        if (data.user.$ref) {
            data.user = g.getJsonRefObject(datas, data.user.$ref);
        }
        data.userName = data.user.userName;
        container.appendChild(g.dataToElement(data, template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

function loadData(pn) {
    if (!pn)
        pn = 1;
    var timeBegin = $('#begin').val();
    var timeEnd = $('#end').val();
    var textQuery = document.getElementById("txtQuery").value;
    var jsonFilter = {}
    var hasFilter = false
    var filter = ''
    if (textQuery) {
        jsonFilter.user = textQuery
        hasFilter = true
    }
    if (timeBegin) {
        jsonFilter.timeBegin = timeBegin
        hasFilter = true
    }
    if (timeEnd) {
        jsonFilter.timeEnd = timeEnd
        hasFilter = true
    }

    if (hasFilter) {
        filter = encodeURIComponent(JSON.stringify(jsonFilter));
    }
    var url = '/api/logs/usersLog/statistics/count';
    if (hasFilter)
        url += '?filter=' + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/logs/usersLog';
            if (filter)
                url += '?filter=' + filter;
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'offset=' + offset + '&count=' + _ps;
            g.getData(url, function (result2) {
                if (result2.state == 200) {
                    render(result2.data, total, pn);
                }
            });
        }
    });
}