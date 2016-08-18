window.addEventListener('load', function (evt) {
//    getADs();
    g.importFooter();
    $('#inputUsername').keydown(keyDown),
    $('#inputPassword').keydown(keyDown)
    var loginButton = document.getElementById('btnLogin')
    loginButton.addEventListener('click', function (evt) {
        login();
    }, false)
    // var cancelButton = document.getElementById('btnCancel')
    //    cancelButton.addEventListener('click', function (evt) {
    //        cancel();
    //    }, false)

}, false)

function keyDown(event) {
    var key_code = event.keyCode;
    if (key_code == 13) {
        login();
    }
}
//function cancel() {
//    $('#inputUsername').val('');
//    $('#inputPassword').val('');
//}
function login() {
    var loginName = $('#inputUsername').val();
    var pwd = $('#inputPassword').val();
    g.user.login(loginName,pwd);
}

//function ParseAjaxMessage(msg) {
//    if (!msg.match("^\{(.+:.+,*){1,}\}$")) {
//        return msg;
//    } else {
//        try {
//            var msgObj = $.parseJSON(msg);
//            return msgObj;
//        } catch (e) {
//            return msg;
//        }
//    }
//}

