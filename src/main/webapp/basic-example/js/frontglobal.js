window.addEventListener('load', function (evt) {
    if (islogin()) {
        if ($('#login')) {
            getLoginName();
        }
    } else {
        var path = window.location.pathname;
        window.location.replace("/login.html?url=" + encodeURI(path));
    }
    $('.navbar-form').find('button').click(search);
});

