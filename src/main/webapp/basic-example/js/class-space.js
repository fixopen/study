window.addEventListener('load', function (evt) {
    var onlineFriends = [
        <!--好友管理-->
        {"photo": "images/headImg7.jpg",
            "friendName": "金宇心"

        },
        {"photo": "images/headImg9.jpg",
            "friendName": "李可伟"

        },
        {"photo": "images/headImg2.jpg",
            "friendName": "赵小乐"

        },
        {"photo": "images/headImg10.jpg",
            "friendName": "任可欣"

        },
        {"photo": "images/headImg11.jpg",
            "friendName": "晓月"

        },
        {"photo": "images/headImg12.jpg",
            "friendName": "周齐"
        }
    ]
    var friendContainer = document.getElementById('onlineFriends')
    var count = onlineFriends.length
    var template = getTemplate('onlineFriends')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(onlineFriends[i], template))
    }


    var friendMessage = [
        <!--好友管理-->
        {"photo": "images/headImg8.jpg",
            "friendName": "杜如娟",
            "href": "#",
            "friendMessage": "永远记得看到人生美好的一面，看到自己幸运的一面，世上有很多人过着远不如你目前的生活。",
            "time": "11:11"
        },
        {"photo": "images/headImg9.jpg",
            "friendName": "李可伟",
            "href": "#",
            "friendMessage": "所有的胜利，与征服自己的胜利比起来，都是微不足道。所有的失败，与失去自己的失败比起来，更是微不足道。",
            "time": "11:11"
        },
        {"photo": "images/headImg10.jpg",
            "friendName": "晓晓",
            "href": "#",
            "friendMessage": "学会尊重他人，就是尊重自己；学会欣赏他人，就是欣赏自己；学会呵护他人，才是呵护自己；学会痛爱他人，就是痛爱自己。",
            "time": "11:11"
        }

    ]
    var friendContainer = document.getElementById('friendMessage')
    var count = friendMessage.length
    var template = getTemplate('friendMessage')
    for (var i = 0; i < count; ++i) {
        friendContainer.appendChild(dataToElement(friendMessage[i], template))
    }

}, false)