let hash = location.hash;

function setHash(h) {
    hash = h;
    $(window).trigger('hashchange');
}

$(function () {
    $(window).on('scroll load', function () {
        if ($(window).scrollTop() > 20) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });

    $(window).on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
        $('html, body').stop();
    });

    $(window).on('hashchange load', function (e) {
        console.log(hash);
        if (hash) {
            let speed = 750 + 0.5 * ($(hash).offset().top - $(document).scrollTop());
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, speed, 'swing', function () {
                location.hash = hash;
            });
        }
    });

    $('a[href*="#"]').click(function (e) {
        e.preventDefault();
        setHash(this.hash);
    });

    setTimeout(function () {
        $('body').addClass('loaded');

    }, 250);
});
