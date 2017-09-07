// app.js
jQuery(document).ready(function($) {
	// load content
    $('#nav').load('docs/nav.html');
    $('#install').load('docs/install.html');
    $('#typography').load('docs/typography.html');
    $('#forms').load('docs/forms.html');
    $('#lists').load('docs/lists.html');
    $('#tables').load('docs/tables.html');
    $('#flex').load('docs/flex.html');
    $('#misc').load('docs/misc.html');
    $('#grids').load('docs/grids.html');
    $('#animations').load('docs/animations.html');
    $('#css-grid-layouts').load('docs/css-grid-layouts.html');
    $('#layouts').load('docs/layouts.html');
    $('#wp-skelet').load('docs/wp-ad.html');

    // start animations
    $('td div').click(function() {
        var animationName = $(this).data("animation");
        $(this).addClass('animate d1s' + ' ' + animationName);
    });

    // Smooth Scroll
    $(document).on('click', 'a', function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
    });

});