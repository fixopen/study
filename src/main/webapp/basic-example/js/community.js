window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }
    var topics = [
        {
            "name": "请不要忽视孩子的粗心毛病。",
            "photo": "images/community/1.jpg",
            "author": "知心姐姐",
            "date": "2014-07-16"
        },
        {
            "name": "要让孩子从小养成爱读书的好习惯。",
            "photo": "images/community/2.jpg",
            "author": "一鸣",
            "date": "2014-07-19"
        },
        {
            "name": "怎么才能让10到13岁的孩子多才多艺？",
            "photo": "images/community/3.jpg",
            "author": "李冰冰",
            "date": "2014-07-13"
        },
        {
            "name": "不要责骂孩子，要多一点关心",
            "photo": "images/community/5.jpg",
            "author": "馨心",
            "date": "2014-07-16"
        },
        {
            "name": "从小关爱儿童，做孩子的知心人",
            "photo": "images/community/6.jpg",
            "author": "奶奶",
            "date": "2014-07-06"
        }
    ];


    var topicsContainer = document.getElementById('topics-container')
    var count = topics.length
    var template = getTemplate('topics')
    for (var i = 0; i < count; ++i) {
        topicsContainer.appendChild(dataToElement(topics[i], template))
    }


    var activitysContainer = document.getElementById('activitys-container')
    count = activitys.length
    template = getTemplate('activitys')
    for (var i = 0; i < count; ++i) {
        activitysContainer.appendChild(dataToElement(activitys[i], template))
    }
}, false)