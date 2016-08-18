var rolePrivilegeInfo = {
    "roleId": 0,
    "privileges": [],
    "rolePrivileges": [],
    "loadData": function (roleId) {
        rolePrivilegeInfo.roleId = roleId
        var privilegeUrl = '/api/roles/privileges'
        g.getData(privilegeUrl, function (r) {
            if (r.state == 200) {
                rolePrivilegeInfo.privileges = r.data
            }
        })
        var url = '/api/roles/' + rolePrivilegeInfo.roleId + '/privileges'
        g.getData(url, function (u) {
            if (u.state == 200) {
                rolePrivilegeInfo.rolePrivileges = u.data
            }
        })
    },
    "render": function () {
        var container = document.getElementById('privileges')
        container.innerHTML = ''
        var template = g.getTemplate('privilegeInfo')
        var count = rolePrivilegeInfo.privileges.length
        for (var i = 0; i < count; ++i) {
            var item = g.dataToElement(rolePrivilegeInfo.privileges[i], template)
            var rolePrivilegeCount = rolePrivilegeInfo.rolePrivileges.length
            for (var j = 0; j < rolePrivilegeCount; ++j) {
                if (rolePrivilegeInfo.privileges[i].id == rolePrivilegeInfo.rolePrivileges[j].id) {
                    item.children[2].textContent = '是'
                }
            }
            $(item).find('.btn-grant').on('click', function (e) {
                var self = e.target
                var privilegeId = self.attributes['data-privilegeid'].value
                var toggle = item.children[2]
                if (toggle.textContent != '是') {
                    g.postData('/api/roles/' + rolePrivilegeInfo.roleId + '/privileges', {"privilegeId": privilegeId}, function (data) {
                        if (data.state == 201) {
                            toggle.textContent = '是'
                        }
                    })
                }
            })
            $(item).find('.btn-revoke').on('click', function (e) {
                var self = e.target
                var privilegeId = self.attributes['data-privilegeid'].value
                var toggle = item.children[2]
                if (toggle.textContent == '是') {
                    g.deleteData('/api/roles/' + rolePrivilegeInfo.roleId + '/privileges/' + privilegeId, function (data) {
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
        rolePrivilegeInfo.loadData(g.getUrlParameter('roleId'))
        rolePrivilegeInfo.render()
    });
}, false)
