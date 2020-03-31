$(function () {
    $('body').css('padding-top', $('nav').outerHeight());

    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });
});
