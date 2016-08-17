//类型
g.types = new g.Part('typeContainer', 'type-template', '/api/resources/types', function (type, index, params) {
    if (type.describe) {
        if (type.describe.length > 70) {
            type.describe = type.describe.slice(0, 70) + '...'
        }
    }
    return type
}, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams)

g.stages = new g.Part('stageContainer', 'stageTemplate', '/api/stages', function (stage, index, params) {
    stage.type = params.type
    return stage
}, {type: 'stage'}, function (element, index, params) {
    var result = true
    if (index > 5) {
        element.addClass('more')
        element.css('display', 'none')
        result = false
    }
    return result
}, g.nullElementParams)

g.subjects = new g.Part('subjectContainer', 'subjectTemplate', '/api/subjects', function (subject, index, params) {
    subject.type = params.type
    return subject
}, {type: 'subject'}, function (element, index, params) {
    var result = true
    if (index > 5) {
        element.addClass('more')
        element.css('display', 'none')
        result = false
    }
    return result
}, g.nullElementParams)

g.schemas = new g.Part('schemaContainer', 'schemaTemplate', '/api/schemas', function (schema, index, params) {
    schema.type = params.type
    return schema
}, {type: 'schema'}, function (element, index, params) {
    var result = true
    if (index > 5) {
        element.addClass('more')
        element.css('display', 'none')
        result = false
    }
    return result
}, g.nullElementParams)

g.editions = new g.Part('editionContainer', 'editionTemplate', '/api/editions', function (edition, index, params) {
    edition.type = params.type
    return edition
}, {type: 'edition'}, function (element, index, params) {
    var result = true
    if (index > 5) {
        element.addClass('more')
        element.css('display', 'none')
        result = false
    }
    element.querySelector('.saveButton').addEventListener('click', function (event) {
        //do anything
    }, false)
    return result
}, g.nullElementParams)
g._regions = null
g._terms = [
    {id: 1, caption: '上学期'},
    {id: 2, caption: '下学期'}
]
g._scopes = [
    {id: 1, caption: '国家课程'},
    {id: 2, caption: '地方课程'},
    {id: 3, caption: '校本课程'},
    {id: 9, caption: '其它'}
]

g.bindSelect = function (selectId, data) {
//    var a = $("<option value='" + '-1' + "'>" + '全部' + "</option>")
//    $('#' + selectId).append(a)
    var count = data.length
    for (var i = 0; i < count; ++i) {
        var s = data[i]
        var option = $("<option value='" + s.id + "'>" + s.caption + "</option>")
        $('#' + selectId).append(option)
    }
}

//年级
g.bindStageSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g.stages.data)
}

//学期
g.bindTermSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g._terms)
}

//学科
g.bindSubjectSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g.subjects.data)
}

//方案
g.bindSchemaSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g.schemas.data)
}

//版本
g.bindVersionSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g.editions.data)
}

//区域
g.bindRegionSelect = function (ctrlId) {
    g.bindSelect(ctrlId, g._regions)
}