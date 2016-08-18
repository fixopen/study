var userId = g.getCookie('uid');
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
    });
}, false)
var _ps = 5, _pn;
var currentKind;
function bindEvents() {
    $('#btnSuggestion').click(function (evt) {
        genericLoadData(1)
    }).click();
    $('#btnImprove').click(function (evt) {
        genericLoadData(2)
    });
    $('#btnReport').click(function (evt) {
        genericLoadData(3)
    });
}
var _feedBackDatas;
function genericLoadData(kind) {
    currentKind = kind;
    var filter = encodeURIComponent(JSON.stringify({"kind": kind}));
    url = '/api/users/' + 1 + '/feedbacks?filter=' + filter;
    g.getData(url, function (result2) {
        if (result2.state == 200) {
            _feedBackDatas = result2.data;
            getFilterDatas();
        }
    });
}
//获取过滤完的数据
var _filtertdatas;
function getFilterDatas(pn) {
    if (!pn)
        pn = 1;
    _filtertdatas = [];
    for (var i = 0; i < _feedBackDatas.length; ++i) {
        if (_feedBackDatas[i].parentFeedback == undefined) {
            _filtertdatas.push(_feedBackDatas[i])
        }
    }
    var total = _filtertdatas.length;
    var offset = _ps * (pn - 1);
    var r = []
    var count = 0;
    if (total < _ps) {
        count = total;
    } else {
        count = offset + _ps
    }
    for (var j = offset; j < count; ++j) {
        r.push(_filtertdatas[j])
    }
    genericRender(r, pn, total, currentKind)
}
function genericRender(datas, pn, total, kind) {
    var containerId;
    var pageId;
//    var goPageType;
    switch (kind) {
        case 1:
            containerId = 'suggestion-tbody'
            pageId = 'pagicontainer1'
            break
        case 2:
            containerId = 'suggestionTwo-tbody'
            pageId = 'pagicontainer2'
            break
        case 3:
            containerId = 'suggestionThree-tbody'
            pageId = 'pagicontainer3'
            break
        default:
            break
    }
    var container = document.getElementById(containerId)
    container.innerHTML = '';
    var count = datas.length
    var template = g.getTemplate('suggestion-tr')
    for (var i = 0; i < count; ++i) {
        feedbackId = datas[i].id;
        container.appendChild(g.dataToElement(datas[i], template))
    }
    g.renderPageNavigator(pageId, _ps, pn, total, goPageType);
    $('.btn-rowdelete').click(delRow);
    $('.btn-checkReply').click(checkReply);
}

function goPageType(pn) {
    _pn = pn;
    var total = _filtertdatas.length;
    var offset = _ps * (pn - 1);
    var r = []
    for (var i = offset; i < offset + _ps; ++i) {
        if (i >= total) {
            break
        }
        r.push(_filtertdatas[i])
    }
    genericRender(r, pn, total, currentKind);
}
function checkReply(evt) {
    var id = evt.target.attributes['rowid'].value;
    window.location.replace('suggestion-feedBack-detail.html?id=' + id);
}
function delRow(evt) {
    var id = evt.target.attributes['rowid'].value;
    if (!window.confirm('你确定要删除吗？')) {
        return;
    }
    g.deleteData('/api/users/1/feedbacks/' + id, function (data) {
        if (data.state == 200) {
            genericLoadData(currentKind);
        }
    })
}
