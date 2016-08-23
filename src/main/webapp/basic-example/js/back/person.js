window.addEventListener('load', function (evt) {

    var loginname = getLoginName();
    var ps = 6;
    var pn = getUrlParameter('pn');
    if (!pn)
        pn = 1;
    var books = resources.find({author: loginname});
    var tp = Math.ceil(books.length / ps);


    var message_contents = [
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        },
        {
            "title": "某人加我为好友",
            "time": "2014-05-04 08:40:05"
        }
    ]

    var messageContainer = document.getElementById('message-tbody')
    var count = message_contents.length
    var template = getTemplate('message-tr')
    for (var i = 0; i < count; ++i) {
        messageContainer.appendChild(dataToElement(message_contents[i], template))
    }


    var userInfo = {
        "photo": "../images/1234567.png",
        "href": "update_person.html",
        "name": loginname,
        "score": 473,
        "totalMakeRes": 8,
        "likeRes": 3,
        "CountFriends": 8,
        "starLevel": generateStarLevel(3.5, "../"),
        "description": "我是一个对社会有用的女汉子！<br />我喜欢读书，喜欢学习，希望可以和大家成为朋友。<br />谢谢!",
        "space": "../spaces/笑笑",
        "sexPronoun": "她"
    }

    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(dataToElement(userInfo, getTemplate('person-info')))
    function getResTotalByName() {
        var ulId = document.getElementById('pagicontainer').getElementsByTagName('li').length
        return ulId
    }

    var bookContainer = document.getElementById('books')
    var template = getTemplate('resource')
    for (var i = (pn - 1) * ps; i < Math.min(books.length, pn * ps); ++i) {
        var resource = books[i];
        var href = '../resource-detail.html?id=' + resource.id;
        resource.href = href;
        var re = dataToElement(resource, template);
        var photo = $(re).find('img');
        photo.attr('src', '../' + photo.attr('src'));
        bookContainer.appendChild(re)
    }
    var pagecontainer = document.getElementById('pagicontainer')
    pagecontainer.innerHTML = '';
    var firstpagitemplate = getTemplate('firstpagili');
    var lastpagitemplate = getTemplate('lastpagili');
    var pagitemplate = getTemplate('pagili');
    var href = "person.html?pn=1&tp=" + tp;
    var ele = dataToElement({ href: href }, firstpagitemplate);
    pagecontainer.appendChild(ele)
    for (var i = 1; i <= tp; i++) {
        href = "person.html?pn=" + i + "&tp=" + tp;
        var data = {
            pn: i,
            href: href
        };
        ele = dataToElement(data, pagitemplate);
        if (i == pn)
            ele.className = 'active';
        pagecontainer.appendChild(ele)
    }
    href = "person.html?pn=" + tp + "&tp=" + tp;
    ele = dataToElement({ href: href }, lastpagitemplate);
    pagecontainer.appendChild(ele)


    var myLike = [
        {
            "name": "有理数与整式加减",
            "photo": "../images/27.jpg",
            "author": "赵阳"
        },
        {
            "name": "开花和结果",
            "photo": "../images/28.jpg",
            "author": "王冠"
        }
    ]

    var likeContainer = document.getElementById('myLike')
    var count = myLike.length
    var template = getTemplate('resource')
    for (var i = 0; i < count; ++i) {
        likeContainer.appendChild(dataToElement(myLike[i], template))
    }


    var recommend = [
        {
            "name": "英语",
            "photo": "../images/11.jpg",
            "author": "王泽宁"
        },
        {
            "name": "乌鸦喝水",
            "photo": "../images/14.jpg",
            "author": "晓晓"
        }
        ,
        {
            "name": "大数的认识",
            "photo": "../images/17.jpg",
            "author": "晓离"
        }
    ]

    var recommendContainer = document.getElementById('recommend')
    var count = recommend.length
    var template = getTemplate('resource')
    for (var i = 0; i < count; ++i) {
        recommendContainer.appendChild(dataToElement(recommend[i], template))
    }


    var quesContent = [
        //<!--我的提问-->
        {"titleContent": "我的提问内容1",
            "time": "2014-05-20"},
        {"titleContent": "我的提问内容2",
            "time": "2014-05-20"},
        {"titleContent": "我的提问内容3",
            "time": "2014-05-20"}
    ]
    var quesContainer = document.getElementById('question-tbody')
    var count = quesContent.length
    var template = getTemplate('othermessage-tr')
    for (var i = 0; i < count; ++i) {
        quesContainer.appendChild(dataToElement(quesContent[i], template))
    }

    var noticeContent = [
        //<!--我的提问-->
        {"titleContent": "通知内容1",
            "time": "2014-05-18"},
        {"titleContent": "通知内容2",
            "time": "2014-05-22"},
        {"titleContent": "通知内容3",
            "time": "2014-05-29"}
    ]
    var noticeContainer = document.getElementById('notice-tbody')
    var count = noticeContent.length
    var template = getTemplate('othermessage-tr')
    for (var i = 0; i < count; ++i) {
        noticeContainer.appendChild(dataToElement(noticeContent[i], template))
    }

    var discuss = [
        {"titleContent": "评论内容1",
            "time": "2014-05-08"},
        {"titleContent": "评论内容2",
            "time": "2014-05-06"},
        {"titleContent": "评论内容3",
            "time": "2014-05-25"}
    ]
    var discussContainer = document.getElementById('discuss-tbody')
    var count = discuss.length
    var template = getTemplate('othermessage-tr')
    for (var i = 0; i < count; ++i) {
        discussContainer.appendChild(dataToElement(discuss[i], template))
    }


    var friendMessage = [
        //<!--好友管理-->
        {"photo": "../images/friend.jpg",
            "friendName": "晓晓",
            "href": "#",
            "friendMessage": "我上传了一本书，获得了大家好评，很开心",
            "time": "11:11"
        },
        {"photo": "../images/friend.jpg",
            "friendName": "晓晓",
            "href": "#",
            "friendMessage": "我上传了一本书，获得了大家好评，很开心",
            "time": "11:11"
        }
    ]
    var friendContainer = document.getElementById('friendMessage')
    var count = friendMessage.length
    var template = getTemplate('friendMessage')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(friendMessage[i], template))
    }


    /*var friendTrends=[<!--好友动态-->
     {"myContent":"笑笑上传了资源：世界杯观后感"},
     {"myContent":"小燕子分享了日志<学习英语我在行"},
     {"myContent":"晓晓上传了日志<初中作文突破口"}
     ]
     var friendTrContainer=document.getElementById('friendTrends')
     var count=friendTrends.length
     var template = getTemplate('allUL')
     for(var i=0;i<count;++i){
     friendTrContainer.appendChild(dataToElement(friendTrends[i],template))
     }*/


}, false)