var _currentKind, _userId, _pn, _feedBackDatas;
var _ps = 4;
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents1(evt);
        query();
    });
}, false)
function query() {
    _userId = g.getCookie('uid');
    getFeedBackKind();
    genericLoadData();
}
function bindEvents1(evt) {
    $("#txtReply").keyup(replyChange);
    $("#btnReply").click(saveReply);
}

function genericLoadData(pn) {
    var kind = _currentKind;
    var filter = encodeURIComponent(JSON.stringify({"kind": kind}));
    url = '/api/users/' + _userId + '/feedbacks?filter=' + filter;
    g.getData(url, function (result) {
        if (result.state == 200) {
            _feedBackDatas = result.data;
            getFilterDatas();
        }
    });
}
//查询该评价的类型
function getFeedBackKind() {
    var feedId = g.getUrlParameter('id');
    var url = '/api/users/' + _userId + '/feedbacks/' + feedId;
    g.getData(url, function (result) {
        if (result.state == 200) {
            _currentKind = result.data.kind
            var container = document.getElementById('feedBackParent-con')
            container.innerHTML = "";
            if (result.data.parentFeedback == undefined) {
                var feedTemplate = g.getTemplate('feedBackParent-tr');
                result.data.sender = result.data.creator.userName
                result.data.avatarUri = result.data.creator.avatarUri
                var ele = g.dataToElement(result.data, feedTemplate);
                container.appendChild(ele);
            }
        }
    })
}
//传一个 id 根据id找parentId的数据
function getThreadByParentId(feedbacks, parentId) {
    function getItemsByParentId(result, feedbacks, parentId) {
        function sort(arr) {
            arr.sort(function (left, right) {
                var r = 0
                if (left.dateCreated > right.dateCreated) {
                    r = 1
                } else if (left.dateCreated < right.dateCreated) {
                    r = -1
                }
                return r
            })
        }

        var finded = []
        var feedbackCount = feedbacks.length
        for (var i = 0; i < feedbackCount; ++i) {
            var feedback = feedbacks[i]
            var feedbackParentId = 0
            if (feedback.parentFeedback) {
                if (feedback.parentFeedback.id) {
                    feedbackParentId = feedback.parentFeedback.id
                } else if (feedback.parentFeedback.$ref) {
                    var f = g.getJsonRefObject(feedbacks, feedback.parentFeedback.$ref)
                    if (f) {
                        feedbackParentId = f.id
                    }
                }
                if (feedbackParentId == parentId) {
                    finded.push(feedback)
                }
            }
        }

        sort(finded)
        var count = finded.length
        for (var i = 0; i < count; ++i) {
            result.push(finded[i])
            getItemsByParentId(result, feedbacks, finded[i].id)
        }
    }

    var result = []
    getItemsByParentId(result, feedbacks, parentId)
    return result
}

var _lastDataId;
var _filtertdatas;
//获取过滤完的数据
function getFilterDatas(pn) {
    if (!pn)
        pn = 1;
    var feedId = g.getUrlParameter('id');
    _filtertdatas = getThreadByParentId(_feedBackDatas, feedId)
    if (_filtertdatas.length == 0) {
        _lastDataId = g.getUrlParameter("id");
    } else {
        _lastDataId = _filtertdatas[_filtertdatas.length - 1].id
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
    for (var i = offset; i < count; ++i) {
        r.push(_filtertdatas[i])
    }
    render(r, total, pn)
}
//输出数据 分页
function render(datas, total, pn) {

    var feedContainer = document.getElementById('feedBack-con')
    feedContainer.innerHTML = "";
    for (var i = 0; i < datas.length; i++) {
        var creatorId = 0;
        var data = datas[i]
        if (data.creator) {
            if (data.creator.id) {
                creatorId = data.creator.id;
                data.sender = data.creator.userName
                data.avatarUri = data.creator.avatarUri
            } else if (data.creator.$ref) {
                var f = g.getJsonRefObject(_feedBackDatas, data.creator.$ref)
                if (f) {
                    creatorId = f.id
                    data.sender = f.userName
                    data.avatarUri = f.avatarUri
                }
            }
        }

        if (data.parentFeedback.$ref) {
            data.parentFeedback = g.getJsonRefObject(_feedBackDatas, data.parentFeedback.$ref);
        }
        data.parentId = data.parentFeedback.id;
        if (creatorId == _userId) {
            var feedTemplate = g.getTemplate('feedBack-tr');
            var termFeed = g.dataToElement(data, feedTemplate);
            feedContainer.appendChild(termFeed);
        } else {
            var replyTemplate = g.getTemplate('reply-tr');
            var termReply = g.dataToElement(data, replyTemplate);
            feedContainer.appendChild(termReply);
        }
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, total, goPage);
}

function goPage(pn) {
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
    render(r, total, pn);
}

//回复
function saveReply() {
    var feedback = {};
    var kind = _currentKind;
    feedback.caption = '';
    feedback.kind = kind;
    feedback.parentId = _lastDataId;
    feedback.content = $("#txtReply").val();
    if (!feedback.content) {
        alert('请输入回复内容');
        return;
    }
    var url = '/api/users/' + _userId + '/feedbacks';
    g.postData(url, feedback, function (result) {
        if (result.state == 200 || result.state == 201) {
            alert('您的回复已经提交！');
            $("#txtReply").val("")
            genericLoadData();
        }
    })
}
//回复
function replyChange() {
    var curLength = $("#txtReply").val().length;
    $("#reply-inputInfo").removeClass('red');
    if (curLength > 100) {
        var num = $("#txtReply").val().substr(0, 100);
        $("#txtReply").val(num);
        $("#reply-inputInfo").text("0");
        $("#reply-inputInfo").addClass('red');
    } else {
        $("#reply-inputInfo").text(100 - $("#txtReply").val().length);
    }
}
