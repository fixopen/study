window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        getModule();
        g.importFooter();
    });
},false);
function getModule() {
    var id = g.user.getLoginId();
    var url = "/api/users/" + id + "/privileges";
    g.getData(url, function (result) {
        if (result.state == 200) {
            renderPrivileges(result.data);
        }
    })
}
var backIndexId;
function renderPrivileges(data) {
    var wholeBody = document.getElementById('whole-body');
    wholeBody.innerHTML = '';
    var count = data.length;
    var template = g.getTemplate('inner-body');
//    var innerBody=document.getElementById('p');
    for (var i = 0; i < count; i++) {
        if (data[i].kind == 0) {
            backIndexId = data[i].id;
            wholeBody.appendChild(g.dataToElement(data[i], template))
        } else {
            var innerBody = document.getElementById(backIndexId);
            var templateModule = g.getTemplate("system");
            innerBody.appendChild(g.dataToElement(data[i], templateModule))
        }
    }
}

//function onLoad(evt) {
//    var systemFunctions = [
//        {
//            "img": "../images/role.png",
//            "title": "角色管理",
//            'href': 'role/role-manage.html'
//        },
//        {
//            "img": "../images/user.png",
//            "title": "用户管理",
//            'href': 'user/users-manage.html'
//        },
//        {
//            "img": "../images/CMIS.png",
//            "title": "同步CMIS",
//            'href': '#'
//        },
//        {
//            "img": "../images/logManage.png",
//            "title": "日志管理",
//            "href": "log/log-manage.html"
//        },
//        {
//            "img": "../images/systemManage.png",
//            "title": "系统设置管理",
//            "href": "system/system-manage.html"
//        }
//    ]
//    var systemContainer = document.getElementById('sysManage')
//    var count = systemFunctions.length
//    var template = g.getTemplate('system')
//    for (var i = 0; i < count; ++i) {
//        systemContainer.appendChild(g.dataToElement(systemFunctions[i], template))
//    }
//    var metadata = [
//
//        {
//            "img": "../images/schema.png",
//            "title": "资源类型管理",
//            "href": "resKind/resKind-manage.html"
//        },
//        {
//            "img": "../images/stage.png",//需要替换图片../images/study_grade.png
//            "title": "学段管理",
//            "href": "studySection/studySection-manage.html"
//        },
//        {
//            "img": "../images/area.png",
//            "title": "区域管理",
//            'href': 'area/area-manage.html'
//        },
//        {
//            "img": "../images/school.png",//需要替换图片../images/study_school.png
//            "title": "学校管理",
//            "href": "schoolManage/school-manage.html"
//        },
////        {
////            "img": "../images/grade.png",//需要替换图片../images/study_class.png
////            "title": "年级管理",
////            "href": "grade-manage.html"
////        },
////        {
////            "img": "../images/class.png",//需要替换图片../images/study_class.png
////            "title": "班级管理",
////            "href": "class-manage.html"
////        },
////        {
////            "img": "../images/classMate.png",//需要替换图片../images/study_student.png
////            "title": "学生管理",
////            "href": "student-manage.html"
////        },
//        {
//            "img": "../images/study_year.png",
//            "title": "学年学期管理",
//            "href": "schoolYear/schoolYear-manage.html"
//        },
//        {
//            "img": "../images/subject.png",
//            "title": "学科管理",
//            "href": "subject/subject-manage.html"
//        },
//        {
//            "img": "../images/version.png",
//            "title": "教材版本管理",
//            'href': 'version/version-manage.html'
//        },
//        {
//            "img": "../images/catalogue.png",
//            "title": "教材管理",
//            'href': 'book/catalogue-manage.html'
//        }
//    ]
//    var metadataContainer = document.getElementById('metadataManage')
//    var count = metadata.length
//    var template = g.getTemplate('system')
//    for (var i = 0; i < count; ++i) {
//        metadataContainer.appendChild(g.dataToElement(metadata[i], template))
//    }
//
//
//    var operationManage = [
//        {
//            "img": "../images/activity.png",
//            "title": "活动管理",
//            "href": "http://bjct.net.cn/learn/control/actcontrol/actcontrolIndex.htm"
//        },
//        {
//            "img": "../images/learningCommunity.png",
//            "title": "学习社区管理",
//            "href": "http://bjct.net.cn/learn/adminindex.jsp?"
//        },
//        {
//            "img": "../images/classRoom.png",
//            "title": "班级空间管理",
//            "href": "http://bjct.net.cn/learn/control/trecontrol/trecontrolIndex.htm"
//        },
//        {
//            "img": "../images/questionnaireManage.png",
//            "title": "问卷调查管理",
//            "href": "	http://bjct.net.cn/learn/publicSpace/publicSpaceIndex.htm"
//        },
//        {
//            "img": "../images/news.png",
//            "title": "新闻管理",
//            "href": "news/news-manage.html"
//        },
//        {
//            "img": "../images/feedBack.png",
//            "title": "意见反馈管理",
//            "href": "suggestion/suggestion-manage.html"
//        },
//        {
//            "img": "../images/notice.png",
//            "title": "通知公告",
//            "href": "notice/notice-manage.html"
//        },
//        {
//            "img": "../images/forumManage.png",
//            "title": "板块管理",
//            "href": "forum/forum-manage.html"
//        },
//        {
//            "img": "../images/resImage.png",
//            "title": "首页热门资源管理",
//            "href": "hotResImg/hotResImg-manage.html"
//        },
//        {
//            "img": "../images/bbsImage.png",
//            "title": "首页学习社区管理",
//            "href": "studyImg/studyImg-manage.html"
//        },
//        {
//            "img": "../images/newsImage.png",
//            "title": "首页新闻管理",
//            "href": "newsImg/newsImg-manage.html"
//        },
//        {
//            "img": "../images/bannerManage.png",
//            "title": "首页banner管理",
//            "href": "bannerImg/bannerImg-manage.html"
//        },
//        {
//            "img": "../images/questionImg.png",
//            "title": "首页问卷调查管理",
//            "href": "questionImg/questionImg-manage.html"
//        },
//        {
//            "img": "../images/linkManage.png",
//            "title": "友情链接管理",
//            "href": "linkImg/linkImg-manage.html"
//        }
//    ]
//    var operContainer = document.getElementById('operationManage')
//    var count = operationManage.length
//    var template = g.getTemplate('system')
//    for (var i = 0; i < count; ++i) {
//        operContainer.appendChild(g.dataToElement(operationManage[i], template))
//    }
//
//    var resManage = [
//        {
//            "img": "../images/resManage.png",
//            "title": "资源管理",
//            "href": "resourceManage/resource-manage.html"
//        },
//        {
//            "img": "../images/res_load.png",
//            "title": "资源上传",
//            "href": "resourceManage/create-resource.html"
//        },
//        {
//            "img": "../images/res_check.png",
//            "title": "资源审核",
//            "href": "resourceManage/resource-audit.html"
//
//        }
//        ,
//        {
//            "img": "../images/appraise.png",
//            "title": "资源评价",
//            "href": "resourceEvaluate/resource-evaluate-manage.html"
//        },
//        {
//            "img": "../images/inform.png",
//            "title": "资源举报",
//            "href": "resourceReport/resource-report-manage.html"
//        },
//        {
//            "img": "../images/resourceSearch.png",
//            "title": "资源检索",
//            "href": "resourceSearch/resource-search-manage.html"
//        }
//    ]
//    var resContainer = document.getElementById('resManage')
//    var count = resManage.length
//    var template = g.getTemplate('system')
//    for (var i = 0; i < count; ++i) {
//        resContainer.appendChild(g.dataToElement(resManage[i], template))
//    }
//}