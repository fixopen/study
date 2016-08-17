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
        item = g.dataToElement(data, itemTemplate)
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

var newsInfo = {
    "currentType": "normal", //controlled
    "data": [
        {
            "total": 0,
            "pageSize": 6,
            "isDirty": true,
            "currentPage": 1,
            "filter": {"rowState": 1},
            "containerId": "normalNews",
            "templateId": "passNews-tr",
            "pagerId": "normalNewsPager",
            "currentNews": 0,
            "news": []
        },
        {
            "total": 0,
            "pageSize": 6,
            "isDirty": true,
            "currentPage": 1,
            "filter": {"rowState": 0},
            "containerId": "controlledNews",
            "templateId": "noPassNews-tr",
            "pagerId": "controlledNewsPager",
            "currentNews": 0,
            "news": []
        }
    ],
    "getConfigure": function (type) {
        var od = null
        switch (type) {
            case 'normal':
                od = newsInfo.data[0]
                newsInfo.currentType = 'normal'
                break
            case 'controlled':
                od = newsInfo.data[1]
                newsInfo.currentType = 'controlled'
                break
            default:
                break
        }
        return od
    },
    "loadData": function (type, pageNo) {
        var od = newsInfo.getConfigure(newsInfo.currentType)
        if (od == null) {
            return
        }
        od.currentPage = pageNo
        var jsonFilter = {}
        jsonFilter = $.extend(jsonFilter, od.filter)
        var txtQuery = document.getElementById("txtQuery").value;
        if (txtQuery) {
            jsonFilter.caption = txtQuery
        }
        var queryString = 'filter=' + encodeURIComponent(JSON.stringify(jsonFilter))
        var statsUrl = '/api/news/statistics/count'
        g.getData(statsUrl + '?' + queryString, function (s) {
            $('#txtQuery').val('');
            if (s.state == 200) {
                od.total = s.data
                var offset = od.pageSize * (od.currentPage - 1)
                queryString += '&offset=' + offset + '&count=' + od.pageSize
                var url = '/api/news'
                g.getData(url + '?' + queryString, function (u) {
                    if (u.state == 200) {
                        od.news = u.data
                    }
                })
            }
        })
    },
    "render": function () {
        var od = newsInfo.getConfigure(newsInfo.currentType)
        if (od == null) {
            return
        }
        var container = document.getElementById(od.containerId)
        container.innerHTML = ''
        var template = g.getTemplate(od.templateId)
        var count = od.news.length
        for (var i = 0; i < count; ++i) {
            var item = g.dataToElement(od.news[i], template)
            container.appendChild(item)
        }

        renderPageIndex(od.pagerId, od.pageSize, od.currentPage, od.total, function (pageNo) {
            newsInfo.loadData(newsInfo.currentType, pageNo)
            newsInfo.render()
        })

        $('.btn-rowedit').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('create-news.html?id=' + id)
        }) //编辑
        $('.btn-rowselect').on('click', function (event) {
            var id = event.target.attributes['rowid'].value;
            window.location.replace('create-newsimg.html?targetid=' + id);
        }) //选择新闻

        $('.btn-rowdecorate').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('create-newsManage-newsimg.html?targetid=' + id)
        }) //配图
        $('.btn-rowdelete').on('click', function (event) {
            if (window.confirm('你确定要删除吗？')) {
                var id = event.target.attributes['rowid'].value;
                g.deleteData('/api/news/' + id, function (data) {
                    if (data.state == 200) {
                        alert('删除成功')
                        newsInfo.loadData(od.currentPage)
                        newsInfo.render()
                    }
                })
            }
        }) //删除
        $('.btn-rowpublish').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            g.patchData('/api/news/check/' + id, {"isPassed": true}, function (data) {
                if (data.state == 200) {
                    alert('新闻审核通过，已发布')
                    newsInfo.loadData(newsInfo.currentType, od.currentPage)
                    newsInfo.render()
                }
            })
        }) //审核通过
        $('.btn-rownopass').on('click', function (event) {
            var id = event.target.attributes['rowid'].value;
            g.patchData('/api/news/check/' + id, {"isPassed": false}, function (data) {
                if (data.state == 200) {
                    alert('新闻审核不通过')
                    newsInfo.loadData(newsInfo.currentType, od.currentPage)
                    newsInfo.render()
                }
            })
        }) //撤销发布
    },
    "run": function (type) {
        if (type) {
            newsInfo.currentType = type
        }
        var od = newsInfo.getConfigure(newsInfo.currentType)
        if (od == null) {
            return
        }
        newsInfo.loadData(newsInfo.currentType, od.currentPage)
        newsInfo.render()
    },
    "parseRef": function (data, self) {
        var result = self
        if (self.$ref) {
            var ref = self.$ref
            if (ref[0] == '$') {
                ref = ref.substr(1)
                var d = data
                var state = 'dot'
                while (ref.length > 0) {
                    switch (ref[0]) {
                        case '.':
                            ref = ref.substr(1)
                            var nextTokenPos = 0
                            var propName = ''
                            var nextTokenPos = ref.indexOf('.')
                            if (nextTokenPos == -1) {
                                var nextTokenPos = ref.indexOf('[')
                                if (nextTokenPos == -1) {
                                    d = d[ref]
                                    ref = ''
                                } else {
                                    state = 'index'
                                }
                            }
                            if (nextTokenPos != -1) {
                                propName = ref.substring(0, nextTokenPos)
                                d = d[propName]
                                ref = ref.substr(nextTokenPos + 1)
                            }
                            break
                        case '[':
                            state = 'index'
                            break
                        default:
                            break
                    }
                }
                var parts = ref.split('.')
                for (var i = 0, c = parts.length; i < c; ++i) {
                    if (parts[i][0] == '[' && parts[i][parts[i].length - 1] == ']') {
                        d = d[parseInt(parts[i].substr(1, parts[i].length - 2))]
                    } else {
                        d = d[parts[i]]
                    }
                }
                result = d
            }
        }
        return result
    }
}

window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        $('#btnNew').on('click', function (event) {
            window.location.href = 'create-news.html'
        })
        $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
            newsInfo.run(e.target.attributes['data-type'].value)
        })
        $('#btnQuery').on('click', function (event) {
            newsInfo.run()
        })
        newsInfo.run('normal')
    });
}, false)

