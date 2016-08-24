/**
 * Created by Administrator on 2016/8/22.
 */
window.addEventListener('load', function (e) {
    let g = {
        title: "奥数学习 | 三味学堂",
        // sections: [
        //     {id: 1, imgsrc: 'img/1.png', title: 'hhhh',readCount:2,likeCount:2},
        //     {id: 2, imgsrc: 'img/1.png', title: 'sdt',readCount:2,likeCount:2},
        //     {id: 3, imgsrc: 'img/1.png', title: 'xxxx',readCount:2,likeCount:2},
        //     {id: 4, imgsrc: 'img/1.png', title: 'jjjj',readCount:2,likeCount:2},
        //     {id: 5, imgsrc: 'img/1.png', title: 'ddds',readCount:2,likeCount:2},
        //     {id: 6, imgsrc: 'img/1.png', title: 'hhhh',readCount:2,likeCount:2},
        //     {id: 7, imgsrc: 'img/1.png', title: 'vccvcv',readCount:2,likeCount:2},
        //     {id: 8, imgsrc: 'img/1.png', title: 'ewr23',readCount:2,likeCount:2}
        // ],
        // follows: {id: 1,title1:'title1', imgsrc: 'img/1.png', title2:'这是简介',step1:'昨天',step2:'xxxx',step3:'ffff'}
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
//mathStudyDetail-title
    let title = document.getElementById('title-template');
    let atitle = document.getElementById('mathStudyDetail-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    vtitle.addEventListener('click', function (e) {
        elm.style()
    }, false)
    atitle.appendChild(vtitle);

//mathStudyDetail-introduce
    let introduce = document.getElementById('introduce-template');
    let aintroduce = document.getElementById('mathStudyDetail-introduce');
    let vintroduce = introduce.content.children[0].cloneNode(true);
    g.bind(vintroduce, g);
    vintroduce.addEventListener('click', function (e) {
        elm.style()
    }, false)
    aintroduce.appendChild(vintroduce);

//mathStudyDetail-explain
    let explain = document.getElementById('explain-template');
    let aexplain = document.getElementById('mathStudyDetail-explain');
    let vexplain = explain.content.children[0].cloneNode(true);
    g.bind(vexplain, g);
    vexplain.addEventListener('click', function (e) {
        elm.style()
    }, false)
    aexplain.appendChild(vexplain);


//mathStudyDetail-topic
    let topic = document.getElementById('topic-template');
    let atopic = document.getElementById('mathStudyDetail-topic');
    let vtopic = topic.content.children[0].cloneNode(true);
    g.bind(vtopic, g);
    vtopic.addEventListener('click', function (e) {
        elm.style()
    }, false)
    atopic.appendChild(vtopic);

//mathStudyDetail-practice
    let practice= document.getElementById('practice-template');
    let apractice = document.getElementById('mathStudyDetail-practice');
    let vpractice= practice.content.children[0].cloneNode(true);
    g.bind(vpractice, g);
    vpractice.addEventListener('click', function (e) {
        elm.style()
    }, false)
    apractice.appendChild(vpractice);

//mathStudyDetail-readLike
    let readLike = document.getElementById('readLike-template');
    let areadLike = document.getElementById('mathStudyDetail-readLike');
    let vreadLike = readLike.content.children[0].cloneNode(true);
    g.bind(vreadLike, g);
    vreadLike.addEventListener('click', function (e) {
        elm.style()
    }, false)
    areadLike.appendChild(vreadLike);

//mathStudyDetail-msg
    let msg = document.getElementById('msg-template');
    let amsg = document.getElementById('mathStudyDetail-msg');
    let vmsg = msg.content.children[0].cloneNode(true);
    g.bind(vmsg, g);
    vmsg.addEventListener('click', function (e) {
        elm.style()
    }, false)
    amsg.appendChild(vmsg);



// //chinese
//     $('#chinese').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });
}, false)
