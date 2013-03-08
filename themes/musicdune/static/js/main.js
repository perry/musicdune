// Prevent links in 'standalone' iOS apps opening in Safari
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

// ! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License
(function( win ){
    var doc = win.document;

    // If there's a hash, or addEventListener is undefined, stop here
    if( !location.hash && win.addEventListener ){

        //scroll to 1
        win.scrollTo( 0, 1 );
        var scrollTop = 1,
            getScrollTop = function(){
                return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            },

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( doc.body ){
                    clearInterval( bodycheck );
                    scrollTop = getScrollTop();
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 15 );

        win.addEventListener( "load", function(){
            setTimeout(function(){
                //at load, if user hasn't scrolled more than 20 or so...
                if( getScrollTop() < 20 ){
                    //reset to hide addr bar at onload
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 0);
        }, false );
    }
})( this );

$(function() {
    var History = window.History;

    var siteNav = $('.site-nav');
    var siteLogo = $('.site-logo');
    var goldenRatio = 1.618;
    var logoResize = function() {
        siteLogo.height(siteNav.width() / goldenRatio);
    };
    logoResize();
    $(window).on('resize', function() {
        logoResize();
    });

    function ajaxUpdate(url, data) {
        var response = $(data);
        var contentReplace = response.find('[data-ajax-content]');

        contentReplace.each(function() {
            var contentID = $(this).attr('id');
            $('#' + contentID).replaceWith($(this));
        });

        // Searching the $(data) object for title didn't work
        var responseTitle = data.match(/<title>(.*?)<\/title>/)[1];

        History.pushState(null, responseTitle, url);

        googleAnalytics(url);
    }

    function googleAnalytics(url) {
        if(typeof(_gaq) !== 'undefined') {
            _gaq.push(['_trackPageview', url]);
            _gaq.push(['_trackPageLoadTime']);
        }
    }
});
