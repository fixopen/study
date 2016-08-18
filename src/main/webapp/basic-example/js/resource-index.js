g.resourceIndex = {
    orderBy : [],
    condition: {},
    conditionElement: {},
    parseResourceCaption : function (data, datas) {
        data.typeCaption = g.resourceIndex.type.data.find({
            id: data.kind.toString()
        })[0].caption;
        if (data.subject.caption) {
            data.subjectCaption = data.subject.caption || '';
        } else if (data.subject.$ref) {
            data.subject = g.getJsonRefObject(datas, data.subject.$ref);
            data.subjectCaption = data.subject.caption || '';
        }
        if (data.uploader.userName) {
            data.ownerCaption = data.uploader.userName || '';
        } else if (data.uploader.$ref) {
            data.uploader = g.getJsonRefObject(datas, data.uploader.$ref);
            data.ownerCaption = data.uploader.userName || '';
        }
        data.dateCreated = data.timeUpload || '';
        data.versionCaption = data.textbookVersion.Caption || '';
        data.gradeTermCaption = g.resourceIndex.parseGradeCaption(data.gradeTerms);
    },
    parseGradeCaption :function (gradeTerm) {
        var gradeTermAry = g.parseGrade(gradeTerm)
        var caption = ''
        for (var i = 0; i < gradeTermAry.length; i++) {
            var item = gradeTermAry[i]
            if (item.grade) {
                var stage = g.resourceIndex.stage.data.find({id: item.grade})
                if (stage && stage.length > 0) {
                    caption += stage[0].caption
                }
            }
            if (item.term) {
                var term = g._terms.find({id: item.term})
                if (term && term.length > 0) {
                    caption += term[0].caption
                }
            }
            if (caption) {
                caption += ' '
            }
        }
        return caption
    },
    getMore: function () {
        g.resourceIndex.renderResourcesTotal();
        // 按时间 评分排序
//        if(g.resourceIndex.orderBy.length==0){
            var getDataUri = '/api/resources?filter=' + encodeURIComponent(JSON.stringify(g.resourceIndex.condition)) + '&offset=' + g.resourceIndex.offset + '&count=12'
//        }else{
//            var getDataUri = '/api/resources?filter=' + encodeURIComponent(JSON.stringify(g.resourceIndex.condition)) + '&offset=' + g.resourceIndex.offset + '&count=12&'+"orderBy="+""
//        }

        g.getData(getDataUri, function (result) {
            if (result.state == 200) {
                g.resourceIndex.offset += result.data.length
                var container = document.getElementById('book-container')
                var bookTemplate = g.getTemplate('resource-tpl')
                for (var i = 0; i < result.data.length; i++) {
                    g.resourceIndex.parseResourceCaption(result.data[i],result.data);
                    var href = 'resource-detail.html?id=' + result.data[i].id;
                    result.data[i].href = href;
                    if (true) {
                        var ele = g.dataToElement(result.data[i], bookTemplate)
                        container.appendChild(ele)
                    } else {
                        var ele = g.dataToElement(result.data[i], videoTemplate)
                        container.appendChild(ele)
                    }
                }
            }
        })
    },
    conditionProcess: function (catalog, data) {
        g.resourceIndex.offset = 0
        g.resourceIndex.condition[catalog] = data.id
        var container = document.getElementById('selected-Container')
        if (g.resourceIndex.conditionElement[catalog]) {
            container.removeChild(g.resourceIndex.conditionElement[catalog])
        }
        var template = g.getTemplate('selected-tpl');
        g.resourceIndex.conditionElement[catalog] = g.dataToElement(data, template);
        var remove = g.resourceIndex.conditionElement[catalog].querySelector('.glyphicon-remove')
        remove.addEventListener('click', function (e) {
            container.removeChild(g.resourceIndex.conditionElement[catalog])
            delete g.resourceIndex.condition[catalog]
            delete g.resourceIndex.conditionElement[catalog]
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        })
        container.appendChild(g.resourceIndex.conditionElement[catalog]);
        document.getElementById('book-container').innerHTML = '';
        g.resourceIndex.getMore()
    },
    selectAll :function(){
        document.getElementById('subject-Container').querySelector('span').addEventListener('click', function (evt) {
            document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['subject'])
            delete g.resourceIndex.condition['subject']
            delete g.resourceIndex.conditionElement['subject']
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        },false)
        document.getElementById('stage-Container').querySelector('span').addEventListener('click', function (evt) {
            document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['stage'])
            delete g.resourceIndex.condition['stage']
            delete g.resourceIndex.conditionElement['stage']
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        },false)
        document.getElementById('type-Container').querySelector('span').addEventListener('click', function (evt) {
            document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['type'])
            delete g.resourceIndex.condition['type']
            delete g.resourceIndex.conditionElement['type']
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        },false)
        document.getElementById('scope-Container').querySelector('span').addEventListener('click', function (evt) {
            document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['scope'])
            delete g.resourceIndex.condition['scope']
            delete g.resourceIndex.conditionElement['scope']
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        },false)
        document.getElementById('version-Container').querySelector('span').addEventListener('click', function (evt) {
            document.getElementById('selected-Container').removeChild(g.resourceIndex.conditionElement['version'])
            delete g.resourceIndex.condition['version']
            delete g.resourceIndex.conditionElement['version']
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML = '';
            g.resourceIndex.getMore()
        },false)
    },
    offset: 0,

    subject: new g.Part('subject-Container', 'condition-tpl', '/api/subjects', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "subject";
        return data;
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        var data = g.resourceIndex.subject.data[index]
        element.querySelector('span').addEventListener('click', function (evt) {
            g.resourceIndex.conditionProcess('subject', data)
        }, false);
        return result
    }, g.nullElementParams),

    stage: new g.Part('stage-Container', 'condition-tpl', '/api/stages', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "stage";
        return data;
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            g.resourceIndex.conditionProcess('stage', g.resourceIndex.stage.data[index])
        }, false);
        return result
    }, g.nullElementParams),

    type: new g.Part('type-Container', 'condition-tpl', '/api/resources/types', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "type";
        return data;
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            g.resourceIndex.conditionProcess('type', g.resourceIndex.type.data[index])
        }, false);
        return result
    }, g.nullElementParams),

    version: new g.Part('version-Container', 'condition-tpl', '/api/editions', function (data, index, params) {
        data.title = data.caption;
        data.catalog = "version";
        return data;
    }, g.nullDataParams, function (element, index, params) {
        var result = true
        element.querySelector('span').addEventListener('click', function (evt) {
            g.resourceIndex.conditionProcess('version', g.resourceIndex.version.data[index])
        }, false);
        return result
    }, g.nullElementParams),

    scopes: {
        render: function () {
            var container = document.getElementById('scope-Container')
            var template = g.getTemplate("condition-tpl")
            var data = g._scopes
            data.forEach(function (item, index) {
                item.title = item.caption;
                item.catalog = "scope";
                var element = g.dataToElement(item, template)
                container.appendChild(element)
                element.querySelector('span').addEventListener('click', function (e) {
                    g.resourceIndex.conditionProcess('scope', item)
                }, false)
            })
        }
    },
    total: 0,
    renderResourcesTotal: function () {
        g.getData('api/resources/statistics/count?filter=' + encodeURIComponent(JSON.stringify(g.resourceIndex.condition)), function (result) {
            if (result.state == 200) {
                document.getElementById('resourceTotal').innerHTML=''
                $("#resourceTotal").append(result.data);
                g.resourceIndex.total = result.data;
            }
        })
    }
}
window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        g.resourceIndex.subject.loadData();
        g.resourceIndex.subject.render();
        g.resourceIndex.stage.loadData();
        g.resourceIndex.stage.render();
        g.resourceIndex.type.loadData();
        g.resourceIndex.type.render();
        g.resourceIndex.scopes.render();
        g.resourceIndex.version.loadData();
        g.resourceIndex.version.render();
        if(g.getUrlParameter('type')!=null||g.getUrlParameter('caption')!=null){
            //首页搜索
            if(g.getUrlParameter('caption')!=null){
                var typeData= g.getUrlParameter('caption')
                $("#searchCap").val(typeData)
                g.resourceIndex.condition['caption']=typeData
                g.resourceIndex.getMore();
            }
            //首页八类资源
            if(g.getUrlParameter('type')!=null){
                var typeData= g.getUrlParameter('type')
                var data= g.resourceIndex.type.data
                for(var i=0;i< data.length;i++){
                    if(data[i].id==typeData){
                        g.resourceIndex.condition['type']=typeData
                        g.resourceIndex.conditionProcess('type', data[i])
                    }
                }
            }else{
                g.resourceIndex.getMore();
            }
        }else{
            g.resourceIndex.getMore();
        }
        document.getElementById('getMore').addEventListener('click', function (evt) {
            g.resourceIndex.getMore();
        }, false);
        //按照默认顺序搜索
        document.getElementById('normal').addEventListener('click', function (evt) {
            g.resourceIndex.offset = 0
            g.resourceIndex.condition={}
            g.resourceIndex.getMore();
        }, false);
        //按照评价最高加载书籍
        document.getElementById('highPreview').addEventListener('click', function (evt) {
            g.resourceIndex.offset = 0
            g.resourceIndex.getMore();
        }, false);
        //按照最新上传加载书籍
        document.getElementById('uploadTime').addEventListener('click', function (evt) {
            g.resourceIndex.offset = 0
            g.resourceIndex.getMore();
        }, false);
        //search
        document.getElementById('search').addEventListener('click', function (evt) {
            g.resourceIndex.offset = 0
            document.getElementById('book-container').innerHTML=''
            g.resourceIndex.condition['caption']=$('#searchCap').val()
            g.resourceIndex.getMore();
        }, false);
        g.resourceIndex.selectAll();
        g.importFooter()
    });
}, false)
