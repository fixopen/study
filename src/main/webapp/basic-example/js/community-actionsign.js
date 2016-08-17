window.addEventListener('load', function (evt) {
    var loginButton = document.getElementById('login')
    if (loginButton) {
        loginButton.addEventListener('click', function (evt) {
            var path = window.location.pathname;
            window.location.replace("login.html?url=" + encodeURI(path));
        }, false);
    }

    // GET /<type>/<id>
    // POST /<type>
    // {"id":...}
    // PUT /<type>/<id>
    // DELETE /<type>/<id>
    // PATCH /<type>/<id>
    //patchData('/resources?filter=<xyz>', {"mark":"1"});
    /*
     getData('/resources?offset=0&count=6', function(data) {
     var container = document.getElementById('book_content')
     var count = data.length
     for (var i = 0; i < count; ++i) {
     container.appendChild(dataToElement(data[i], type))
     }
     })
     */

}, false)

$.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
});

$().ready(function () {
    $("#commentForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            file: {
                required: true
            }
        },
        messages: {
            name: {
                required: "请输入名称",
                minlength: "最少两个字符"
            },
            file: {
                required: "请选择文件"
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

    //        $("#commentForm").validate({
    //        rules: {
    //            name: {
    //                required: true,
    //                minlength: 2
    //            },
    //            password: {
    //                required: true,
    //                minlength: 5
    //            },
    //            confirm_password: {
    //                required: true,
    //                minlength: 5,
    //                equalTo: "#password"
    //            },
    //            email: {
    //                required: true,
    //                email: true
    //            },
    //            topic: {
    //                required: "#newsletter:checked",
    //                minlength: 2
    //            },
    //            agree: "required"
    //        },
    //        messages: {
    //            name: {
    //                required: "请输入名称",
    //                minlength: "最少两个字符"
    //            },
    //            password: {
    //                required: "Please provide a password",
    //                minlength: "Your password must be at least 5 characters long"
    //            },
    //            confirm_password: {
    //                required: "Please provide a password",
    //                minlength: "Your password must be at least 5 characters long",
    //                equalTo: "Please enter the same password as above"
    //            },
    //            email: "Please enter a valid email address",
    //            agree: "Please accept our policy"
    //        }
    //    });
});