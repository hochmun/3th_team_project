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

// 레이어 팝업 열/닫 토글
function toggle_layer(elm) {
	if(typeof(_GALLERY_TYPE_) != 'undefined' && _GALLERY_TYPE_) {
		if(_GALLERY_TYPE_ == 'MI') {
			elm.addClass('lightpurple');
			elm.find('.btn_blue').attr('class','btn_lightpurple');
		}
	}

	if(elm.css('display') == 'none') {
		elm.show();
		return true;
	}
	else {
		elm.hide();
		return false;
	}
}

// div + ul 조합의 ui를 셀렉트박스로 구현  (param: div와 ul를 감싸고 있는 객체, 생성할 hidden input name, 기본 선택값)
function ul_selectric(wraper_elm, input_name, value) {
	wraper_elm = $(wraper_elm).eq(wraper_elm.length - 1);

	$(wraper_elm).addClass('ul_selectric');

	var div = $('div', wraper_elm);
	var ul = $('ul', wraper_elm);
	var li = $('ul > li', wraper_elm);

	if(typeof(value) != 'undefined' && value) {
		var val_txt = $('li[data-value="'+ value +'"]', ul).text();

		if($('.placeholder', div).index() < 0) {
			$(div).html(val_txt + div.html().replace(/^[^<]*/, ''));
		}
		else {
			$('.placeholder', div).text(val_txt);
		}
	}

	$(ul).hide();

	if(typeof(input_name) != 'undefined' && input_name != '') {
		var input_form =  document.createElement('input');
		input_form.type = 'hidden';
		input_form.name = input_name;
		input_form.value = typeof(value) != 'undefined' ? value : '';
		$(ul).after(input_form);
	}

	div.click(function() {
		// 다른 셀렉트릭 close
		var ul_sels = $('.ul_selectric div').not(this);
		$('ul', $(ul_sels).parent()).hide();

		toggle_layer($(this).siblings('ul'));
	});

	li.click(function() {
		var div = $(this).parent().siblings('div');

		$('.placeholder, .blind', div).remove();

		var html = $(this).text() + div.html().replace(/^[^<]*/, '');


		if(typeof(input_name) != 'undefined' && input_name != '') {
			var val = $(this).attr('data-value') ? $(this).attr('data-value') : $(this).text();
			$('input[name='+ input_name +']').val(val);
		}

		div.html(html);
		toggle_layer($(this).parent());
	});
}

$(function(){

    //신설갤 페이지 버튼
    	$(document).on('click','.new_prev', function(e) {
    		var type = $(this).attr('data-type');
    		newPageMove(type);
    	});

    	//신설갤 페이지 버튼
    	$(document).on('click','.new_next', function(e) {
    		var type = $(this).attr('data-type');
    		newPageMove(type,true);
    	});

    	//신설갤 갤러리 클릭
    	$('.newGallTab').click(function(){
    		if($('.newGallTab').hasClass('on')) return false;

    		$(this).siblings().removeClass('on');
    		$(this).addClass('on');
    		$('.new_gall .rank_list').hide();
    		$('.newPageG .now_num').text('1')
    		$('.newG_1').show();
    		$('.new_gall .box_bottom').hide()
    		$('.newPageG').show();
    	});

    	//신설갤 마이너 갤러리 클릭
    	$('.newMgallTab').click(function(){
    		if($('.newMgallTab').hasClass('on')) return false;

    		$(this).siblings().removeClass('on');
    		$(this).addClass('on');
    		$('.new_gall .rank_list').hide();
    		$('.newPageM .now_num').text('1')
    		$('.newM_1').show();
    		$('.new_gall .box_bottom').hide()
    		$('.newPageM').show();
    	});

    	//신설갤 미니 갤러리 클릭
    	$('.new_mini').click(function(){
    		$(this).siblings().removeClass('on');
    		$(this).addClass('on');
    		$('.new_gall .rank_list').hide();
    		$('.newPageMI .now_num').text('1')
    		$('.newMI_2').show();
    		$('.rank_list.newMgallList.newM_2').show();
    		$('.new_gall .box_bottom').hide()
    		$('.newPageMI').show();
    	});
})