var forumInfo = {}
window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        $('#btnSubmit').on('click', function (event) {
            $("#mainForm").validate({
                submitHandler: function () {
                    forumInfo.caption = $('#name').val()
                    var api = '/api/plates'
                    if (forumInfo.id) {
                        g.patchData(api + '/' + forumInfo.id, forumInfo, function (result) {
                            if (result.state == 200 || result.state == 201) {
                                alert("保存成功")
                                window.location.href = 'forum-manage.html'
                            }
                        })
                    } else {
                        g.postData(api, forumInfo, function (result) {
                            if (result.state == 200 || result.state == 201) {
                                alert("保存成功")
                                forumInfo.id = result.id
                                window.location.href = 'forum-manage.html'
                            }
                        })
                    }
                },
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    }
                },
                messages: {
                    name: {
                        required: "请输入名称",
                        minlength: "最少两个字符"
                    }
                },
                errorPlacement: function (error, element) {
                    if (element.is(':radio') || element.is(':checkbox')) {
                        error.appendTo(element.parent().parent())
                    } else {
                        error.appendTo(element.parent())
                    }
                }
            })
        })
        $('#btnReset').on('click', function (event) {
            $(':input', '#mainForm')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected')
        })
        var id = g.getUrlParameter('id');
        if (id) {
            g.getData('/api/plates/' + id, function (result) {
                if (result.state == 200) {
                    forumInfo = result.data;
                }
            })
        }
        $('#name').val(forumInfo.caption)
    });
}, false)
