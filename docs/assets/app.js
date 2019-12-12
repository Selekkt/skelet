// app.js
    $(document).ready(function(){

        function loadSection(arg) {
            var sectionid = '#'+$(arg).attr('id'); // get the section ID
            var getdoc = $(arg).data('docs'); // GET doc section
            var docsurl = 'https://raw.githubusercontent.com/Selekkt/skelet/master/docs/'+getdoc; // build url
            var putdocs = $(arg).children('.dox'); // where to load the requested content

            // add #section to URL
            window.history.pushState( {} , "", sectionid);
            // change title
            document.title = sectionid + " - " + "Skelet. docs";
            // Scroll to the div
            $('html, body').animate({ scrollTop: $(sectionid).offset().top }, 1000);

            // Open the section
            $(arg).css('max-height', '100%');

            setTimeout( function(){
                // Request the section via AJAX
                $.ajax({
                    url: docsurl,
                    type: 'GET',
                    success: function(data) { $(putdocs).append(data); },
                    //error: function() { alert('Couldn\'t load the requested section'); }
                });
            }, 900);
        }

        // if has section name in URL, load section
        if (window.location.href.indexOf("#") > -1) {
            var hash = window.location.hash;
            loadSection(hash); // load the section
        }

        // On Click load section content
        $('.meta').click(function() {
            var loadsection = $(this).parent(); // get the parent of .meta
            loadSection(loadsection); // load the section
        });

        // if OS is in Dark mode switch automatically.
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            $('body').addClass('dark-mode');
        }

        // Turn Dark Mode on/off
        $(document).on('click', '.lightsoff', function(event) {
            event.preventDefault();
            $('body').toggleClass('dark-mode');
        });

    });
