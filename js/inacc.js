$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });

    let hash = location.hash;

    $(window).on('hashchange load', function (event) {
        if (hash) {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, 'swing', function () {
                location.hash = hash;
            });
        }
    });

    $('a[href*="#"]').click(function (e) {
        e.preventDefault();
        hash = this.hash;
        $(window).trigger('hashchange');
    });
});
