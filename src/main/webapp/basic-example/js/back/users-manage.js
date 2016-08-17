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

var userInfo = {
    "total": 0,
    "isDirty": true,
    "pageSize": 6,
    "currentPage": 1,
    "currentUser": 0,
    "users": [],
    "loadData": function (pageNo) {
        userInfo.currentPage = pageNo;
        var jsonFilter = {}
        var hasFilter = false
        var txtQueryRealName = document.getElementById("txtQueryRealName").value;
        if (txtQueryRealName) {
            jsonFilter.realName = txtQueryRealName
            hasFilter = true
        }
        var txtQueryUserName = $('#txtQueryUserName').val();
        if (txtQueryUserName) {
            jsonFilter.userName = txtQueryUserName
            hasFilter = true
        }
        var userType = $('#userType').val();
        if (userType == 0) {
            hasFilter = true;
        } else {
            jsonFilter.userType = userType
            hasFilter = true
        }
        var filter = ''
        if (hasFilter) {
            filter = 'filter=' + encodeURIComponent(JSON.stringify(jsonFilter));
        }
        if (userInfo.isDirty) {
            var statsUrl = '/api/users/statistics/count'
            if (filter != '') {
                statsUrl += '?' + filter
            }
            g.getData(statsUrl, function (s) {
                if (s.state == 200) {
                    userInfo.total = s.data
                    userInfo.isDirty = false
                }
            })
        }
        var offset = userInfo.pageSize * (userInfo.currentPage - 1)
        if (filter != '') {
            filter += '&'
        }
        filter += 'offset=' + offset + '&count=' + userInfo.pageSize
        var url = '/api/users'
        g.getData(url + '?' + filter, function (u) {
            if (u.state == 200) {
                userInfo.users = u.data
            }
        })
    },
    "render": function () {
        var container = document.getElementById('users-tbody')
        container.innerHTML = ''
        var template = g.getTemplate('users-tr')
        var count = userInfo.users.length
        for (var i = 0; i < count; ++i) {
            if (userInfo.users[i].gender == -1) {
                userInfo.users[i].gender = "未定义"
            } else if (userInfo.users[i].gender == 1) {
                userInfo.users[i].gender = "男"
            } else if (userInfo.users[i].gender == 2) {
                userInfo.users[i].gender = "女"
            }
            if (userInfo.users[i].userType == 1) {
                userInfo.users[i].userType = "教职工"
            } else if (userInfo.users[i].userType == 2) {
                userInfo.users[i].userType = "学生"
            } else if (userInfo.users[i].userType == 3) {
                userInfo.users[i].userType = "家长"
            } else if (userInfo.users[i].userType == 4) {
                userInfo.users[i].userType = "其他"
            } else if (userInfo.users[i].userType == 910) {
                userInfo.users[i].userType = "运维人员"
            } else if (userInfo.users[i].userType == 990) {
                userInfo.users[i].userType = "管理员"
            } else if (userInfo.users[i].userType == 990) {
                userInfo.users[i].userType = "系统管理员"
            }
            if (userInfo.users[i].address == undefined) {
                userInfo.users[i].address = '';
            }
            if (userInfo.users[i].telephone == undefined) {
                userInfo.users[i].telephone = '';
            }
            container.appendChild(g.dataToElement(userInfo.users[i], template))
//            var item = dataToElement(userInfo.users[i], template)
//            container.appendChild(item)
        }

        renderPageIndex('pagicontainer', userInfo.pageSize, userInfo.currentPage, userInfo.total, function (pageNo) {
            userInfo.loadData(pageNo)
            userInfo.render()
        })
        $('.btn-rowEdit').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('create-users.html?id=' + id)
        }) //编辑
        $('.btn-rowUserRole').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('empower-userRole.html?id=' + id)
        }) //用户与角色管理
        $('.btn-rowUserEmpower').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            window.location.replace('empower.html?id=' + id)
        }) //用户设置权限
        $('.btn-rowDelete').on('click', function (event) {
            var id = event.target.attributes['rowid'].value
            var deleteRow = function () {
                var tr = event.target.parentNode.parentNode
                var tbody = tr.parentNode
                tbody.removeChild(tr)
                if (tbody.rows.length == 0) {
                    renderPageIndex('pagicontainer', userInfo.pageSize, 1, 0, function (pageNo) {
                        userInfo.loadData(pageNo)
                        userInfo.render()
                    })
                }
            }
            g.deleteData('/api/users/' + id, function (data) {
                if (data.state == 200) {
                    if (!window.confirm('你确定要删除吗？')) {
                        return;
                    }
                    deleteRow()
                    alert('用户删除成功')
                }
            })
        }) //删除
    }
}

window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        $('#btnQuery').on('click', function (event) {
            userInfo.isDirty = true
            userInfo.loadData(userInfo.currentPage)
            userInfo.render()
        })
        $('#btnNew').on('click', function (event) {
            window.location.href = 'create-users.html'
        })
        userInfo.loadData(userInfo.currentPage)
        userInfo.render()
    });
}, false)
