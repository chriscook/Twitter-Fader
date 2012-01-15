/* 
 * Twitter Fader jQuery Plugin version 1.1
 * Chris Cook - chris@chris-cook.co.uk
 */

(function($) {
    
    'use strict';
    
    $.fn.twitterFader = function(searchTerm, options) {
        
        var settings = $.extend({
            displayRate    : 10000,
            fadeRate       : 300,
            returnNum      : 5,
            returnType     : 'recent',
            returnLanguage : 'en'
        }, options),
            $fader         = $(this);
        
        if (!searchTerm) {
            $fader.html('Error! You need to enter a search term.');
        } else {        
            return this.each(function() {
                $fader.html('Loading&hellip;');
                update();
                setInterval(update, (settings.displayRate * settings.returnNum) + ((settings.fadeRate * 2) * settings.returnNum));
                function update() {
                    $.getJSON(
                        'http://search.twitter.com/search.json?callback=?',
                        {
                            q: searchTerm,
                            rpp: settings.returnNum,
                            lang: settings.returnLanguage,
                            result_type: settings.returnType
                        },
                        function(json) {
                            $fader.html('');
                            if (json.results.length > 0) {
                                $.each(json.results, function(i, item) {
                                    $fader.append('<li style="display:none"><b>@' + item.from_user + ':</b> ' + item.text + '</li>');
                                });
                                setInterval(function(){ $fader.children('li').first().fadeIn(settings.fadeRate).delay(settings.displayRate).fadeOut(settings.fadeRate, function() { $(this).remove() } ) }, 1);
                            }
                            else {
                                $fader.append('No results found');
                            }
                        }
                    );
                }
            });
        }
        
    };
})(jQuery);
