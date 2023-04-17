let ck_l_f = get_cookie('ck_l_f');


$(function(){
    // 쿠키가 없을 경우
    if(ck_l_f == 'undefined' || ! ck_l_f) {
        ck_l_f = 'l';
    }

    /** 2023/04/18 // 심규영 // 최근 접속 갤러리 표시 */
    const value = localStorage.getItem('lately_gallery');
    const strg_galls = $.parseJSON(value);

    if(strg_galls && strg_galls.length > 0) { // 최근 접속 갤러리 기록이 있을 경우
        if(strg_galls && strg_galls.length > 50) { // 기록의 길이가 50개가 넘을 경우
            strg_galls = strg_galls.slice(0, 50); // 자르기
        }

        strg_galls.forEach((strg_gall)=>{
            const $li = $('<li>').attr('class','lately_gall_'+strg_gall.id)
            .append(
                $('<a>').attr('href',strg_gall.link).attr('class','lately_log').text(strg_gall.name)
            ).append(
                $('<em>').attr('class', strg_gall.type == 'mgall' ? 'icon_minor' : strg_gall.type == 'mini' ? 'icon_mini' : '')
            ).append(
                $('<button>').attr('type','button').attr('class','btn_visit_del').data('id',strg_gall.id).data('gtype',strg_gall.type).append(
                    $('<em>').attr('class','icon_visit_del')
                ).click(function(){lately_gall_delete($(this))})
            );

            $('#visit_history .vst_listbox').append($li.clone(true)); // 간단히 보기 표시
            $('.visit_tablist .under_listbox').append($li.clone(true));
        });

        // 전체 삭제
        $('.visit_tablist .list_modi').click(()=>{
            if(confirm('최근 방문 갤러리 목록을 모두 삭제하시겠습니까?')) {
                localStorage.removeItem('lately_gallery');
                $('.vst_listbox li').remove();
                $('.vst_list li').remove();
                $('#visit_history_lyr .visit_div').html('<p class="empty_visit empty_vi">최근 방문 목록이 없습니다.</p>');
                $('.vst_title').text('최근 방문 갤러리');
                btn_hide();
            }
        });
    } else {
        $('#visit_history_lyr .visit_div').html('<p class="empty_visit empty_vi">최근 방문 목록이 없습니다.</p>');
        $('.vst_title').text('최근 방문 갤러리');
    }

    //즐겨찾기
    if(ck_l_f == 'f') {
        tabLately('favorite');
    } else {
        tabLately('lately');
    }
});

/** 2023/04/18 // 심규영 // 방문 기록 삭제 */
const lately_gall_delete = ($this) => {
    const id = $this.data('id');
    const gall_type = $this.data('gtype');

    $('.lately_gall_'+id).remove();

    const value = localStorage.getItem('lately_gallery');
    const strg_galls = modify_storage_json(value, id, gall_type);
    localStorage.setItem('lately_gallery',JSON.stringify(strg_galls));
    if(strg_galls.length <= 0){
        $('#visit_history_lyr .visit_div').html('<p class="empty_visit empty_vi">최근 방문 목록이 없습니다.</p>');
        $('.vst_title').text('최근 방문 갤러리');
        btn_hide();
    }
};

/** 2023/04/18 // 심규영 // 방문 목록 수정 */
const modify_storage_json = (jsonData, id, type) => {
    const new_data = new Array();
    const strg_galls = $.parseJSON(jsonData);

    for(let i in strg_galls) {
        if(strg_galls[i] && typeof(strg_galls[i].id) != 'undefined' && (strg_galls[i].id != id || strg_galls[i].type != type)) {
            new_data.push(strg_galls[i]);
        }
    }

    return new_data;
};

var btn_show = function (){
	$('.bnt_visit_prev').show();
	$('.bnt_visit_next').show();
	$('.bnt_newvisit_more').show();
}

var btn_hide = function (){
	$('.bnt_visit_prev').hide();
	$('.bnt_visit_next').hide();
	$('.bnt_newvisit_more').hide();
}

var openLately = function () {
	$('#my_favorite').hide();
	if($('#visit_history_lyr').css('display') == 'block'){
		$('#visit_history_lyr').hide();
		$('.btn_open').removeClass('open');
	}
	else{
		$('.btn_open').addClass('open');
		$('#visit_history_lyr').show();		
	}
}

var tabLately = function(type) {
	if(type == 'favorite') {
		$('.l_div_style').hide();
		$('.f_div_style').show();
		$('.tab_l').removeClass('on');
		$('.tab_f').addClass('on');
				
		if($('.bkmark_listbox li').length > 0) {
			btn_show();			
		} else {
			btn_hide();
		}
		l_f_scroll($('.bkmark_listbox'));
		set_cookie("ck_l_f", "f", 8760, "dcinside.com");
	} else {
		$('#my_favorite').hide();
		$('.f_div_style').hide();
		$('.l_div_style').show();
		$('.tab_f').removeClass('on');
		$('.tab_l').addClass('on');
		if($('.vst_listbox li').length > 0) {
			btn_show();			
		} else {
			btn_hide();
		}
	
		l_f_scroll($('.vst_listbox'));
		set_cookie("ck_l_f", "l", 8760, "dcinside.com");		
	}
}

var l_f_scroll = function (obj) {
	var newvisit_width = obj.get(0).scrollWidth;
	var newvisit_left_basic = obj.get(0).offsetLeft;
	var scroll_width = obj.get(0).offsetWidth;
	var last_scroll = (newvisit_width - scroll_width) * -1 ;				// 마지막칸
	
	obj.draggable({
		 cursor:"pointer", // 커서 모양
//		 containment:"div", // div영역 에서만 움직이도록 설정
		 axis:"x", // 드래그 방향 설정 (x, y) 모두 움직이려면 axis 제거

		drag: function(event, ui){ 
			var left = ui.position.left;
			var offsetWidth = ($(this).width() - $(this).parent().width()) * -1;

			if(left > 0){ 
			  ui.position.left = 0;
			  $(".bnt_visit_prev").removeClass('on');
			  
			}
			if(left < newvisit_width * -1 ) {
				ui.position.left = newvisit_width * -1;
			}

			visit_left = ui.position.left;
			if(last_scroll > visit_left) {
				ui.position.left = last_scroll;
				visit_left = last_scroll;
				$(".bnt_visit_next").removeClass('on');
			} else {
				$(".bnt_visit_next").addClass('on');
			}
			
			if(ui.position.left < 0) $(".bnt_visit_prev").addClass('on');
		}

	});
    
	var scroll_move = scroll_width - 80;		
	if(newvisit_width > scroll_width) $(".bnt_visit_next").addClass('on');
	
	$('.bnt_visit_prev').click(function(event){
		if(newvisit_width <= scroll_width)  return false;
		newvisit_left = $('.newvisit_list').get(0).offsetLeft - newvisit_left_basic;
		visit_left = newvisit_left + scroll_move;
		if(visit_left > 0) {
			visit_left = 0;
		}			
		$(".newvisit_list").animate({left: visit_left}, 600);
		
		if(visit_left == 0) {
			$(".bnt_visit_prev").removeClass('on');
		}
		$(".bnt_visit_next").addClass('on');

	});
	
	$('.bnt_visit_next').click(function(event){
		if(newvisit_width <= scroll_width)  return false;		
		newvisit_left = $('.newvisit_list').get(0).offsetLeft - newvisit_left_basic;
		if(newvisit_left < (newvisit_width - scroll_move) * -1) {
			return false;
		}
		visit_left = newvisit_left - scroll_move;
		if(last_scroll > visit_left) {
			visit_left = last_scroll;
			$(".bnt_visit_next").removeClass('on');
		}
		$(".newvisit_list").animate({left: visit_left}, 600);
		
		$(".bnt_visit_prev").addClass('on');
	});
}