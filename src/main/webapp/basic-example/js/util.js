Array.prototype.find = function (filter) {
    var result = []
    if (!filter) {
        return result
    }
    var c = this.length
    for (var i = 0; i < c; ++i) {
        var item = this[i]
        var isMatch = true
        for (var key in filter) {
            if (item[key] != filter[key]) {
                isMatch = false
                break
            }
        }
        if (isMatch) {
            result.push(item)
        }
    }
    return result;
}

HTMLElement.prototype.hasClass = function (className) {
    return this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

HTMLElement.prototype.addClass = function (className) {
    if (!this.hasClass(className)) {
        this.className += " " + className
    }
}

HTMLElement.prototype.removeClass = function (className) {
    if (this.hasClass(className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        this.className = this.className.replace(reg, ' ')
    }
}

if (!window.JSON) {
    var JSON = {
        parse: function (s) {
            return eval('(' + s + ')')
        },
        stringify: function (o) {
            function stringifyValue(v) {
                var result = ''
                switch (typeof v) {
                    case 'string':
                        result = '"' + v + '"'
                        break
                    case 'boolean':
                        result = v ? 'true' : 'false'
                        break
                    case 'number':
                        result = '' + v
                        break
                    case 'object':
                        if (v instanceof String) {
                            result = '"' + v + '"'
                        } else if (v instanceof Boolean) {
                            result = v ? 'true' : 'false'
                        } else if (v instanceof Number) {
                            result = '' + v
                        } else {
                            result = JSON.stringify(v)
                        }
                        break
                    case 'undefined':
                        result = 'undefined'
                        break
                    default:
                        break
                }
                return result
            }

            var result = ''
            switch (typeof o) {
                case 'undefined':
                    break
                case 'object':
                    if (Array.isArray(o)) {
                        result += '['
                        var count = o.length
                        for (var i = 0; i < count; ++i) {
                            result += stringifyValue(o[i]) + ', '
                        }
                        result = result.substr(0, result.length - 2)
                        result += ']'
                    } else {
                        result += '{'
                        for (var prop in o) {
                            result += '"' + prop + '": ' + stringifyValue(o[prop]) + ', '
                        }
                        result = result.substr(0, result.length - 2)
                        result += '}'
                    }
                    break
                case 'boolean':
                    break
                case 'number':
                    break
                case 'string':
                    break
                case 'function':
                    break
                default:
                    break
            }
            return result
        }
    }
}

$.fn.serializeJson = function () {
    var serializeObj = {}
    var array = this.serializeArray()
    var str = this.serialize()
    $(array).each(function () {
        if (serializeObj[this.name]) {
            if ($.isArray(serializeObj[this.name])) {
                serializeObj[this.name].push(this.value)
            } else {
                serializeObj[this.name] = [serializeObj[this.name], this.value]
            }
        } else {
            serializeObj[this.name] = this.value
        }
    })
    return serializeObj
}

var g = function () {
    //do nothing, only a name
}

g.getTemplate = function (type) {
    var result = null
    var t = document.getElementById('template')
    var r = t.getElementsByClassName(type)
    if (r.length > 0) {
        result = r[0]
    }
    return result
}

g.getData = function (url, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = null
            if (xhr.responseText[0] == '{') {
                result = JSON.parse(xhr.responseText)
            } else {
                result = xhr.responseText
            }
            postProcess(result)
        }
    }
    xhr.open("GET", url, false)
    xhr.send()
}

g.putData = function (url, data, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText)
            postProcess(result)
        }
    }
    xhr.open("PUT", url, false)
    xhr.send(JSON.stringify(data))
}

g.patchData = function (url, data, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText)
            postProcess(result)
        }
    }
    xhr.open("PATCH", url, false)
    xhr.send(JSON.stringify(data))
}

g.postData = function (url, data, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText)
            postProcess(result)
        }
    }
    xhr.open("POST", url, false)
    xhr.send(JSON.stringify(data))
}

g.deleteData = function (url, data, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText)
            if (!postProcess) {
                postProcess = data
            }
            postProcess(result)
        }
    }
    xhr.open("DELETE", url, false)
    xhr.send()
}

g.bind = function (element, data) {
    element.innerHTML = element.innerHTML.replace('%7B', '{').replace('%7D', '}').replace(/\$\{(\w+)\}/g, function (all, variable) {
        if (!variable) {
            return ""
        }
        // var parts = variable.split('.')
        // for (var i = 0, c = parts.length; i < c; ++i) {
        // 	if(data)
        // 		data = data[parts[i]]
        // 	else{
        // 		data=''
        // 		break
        // 	}
        // }
        // return data
        return data[variable];
    })
    return element
}

g.dataToElement = function (data, template) {
    var element = template.cloneNode(true)
    return g.bind(element, data)
}

g.generateStarLevel = function (value, prefix) {
    var result = ''
    var intLevel = 0
    for (var i = 0; i < value - 1; ++i) {
        result += '<img src="' + prefix + 'images/star.png" alt="" />'
        ++intLevel
    }
    if (intLevel < value) {
        result += '<img src="' + prefix + 'images/half-star.png" alt="" />'
    }
    return result
}

g.getUrlParameter = function (name) {
    var result = null
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) //匹配目标参数
    if (r != null) {
        result = decodeURI(r[2])
    }
    return result //返回参数值
}

g.setCookie = function (name, value, days) {
    if (!days) {
        days = 30
    }
    var exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    //document.cookie[document.cookie.length] = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString()
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString()
}

g.getCookie = function (cookieName) {
    var result = ''
    if (document.cookie.length > 0) {
        var cookieValues = document.cookie
        var cookieItems = cookieValues.split(';')
        var cookieCount = cookieItems.length
        for (var i = 0; i < cookieCount; ++i) {
            var cookieItem = cookieItems[i].replace(/(^\s*)|(\s*$)/g, '')
            var nameValuePair = cookieItem.split('=')
            if (nameValuePair.length == 2) {
                var name = nameValuePair[0]
                var value = nameValuePair[1]
                if (name == cookieName) {
                    result = decodeURIComponent(value)
                    break
                }
            }
        }
    }
    return result
}

//收藏资源
g.favoriteResource = function (id) {
    var data = {userId: g.getLoginId(), resourceId: id, kind: 2}
    g.postData('/api/users/' + g.getLoginId() + '/favorites', data, function (result) {
        alert('resource favorite')
    })
}

g.showSpinner = function (containerId) {
    var spinner = '<div class="message-loading-overlay"><span class=""><i class="icon-spin icon-spinner  bigger-160"></i>loading...</span></div>'
    //setTimeout("$('#"+containerId+"').append('" + spinner + "')", 1)
    $('#' + containerId).append(spinner)
}

g.hideSpinner = function (containerId) {
    $("#" + containerId + "").find('.message-loading-overlay').remove()
}

g.readFileContent = function (file) {
    var fileContent = null
    if (file.webkitSlice) {
        fileContent = file.webkitSlice(0, file.size, "application/octet-stream")
    } else if (file.mozSlice) {
        fileContent = file.mozSlice(0, file.size, "application/octet-stream")
    } else if (file.slice) {
        fileContent = file.slice(0, file.size, "application/octect-stream")
    } else {
        alert('browser not support')
    }
    var fileReader = new FileReader()
    fileReader.readAsBinaryString(fileContent)
    return fileContent
}

g.uploadFile = function (uri, fileType, content, postProcess) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText)
            postProcess(result)
        }
    }
    xhr.open("POST", uri, false)
    xhr.setRequestHeader("Content-Type", fileType)
    xhr.send(content)
}

g.uploadFiles = function (uri, files, postProcess) {
    var fileCount = files.length
    var result = []
    for (var i = 0; i < fileCount; i++) {
        var content = g.readFileContent(files[i])
        g.uploadFile(uri, files[i].type, content, function (r) {
            if (r.state == 200) {
                result.push(r)
            }
        })
    }
    postProcess(result)
}
//config: {data: dataOrApi,
// dataPostprocess: function(data, index, params){}, dataParams: {},
// renderScenes: [{container: c, template: t, range: {lowerBound: 0, upperBound: 6}}, ...],
// renderPreprocess: function(element, index, params){}, elementParams: {},
// collectProcess: function(data, elementInfos, params){}, collectParams: {},
// saveMethod: 'PATCH', saveUri: '', saveDoneProcess: function(stateData){}}
g.GenericProcessor = function (config) {
    if (this == window) {
        return new g.GenericProcessor(config)
    }
    this.data = config.data
    this.saveUri = ''
    this.load = function () {
        var saveData = function (r) {
            if (r.state <= 400) {
                this.data = r.data
            }
        }
        if (typeof this.data == 'string') {
            var uriLength = this.data.indexOf('?')
            if (uriLength == -1) {
                this.saveUri = this.data
            } else {
                this.saveUri = this.data.substr(0, uriLength)
            }
            g.getData(this.data, saveData.bind(this))
        }
        if (config.dataPostprocess) {
            if (Array.isArray(this.data)) {
                for (var i = 0, c = this.data.length; i < c; ++i) {
                    this.data[i] = config.dataPostprocess(this.data[i], i, config.dataParams)
                }
                //data.forEach(function(item, index) {
                //    item = config.dataPostprocess(item, index, config.dataParams)
                //})
            } else {
                this.data = [this.data]
                this.data[0] = config.dataPostprocess(this.data[0], 0, config.dataParams)
                this.data = this.data[0]
            }
        }
    }
    this.elementInfos = []
    this.render = function (index) {
        if (config.render) {
            config.render()
            return
        }
        var doc = document
        if (!index) {
            index = 0
        }
        var c = config.renderScenes.length
        if (index < c) {
            var scene = config.renderScenes[index]
            var container = scene.container
            if (typeof container == 'string') {
                container = doc.getElementById(container)
            }
            if (scene.template) {
                var template = scene.template
                if (typeof template == 'string') {
                    template = g.getTemplate(template)
                }
                this.elementInfos.push({container: container, template: template})
                var data = this.data
                var lowerBound = 0
                var upperBound = this.data.length
                if (scene.range) {
                    if (scene.range.lowerBound) {
                        lowerBound = scene.range.lowerBound > lowerBound ? scene.range.lowerBound : lowerBound
                    }
                    if (scene.range.upperBound) {
                        upperBound = scene.range.upperBound < upperBound ? scene.range.upperBound : upperBound
                    }
                    if (scene.range.predicate) {
                        data = []
                        //this.data.forEach(function(item, index) {
                        //    if (scene.range.predicate(item)) {
                        //        data.push(item)
                        //    }
                        //})
                        for (var i = 0, c = this.data.length; i < c; ++i) {
                            if (scene.range.predicate(this.data[i])) {
                                data.push(this.data[i])
                            }
                        }
                        lowerBound = 0
                        upperBound = data.length
                    }
                }
                for (var i = lowerBound; i < upperBound; ++i) {
                    var element = g.dataToElement(data[i], template)
                    if (config.renderPreprocess) {
                        element = config.renderPreprocess(element, i, config.elementParams)
                    }
                    if (element) {
                        container.appendChild(element)
                    }
                }
            } else {
                if (config.renderPreprocess) {
                    container = config.renderPreprocess(container, 0, config.elementParams)
                }
                var bindedContainer = g.bind(container, this.data)
                this.elementInfos.push({container: bindedContainer})
            }
        }
    }
    this.collectProcess = config.collectProcess
    this.collectParams = config.collectParams
    this.collect = function () {
        if (this.collectProcess) {
            this.collectProcess(this.data, this.elementInfos, this.collectParams)
        }
    }
    this.saveMethod = config.saveMethod || 'PATCH'
    if (config.saveUri) {
        this.saveUri = config.saveUri
    }
    this.saveDoneProcess = config.saveDoneProcess
    this.save = function () {
        var process = function (self, saveFunction, hasPostfix) {
            var postfix = ''
            if (Array.isArray(self.data)) {
                if (hasPostfix) {
                    postfix = '/' + self.data[i].id
                }
                var uri = self.saveUri + postfix
                self.data.forEach(function(item, index) {
                    saveFunction(uri, item, function(result) {
                        if (self.saveDoneProcess) {
                            self.saveDoneProcess(result)
                        }
                    })
                })
            } else {
                if (hasPostfix) {
                    postfix = '/' + self.data.id
                }
                var uri = self.saveUri + postfix
                saveFunction(uri, self.data, function (result) {
                    if (self.saveDoneProcess) {
                        self.saveDoneProcess(result)
                    }
                })
            }
        }
        switch (this.saveMethod) {
            case 'PATCH':
                process(this, g.patchData, true)
                break
            case 'PUT':
                process(this, g.putData, true)
                break
            case 'POST':
                process(this, g.postData, false)
                break
            case 'DELETE':
                process(this, g.deleteData, false)
                break
            default:
                break
        }
    }
}

g.Part = function (containerId, templateId, uri, postReceiveData, extraDataParams, preRenderElement, extraElementParams, secondContainerId, secondTemplateId) {
    this.data = []
    this.saveData = function (r) {
        if (r.state == 200) {
            this.data = r.data
            if (postReceiveData) {
                var count = this.data.length
                for (var i = 0; i < count; ++i) {
                    this.data[i] = postReceiveData(this.data[i], i, extraDataParams)
                }
            }
        }
    }
    this.loadData = function () {
        g.getData(uri, this.saveData.bind(this))
    }
    this.render = function () {
        var container = document.getElementById(containerId)
//        var templateC = document.querySelector('#' + templateId)
//        var template = templateC.content //g.getTemplate(templateId)
        var template = g.getTemplate(templateId)
        var secondConainer = null
        if (secondContainerId) {
            secondConainer = document.getElementById(secondContainerId)
        }
        var secondTemplate = null
        if (secondTemplateId) {
//            var secondTemplateC = document.querySelector('#' + secondTemplateId)
//            secondTemplate = secondTemplateC.content //g.getTemplate(secondTemplateId)
            secondTemplate = g.getTemplate(secondTemplateId)
        }
        var count = this.data.length
        for (var i = 0; i < count; ++i) {
            var element = g.dataToElement(this.data[i], template)
            var secondElement = null
            var pass = true
            var secondPass = true
            if (preRenderElement) {
                pass = preRenderElement(element, i, extraElementParams)
                if (secondConainer && secondTemplate && pass) {
                    secondElement = g.dataToElement(this.data[i], secondTemplate)
                    secondPass = preRenderElement(secondElement, i, extraElementParams)
                }
            }
            if (pass && secondPass) {
                container.appendChild(element)
                if (secondConainer) {
                    secondConainer.appendChild(secondElement)
                }
            }
        }
    }
}

g.nullPostReceiveData = function (data, index, params) {
    //do nothing
    return data
}

g.nullDataParams = {}

g.nullPreRenderElement = function (element, index, params) {
    //do nothing
    return true
}

g.nullElementParams = {}

//刷新系统名称 LOGO
g.getSystemItems = function () {
    g.getData('/api/systems/parameter', function (result) {
        if (result.state == 200) {
            for (var i = 0; i < result.data.length; i++) {
                var data = result.data[i];
                if (data.name == 'systemName') {
                    $('#systemNameOnline').append(data.value);
                } else if (data.name == 'systemUrl') {
                    $('#systemUrlOnline').val(data.value);
                } else if (data.name == 'systemLogo') {
                    $('#systemLogoOnline').attr('src', data.value);
                } else if (data.name == 'systemDescribe') {
                    $('#systemDescribeOnline').append(data.value);
                }
            }
        }
    })
}

g.user = {
    currentUser: {},

    isLogin: function () {
        var result = false
        var sid = g.getCookie('sessionId')
        var userId = g.getCookie('userId')
        if (sid && userId) {
            g.getData('/api/users/user/sessions/' + sid, function (r) {
                if (r.state == 200) {
                    result = true
                }
            })
        }
        return result
    },

    getLoginId: function () {
        return g.getCookie('userId')
    },

    getLoginName: function (renderUser, registerLogoutProcess, intervalQueryMessage) {
        g.getData('/api/users/' + g.user.getLoginId(), function (result) {
            if (result.state == 200) {
                g.user.currentUser = result.data
                if (!g.user.currentUser.summary)
                    g.user.currentUser.summary = '暂无个人简介，赶紧来添加吧！';
                if(g.user.currentUser.summary.length >90)
                    g.user.currentUser.summary = g.user.currentUser.summary.slice(0, 90) + '......'
                    g.user.currentUser.starLevel = g.generateStarLevel(g.user.currentUser.userRank, ""); //用户等级
                //update user info
                renderUser()
                //register logout event, use g.user.logout as handler
                registerLogoutProcess()
                //set interval query message
                if (intervalQueryMessage) {
                    intervalQueryMessage()
                }
            }
        })
    },
    login: function (name, password) {
        var p = new g.GenericProcessor({
            data: {password: password},
            saveMethod: 'POST',
            saveUri: '/api/users/' + name + '/sessions',
            saveDoneProcess: function (data) {
                if (data.state == 200) {
                    g.setCookie('userName',name)
                    g.setCookie('sessionId', data.sessionId)
                    g.setCookie('userId', data.id)
                    if (!data.token) {
                        data.token = '123425345'
                    }
                    g.setCookie('token', data.token)
                    var originUrl = g.getUrlParameter('url');
                    if (!originUrl)
                        originUrl = "index.html";
                   window.location.href =originUrl;
                }else {
                    alert('用户不存在或密码错误,请重新输入.')
                }
            }
        })
        p.save()
    },
    logout: function (name,sessionId) {
       var l = new g.GenericProcessor({
            saveMethod: 'DELETE',
            saveUri: '/api/users/' + name + '/sessions/'+sessionId ,
            saveDoneProcess: function (data) {
                if (data.state == 200) {
                    g.setCookie('sessionId', '', -1)
                    g.setCookie('userId', '', -1)
                    g.setCookie('userName', '', -1)
                    g.user.currentUser = null
                    window.location.href ="/login.html"
                }
            }
        })
        l.save();
    },

    validUser: function (renderUser, registerLogoutProcess, intervalQueryMessage) {
        if (g.user.isLogin()) {
            g.user.getLoginName(renderUser, registerLogoutProcess, intervalQueryMessage)
            g.getSystemItems()
        } else {
            window.location.href ="/login.html?url=" + encodeURI(location.pathname)
        }
        $('.navbar-form').find('button').click(g.search)
    },

    validManagerUser: function (renderUser, registerLogoutProcess, intervalQueryMessage) {
        var loc =window.location
        var locPath = loc.pathname
        if (g.user.isLogin()) {
            g.user.getLoginName(renderUser, registerLogoutProcess, intervalQueryMessage)
            if (g.user.currentUser.userType != 900 && g.user.currentUser.userType != 910 && g.user.currentUser.userType != 990) {
                alert('请用系统管理员用户登陆!')
                loc.href = "/login.html?url=" + encodeURI(locPath)
            } else {
                g.getSystemItems()
            }
        } else {
            loc.href = "/login.html?url=" + encodeURI(locPath);
        }
    },

    queryMessages: function () {
        var userId = g.getCookie('userId')
        g.getData('/api/users/' + userId + '/messages?filter=' + encodeURIComponent(JSON.stringify({"receiverId": userId})), function (r) {
            if (r.state == 200) {
                g.messages = r.data
                if (g.messages.length > 0) {
                    $('.badge').removeClass('hidden').text(g.messages.length)
                } else {
                    $('.badge').addClass('hidden')
                }
            }
        })
    },

    star: new g.Part('userStarContainer', 'user-star-template', '/api/users/stars', function (user, index, params) {
        if (!user.summary) {
            user.summary = '暂无介绍'
        }
        return user
    }, g.nullDataParams, g.nullPreRenderElement, g.nullElementParams)
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

g.showInfo = function (t) {
    $('#' + t + 'Container').find('.more').toggle()
}

//按类型导航
g.navigateByType = function (type) {
    var url = 'resource-search.html?type=' + encodeURIComponent(type)
    window.location.replace(url)
}

g.search = function (evt) {
    var key = $($('.navbar-form').find('input')[0]).val()
    if (key) {
        window.location.href = 'resource-index.html?caption=' + encodeURIComponent(key)
    }
}

g.parseGrade = function (gradeTerm) {
    if (!gradeTerm) {
        return []
    }
    var ary = gradeTerm.split(',')
    var result = []
    for (var i = 0; i < ary.length; i++) {
        if (!ary[i] || ary[i] == '') {
            continue
        }
        var ary2 = ary[i].split(':')
        var obj
        if (ary2[0]) {
            obj = {grade: ary2[0]}
        }
        if (ary2.length > 1) {
            if (!obj) {
                obj = {}
            }
            obj.term = ary2[1]
        }
        if (obj) {
            result.push(obj)
        }
    }
    return result
}

g.parseGradeCaption = function (gradeTerm) {
    var gradeTermAry = g.parseGrade(gradeTerm)
    var caption = ''
    for (var i = 0; i < gradeTermAry.length; i++) {
        var item = gradeTermAry[i]
        if (item.grade) {
            var stage = g.stages.data.find({id: item.grade})
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
}

//var data = {name: "zhangsan", files: [{name: "file1", resource: {age: 12345, min: "-1", max: "-2"}}], resource: {$ref: '$.files[0].resource'}}
//alert(JSON.stringify(data))
//var parsedData = {}
//g.parseDataRef(data, data, parsedData)
//alert(JSON.stringify(parsedData))
g.parseDataRef = function (data, parsePart, self) {
    self = parsePart
    return
    for (var propertyName in parsePart) {
        var property = parsePart[propertyName]
        switch (typeof property) {
            case 'object':
                self[propertyName] = {}
                if (Array.isArray(property)) {
                    self[propertyName] = []
                }
                g.parseDataRef(data, property, self[propertyName])
                break
            case 'string':
                if (propertyName == '$ref') {
                    var now = data
                    while (true) {
                        var chr = property[0]
                        property = property.substr(1)
                        switch (chr) {
                            case '[':
                                var len = property.indexOf(']')
                                var index = property.substr(0, len)
                                now = now[index]
                                property = property.substr(len + 1)
                                break
                            case '.':
                                var dotLen = property.indexOf('.')
                                var squareLen = property.indexOf('[')
                                var len = dotLen < squareLen ? dotLen : squareLen
                                if (len == -1) {
                                    now = now[property]
                                    property = ''
                                } else {
                                    var key = property.substr(0, len)
                                    now = now[key]
                                    property = property.substr(len)
                                }
                                break
                        }
                        if (property == '') {
                            break
                        }
                    }
                    for (var propertyName in now) {
                        self[propertyName] = now[propertyName]
                    }
                } else {
                    self[propertyName] = property
                }
                break
            default:
                self[propertyName] = property
                break
        }
    }
}

g.parseResourceCaption = function (data, datas) {
    data.typeCaption = g.types.data.find({
        id: data.kind.toString()
    })[0].caption;
//    if(data.files.length>0){
//        data.viewFileDetail=data.files[0].previewFile
//    }
    data.gradeTermCaption = g.parseGradeCaption(data.gradeTerms);
    if (data.subject.caption) {
        data.subjectCaption = data.subject.caption || '';
    } else if (data.subject.$ref) {
        data.subject = g.getJsonRefObject(datas, data.subject.$ref);
        data.subjectCaption = data.subject.caption || '';
    }
//    if (data.uploader.userName) {
//        data.ownerCaption = data.uploader.userName || '';
//    } else if (data.uploader.$ref) {
//        data.uploader = g.getJsonRefObject(data, data.uploader.$ref);
//        data.ownerCaption = data.uploader.userName || '';
//    }
    data.dateCreated = data.timeUpload || '';
}

g.getFileIcon = function (file) {
    switch (file.mimeType) {
        case 'application/pdf':
            file.coverFile = '/images/icon/pdf.png'
            break
        case 'application/rtf':
            file.coverFile = '/images/icon/rtf.png'
            break
        case 'text/html':
            file.coverFile = '/images/icon/html.png'
            break
        case 'image/bmp':
        case 'image/gif':
            file.coverFile = '/images/icon/gif.png'
            break
        case 'image/jpeg':
        case 'image/jpg':
            file.coverFile = '/images/icon/jpg.png'
            break
        case 'image/tiff':
            file.coverFile = '/images/icon/tiff.png'
            break
        case 'application/msword':
        case 'application/doc':
            file.coverFile = '/images/icon/doc.png'
            break
        case 'application/vnd.ms-works':
            file.coverFile = '/images/file_word.png'
            break
        case 'application/vnd.ms-excel':
            file.coverFile = '/images/file_excel.png'
            break
        case 'application/vnd.ms-powerpoint':
        case 'application/ppt':
            file.coverFile = '/images/file_ppt.png'
            break
        case 'text/plain':
        case 'text/richtext':
            file.coverFile = '/images/file_txt.png'
            break
        case 'application/zip':
            file.coverFile = '/images/icon/zip.png'
            break
        case 'application/rar':
            file.coverFile = '/images/icon/zip.png'
            break
        case 'application/x-compress':
        case 'application/bin':
            file.coverFile = '/images/file_zip.png'
            break
        case 'audio/basic':
        case 'audio/mpeg':
            file.coverFile = '/images/icon/mpeg.png'
            break
        case 'audio/x-mpeg':
        case 'audio/x-wav':
            file.coverFile = '/images/file_zip.png'
            break
        case 'video/mp4':
            file.coverFile = '/images/icon/mp4.png'
            break
        case 'application/mpg':
            file.coverFile = '/images/icon/mpg.png'
            break
        case 'application/swf':
            file.coverFile = '/images/icon/swf.png'
            break
        case 'video/x-msvideo':
        case 'application/x-shockwave-flash':
        case 'video/quicktime':
        case 'video/mpeg':
        case 'video/x-sgi-movie':
            file.coverFile = '/images/file_vedio.png'
            break
        default:
            file.coverFile = '/images/file_unknown.png'
            break
    }
}

g.buildCatalogueTreeData = function (catalogues) {
    var nodes = []
    var orderedNodes = []
    for (var i = 0; i < catalogues.length; i++) {
        var item = catalogues[i]
        if (!item.parent) {
            orderedNodes.push(item)
        }
    }
    orderedNodes.sort(function(left, right) {
        return left.order - right.order
    })
    for (var i = 0; i < orderedNodes.length; i++) {
        var item = orderedNodes[i]
        var node = g.getTreeNode(item, catalogues)
        nodes.push(node)
    }
    return nodes
}

g.getTreeNode = function (catalogue, catalogues) {
    var treeNode = {}
    treeNode.id = catalogue.id
    treeNode.text = catalogue.caption
    treeNode.tag = catalogue
    treeNode.children = []
    var orderedChildren = []
    for (var j = 0; j < catalogues.length; j++) {
        var item = catalogues[j]
        var parent = item.parent
        if (parent && parent.$ref) {
            parent = g.getJsonRefObject(catalogues, parent.$ref)
        }
        if (parent && parent.id == catalogue.id) {
            orderedChildren.push(item)
        }
    }
    orderedChildren.sort(function(left, right) {
        return left.order - right.order
    })
    for (var j = 0; j < orderedChildren.length; j++) {
        var item = orderedChildren[j]
        var childNode = g.getTreeNode(item, catalogues)
        treeNode.children.push(childNode)
    }
    return treeNode
}

g.getJsonRefObject = function (data, paths) {
    if (!data || data.length == 0) {
        return null
    }
    if (paths == '$.files[0].resource.subject') {
        return data.files[0].resource.subject
    }
    if (paths == '$.checker') {
        return  data.checker
    }
    if (paths == '$.files[0].resource.textBook.textbookVersion') {
        return data.files[0].resource.textBook.textbookVersion
    }
    if (paths == '$[0].files[0].creator') {
        return data.files[0].creator
    }
    if (paths =='$.textBook.textbookVersion') {
        return data.textBook.textbookVersion
    }
    var pathAry = paths.split('.')
    for (var i = 0; i < pathAry.length; i++) {
        var path = pathAry[i]
        if (path.indexOf('$[') == 0) {
            var index = path.substr(2, path.length - 3)
            data = data[parseInt(index)]
        } else {
            data = data[path]
        }
    }
    return data
}

//g.getInitData = function () {
//    g.getData('/api/regions', function (result) {
//        if (result.state == 200) {
//            g._regions = result.data
//        }
//    })
//}

g.renderPageNavigator = function (id, pageSize, currentPage, total, handler) {
    var pageIndexContainer = document.getElementById(id)
    pageIndexContainer.innerHTML = ''

    var firstItemTemplate = $('<li class="firstpagili"><a href="javascript:void(0)" pn="1">&laquo;</a></li>')[0]
    var firstItem = g.dataToElement({}, firstItemTemplate);
    pageIndexContainer.appendChild(firstItem)

    var itemTemplate = $('<li class="pagili"><a href="javascript:void(0)" pn="${pn}">${pn}</a></li>')[0]
    var totalPage = Math.ceil(total / pageSize)
    var beginPageNo = 1
    if (currentPage > 5) {
        if (currentPage > totalPage - 5) {
            beginPageNo = totalPage - 10
        } else {
            beginPageNo = currentPage - 5
        }
    }
    if (beginPageNo < 1) {
        beginPageNo = 1
    }
    var endPageNo = beginPageNo + 9
    for (var i = beginPageNo; i <= Math.min(endPageNo, totalPage); ++i) {
        var data = {
            pn: i
        }
        var item = g.dataToElement(data, itemTemplate)
        if (i == currentPage) {
            item.className = 'active'
        }
        pageIndexContainer.appendChild(item)
    }

    var lastItemTemplate = $('<li class="lastpagili"><a href="javascript:void(0)" pn="${pn}">&raquo;</a></li>')[0]
    var lastItem = g.dataToElement({pn: totalPage}, lastItemTemplate)
    pageIndexContainer.appendChild(lastItem)

    $(pageIndexContainer).find('a').on('click', function (e) {
        var pn = e.target.attributes['pn'].value
        handler(pn)
    })
}
g.importFooter = function () {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            var con = document.getElementById('footer')
            //alert(xhr.responseText)
            con.innerHTML = xhr.responseText
        }
    }
    xhr.open('GET', '/footer/footer.html', false)
    xhr.send();

    var iPadIcon =document.getElementById('iPadIcon');
    $('.iPadDownloadBtn').click(function(){
        if(iPadIcon.hasClass('iPadDownloadBtnDisplayNone')){
            iPadIcon.removeClass('iPadDownloadBtnDisplayNone')
            iPadIcon.addClass('iPadDownloadBtnShow');
        }else{
            iPadIcon.addClass('iPadDownloadBtnDisplayNone');
            iPadIcon.removeClass('iPadDownloadBtnShow');
        }
    })
}
g.importHeader = function () {
    var con = document.getElementById('header')
    var type = $(con).attr('type')
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            //alert(xhr.responseText)
            con.innerHTML = xhr.responseText
            var li = $(con).find('#' + type)
            if (li) {
                $(li).addClass('active')
            }
        }
    }
    xhr.open('GET', 'publicHeader/header.html?type=' + type, false)
    xhr.send()
}

g.importBackstageHeader = function () {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            var con = document.getElementById('header')
            //alert(xhr.responseText)
            con.innerHTML = xhr.responseText
        }
    }
    xhr.open('GET', '/backstage/publicHeader/header.html', false)
    xhr.send()
}

//前台页面加载head验证登陆
g.headAndCheckUser = function (proc) {
    g.importHeader();

    g.user.validUser(function () {
        $('#userHeadPortrait').attr('src', g.user.currentUser.avatarUri);
        if(proc){
            proc();
        }
    }, function () {
        var userName = g.getCookie('userName');
        var sessionId = g.getCookie('sessionId');
        $('#logOut').click(function(e) {g.user.logout(userName,sessionId)});
    }, function () {
        //interval query message
        //setInterval(g.user.queryMessages, 20 * 1000)
    })
}
//后台管理页面加载head验证登陆
g.backstageHeadAndCheckUser = function (proc) {
    g.importBackstageHeader();

    g.user.validManagerUser(function () {
        $('#userHeadPortrait').attr('src', g.user.currentUser.avatarUri);
        if (proc) {
            proc()
        }
    }, function () {
        var userName = g.getCookie('userName');
        var sessionId = g.getCookie('sessionId');
        $('#logOut').click(function(e) {g.user.logout(userName,sessionId)});
    }, function () {
        //interval query message
        //setInterval(g.user.queryMessages, 20 * 1000)
    })
}
g.sample = function () {
    function addComment(containerId, data) {
        var t = document.querySelector("#commentTemplate")
        var comment = t.content.cloneNode(true)

        comment.querySelector('img').src = data.imageUrl
        comment.querySelector('.comment-text').textContent = data.text

        var container = document.getElementById(containerId)
        container.appendChild(comment);
    }

    addComment('content', {imageUrl: "123.png", text: "hello, world"})

    var link = document.querySelector('link[rel=import]')
    var heart = link.import
    // Access DOM of the document in header.html
    var pulse = heart.querySelector('div.pulse')
}
