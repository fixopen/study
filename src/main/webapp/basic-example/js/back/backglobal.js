window.addEventListener('load', function (evt) {
    if (islogin()) {
        if ($('#login')) {
            getLoginName();
            if (_currentUser.userType != 900 && _currentUser.userType != 910 && _currentUser.userType != 990) {
                alert('请用系统管理员用户登陆!');
                var path = window.location.pathname;
                window.location.replace("/login.html?url=" + encodeURI(path));
            }
        }
    } else {
        var path = window.location.pathname;
        window.location.replace("/login.html?url=" + encodeURI(path));
    }
});
