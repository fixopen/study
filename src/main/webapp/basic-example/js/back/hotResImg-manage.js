//类型
g.types = new g.Part('typeContainer', 'type-template', '/api/resources/types', function (type, index, params) {
    if (type.describe) {
        if (type.describe.length > 70) {
            type.describe = type.describe.slice(0, 70) + '...'
        }
    }
    return type
}, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams),

g.hotResources = new g.GenericProcessor({
    data: '/api/decorates?filter=' + encodeURIComponent(JSON.stringify({"kind": 1})),
    renderScenes: [
        {
            container: 'electronicTeachingMaterialContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 1) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'courseWareContainer',
            template: 'hotResource-col3-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 2) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'smallCourseContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 3) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingGameContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 4) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingCaseContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 5) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'activityCaseContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 6) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingToolContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 7) {
                        result = true
                    }
                    return result
                }
            }
        },
        {
            container: 'teachingMatterContainer',
            template: 'hotResource-col2-template',
            range: {
                predicate: function (data) {
                    var result = false
                    if (data.urlAddr == 8) {
                        result = true
                    }
                    return result
                }
            }
        }
    ],
    renderPreprocess: function (element, index, params) {
        element.querySelector('.btn-rowedit').addEventListener('click', function (event) {
            var id = event.target.attributes['rowid'].value;
            location.replace('create-hotresimg.html?id=' + id)
        })
        element.querySelector('.btn-rowdelete').addEventListener('click', function (event) {
            if (confirm('你确定要删除吗？')) {
                var id = event.target.attributes['rowid'].value;
                var deleteRow = function (event) {
                    var a = event.target.parentNode.parentNode.parentNode;
                    var p = a.parentNode
                    p.removeChild(a)
                }
                g.deleteData('/api/decorates/' + id, function (d) {
                    if (d.state == 200) {
                        var url = '/api/resources/' + g.hotResources.data.find({id: id})[0].targetId
                        g.getData(url, function (r1) {
                            if (r1.state == 200) {
                                r1.data.recommend = 0
                                g.patchData(url, r1.data, function (r2) {
                                    if (r2.state == 200 || r2.state == 201) {
                                        deleteRow(event);
                                        alert("删除成功");
                                    }
                                })
                            }else{
                                deleteRow(event);
                                alert("删除成功");
                            }
                        })

                    }
                })
            }
        })
        return element
    }
})
g.bindEvents = function(){
    $('#btnNew').click(function(){
        window.location.href = 'create-hotresimg.html'
        }
    )
}
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        g.types.loadData();
        g.hotResources.load()
        g.hotResources.render(0)
        g.hotResources.render(1)
        g.hotResources.render(2)
        g.hotResources.render(3)
        g.hotResources.render(4)
        g.hotResources.render(5)
        g.hotResources.render(6)
        g.hotResources.render(7)
        g.bindEvents();
    });
}, false)
