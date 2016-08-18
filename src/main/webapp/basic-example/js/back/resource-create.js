window.addEventListener('load', function (evt) {
    init();
    bindEvents();
}, false)
function bindEvents() {

}
function init() {
    $.validator.setDefaults({
        submitHandler: submit
    });
    $("#mainForm").validate({
        rules: {
            title: {
                required: true,
                minlength: 2
            },
            file: {
                required: true
            }
        },
        messages: {
            title: {
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
}
function submit() {
    alert('ok');
}