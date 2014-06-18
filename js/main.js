(function ($) {
    var menuLinks = $('.mobile_nav__links'),
        menuIcon = $('.mobile_nav__menu'),
        samples = $('.samples_content__list').children('ul'),
        closeSamples = $('.samples_content__close-list'),
        desktopCloseSamples = $('.desktop-close-list'),
        closeItem = $('.sample_content__sample_close'),
        onlineSamples = $('.online-links__mobile').children('div'),
        desktopLinks = $('.desktop_nav__links a'),
        spanArrows = $('.desktop_nav__links span'),
        divs = $('#wrapper').children('.content'),

        menuClose = function(){
            $(menuIcon).css({
                'background-image': 'url(img/mobile_menu.png)',
                'background-color': '#3e8a32'
            });
            $(menuLinks).animate({
                left: "-640"
            })
        };

        onlineSamples.splice(-1,1);


    //Custom Scroll function for mobile
    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 150
            }, 500);
        });
    };



    //Navigation
    /*$('.home').click(function(){
        $('.home_content').scrollView();
        menuClose();
    });
    $('.about').click(function(){
        $('.about_content').scrollView();
        menuClose();
    });
    $('.experience').click(function(){
        $('.experience_content').scrollView();
        menuClose();
    });
    $('.skills').click(function(){
        $('.skills_content').scrollView();
        menuClose();
    });
    $('.samples').click(function(){
        $('.samples_content').scrollView();
        menuClose();
    });
    $('.contact').click(function(){
        $('.contact_content').scrollView();
        menuClose();
    });*/

    //Animates menu when in mobile
    $(menuIcon).click(function(){
        if($(menuLinks).hasClass('active')){
            $(menuLinks).removeClass('active');
            $(menuIcon).css({
                'background-image': 'url(img/mobile_menu.png)',
                'background-color': '#3e8a32'
            });
            $(menuLinks).animate({
                left: "-640"
            })
        } else {
            $(menuLinks).addClass('active');
            $(menuIcon).css({
                'background-image': 'url(img/mobile_menu_active.png)',
                'background-color': '#ffffff'
            });
            $(menuLinks).animate({
                left: '0'
            });
        }
    });

    //Function that allows jquery to set height to auto
    jQuery.fn.animateAuto = function(prop, speed, callback){
        var elem, height, width;
        return this.each(function(i, el){
            el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
            height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();

            if(prop === "height")
                el.animate({"height":height}, speed, callback);
            else if(prop === "width")
                el.animate({"width":width}, speed, callback);
            else if(prop === "both")
                el.animate({"width":width,"height":height}, speed, callback);
        });
    };

    //Mobile Samples list animations
    $('.samples_content__title').click(function(){

        var thisId = this.id,
            el = thisId + "-samples",
            selector = "#" + el,
            listName = $(selector).attr('data-name'),
            sampleLink = $(selector).children().splice(1),
            sampleContent = $('.samples_content__sample');

        for(var i = 0; i < samples.length; i++){

            if(!$(selector).hasClass('active') && (samples[i].id == el)){

                $(samples).removeClass('active');
                $(samples).animate({
                    height: '0'
                });

                $(selector).addClass('active');
                $(selector).animateAuto("height", 500, function(){
                    var currentHeight = $(selector).height();

                    if($(window).width() > 500){
                        $(selector).height(currentHeight + 150);
                    } else {
                        $(selector).height(currentHeight + 70);
                    }
                });
                $('.samples_content__list-name').text("Close " + listName + " list");
                $(closeSamples).animate({
                    height: '60'
                })
            }
        }

        //Animates the sample content
        $(sampleLink).on('click', 'a', function(e){
            var openedSample = this,
                listItemIndex =  $(this).parent().index() - 1;

            e.preventDefault();

            $(onlineSamples[listItemIndex]).css({
               opacity: 1
            });

            if($(window).width() > 500){
                $('#desktop_overlay').fadeIn();
            }

            $(sampleContent).css({
                top: $(this).offset().top + 25
            });
            $(sampleContent).animate({
                left: '0'
            }, function(){

                //Animates close item button
                $(closeItem).animate({
                    height: '60'
                })
            });

            //Close Mobile Sample item
            $(closeItem).click(function(){
                $(openedSample).scrollView();

                $('#desktop_overlay').fadeOut();

                //Item slides out of view
                $(sampleContent).animate({
                    left: '-9000'
                }, function(){

                    //Removes the window positioning
                    openedSample = null;

                    //Resets item opacity
                    $(onlineSamples[listItemIndex]).css({
                        opacity: 0
                    });
                });

                //Animates close item button
                $(closeItem).animate({
                    height: '0'
                });
            });
        });
    });

    //Closes Mobile samples list
    $(closeSamples).click(function(){
        for(var i = 0; i < samples.length; i++){
            $(samples).removeClass('active');
            $(samples).animate({
                height: '0'
            });
            $(closeSamples).animate({
                height: '0'
            });
        }
    });

    //Closes Desktop samples list
    $(desktopCloseSamples).click(function(){
        for(var i = 0; i < samples.length; i++){
            $(samples).removeClass('active');
            $(samples).animate({
                height: '0'
            });
            $(closeSamples).animate({
                height: '0'
            });
        }
    });

    // Hide Mobile Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 1;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');

            if($(menuLinks).hasClass('active')){
                $(menuLinks).removeClass('active');
                $(menuIcon).css({
                    'background-image': 'url(img/mobile_menu.png)',
                    'background-color': '#3e8a32'
                });
                $(menuLinks).animate({
                    left: "-640"
                })
            }
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }

    //Desktop Link Animations

    //Desktop Scrolling Animations
    function getScrollTop(){
        if(typeof pageYOffset!= 'undefined'){
            return pageYOffset;
        }
        else{
            var b = document.body; //IE 'quirks'
            var d = document.documentElement; //IE with doctype
            d = (d.clientHeight)? d : b;
            return d.scrollTop;
        }
    }

    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.desktop_nav__links a, .mobile_nav__links a').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        $('a').each(function () {
            $(this).removeClass('active');
            if(!$('.mobile_nav__links').hasClass('active')){
                $(this).prev().animate({
                    margin: '0 0 0 39px'
                });
            }
        });
        $(this).addClass('active');

        if(!$('.mobile_nav__links').hasClass('active')){
            $(this).prev().animate({
                margin: '0 0 0 -12px'
            });
        }
        menuClose();

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

})(jQuery);

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.desktop_nav__links a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.desktop_nav__links a').removeClass("active");
            $(this).prev().animate({
                margin: '0 0 0 -12px'
            }, 100);
            currLink.addClass("active");
        }
        else{
            $(this).prev().animate({
                margin: '0 0 0 39px'
            }, 100);
            currLink.removeClass("active");
        }
    });
}
