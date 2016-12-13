$(function () {
    /*nav下划线滑入效果*/
    (function () {
        var on = $(".on").innerWidth();
        var onLeft = $(".on").position().left + 40 + "px";
        $(".header-line").css({"width": "on", "left": "onLeft"})
        $(".header-navs-list a").hover(function () {
            var aLeft = $(this).position().left + 40 + "px";
            $(".header-line").stop().animate({
                left: aLeft
            }, 300)

        }, function () {
            $(".header-line").stop().animate({
                left: onLeft
            }, 500)

        });
    })()

    /*banner轮播*/
    jQuery(".banner").slide({mainCell: ".bd ul", autoPlay: true});

    /*产品展示*/
    $(".show-main-left li").click(function () {
        $(this).addClass('on').siblings().removeClass("on")
    })

    /*产品展示轮播*/
    $(".show-main-right").slide({mainCell: ".bd ul", effect: "leftLoop", autoPlay: true})

    /*实力名家*/
    $(".strength-main li").hover(function () {
        $(this).find("a").html("More");
        $(this).find("a").css({"color": "#fff", "borderColor": "#fff"})
    }, function () {
        $(this).find("a").html("+")
        $(this).find("a").css({"color": "#A72036", "borderColor": "#A72036"})
    });

    /*合作伙伴*/
    $(".partner-main").slide({mainCell: ".bd ul", effect: "leftLoop", autoPlay: true})


    /**/
    $(window).scroll(function () {
        var $Scroll = $(window).scrollTop();
        var $Hwindow = $(window).height();
        fade($(".header-navs-list a"), 'animated fadeInUp');
        fade($(".pinzhi-left"), 'animated bounceInLeft');
        fade($(".pinzhi-right"), 'animated bounceInRight');
        fade($(".show-img"), ' animated slideInUp');
        fade($(".show-main"), 'animated flipInX');
        fade($(".strength-main"), 'animated fadeInUp');
        fade($(".strength-img1"), 'animated slideInUp');
        fade($(".partner-img"), 'animated slideInUp');
        fade($(".news-img1"), 'animated slideInUp');
        fade($(".mess-form"), 'animated bounceInLeft');
        fade($(".message-right"), 'animated bounceInRight');
        function fade($class, animate) {
            $class.each(function () {
                var $top = $(this).position().top;
                if ($Scroll + $Hwindow > $top) {
                    $(this).addClass(animate);
                    setTimeout(function () {
                        $(this).removeClass(animate);
                    }, 20)
                }
            });
        }

    });


    /*验证*/
    $('.mess-btn').click(function () {
        var nam = $("#name");
        var pho = $("#tel");
        var mai = $("#email");
        if (nam.val() == '') {
            $(".mess-form .bt01").css({"display": "block"});
            nam.focus();
            return false;
        } else {
            var re = /[^\u0000-\u00FF]/;
            if (!re.test(nam.val())) {
                $(".mess-form .bt01").html("请填写您的真实姓名！").css({"display": "block"});
                nam.focus();
                return false;
            } else {
                $(".bt01").css({"display": "none"});
            }
        }
        if (pho.val() == '') {
            $(".mess-form .bt02").html("请填写您的手机号码！").css({"display": "block"});
            pho.focus();
            return false;
        } else {
            var re = /^1\d{10}$/;
            if (!re.test(pho.val())) {
                $(".mess-form .bt02").html("手机号码格式不正确！").css({"display": "block"});
                pho.focus();
                return false;
            } else {
                $(".mess-form .bt02").css({"display": "none"});
            }
        }

        if (mai.val() == '') {
            $(".mess-form .bt03").css({"display": "block"});
            mai.focus();
            return false;
        } else {
            var re = /^.{3,50}$/;
            if (!re.test(mai.val())) {
                $(".mess-form .bt03").html("请填写您的地址!").css({"display": "block"});
                mai.focus();
                return false;
            } else {
                $(".mess-form .bt03").css({"display": "none"});
            }
        }
        if ($('textarea').val() == '') {
            $("textarea").html("请填写您的留言");
            $("textarea").focus();
            return false;
        }

    });
    $('.mess-form li input[type=text]').keyup(function () {
        $(this).siblings(".online_form .bt").css('display', 'none');
    });
    $('.mess-form li input[type=text]').mousedown(function () {
        $(this).siblings(".mess-forms .bt").css('display', 'none');
    });


})