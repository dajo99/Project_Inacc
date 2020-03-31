let $body;

function windowResize() {
    if ($(window).width() >= 992) {
        $body.css('padding-top', $('#mainNav').outerHeight());
    } else {
        $body.css('padding-top', 0);
    }
}

$(function () {
    $body = $('body');

    windowResize();
    $(window).resize(windowResize);

    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $body.addClass('scrolled');
        } else {
            $body.removeClass('scrolled');
        }
    });
});
