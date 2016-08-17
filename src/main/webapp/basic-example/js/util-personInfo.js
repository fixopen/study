g.personInfoDetail = function(userId) {
    var fav= new g.GenericProcessor({
        data :'/api/users/' + userId +'/favorites/statistics/count?filter=' + encodeURIComponent(JSON.stringify({
            parentId: '15761872542653701'
        })),
        dataPostprocess : function(data,index,prama){
            g.user.currentUser.likeResCount = data; //收藏资源的个数
        }
    })
    var upl = new g.GenericProcessor({
        data :'/api/users/' + userId +'/uploads/statistics/count',
        dataPostprocess : function(data,index,prama){
            g.user.currentUser.uploadCount = data; //上传资源的个数
        }
    })
    fav.load();
    upl.load();
    var container = document.getElementById('headerUserInfo')
    g.bind(container, g.user.currentUser)
}
g.importPersonInfoLeft = function () {
    var xhr = new XMLHttpRequest()
    var con = document.getElementById('personInfoLeftContainer')
    var personactive = con.getAttribute('data-personactive')
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            con.innerHTML = xhr.responseText
            var li = $(con).find('#' + personactive)
            if (li) {
                $(li).addClass('active')
            }
        }
    }
    xhr.open('GET', '/personInfo/personInfo-left.html?personactive=' + personactive, false)
    xhr.send()
}

g.renderUser = function(user) {
    document.getElementById('uploadPersonData').src = user.avatarUri
    document.getElementById('personSummary').textContent = user.summary
}

g.importPersonInfoTop = function (userId) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {
            var con = document.getElementById('personInfoTopContainer')
            //alert(xhr.responseText)
            con.innerHTML = xhr.responseText
        }
    }
    xhr.open('GET', '/personInfo/personInfo-top.html?random=' + Math.random(), false)
    xhr.send()

    g.personInfoDetail(userId);
    var userHead = document.getElementById('uploadPersonData')
    var overlapped =document.getElementById('opacitySpan')
    userHead.addEventListener('mouseover', function(e) {
        overlapped.style.setProperty('display', 'block');
    })
    //'myModalLabel'
    overlapped.addEventListener('mouseleave', function(e) {
        overlapped.style.setProperty('display', 'none')
    })
    var fc = document.getElementById('personHeadFileUpload')
    fc.addEventListener('change', function (evt) {
        uploadFileViaFormData('personHeadFileUpload', 'photo')
    }, false)
    var personInfoSave = document.getElementById('personInfoSave');
    personInfoSave.addEventListener('click',function(){
        var userInfo = g.user.currentUser||{};
        userInfo.avatarUri = window.mediaUri
        var mySummary = document.getElementById('mySummary');
        userInfo.summary = mySummary.value;
        g.patchData('/api/users/' + g.user.currentUser.id, userInfo, function (result) {
            if (result.state == 200) {
                g.getData('/api/users/'+ g.user.currentUser.id,function(r){
                    if(r.state == 200){
                        g.user.currentUser = r.data;
                    }
                })
                document.getElementById('uploadPersonData').src = g.user.currentUser.avatarUri
                if(g.user.currentUser.summary.length >90)
                    g.user.currentUser.summary = g.user.currentUser.summary.slice(0, 90) + '......'
                document.getElementById('personSummary').textContent = g.user.currentUser.summary;
                alert('保存成功');
                $('#personInfoModal').modal('hide');
            } else {
                alert('保存失败');//需把值设置没修改前的内容
            }
        })
   });
//    $('#personInfoModal').on('hidden.bs.modal', function () {
//        g.getData('/api/users/'+ g.user.currentUser.id,function(r){
//            if(r.state == 200){
//                g.user.currentUser = r.data;
//            }
//        })
//        document.getElementById('uploadPersonData').src = g.user.currentUser.avatarUri
//        if(g.user.currentUser.summary.length >90)
//            g.user.currentUser.summary = g.user.currentUser.summary.slice(0, 90) + '......'
//        document.getElementById('personSummary').textContent = g.user.currentUser.summary;
//    })
}
