var _ps = 8, _pn;
var userId = g.getCookie('uid');
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        queryResName()
        loadData();
    });
}, false)
//绑定事件
function bindEvents() {
    $('#btnQuery').on('click', loadData);
//    $('#btnDelAll').on('click',delAll);
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

//输出资源
function render(datas, total, pn) {
    if (!pn)
        pn = 1;
    var container = document.getElementById('evaluate-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('evaluate-tr')
    for (var i = 0; i < count; ++i) {
        var kind = datas[i].kind;
        var evaKind = '';
        switch (kind) {
            case 1:
                evaKind = '提问';
                break;
            case 2:
                evaKind = '建议';
                break;
            default :
                break;
        }
        datas[i].kind = evaKind;
        if (datas[i].creator.$ref) {
            datas[i].creator = getJsonRefObject(datas, datas[i].creator.$ref);
        }
        datas[i].evaCreator = datas[i].creator.userName;
        if (datas[i].shield == 0) datas[i].showState = "显示"
        if (datas[i].shield == 1) datas[i].showState = "不显示"

        container.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
    $('.btn-rowNotshow').click(notShow);//不在前台显示
    $('.btn-rowDelete').click(del);//删除
}

//不在前台显示
function notShow(evt) {
    if (!window.confirm('你确定要这条评论不在前台显示吗？')) {
        return;
    }
    var resId = g.getUrlParameter('id');
    var commetId = evt.target.attributes['rowid'].value;
    var commet = {shield: "1"};
    g.patchData('/api/resources/' + resId + '/comments/' + commetId, commet, function (data) {
        if (data.state == 200) {
            alert('操作成功')
            goPage(_pn);
        }
    })
}
//删除该资源的所有评价 /resources/{id}/comments
//function delAll(evt){
//    var resId=getUrlParameter('id');
//    deleteData('/api/resources/' + resId +'/commets',function(data) {
//        if(data.state==200){
//            goPage(_pn);
//        }
//    })
//}
//删除一条评价
function del(evt) {
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    var resId = g.getUrlParameter('id');
    var commetId = evt.target.attributes['rowid'].value;
    g.deleteData('/api/resources/' + resId + '/comments/' + commetId, function (data) {
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

//获取当前资源的所有评论
function loadData(pn) {
    var id = g.getUrlParameter('id');
    if (!pn)
        pn = 1;
    var filter;
//    var textQuery=document.getElementById("txtQuery").value;
//    var filter = {"caption": textQuery};
    var url = '/api/resources/' + id + '/comments/statistics/count';
//    if(filter)
//        url+='?filter=' + encodeURIComponent(JSON.stringify(filter));
    g.getData(url, function (result) {
        if (result.state == 200) {
            var total = result.data;
            var offset = _ps * (pn - 1);
            url = '/api/resources/' + id + '/comments';
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
