window.addEventListener('load', function (evt) {
    g.headAndCheckUser(function(){
        window.userInfo = null
        getPersonInfo();
        bindEvents();
        init();
        g.importFooter()
    });
}, false)
//输出当前用户信息
function renderPersonInfo(datas) {
    var userInfoContainer = document.getElementById('personInfo')
    userInfoContainer.appendChild(g.dataToElement(datas, g.getTemplate('personInfo')))
    var a = document.getElementById('photo')
    a.src = datas.avatarUri;
    var emailBlinding = document.getElementById('emailBlinding');
    var phoneBlinding = document.getElementById('phoneBlinding');
    emailBlinding.value = datas.email;
    phoneBlinding.value = datas.telephone;
    var mySummary = document.getElementById('mySummary');
    if (datas.summary == null) {
        mySummary.placeholder = '暂无个人简介，赶紧来添加';
    } else {
        mySummary.value = datas.summary;
    }
}

function bindEvents() {
    var fc = document.getElementById('file_upload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('file_upload', 'photo')
    }, false)
}
function init() {
    $('#personInfoSave').click(doSave);
}
function doSave() {
    window.userInfo.avatarUri = '~' + window.mediaUri

    var mySummary = document.getElementById('mySummary');
    window.userInfo.summary = mySummary.value;
    g.patchData('/api/users/' + window.userInfo.id, window.userInfo, function (result) {
        if (result.state == 200) {
            var pc = document.getElementById('personInfoHead')
            pc.src = photoControl.src//更新用户信息里面的头像
            var c = document.getElementById('personInfo')
            c.innerHTML = ''
            renderPersonInfo(window.userInfo)
            alert('保存成功');
        } else {
            alert('保存失败');//需把值设置没修改前的内容
        }
    })
}
//获取当前用户信息
function getPersonInfo() {
    var userId = g.getCookie('userId');
    var url = '/api/users/' + userId;
    g.getData(url, function (result) {
        if (result.state == 200) {
            //result.data.likeRes;
            window.userInfo = result.data;
            g.getData(url + "/favorites/statistics/count", function (res) {
                result.data.likeRes = res.data;//收藏资源的个数
//                if(!result.data.summary)
//                    result.data.summary='暂无个人简介';
                result.data.starLevel = g.generateStarLevel(result.data.userRank, "");//用户等级
                g.getData(url + "/followers/statistics/count", function (friend) {
                    result.data.friendCount = friend.data;//好友总数
                    renderPersonInfo(result.data);
                })
            })
        }
    })
}