var userPrivilegeInfo = {
    "userId": 0,
    "privileges": [],
    "userPrivileges": [],
    "loadData": function (userId) {
        userPrivilegeInfo.userId = userId
        var privilegeUrl = '/api/users/privileges'
        g.getData(privilegeUrl, function (r) {
            if (r.state == 200) {
                userPrivilegeInfo.privileges = r.data
            }
        })
        var url = '/api/users/' + userPrivilegeInfo.userId + '/privileges'
        g.getData(url, function (u) {
            if (u.state == 200) {
                userPrivilegeInfo.userPrivileges = u.data
            }
        })
    },
    "render": function () {
        var container = document.getElementById('privileges')
        container.innerHTML = ''
        var template = g.getTemplate('privilegeInfo')
        var count = userPrivilegeInfo.privileges.length
        for (var i = 0; i < count; ++i) {
            var item = g.dataToElement(userPrivilegeInfo.privileges[i], template)
            var userRoleCount = userPrivilegeInfo.userPrivileges.length
            for (var j = 0; j < userRoleCount; ++j) {
                if (userPrivilegeInfo.privileges[i].id == userPrivilegeInfo.userPrivileges[j].id) {
                    item.children[2].textContent = '是'
                }
            }
            $(item).find('.btn-grant').on('click', function (event) {
                var self = event.target
                var privilegeId = self.attributes['data-privilegeid'].value
                var toggle = item.children[2]
                if (toggle.textContent != '是') {
                    g.postData('/api/users/' + userPrivilegeInfo.userId + '/privileges', {"privilegeId": privilegeId}, function (data) {
                        if (data.state == 201) {
                            toggle.textContent = '是'
                        }
                    })
                }
            })
            $(item).find('.btn-revoke').on('click', function (event) {
                var self = event.target
                var privilegeId = self.attributes['data-privilegeid'].value
                var toggle = item.children[2]
                if (toggle.textContent == '是') {
                    g.deleteData('/api/users/' + userPrivilegeInfo.userId + '/privileges/' + privilegeId, function (data) {
                        if (data.state == 200) {
                            toggle.textContent = ''
                        }
                    })
                }
            })
            container.appendChild(item)
        }
    }
}

window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        userPrivilegeInfo.loadData(g.getUrlParameter('id'))
        userPrivilegeInfo.render()
    });
}, false)
