/* =======================================================
    Auteurs: Wouters Midas, Vandoninck Dajo, Beliën Kevin
  ======================================================= */

// De huidige URL-hash, geïnitialiseerd met de waarde uit de opgevraagde URL
let hash = location.hash;
// Boolean die aangeeft of er momenteel een scroll-animatie gaande is
let isAnimating = false;

// Functie die de huidige URL-hash update en vervolgens het "hashchange" event triggert.
function setHash(h) {
    hash = h;
    $(window).trigger('hashchange');
}

// jQuery "document ready" event
$(function () {

    // Event handler voor het window scroll / load event
    $(window).on('scroll load', function () {
        if ($(window).scrollTop() > 20) {
            // Indien de huidige scroll-afstand (vanaf bovenkant v.d. pagina) groter is dan 20px, voeg dan de klasse
            // "scrolled" toe aan de body. Dit laat ons toe de navbar compacter te stylen in de CSS.
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });

    // Event handler voor events getriggerd door interactie van de gebruiker
    $(window).on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
        // Is er een scroll-animatie bezig?
        if (isAnimating) {
            // Cancel dan de scroll animatie
            $('html, body').stop(true, false);
        }
    });

    // Event handler voor "hashchange" en "load", getriggerd door de setHash() functie, en automatisch uitgevoerd bij
    // het window onload event
    $(window).on('hashchange load', function (e) {
        // Indien de hash waarde niet leeg is
        if (hash) {
            // Animeer dan de scrollTop parameter tot de positie (offset) van het desbetreffende DOM-element waarvan de
            // id gelijk is aan de waarde van "hash".
            $('html, body').animate({
                // De waarde van "hash" is hier bijvoorbeeld "#tekst-accountancy". Door dit in de jQuery functie te
                // schrijven, dus $("#tekst-accountancy") geeft dit ons het desbetreffende DOM element. Hiervan kunnen
                // we vervolgens d.m.v. offset() de positie van dit element bepalen.
                scrollTop: $(hash).offset().top
            }, {
                // De duratie van de scroll-animatie, berekend a.d.h.v. de afstand tot het element.
                // Lange afstand = trage animatie, korte afstand = snelle animatie.
                duration: 750 + 0.5 * ($(hash).offset().top - $(document).scrollTop()),
                // De easing functie van de animatie. "Swing" is de default waarde die jQuery meegeeft, hier nog eens
                // expliciet gedefinieerd.
                easing: 'swing',
                start: function () {
                    // Stel bij de start van de animatie de globale variable "isAnimating" in op true.
                    isAnimating = true;
                },
                complete: function () {
                    // Stel bij het einde van de animatie "isAnimating" in op false.
                    isAnimating = false;
                    // Schrijf bij het eindigen van de animatie de hashtag weg in de URL-balk van de browser.
                    location.hash = hash;
                }
            });
        }
    });

    // Click-handler voor a-tags die een anchor link (hashtag) hebben.
    $('a[href*="#"]').click(function (e) {
        // Disable de default browser behaviour d.m.v. preventDefault(), met name het automatisch scrollen naar het
        // DOM element met overeenstemmende id in de anchor link.
        e.preventDefault();
        // Roep de custom functie setHash() aan (zie bovenaan).
        setHash(this.hash);
    });

    // Voeg bij het laden van de pagina na 250 ms de klasse "loaded" toe aan de body om de loader te verbergen.
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 250);

    // navigator.userAgent test voor Safari
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        // Door een klasse "safari" toe te voegen aan de body, laat dit ons toe Safari-specifieke styling toe te passen
        // in het CSS-bestand.
        $('body').addClass('safari');
    }
});
