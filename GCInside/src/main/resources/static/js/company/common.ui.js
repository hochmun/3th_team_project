/**
 * Created by dcinside on 2018.04.20
 * @author : Design Team.
 * @dependency : jquery ver 1.12.4+
 * @env : RESPONSIVE WEB
 */

$(document).ready(function(){
	// ??
	$(".lang-setting .language").on("click", function(){
		if($(".lang-setting .lang-setting-lst").is(":animated")) return false;
		$(this).toggleClass("on").parent().find(".lang-setting-lst").slideToggle(300);
		return false;
	})
	$(".header").mouseleave(function(){
		$(".lang-setting .language").removeClass("on").parent().find(".lang-setting-lst").slideUp(300);
	})




$(".dg-sel").on("click", function(){
	if($(".dg-sel-lst-wrap").is(":animated")) return false;
	$(this).toggleClass("on").parent().toggleClass("on").find(".dg-sel-lst-wrap").slideToggle(300);
	return false;
});

var btnTop = $('.footer-top .grid-inner');
    btnTop.on('click','a', function(e){
        e.preventDefault();
        $('html, body').stop()
                .animate({
                    scrollTop : 0
                },800)
    });


});//??


//jQuery(window).load(function () {


	function goToByScroll(id) {
	    jQuery("html, body").animate({
	        scrollTop: jQuery("#" + id).offset().top - $('.header').height()
	    }, 700);
	}
	if (window.location.hash != '') {
	    goToByScroll(window.location.hash.substr(1));
	}


//});//??


 $('html, body').animate({scrollTop:0},500) 



