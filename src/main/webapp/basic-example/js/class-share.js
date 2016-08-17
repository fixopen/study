window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.href;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }


    var myShare = [
        <!--好友管理-->
        {"sharePhoto": "images/headImg13.jpg",
            "myName": "佚名",
            "shareCounts": "68"
        }
    ]
    var friendContainer = document.getElementById('myShare')
    var count = myShare.length
    var template = getTemplate('myShare')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(myShare[i], template))
    }


    var classShare = [
        <!--好友管理-->
        {"photo": "images/headImg17.jpg",
            "classMateName": "小宇",
            "shareTitle": "给你们",
            "description": "不要像玻璃那样脆弱。有的人眼睛总盯着自己，所以长不高看不远；总是喜欢怨天尤人，也使别人无比厌烦。没有苦中苦，哪来甜中甜？不要像玻璃那样脆弱，而应像水晶一样透明，太阳一样辉煌，腊梅一样坚强。既然睁开眼睛享受风的清凉，就不要埋怨风中细小的沙粒。",
            "time": "08月12日  11:11"
        },
        {"photo": "images/headImg3.jpg",
            "classMateName": "李可心",
            "shareTitle": "中华人民共和国教育部",
            "description": "http://www.moe.gov.cn",
            "time": "08月12日  13:14"
        },
        {"photo": "images/headImg4.jpg",
            "classMateName": "王可昕",
            "shareTitle": "脚踏实地",
            "description": "每个人都有每个人的做法，每个人都有每个人的想法，别人做什么，想什么，我们无法掌握，也无法控制。我们能做的，就是做好自己，管好自己，凭自己的本身，靠自己的良心，踏踏实实地做事，老老实地做人，即使遭遇不公，遭遇不平，也能想开，懂得包容，学会用宽容的心怀，善良的言行，对待身边所有的人。生活中的许多磨难，让我们理解了人情，理解了这个社会能给你的所有尊重，于艰难中，懂得了承受，懂得了坚定，慢慢挺起自己的灵魂。",
            "time": "08月12日  13:14"
        },
        {"photo": "images/headImg5.jpg",
            "classMateName": "吴宇林",
            "shareTitle": "脚踏实地",
            "description": "生活的精彩，不只是轰轰烈烈，更多的时候，安静是强大的力量。孤单不是与生俱来，而是由你爱上一个人时开始。不属于你的，不要拒绝放弃，那其实是一种胸襟与气度；与你有缘的，不要轻易放手，让自信和坚持成为一种品质和内涵。在意多了，乐趣就少了；看得淡了，一切也会释然。",
            "time": "08月12日  13:14"
        },
        {"photo": "images/headImg12.jpg",
            "classMateName": "李可",
            "shareTitle": "脚踏实地",
            "description": "善待身边每一个人，因为，是他们成就了你的人生。记恨别人，其实就是拿痛点来折磨自己，因为不敢在明处复仇，所以就在暗地里攻击，不知不觉间，把自己的人格弄的越来越扭曲，就变成了一个活生生的小人。简单是福，众生之苦，苦于繁忙。忙财富，忙名利，忙着争抢，忙于计较得失荣辱。争来抢去终是空。",
            "time": "08月12日  13:14"
        }

    ]
    var friendContainer = document.getElementById('classShare')
    var count = classShare.length
    var template = getTemplate('classShare')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(classShare[i], template))
    }

}, false)