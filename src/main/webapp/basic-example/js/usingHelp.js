var _ps = 5;
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        click();
//    render();
        g.importFooter();
    });
}, false)
var currentMenuItem, currentContent
function click(){
    var config = [
        {'menuId': 'introduce', 'contentId': 'introduceContent'},
        {'menuId': 'browse', 'contentId': 'browseContent'},
        {'menuId': 'question', 'contentId': 'questionContent'},
        {'menuId': 'our', 'contentId': 'ourContent'}
    ]
    config.forEach(function(data,index){
        document.getElementById(data.menuId).addEventListener('click',function(){
            if (currentContent) {
                currentContent.style.display = 'none'
            }
            currentMenuItem = document.getElementById(data.menuId)
            currentContent = document.getElementById(data.contentId)
            currentContent.style.display='block'
        })
    })
    document.getElementById(config[0].menuId).dispatchEvent(new Event('click'))
}
//输出 
function render(evt) {
    renderProblem();
}
//输出分页
function goPage(pn) {
    renderProblem(pn);
}
//输出资源说明
function renderProblem(pn) {
    if (!pn)
        pn = 1;
    var commonProblems = getProblem(pn);
    var commonProblemsContainer = document.getElementById('commonProblems')
    commonProblemsContainer.innerHTML = '';
    var count = commonProblems.datas.length
    var template = g.getTemplate('commonProblems')
    for (var i = 0; i < count; ++i) {
        commonProblemsContainer.appendChild(g.dataToElement(commonProblems.datas[i], template))
    }
    g.renderPageNavigator('pagicontainer', _ps, pn, commonProblems.total, goPage);
}
//获得资源说明

function getProblem(pn) {
    var commonProblems = [
        {"id": 1,
            "problemsNum": "1",
            "problem": " 课程教材资源网站都包括哪些教材？",
            "answer": "包括中小学全部课程的电子教材及教学案例，供下载学习。"
        },
        {"id": 2,
            "problemsNum": "2",
            "problem": "什么是电子教材？",
            "answer": "电子教材是指以京版教材为蓝本数字化开发的数字教材。包括基本型、媒体型、互动型三大类。"
        },
        {"id": 3,
            "problemsNum": "3",
            "problem": "网站从哪里可以注册账号？",
            "answer": "目前不需要注册，每人使用北京教育信息中心统一用户登录账号进行登录。"
        },
        {"id": 4,
            "problemsNum": "4",
            "problem": "在网站下载教材是否需要缴费呢？",
            "answer": "教材资源网站所有资源针对北京教师都是免费下载的。"
        },
        {"id": 5,
            "problemsNum": "5",
            "problem": "如何在网站搜索教材资源？",
            "answer": "可通过网站每个页面下的检索框进行搜索，支持关键词模糊搜索和全拼搜索。"
        },
        {"id": 6,
            "problemsNum": "6",
            "problem": "在学习社区中提问的问题都是什么人在回答呢？",
            "answer": "都是各个学校的老师及学生自愿回答的。"
        },
        {"id": 7,
            "problemsNum": "7",
            "problem": "怎么才能在网站上面找到自己的班级同学和老师吗？",
            "answer": "通过班级空间就能找到老师及同学了。"
        },
        {"id": 8,
            "problemsNum": "8",
            "problem": "班级活动是只能同学参与吗？",
            "answer": "不，班级活动教师和自己的班级学生都可以参与。"
        },
        {"id": 9,
            "problemsNum": "9",
            "problem": "如何建立兴趣小组？",
            "answer": "进入学习社区，点击创建小组，即可根据需求创建自己的兴趣小组，提交审核，审核通过后可进行交流。"
        },
        {"id": 10,
            "problemsNum": "10",
            "problem": "如何在网站获取到积分？",
            "answer": "每日登陆、资源共享、下载、收藏资源及参与评论都可获得积分。"
        }
    ]
    var datas = commonProblems;
    var total = datas.length;
    var resultData = [];
    for (var i = (pn - 1) * _ps; i < Math.min(datas.length, pn * _ps); i++) {
        resultData.push(datas[i]);
    }
    return {total: total, datas: resultData};
}