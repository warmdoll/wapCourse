export function loginform() {
    /*输入错误信息提示框显示*/
    $("#btnLogin").click(function() {
        var telReg = $(".usear-rel").val();
        $("message-box").show();
        var flag = true;

        var password = $("#txtPassword").val();
        if (password == "" || password == null) {
            $(".alert-box").text("请输入密码");
            flag = false;
        }

        if (telReg == "" || telReg == null) {
            $(".alert-box").text("用户名或手机号码不能为空");
            flag = false;
        }

        if (!flag) {
            $(".alert-box").slideDown("200");
            setTimeout(function() {
                $(".alert-box").slideUp("200");
            }, 3000)
            clearTimeout(function() {
                $(".alert-box").slideUp("200");
            });
            return;
        }
        $.post("/Live/Login", {
            username: telReg,
            password: password
        }, function(result) {
            if (result == "Success") {
                $("message-box").hide();
                //刷新页面
                window.location.reload();
            } else {
                $(".alert-box").slideDown("200");
                setTimeout(function() {
                    $(".alert-box").slideUp("200");
                }, 3000)
                clearTimeout(function() {
                    $(".alert-box").slideUp("200");
                });
                $(".alert-box").text(result);
            }
        });
    })
}
