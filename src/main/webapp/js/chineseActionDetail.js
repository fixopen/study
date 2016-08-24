/**
 * Created by Administrator on 2016/8/23.
 */
window.addEventListener('load', function (e) {
    let g = {
        title: "活动公告 | 三味学堂",
        sections: {id: 1, imgsrc: 'img/1.png', title: '语文活动公告名称', introduce: '这是简介这是简介这是简介这是简介这是简介这是简介'},
        readLikes:{readCount:1,likeCount:1},
        messages:[
            {id: 1,imgsrc:'img/1.png', msgName: 'xxx', msgValue:'这是简介这是简介这是简介这是简介这是简介这是简介',msgTime:'昨天'},
            {id: 2,imgsrc:'img/1.png', msgName: 'xxx',msgValue:'这是简介这是简介这是简介这是简介这是简介这是简介',msgTime:'昨天'}
        ]
    }

    g.bind = function (element, data) {
        element.innerHTML = element.innerHTML.replace('%7B', '{').replace('%7D', '}').replace(/\$\{(\w+)\}/g, function (all, letiable) {
            if (!letiable) {
                return ""
            }
            // let parts = letiable.split('.');
            // for (let i = 0; i < parts.length; i++) {
            //     if (data)
            //         data = data[parts[i]];
            //     else {
            //         data = '';
            //         break
            //     }
            // }
            // return data;
            return data[letiable];
        });
        return element
    };
//chineseActionDetail-title
    let title = document.getElementById('title-template');
    let atitle = document.getElementById('chineseActionDetail-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    atitle.appendChild(vtitle);


//chineseActionDetail-section
    let section = document.getElementById('section-template');
    let asection = document.getElementById('chineseActionDetail-section');
    let vsection = section.content.children[0].cloneNode(true);
    g.bind(vsection, g.sections);
    asection.appendChild(vsection);

//chineseActionDetail-readLike
    let readLike = document.getElementById('readLike-template');
    let areadLike = document.getElementById('chineseActionDetail-readLike');
    let vreadLike = readLike.content.children[0].cloneNode(true);
    g.bind(vreadLike, g.readLikes);
    areadLike.appendChild(vreadLike);


//msg-template
    let msg = document.getElementById('msg-template');
    let amsg = document.getElementById('chineseActionDetail-msg');
    for (let i = 0; i < g.messages.length; i++) {
        let vmsg = msg.content.children[0].cloneNode(true);
        g.bind(vmsg, g.messages[i]);
        amsg.appendChild(vmsg);
    }







// //chinese
//     $('#chinese').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });

}, false)

