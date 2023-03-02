$(document).ready(function(){
    var $menu     = $('.gnb li'),
    $contents = $('.container .grid'),
    $doc      = $('html, body'),
    $topheight =$('.header').height();

    

    // $menu.on('click','a', function(e){
    //     var $target = $(this).parent(),
    //     idx     = $target.index(),
    //         section = $contents.eq(idx),
    //         offsetTop = section.offset().top - $('.header').height();
    //         $doc.stop()
    //             .animate({
    //                 scrollTop :offsetTop
    //             }, 800);
    //         return false;
    // });

    $(function () { 
        $menu.on('click','a', function(e){ 
            var $target = $(this).parent(), 
            idx = $target.index(), 
            section = $contents.eq(idx), 
            offsetTop = section.offset().top- $('.header').height() + 1; 
            $doc.stop() .animate({ scrollTop :offsetTop }, 800); 
            return false; 
        }); 
    }); 





    $(window).scroll(function(){

        var scltop = $(window).scrollTop();
        
        $.each($contents, function(idx, item){
            
            var $target   = $contents.eq(idx),
            targetTop = $target.offset().top - $('.header').height();

            if (targetTop <= scltop && targetTop + $target.height() > scltop) {
                $menu.removeClass('on');
                $menu.eq(idx).addClass('on');
            }
            else if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                $('.gnb li:last-of-type').addClass("on").siblings().removeClass("on")
            }

            if (!(200 <= scltop)) { $menu.removeClass('on'); }

        })

    });

    var btnTop = $('.footer-top .grid-inner');
    btnTop.on('click','a', function(e){
        e.preventDefault();
        $doc.stop()
        .animate({
            scrollTop : 0
        },800)
    });

    


});