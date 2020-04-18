let hash = location.hash;
let isAnimating = false;

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
        if (isAnimating) {
            $('html, body').stop(true, false);
        }
    });

    $(window).on('hashchange load', function (e) {
        if (hash) {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, {
                duration: 750 + 0.5 * ($(hash).offset().top - $(document).scrollTop()),
                easing: 'swing',
                start: function () {
                    isAnimating = true;
                },
                complete: function () {
                    isAnimating = false;
                    location.hash = hash;
                }
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

    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        $('body').addClass('safari');
    }
});
