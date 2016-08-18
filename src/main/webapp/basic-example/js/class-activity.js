window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.href;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }


    var datas = [
        {
            'id': 1,
            'name': '本周谁将会是用户之星呢?',
            'author': '谁是谁的谁',
            'select': '5689',
            'answer': '152',
            'type': '提问',
            'late': '徐方岩'
        },
        {
            'id': 2,
            'name': '本网站的调查问卷',
            'author': '七里香',
            'select': '4590',
            'answer': '687',
            'type': '调查问卷',
            'late': '姚思晨'
        },
        {
            'id': 3,
            'name': '本网站的调查问卷',
            'author': '七里香',
            'select': '4590',
            'answer': '687',
            'type': '调查问卷',
            'late': '姚思晨'
        },
        {
            'id': 4,
            'name': '本网站的调查问卷',
            'author': '七里香',
            'select': '4590',
            'answer': '687',
            'type': '调查问卷',
            'late': '姚思晨'
        }
    ];

    var container = document.getElementById('activity-tbody')
    container.innerHTML = '';
    var count = datas.length
    var template = getTemplate('activity-tr')
    for (var i = 0; i < count; ++i) {
        container.appendChild(dataToElement(datas[i], template))
    }

}, false)