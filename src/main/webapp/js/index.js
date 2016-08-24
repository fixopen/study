window.addEventListener('load', function (e) {
    let g = {
        title: "三味学堂",
        time: "09:00",
        sections: [
            {id: 1, imgsrc: 'img/2.png', imgtitle: 'hhhh'},
            {id: 2, imgsrc: 'img/2.png', imgtitle: 'sdt'},
            {id: 3, imgsrc: 'img/2.png', imgtitle: 'xxxx'},
            {id: 4, imgsrc: 'img/2.png', imgtitle: 'jjjj'},

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
//index-title
    let title = document.getElementById('title-template');
    let ititle = document.getElementById('index-title');
    let vtitle = title.content.children[0].cloneNode(true);
    g.bind(vtitle, g);
    vtitle.addEventListener('click', function (e) {
        //
    }, false);
    ititle.appendChild(vtitle);

// index-time
    let time = document.getElementById('time-template');
    let itime = document.getElementById('index-time');
    let vtime = time.content.children[0].cloneNode(true);
    g.bind(vtime, g);
    itime.appendChild(vtime);

//index-section
//     let section = document.getElementById('section-template');


    let isection = document.getElementById('index-section');

    let imageAdTemplate = document.getElementById('image-ad');

    let imageAd = imageAdTemplate.content.children[0].cloneNode(true)
    g.bind(imageAd, g.sections[0]);
    isection.appendChild(imageAd);

    let subjectAdTemplate = document.getElementById('subject-ad')

    let chineseAd = subjectAdTemplate.content.children[0].cloneNode(true)
    g.bind(chineseAd, g.sections[1]);
    isection.appendChild(chineseAd);

    let mathAd = subjectAdTemplate.content.children[0].cloneNode(true)
    g.bind(mathAd, g.sections[2]);
    isection.appendChild(mathAd);
    
    let englishAd = subjectAdTemplate.content.children[0].cloneNode(true)
    g.bind(englishAd, g.sections[3]);
    isection.appendChild(englishAd);

    // let vsection = section.content.children[0].cloneNode(true);
    // g.bind(vsection, g.sections[0]);
    // isection.appendChild(vsection);
    // for (let i = 0; i < g.sections.length; i++) {
    //     let vsection = section.content.children[0].cloneNode(true);
    //     g.bind(vsection, g);
    //     isection.appendChild(vsection);
    // };

// index-footer
    let footer = document.getElementById('footer-template');
    let ifooter = document.getElementById('index-footer');
    let vfooter = footer.content.children[0].cloneNode(true);
    g.bind(vfooter, g);
    ifooter.appendChild(vfooter);

//user
    $('#user').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//liveLesson
    $('#liveLesson').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//chinese
    $('#chinese').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//math
    $('#math').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//english
    $('#english').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//youngClass
    $('#youngClass').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//cardNumbe
    $('#cardNumbe').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//accountNumbe
    $('#accountNumbe').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//myStudy
    $('#myStudy').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });
//imgs
    $('#img1').on("click", function (e) {
        window.open('http://www.baidu.com', '_self')
    });


}, false)
/**
 * Created by Administrator on 2016/8/18.
 */
