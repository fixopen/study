var _ps = 5, _pn;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
        queryResName();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').on('click', loadData);
}
function queryResName() {
    var id = g.getUrlParameter('id');
    g.getData('/api/resources/' + id, function (result) {
        if (result.state == 200) {
            var resName = result.data.caption;
            $('#resName').append(resName);
        }
    })
}

//查询举报
var _dataState;
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('report-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('report-tr')
    for (var i = 0; i < count; ++i) {
//        private Long id;
//        private String content;
//        private ResourceTdm resource;
//        private int state = 0;
//        private String opinion;
//        private UserTdm reporter;
//        private Date timeReport;
//        private UserTdm opinioner;
//        private Date timeOpinion;
        if (datas[i].creator.$ref) {
            datas[i].creator = g.getJsonRefObject(datas, datas[i].creator.$ref);
        }
        datas[i].reporter = datas[i].creator.userName;
        if (datas[i].state == 0)datas[i].state = "未处理";
        if (datas[i].state == 1)datas[i].state = "举报失败";
        if (datas[i].state == 2)datas[i].state = "举报成功";

        container.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);

    $('.btn-rowDelete').click(del);//删除
    $('.btn-rowSuccess').click(reportSuc);//举报成功
    $('.btn-rowFailures').click(reportFai);//举报失败
}

//举报成功
function reportSuc(evt) {
    if (!window.confirm('你确定要设置这条举报成功吗？')) {
        return;
    }
    var resId = g.getUrlParameter('id');
    var reportId = evt.target.attributes['rowid'].value;
    var report = {state: "2"};
    g.patchData('/api/resources/' + resId + '/reports/' + reportId, report, function (data) {
        if (data.state == 200) {
            alert('操作成功')
            goPage(_pn);
        }
    })
}
//举报失败
function reportFai(evt) {
    if (!window.confirm('你确定要设置这条举报失败吗？')) {
        return;
    }
    var resId = g.getUrlParameter('id');
    var reportId = evt.target.attributes['rowid'].value;
    var report = {state: "1"};
    g.patchData('/api/resources/' + resId + '/reports/' + reportId, report, function (data) {
        if (data.state == 200) {
            alert('操作成功')
            goPage(_pn);
        }
    })
}
//删除
function del(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var id = evt.target.attributes['rowid'].value;
    g.deleteData('/api/resources/' + id + '/reports', function (data) {
        if (data.state == 200) {
            alert('删除成功')
            goPage(_pn);
        }
    })
}

function goPage(pn) {
    _pn = pn;
    loadData(pn);
}

//查询输入框中
function loadData(pn) {
    var id = g.getUrlParameter("id");
    if (!pn)
        pn = 1;
    var filter;
//    var textQuery=document.getElementById("txtQuery").value;
//    var filter = {"content": textQuery};
    var url = '/api/resources/' + id + '/reports/statistics/count';
//    if(filter)
//        url+='?filter=' + encodeURIComponent(JSON.stringify(filter));
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/resources/' + id + '/reports';
            if (filter)
                url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
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