var userRoleInfo = {
    "userId": 0,
    "roles": [],
    "userRoles": [],
    "loadData": function (userId) {
        userRoleInfo.userId = userId
        var roleUrl = '/api/roles'
        g.getData(roleUrl, function (r) {
            if (r.state == 200) {
                userRoleInfo.roles = r.data
            }
        })
        var url = '/api/users/' + userRoleInfo.userId + '/roles'
        g.getData(url, function (u) {
            if (u.state == 200) {
                userRoleInfo.userRoles = u.data
            }
        })
    },
    "render": function () {
        var container = document.getElementById('roles')
        container.innerHTML = ''
        var template = g.getTemplate('roleInfo')
        var count = userRoleInfo.roles.length
        for (var i = 0; i < count; ++i) {
            var item = g.dataToElement(userRoleInfo.roles[i], template)
            var userRoleCount = userRoleInfo.userRoles.length
            for (var j = 0; j < userRoleCount; ++j) {
                if (userRoleInfo.roles[i].id == userRoleInfo.userRoles[j].role.id) {
                    item.children[2].textContent = '是'
                }
            }
            container.appendChild(item)
        }
        $('.btn-grant').on('click', function (event) {
            var self = event.target
            var roleId = self.attributes['data-roleid'].value
            var toggle = self.parentNode.parentNode.children[2]
            if (toggle.textContent != '是') {
                g.postData('/api/users/' + userRoleInfo.userId + '/roles', {"roleId": roleId}, function (data) {
                    if (data.state == 201) {
                        toggle.textContent = '是'
                    }
                })
            }
        })
        $('.btn-revoke').on('click', function (event) {
            var self = event.target
            var roleId = self.attributes['data-roleid'].value
            var toggle = self.parentNode.parentNode.children[2]
            if (toggle.textContent == '是') {
                g.deleteData('/api/users/' + userRoleInfo.userId + '/roles/' + roleId, function (data) {
                    if (data.state == 200) {
                        toggle.textContent = ''
                    }
                })
            }
        })
    }
}

window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        userRoleInfo.loadData(g.getUrlParameter('id'))
        userRoleInfo.render()
    });
}, false)

