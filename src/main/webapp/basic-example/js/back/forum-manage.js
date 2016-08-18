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

var plateInfo = {
    "total": 0,
    "pageSize": 6,
    "currentPage": 1,
    "currentUser": 0,
    "plates": [],
    "loadData": function (pageNo) {
        plateInfo.currentPage = pageNo
        //var queryString = ''
        //var textQuery = document.getElementById("txtQuery").value
        //if (textQuery != '') {
        //    queryString += 'filter=' + encodeURIComponent(JSON.stringify({"caption": textQuery}))
        //}
        var statsUrl = '/api/plates/statistics/count'
        g.getData(statsUrl/* + '?' + queryString*/, function (s) {
            if (s.state == 200) {
                plateInfo.total = s.data
                var offset = plateInfo.pageSize * (plateInfo.currentPage - 1)
                //if (queryString != '') {
                //    queryString += '&'
                //}
                queryString = 'offset=' + offset + '&count=' + plateInfo.pageSize
                var url = '/api/plates'
                g.getData(url + '?' + queryString, function (u) {
                    if (u.state == 200) {
                        plateInfo.plates = u.data
                    }
                })
            }
        })
    },
    "render": function () {
        var container = document.getElementById('plates')
        container.innerHTML = ''
        var template = g.getTemplate('plate')
        var count = plateInfo.plates.length
        for (var i = 0; i < count; ++i) {
            container.appendChild(g.dataToElement(plateInfo.plates[i], template))
        }

        renderPageIndex('pagicontainer', plateInfo.pageSize, plateInfo.currentPage, plateInfo.total, function (pageNo) {
            plateInfo.loadData(pageNo)
            plateInfo.render()
        })

        $('.btn-edit').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('forum-edit.html?id=' + id)
        }) //编辑
        $('.btn-delete').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            g.deleteData('/api/plates/' + id, function (data) {
                if (data.state == 200) {
                    alert('板块删除成功')
                    plateInfo.loadData(plateInfo.currentPage)
                    plateInfo.render()
                }
            })
        }) //删除
    }
}

window.addEventListener('load', function (evt) {
    //$('#btnQuery').on('click', function(event) {
    //    plateInfo.loadData(plateInfo.currentPage)
    //    plateInfo.render()
    //})
    g.backstageHeadAndCheckUser(function(){
        $('#btnNew').on('click', function (event) {
            window.location.href = 'forum-edit.html'
        })
        plateInfo.loadData(plateInfo.currentPage)
        plateInfo.render()
    });
}, false)
