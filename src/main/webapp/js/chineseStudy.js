/**
 * Created by Administrator on 2016/8/23.
 */
window.addEventListener('load', function (e) {
    let g = {
        title: "语文学习 | 三味学堂",
        volumesL: [
            {id: 1, name: 'xiao', title: 'hhhh'},
            {id: 2, name: 'xiao', title: 'sdt'},
            {id: 3, name: 'xiao', title: 'xxxx'},
            {id: 4, name: 'xiao', title: 'jjjj'},
            {id: 5, name: 'xiao', title: 'ddds'},
            {id: 6, name: 'xiao', title: 'hhhh'},
            {id: 7, name: 'xiao', title: 'vccvcv'},
            {id: 8, name: 'xiao', title: 'ewr23'}
        ],
        volumesH: [
            {id: 1, name: 'hight', title: 'hhhh'},
            {id: 2, name: 'hight', title: 'sdt'},
            {id: 3, name: 'hight', title: 'xxxx'},
            {id: 4, name: 'hight', title: 'jjjj'},
            {id: 5, name: 'hight', title: 'ddds'},
            {id: 6, name: 'hight', title: 'hhhh'},
            {id: 7, name: 'hight', title: 'vccvcv'},
            {id: 8, name: 'hight', title: 'ewr23'}
        ],
        follows: {id: 1,title1:'title1', imgsrc: 'img/1.png', title2:'这是简介',step1:'昨天',step2:'xxxx',step3:'ffff'}
    }

    let data = {
        title: "",
        low: {
        },
        high: {
            volumes: []
        }
    }

    $.get('api/volumes', function(vs){
        data.low.volumes = vs
    })

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
//chineseStudy-title
    let title = document.getElementById('title-template');
    let atitle = document.getElementById('chineseStudy-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    vtitle.addEventListener('click', function (e) {
        elm.style()
    }, false)
    atitle.appendChild(vtitle);


//chineseStudy-volumes
    let volumes = document.getElementById('volumes-template');
    //low
    let lvolumes = document.getElementById('chineseStudy-volumesL');
    for (let i = 0; i < g.volumesL.length; i++) {
        let vvolumes = volumes.content.children[0].cloneNode(true);
        g.bind(vvolumes, g.volumesL[i]);
        lvolumes.appendChild(vvolumes);
    }
    //hight
    let hvolumes = document.getElementById('chineseStudy-volumesH');
    for (let i = 0; i < g.volumesH.length; i++) {
        let vvolumes = volumes.content.children[0].cloneNode(true);
        g.bind(vvolumes, g.volumesH[i]);
        hvolumes.appendChild(vvolumes);
    }
    
//low hight
    $('#low').click(function () {
        $('#chineseStudy-volumesL').show();
        $('#chineseStudy-volumesH').hide();

    })
    $('#hight').click(function () {
        $('#chineseStudy-volumesL').hide();
        $('#chineseStudy-volumesH').show();
    })

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
