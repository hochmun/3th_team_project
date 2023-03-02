/* 갤러리 수 및 글수 노출 */
var gall_content_fade = function () {
	
	$('.gall_exposure>div:first-child').slideUp();
    $('.gall_exposure>div').each(function(){
        if ($(this).is(':first-child')) {
            $(this).slideUp(
                function() {
                    $(this).appendTo($(this).parent()).slideDown();
                }
            );
        }
    });
	
}

$(function() {

    // 게시글, 댓글 수 롤링
    setInterval("gall_content_fade()", 3000);
});