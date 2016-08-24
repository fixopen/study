/**
 * Created by Administrator on 2016/8/23.
 */
window.addEventListener('load', function (e) {
    let g = {
        title: "活动公告 | 三味学堂",
        sections: [
            {id: 1, imgsrc: 'img/1.png', introduce:'这是简介这是简介这是简介这是简介这是简介这是简介',readCount:1,likeCount:1},
            {id: 2, imgsrc: 'img/1.png',introduce:'这是简介这是简介这是简介这是简介这是简介这是简介',readCount:1,likeCount:1},
            {id: 3, imgsrc: 'img/1.png',introduce:'这是简介这是简介这是简介这是简介这是简介这是简介',readCount:1,likeCount:1},
            {id: 4, imgsrc: 'img/1.png',introduce:'这是简介这是简介这是简介这是简介这是简介这是简介',readCount:1,likeCount:1},

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
//actionMath-title
    let title = document.getElementById('title-template');
    let atitle = document.getElementById('actionChinese-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    vtitle.addEventListener('click', function (e) {
        //
    }, false);
    atitle.appendChild(vtitle);


//actionChinese-section
    let section = document.getElementById('section-template');
    let asection = document.getElementById('actionChinese-section');
    for (let i = 0; i < g.sections.length; i++) {
        let vsection = section.content.children[0].cloneNode(true);
        g.bind(vsection, g.sections[i]);
        asection.appendChild(vsection);
    }






// //user
//     $('#user').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });
// //liveLesson
//     $('#liveLesson').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });
// //chinese
//     $('#chinese').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });

}, false)

