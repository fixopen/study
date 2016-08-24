/**
 * Created by Administrator on 2016/8/23.
 */
window.addEventListener('load', function (e) {
    let subjects = []
    // let followCount = 0

    $.get('api/subjects', function(ss) {
        subjects = ss
        for (let i = 0; i < subjects.length; ++i) {
            subjects[i].title = subjects[i].name + '学习|三味学堂'
            let filter = {
                subjectId: subjects[i].id,
                grade: 20
            }
            $.ajax({
                type: "get",
                url: 'api/volumes?filter=' + JSON.stringify(filter),
                dataType: 'json',
                async: false,
                success: function(vs) {
                    subjects[i].low = vs
                }
            })
            filter.grade = 21
            $.ajax({
                type: "get",
                url: 'api/volumes?filter=' + JSON.stringify(filter),
                dataType: 'json',
                async: false,
                success: function(vs) {
                    subjects[i].high = vs
                }
            })
        }
    })

    // $.get('api/follows', function(c) {
    //     followCount = c
    // })

    let g = {}

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
    g.bind(vtitle, subjects[0]);
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
        g.bind(vvolumes, subjects[0].low[i]);
        lvolumes.appendChild(vvolumes);
    }
    //hight
    let hvolumes = document.getElementById('chineseStudy-volumesH');
    for (let i = 0; i < g.volumesH.length; i++) {
        let vvolumes = volumes.content.children[0].cloneNode(true);
        g.bind(vvolumes, subjects[0].high[i]);
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
    //g.bind(vfollow, followCount);
    afollow.appendChild(vfollow);




// //chinese
//     $('#chinese').on("click", function (e) {
//         window.open('http://www.baidu.com', '_self')
//     });

}, false)
