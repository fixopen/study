  /**
 * Created by fixopen on 28/1/15.
 */

g.E = function (config) {
    return new g.Part(config.containerId, config.templateId, config.uri, config.postData, config.dataParam, config.preElement, config.elementParam)
}

g.index = {
    ADs: new g.Part('bannerIndicatorContainer',
        'banner-indicator-template',
            '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({kind: 0})),
        g.nullPostReceiveData, g.nullDataParams,
        function (element, index, params) {
            element.setAttribute('data-slide-to', index)
            if (index == 0) {
                element.addClass('active')
            }
            return true
        }, g.nullElementParams, 'bannerContainer', 'banner-template'),

    recommendActivities: new g.Part('recommendActivityIndicatorContainer', 'recommendActivity-indicator-template', '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({kind: 2})),
        function (data, index, params) {
            if (data.describe) {
                if (data.describe.length > 110) {
                    data.describe = data.describe.slice(0, 110) + '......'
                }
            }
            return data
        }, g.nullDataParams, function (element, index, params) {
            element.setAttribute('data-slide-to', index)
            if (index == 0) {
                element.addClass('active')
            }
            return true
        }, g.nullElementParams, 'recommendActivityContainer', 'recommendActivity-template'),


    questions: new g.Part('questionContainer', 'question-template', '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({kind: 4})), g.nullPostReceiveData, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams),

    slideNews: new g.Part('slideNewsIndicatorContainer', 'slide-news-indicator-template', '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({kind: 3})), function (data, index, params) {
        data.href = 'news-detail.html?id=' + data.targetId
        return data
    }, g.nullDataParams, function (element, index, params) {
        element.setAttribute('data-slide-to', index)
        if (index == 0) {
            element.addClass('active')
        }
        return true
    }, g.nullElementParams, 'slideNewsContainer', 'slide-news-template'),

//    news: new g.Part('newsListContainer', 'news-template', '/api/news?filter='+encodeURIComponent(JSON.stringify({"rowState": 1})), function (news, index, params) {
//        news.href = 'news-detail.html?id=' + news.id
//        return news
//    }, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams),
    news:new g.GenericProcessor({
        data:'/api/news?filter='+encodeURIComponent(JSON.stringify({"rowState": 1})),
        dataPostprocess : function(data,index,prama){
        data.href = 'news-detail.html?id=' + data.id
        var dt = data.dateCreated.split(' ')
        data.dateCreated = dt[0]
        return data;
        },
        renderScenes: [{
            container: 'newsListContainer',
            template: 'news-template',
            range: {lowerBound: 0, upperBound: 9}}
        ]
    }),
    friendLinks: new g.Part('friendLinkContainer', 'friend-link-template', '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({kind: 9})), g.nullPostReceiveData, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams),
//热门资源

    //get decorates
//get resource if flag = 1
//enum decorate, targetId, find it at resource.id
    //resource.coverFile = decorate.imageFile
   recommendHotResources: new g.GenericProcessor({
       data:'/api/resources/specs/indexHotResourcesHtml?filter=' + encodeURIComponent(JSON.stringify({"recommend": 1}))
   }),

    hotResourcesState: {
        kind1: {total: 12, count: 0},
        kind2: {total: 8, count: 0},
        kind3: {total: 8, count: 0},
        kind4: {total: 12, count: 0},
        kind5: {total: 12, count: 0},
        kind6: {total: 12, count: 0},
        kind7: {total: 12, count: 0},
        kind8: {total: 12, count: 0}
    },
    hotResources: new g.GenericProcessor({
    data: '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({"kind": 1})),
    dataPostprocess: function(data, index, params) {
        var r = data
        var recommendHotResourcesData = g.index.recommendHotResources.data
;        for(var i=0;i<recommendHotResourcesData.length;i++){
            if(recommendHotResourcesData[i].id ==data.targetId ){
                r = recommendHotResourcesData[i];
                r.coverFile = data.imageFile
                var gt = g.parseGrade(r.gradeTerms)
                r.grade ='';
                for(var i =0;i<gt.length;++i){
                    var stage = gt[i].grade
                    switch (stage){
                        case "1" :
                            r.grade +="一年级"
                            break;
                        case "2" :
                            r.grade +="二年级"
                            break;
                        case "3" :
                            r.grade +="三年级"
                            break;
                        case "4" :
                            r.grade +="四年级"
                            break;
                        case "5" :
                            r.grade +="五年级"
                            break;
                        case "6" :
                            r.grade +="六年级"
                            break;
                        case "7" :
                            r.grade +="七年级"
                            break;
                        case "8" :
                            r.grade +="八年级"
                            break;
                        case "9" :
                            r.grade +="九年级"
                            break;
                        case "10" :
                            r.grade +="十年级"
                            break;
                        case "11" :
                            r.grade +="十一年级"
                            break;
                        case "12" :
                            r.grade +="十二年级"
                            break;
                        default:
                            break;
                    }
                }
                break;
            }
        }
        return r
    },
    renderScenes: [
        {
            container: 'electronicTeachingMaterialContainer',
            template: 'hotResource-col2-template',
            range: {
            predicate: function(data) {
                var result = false
                if (data.kind == 1) {
                    g.index.hotResourcesState.kind1.count++
                    if (g.index.hotResourcesState.kind1.count <= g.index.hotResourcesState.kind1.total) {
                        result = true
                    }
                }
                return result
            }
        }
        },
        {
            container: 'courseWareContainer',
            template: 'hotResource-col3-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 2) {
                        g.index.hotResourcesState.count++;
                        if(g.index.hotResourcesState.kind2.count <= g.index.hotResourcesState.kind1.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'smallCourseContainer',
            template: 'hotResource-col3-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 3) {
                        g.index.hotResourcesState.kind3.count++;
                        if(g.index.hotResourcesState.kind3.count <= g.index.hotResourcesState.kind3.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingGameContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if( data.kind == 4 ) {
                        g.index.hotResourcesState.kind4.count++;
                        if(g.index.hotResourcesState.kind4.count <= g.index.hotResourcesState.kind4.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingCaseContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 5) {
                        g.index.hotResourcesState.kind5.count++;
                        if(g.index.hotResourcesState.kind5.count <= g.index.hotResourcesState.kind5.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'activityCaseContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 6) {
                        g.index.hotResourcesState.kind6.count++;
                        if(g.index.hotResourcesState.kind6.count <= g.index.hotResourcesState.kind6.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingToolContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 7) {
                        g.index.hotResourcesState.kind7.count++;
                        if(g.index.hotResourcesState.kind7.count <= g.index.hotResourcesState.kind7.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingMatterContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function(data) {
                    var result = false
                    if (data.kind == 8) {
                        g.index.hotResourcesState.kind8.count++;
                        if(g.index.hotResourcesState.kind8.count <= g.index.hotResourcesState.kind8.total){
                            result = true
                        }
                    }
                    return result
                }
            }
        }
                     ]
        })
}

window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        document.getElementById('search').addEventListener('click', function (evt) {
            var searchText=$('#searchCap').val();
            window.location.href ="resource-index.html?caption="+searchText;
            $('#searchCap').val('')
        }, false);
        g.index.ADs.loadData()
        g.index.ADs.render()
        g.types.loadData();
        g.types.render()
        g.index.recommendHotResources.load()
        g.index.hotResources.load()
        g.index.hotResources.render(0)
        g.index.recommendActivities.loadData()
        g.index.recommendActivities.render()
        g.index.questions.loadData()
        g.index.questions.render()
        g.index.slideNews.loadData()
        g.index.slideNews.render()
        g.index.news.load()
        g.index.news.render()
        g.user.star.loadData()
        g.user.star.render()
        g.index.friendLinks.loadData()
        g.index.friendLinks.render()

        g.index.hotResources.render(1)
        g.index.hotResources.render(2)
        g.index.hotResources.render(3)
        g.index.hotResources.render(4)
        g.index.hotResources.render(5)
        g.index.hotResources.render(6)
        g.index.hotResources.render(7)

        g.importFooter();


    });
}, false)
