window.addEventListener('load', function (evt) {
    g.backstageHeadAndCheckUser(function(){
        bindEvents();
        loadData();
    });
}, false)

function bindEvents() {
    $('#btnSubmit').on('click', doSubmit);
    $('#btnOnReset').on('click', onReset);
}

function validateForm() {
    $("#mainForm").validate({
        submitHandler: function () {
            ajaxSubmit();
        },
        rules: {
            userName: {
                required: true,
                minlength: 2
            }, realName: {
                required: true,
                minlength: 2
            }, password: {
                required: true,
                minlength: 6
            }, memberNumber: {
                required: true,
                minlength: 6
            }, email: {
                required: true,
                minlength: 6
            }, telephone: {
                required: true,
                minlength: 11
            }
        },
        messages: {
            userName: {
                required: "请输入名称",
                minlength: "最少两个字符"
            }, realName: {
                required: "请输入名称",
                minlength: "最少两个字符"
            }, password: {
                required: "请输入密码",
                minlength: "最少6个字符"
            }, memberNumber: {
                required: "请输入名称",
                minlength: "最少6个字符"
            }, emalil: {
                required: "请输入名称",
                minlength: "6个字符以上"
            }, telephone: {
                required: "请输入名称",
                minlength: "11个字符"
            }
        },
        errorPlacement: function (error, element) {
            if (element.is(':radio') || element.is(':checkbox')) {
                error.appendTo(element.parent().parent());
            } else {
                error.appendTo(element.parent());
            }
        }
    });
}
var _users, _uid;

function loadData() {
    var id = g.getUrlParameter('id');
    _uid = id;
    if (id) {
        g.getData('/api/users/' + id, function (result) {
            if (result.state == 200) {
                _users = result.data;
                bindData(_users);
            }
        })
    }
}

function bindData(users) {
    $('#userName').val(users.userName);
    $('#realName').val(users.realName);
    $('#email').val(users.email);
    $('#password').val(users.password);
    var man = document.getElementById('gender1')
    var woman = document.getElementById('gender2')
    if (users.gender == 1) {
        man.checked = true
        woman.checked = false
        //$('#gender1').val(users.gender);
    } else if (users.gender == 2) {
        man.checked = false
        woman.checked = true
        //$('#gender2').val(users.gender);
    }
    $('#telephone').val(users.telephone);
    //$('#userType').val(users.userType);
    var userTypeElement = document.getElementById('userType')
    var optionElements = userTypeElement.options
    var count = optionElements.length
    for (var i = 0; i < count; ++i) {
        var optionItem = optionElements.item(i)
        if (optionItem.value == users.userType) {
            optionItem.selected = true
            break
        }
    }
}

function collectData() {
    var users = _users || {};
    users.userName = $('#userName').val();
    users.realName = $('#realName').val();
    users.gender = $('#gender1').val() || $('#gender2').val();
    ;
    users.telephone = $('#telephone').val();
//    users.area = $('#area').val();
    var typeElement = document.getElementById('userType')
    var options = typeElement.options
    var optionCount = options.length
    for (var i = 0; i < optionCount; ++i) {
        var option = options.item(i)
        if (option.selected) {
            users.userType = option.value
            break
        }
    }
    //users.userType = $('#userType:selected').val;
    users.password = $('#password').val();
    users.email = $('#email').val();
    users.ipAddressLastLogin = ''
    users.pinyin = ''
    users.cardType = 1
    users.canChangePassword = 1;
    users.approved = 0
    users.passwordFieldCount = 0
    users.passwordQuestionFieldCount = 0;
    users.userRank = 0.0
    users.score = 0
    return users;
}

function doSubmit() {
    validateForm();
}

function ajaxSubmit() {
    _users = collectData();
    var api = '/api/users';
    if (_users.id) {
        g.patchData(api + '/' + _users.id, _users, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                window.location.href = 'users-manage.html';
            }

        })
    } else {
        g.postData(api, _users, function (result) {
            if (result.state == 200 || result.state == 201) {
                alert("保存成功");
                _users.id = result.id;
                window.location.href = 'users-manage.html';
            }
        })

    }
}

function onReset() {
    $(':input', '#mainForm')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    _users = null;
}


















