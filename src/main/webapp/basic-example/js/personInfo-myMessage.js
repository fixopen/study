function renderPageIndex(id, pageSize, currentPage, total, handler) {
    var pageIndexContainer = document.getElementById(id)
    pageIndexContainer.innerHTML = ''

    var firstItemTemplate = $('<li class="firstpagili"><a href="javascript:void(0)" pn="1">&laquo;</a></li>')[0]
    var firstItem = g.dataToElement({}, firstItemTemplate);
    pageIndexContainer.appendChild(firstItem)

    var itemTemplate = $('<li class="pagili"><a href="javascript:void(0)" pn="${pn}">${pn}</a></li>')[0]
    var totalPage = Math.ceil(total / pageSize)
    var beginPageNo = 1
    if (currentPage > 5) {
        if (currentPage > totalPage - 5) {
            beginPageNo = totalPage - 10
        } else {
            beginPageNo = currentPage - 5
        }
    }
    if (beginPageNo < 1) {
        beginPageNo = 1
    }
    var endPageNo = beginPageNo + 9
    for (var i = beginPageNo; i <= Math.min(endPageNo, totalPage); ++i) {
        var data = {
            pn: i
        }
        var item = g.dataToElement(data, itemTemplate)
        if (i == currentPage) {
            item.className = 'active'
        }
        pageIndexContainer.appendChild(item)
    }

    var lastItemTemplate = $('<li class="lastpagili"><a href="javascript:void(0)" pn="${pn}">&raquo;</a></li>')[0]
    var lastItem = g.dataToElement({ pn: totalPage }, lastItemTemplate)
    pageIndexContainer.appendChild(lastItem)

    $(pageIndexContainer).find('a').on('click', function (e) {
        var pn = e.target.attributes['pn'].value
        handler(pn)
    })
}

var noticeAndMessage = {
    "currentType": "systemNotice",
    "data": [
        {
            "total": 0,
            "pageSize": 3,
            "isDirty": true,
            "currentPage": 1,
            "statsUrl": function(userId) {return '/api/users/' + userId + '/notices/statistics/count'},
            "loadUrl": function(userId) {return '/api/users/' + userId + '/notices'},
            "containerId": "systemNoticeContainer",
            "templateId": "message-template",
            "pagerId": "systemNoticePager",
            "filter": {isRead: false},
            "current": 0,
            "noticeAndMessageData": []
        },
        {
            "total": 0,
            "pageSize": 3,
            "isDirty": true,
            "currentPage": 1,
            "statsUrl": function(userId) {return '/api/users/' + userId + '/messages/statistics/count?filter=' + encodeURIComponent(JSON.stringify({"receiverId": userId}))},
            "loadUrl": function(userId) {return '/api/users/' + userId + '/messages'},
            "containerId": "userMessageContainer",
            "templateId": "message-template",
            "pagerId": "userMessagePager",
            "filter": {receiverId: g.user.currentUser.id},
            "current": 0,
            "noticeAndMessageData": []
        }
    ],
    "getConfigure": function (type) {
        var od = null
        switch (type) {
            case 'systemNotice':
                od = noticeAndMessage.data[0]
                noticeAndMessage.currentType = 'systemNotice'
                break
            case 'userMessage':
                od = noticeAndMessage.data[1]
                noticeAndMessage.currentType = 'userMessage'
                break
            default:
                break
        }
        return od
    },
    "loadData": function (type, pageNo) {
        var od = noticeAndMessage.getConfigure(noticeAndMessage.currentType)
        if (od == null) {
            return
        }
        od.currentPage = pageNo
        if (od.isDirty) {
            var statsUrl = od.statsUrl(g.user.currentUser.id);
            g.getData(statsUrl, function (s) {
                if (s.state == 200) {
                    od.total = s.data
                    od.isDirty = false
                }
            })
        }
        var offset = od.pageSize * (od.currentPage - 1)
        var filter = 'filter=' + encodeURIComponent(JSON.stringify(od.filter)) + '&offset=' + offset + '&count=' + od.pageSize
        var url = od.loadUrl(g.user.currentUser.id);
        g.getData(url + '?' + filter, function (u) {
            if (u.state == 200) {
                od.noticeAndMessageData = u.data
            }
        })
    },
    "render": function () {
        var od = noticeAndMessage.getConfigure(noticeAndMessage.currentType)
        if (od == null) {
            return
        }
        var container = document.getElementById(od.containerId)
        container.innerHTML = ''
        var template = g.getTemplate(od.templateId)
        var count = od.noticeAndMessageData.length
        for (var i = 0; i < count; ++i) {
            var data =od.noticeAndMessageData[i]
            if(od.containerId == 'systemNoticeContainer'){
                data.messageType = "系统消息"
            } else if(od.containerId == 'userMessageContainer'){
                data.messageType = "个人消息"
            }
            var item = g.dataToElement(data, template)
            item.querySelector('.btn-rowDel').addEventListener('click', function (event) {
                if (window.confirm('你确定要删除吗？')) {
                    var id = event.target.attributes['rowid'].value;
                    var od = noticeAndMessage.getConfigure(noticeAndMessage.currentType)
                    if (od == null) {
                        return
                    }
                    var loadUrl = od.loadUrl(g.user.currentUser.id);
                    g.deleteData(loadUrl+ '/' + id, function (data) {
                        if (data.state == 200) {
                            alert('删除成功')
                            var pn=od.currentPage
                            noticeAndMessage.loadData(noticeAndMessage.currentType, pn)
                            noticeAndMessage.render()
                        }
                    })
                }
            }, false) //删除
            container.appendChild(item)
        }

        renderPageIndex(od.pagerId, od.pageSize, od.currentPage, od.total, function (pageNo) {
            noticeAndMessage.loadData(noticeAndMessage.currentType, pageNo)
            noticeAndMessage.render()
        })
    },
    "run": function (type) {
        if (type) {
            noticeAndMessage.currentType = type
        }
        var od = noticeAndMessage.getConfigure(noticeAndMessage.currentType)
        if (od == null) {
            return
        }
        noticeAndMessage.loadData(noticeAndMessage.currentType, od.currentPage)
        noticeAndMessage.render()
    }
//    "parseRef": function (data, self) {
//        var result = self
//        if (self.$ref) {
//            var ref = self.$ref
//            if (ref[0] == '$') {
//                ref = ref.substr(1)
//                var d = data
//                var state = 'dot'
//                while (ref.length > 0) {
//                    switch (ref[0]) {
//                        case '.':
//                            ref = ref.substr(1)
//                            var nextTokenPos = 0
//                            var propName = ''
//                            var nextTokenPos = ref.indexOf('.')
//                            if (nextTokenPos == -1) {
//                                var nextTokenPos = ref.indexOf('[')
//                                if (nextTokenPos == -1) {
//                                    d = d[ref]
//                                    ref = ''
//                                } else {
//                                    state = 'index'
//                                }
//                            }
//                            if (nextTokenPos != -1) {
//                                propName = ref.substring(0, nextTokenPos)
//                                d = d[propName]
//                                ref = ref.substr(nextTokenPos + 1)
//                            }
//                            break
//                        case '[':
//                            state = 'index'
//                            break
//                        default:
//                            break
//                    }
//                }
//                var parts = ref.split('.')
//                for (var i = 0, c = parts.length; i < c; ++i) {
//                    if (parts[i][0] == '[' && parts[i][parts[i].length - 1] == ']') {
//                        d = d[parseInt(parts[i].substr(1, parts[i].length - 2))]
//                    } else {
//                        d = d[parts[i]]
//                    }
//                }
//                result = d
//            }
//        }
//        return result
//    }
}
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.importPersonInfoTop(g.user.currentUser.id);
        noticeAndMessage.data[1].filter = {"receiverId": g.user.currentUser.id}
        g.importPersonInfoLeft();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            noticeAndMessage.run(e.target.attributes['data-type'].value)
        })
        noticeAndMessage.run('systemNotice')
        g.importFooter();
    });
}, false)

