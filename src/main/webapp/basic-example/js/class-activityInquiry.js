window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.href;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    bindEvents();
}, false)
function bindEvents() {
    $('#createInquiry').click(createInquiry);
}
function createInquiry() {
    window.location.href = 'class-create.html'
}
