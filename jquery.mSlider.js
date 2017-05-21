(function($){
    jQuery.fn.mSlider = function(options){
        // Зададим список свойств и укажем для них значения по умолчанию.
        var settings = $.extend({
            customWidth: 600,
            customHeight: 300,
            fadeFast: 1000,
        }, options);

    var make = function(){
            var isClicked = false;
            var visibleSlide = 0;
            var slideSelector = '.slide';
            allSlides = $(this).find(slideSelector);

            var totalSlides = allSlides.length;
            var intervalAutoplay;
            

        // здесь переменная this будет содержать отдельный
        // DOM-элемент, к которому и нужно будет применить
        // воздействия плагина
        $(this).css({
            "width" : settings.customWidth,
            "height" : settings.customHeight,
        });
        
        function createButtons(){
            $("<div class='slider_buttons'><div/>").insertAfter(".slide:eq("+(totalSlides-1)+")");
            $("<div class='pagination'></div>").insertAfter(".slider_buttons");
            $(".slider_buttons").append("<button class='prev'><i class='icon-left-open' aria-hidden='true'></i></button>");
            $(".slider_buttons").append("<button class='next'><i class='icon-right-open' aria-hidden='true'></i></button>");
            $(".slider_buttons").append("<a class='btn_play'><i class='icon-play' aria-hidden='true'></i></a>");
        };
        createButtons();

        $(this).find(".next").on('click', function(){
            if (isClicked == false) {
                ChangeNextSlide();  
            };
        });

         $(this).find(".prev").on('click', function(){
            if (isClicked == false) {
                ChangePrevSlide();  
            }
        });

        function ChangeNextSlide(){
            isClicked = true;
            var nextIdx = visibleSlide + 1
            if (nextIdx >= totalSlides) {
                nextIdx = 0;
            };
            allSlides.eq(visibleSlide).fadeOut(settings.fadeFast, function(){
                $(this).toggleClass("visible");
            })
            
            allSlides.eq(nextIdx).fadeIn(settings.fadeFast, function(){
                $(this).toggleClass("visible");
                isClicked = false;
            });
            visibleSlide = nextIdx;
            pagination();
        }

        function ChangePrevSlide(){
            isClicked = true;
            var nextIdx = visibleSlide - 1;
            if (nextIdx == -1) {
                nextIdx = totalSlides-1;
            };
            allSlides.eq(visibleSlide).fadeOut(settings.fadeFast, function(){
                $(this).toggleClass("visible");
            });
            
            allSlides.eq(nextIdx).fadeIn(settings.fadeFast, function(){
                $(this).toggleClass("visible");
                isClicked = false;
            });
            visibleSlide = nextIdx;
            pagination();
        }

       allSlides.each(function(i) { 
            $(".pagination").append("<a><i class='icon-circle-empty' aria-hidden='true'></i></a>");
           pagination();       
        });

        function pagination(){
            $('.pagination a').removeClass('active');
            $('.pagination a').eq(visibleSlide).addClass('active');
        };

        // autoplay
        var playClicked = false;

        $(".btn_play").click(function(){
            
            if (playClicked == false) {
                $(".btn_play i").removeClass("icon-play").addClass("icon-pause");
                intervalAutoplay = setInterval(ChangeNextSlide, 2000);
                playClicked = true;
            } else {
                $(".btn_play i").removeClass("icon-pause").addClass("icon-play");
                clearInterval(intervalAutoplay);
                playClicked = false;
            };
        });
    };

    return this.each(make);
    // в итоге, метод mSlider вернет текущий объект jQuery обратно
    };
})(jQuery);