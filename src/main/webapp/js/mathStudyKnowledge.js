/**
 * Created by Administrator on 2016/8/22.
 */
window.addEventListener('load', function (e) {
    let g = {
        title: "奥数学习 | 三味学堂",
        sections: [
            {id: 1, imgsrc: 'img/1.png', title: 'hhhh',readCount:2,likeCount:2},
            {id: 2, imgsrc: 'img/1.png', title: 'sdt',readCount:2,likeCount:2},
            {id: 3, imgsrc: 'img/1.png', title: 'xxxx',readCount:2,likeCount:2},
            {id: 4, imgsrc: 'img/1.png', title: 'jjjj',readCount:2,likeCount:2},
            {id: 5, imgsrc: 'img/1.png', title: 'ddds',readCount:2,likeCount:2},
            {id: 6, imgsrc: 'img/1.png', title: 'hhhh',readCount:2,likeCount:2},
            {id: 7, imgsrc: 'img/1.png', title: 'vccvcv',readCount:2,likeCount:2},
            {id: 8, imgsrc: 'img/1.png', title: 'ewr23',readCount:2,likeCount:2}
        ],
        follows: {id: 1,title1:'title1', imgsrc: 'img/1.png', title2:'这是简介',step1:'昨天',step2:'xxxx',step3:'ffff'}
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
//mathStudyKnowledge-title
    let title = document.getElementById('title-template');
    let atitle = document.getElementById('mathStudyKnowledge-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    vtitle.addEventListener('click', function (e) {
        elm.style()
    }, false)
    atitle.appendChild(vtitle);


//mathStudyKnowledge-section
    let section = document.getElementById('section-template');
    let asection = document.getElementById('mathStudyKnowledge-section');
    for (let i = 0; i < g.sections.length; i++) {
        let vsection = section.content.children[0].cloneNode(true);
        g.bind(vsection, g.sections[i]);
        asection.appendChild(vsection);
    }

//follow
    let follow = document.getElementById('follow-template');
    let afollow = document.getElementById('follow');
    let vfollow = follow.content.children[0].cloneNode(true);
    g.bind(vfollow, g.follows);
    afollow.appendChild(vfollow);




// //chinese
//     $('#chinese').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });
}, false)


