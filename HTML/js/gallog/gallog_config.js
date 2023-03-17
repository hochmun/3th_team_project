// 일부공개갤 삭제
function del_open_gall(btn) {
	var li = $(btn).closest('li');
	
	$('#conf_sel_gall li[data-value="'+ li.data('no') +'"]').show();
	li.remove();
}

$(function() {
	var _UPIMG_URL_ = "https://upimg.dcinside.com";
	var csrf_token = get_cookie('ci_c');
	var gallog_id = location.pathname.split('/').slice(1,2).join();
	
	$('#btn_gallog_conf').click(function() {
		if($('#gallog_config_layer').css('display') != 'none') {
			toggle_layer($('#gallog_config_layer'));
			return false;
		}
		
		$('#calendar_layer').hide();
		
	    var gall_list = new Array();

		$.ajax({
			type: "POST",
			url: '/'+ gallog_id +'/ajax/config_ajax/load_config',
			data: { 'ci_t' : csrf_token },
			dataType :	'json',
			cache : false,
			async : false,
			success: function(ajaxData) {
				if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
					alert(ajaxData.msg);
				}
				
				// 초기화
				$('#conf_sel_gall').parent().html($('#conf_sel_gall').parent().data('bak'));
				$('input[name="sel_use_gall"]').remove();
				$('#conf_sel_gall li').remove();

				// 스크랩 공개 버튼
				var scrap_conf = typeof(ajaxData.scrap_conf) == 'undefined' || ajaxData.scrap_conf.level != '0' ? 'off' : 'on';
				$('#scrap_'+ scrap_conf).prop('checked', true);
				
				// 내 게시글 갤러리 셀렉트박스
				$('#conf_sel_gall-tmpl').tmpl(ajaxData.use_galls).appendTo('#conf_sel_gall');
				select_ul($('#conf_sel_gall').parent(), 'sel_use_gall', '');

				$('#conf_sel_gall').parent().data('bak', $('#conf_sel_gall').parent().html());

				// 공개
				$('#album_'+ ajaxData.album_conf.level).prop('checked', true);
				
				// 일부 공개 갤러리
				$('#gallog_config_layer .set_gall_list > li').remove();
				$('#gall_list-tmpl').tmpl(ajaxData.open_galls).appendTo('#gallog_config_layer .set_gall_list');
				
				$(ajaxData.open_galls).each(function() {
					$('#conf_sel_gall li[data-value="'+ this.no +'"]').hide();
				});
				
				if(ajaxData.album_conf.level == '1') {
					$('#sel_galls').show();
				}
				
				toggle_layer($('#gallog_config_layer'));
			}
		});
	});
	
	$('#gallog_config_layer .gallogset_tab button').click(function() {
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		
		$('#gallog_config_layer .tabcontent').hide();
		$('#gallog_config_layer .tabcontent').eq($(this).index()).show();
	});
	
	// 갤러리 등록
	$('#gallog_config_layer .btn_enroll').click(function() {
		var added = false;
		var cno = $('input[name="sel_use_gall"]').val();
		var sel_li = $('#conf_sel_gall [data-value="'+ cno +'"]');
		
		if(sel_li.index() < 0) {
			alert('선택된 갤러리가 없습니다.')
			return false;
		}

		if(sel_li.data('hide') == '1') {
			alert('비공개 미니 갤러리는 등록할 수 없습니다.')
			return false;
		}
		
		$('#gallog_config_layer .set_gall_list li').each(function() {
			if($(this).attr('data-no') == cno) {
				added = true;
			}
		});
		
		if(added) {
			alert('이미 등록된 갤러리입니다.');
			return false;
		}
		
		$('#conf_sel_gall li[data-value="'+ cno +'"]').hide();
		$('#gall_list-tmpl').tmpl({ 'no': cno, 'ko_name': sel_li.data('name'), 'type': sel_li.data('type') }).appendTo('#gallog_config_layer .set_gall_list');
	});

	// 이미지 반복
	$('#btn_repeat_toggle').click(function() {
		if($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('.blind', this).text('off');
		}
		else {
			$(this).addClass('on');
			$('.blind', this).text('on');
		}
	});
	
	// 배경색상 선택
	$('.gallog_set.bg_color .palette button').click(function() {
		var colorval = $(this).css('background-color');
		var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    delete(parts[0]);
	    for (var i = 1; i <= 3; ++i) {
	        parts[i] = parseInt(parts[i]).toString(16);
	        if (parts[i].length == 1) parts[i] = '0' + parts[i];
	    }
		$('.gallog_set.bg_color input').val(parts.join('').toUpperCase());
	});
	
	$('.gallog_set.bg_color input[type="text"]').keypress(function(event) {
		var val = $(this).val();
		
		if(val.length >= 6 || ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 97 || event.keyCode > 102))) {
			return false;
		}
	});

	// 이미지 첨부 삭제
	$('#topbg_img .del, #bg_img .del, #profile_img .del').click(function() {
		if(confirm('실시간 삭제됩니다. 삭제하시겠습니까?')) {
			var self = this;
	        var type = $('.bg_fileup input[type="file"]', $(this).closest('.gallog_set')).attr('name');
	        
			$.ajax({
				type: 'POST',
				url: '/'+ gallog_id +'/ajax/config_ajax/delete_image',
				data: { 'ci_t' : csrf_token, 'type' : type },
				dataType :	'json',
				cache : false,
				async : false,
				success: function(ajaxData) {
					if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
						alert(ajaxData.msg)
						return false;
					}
					
					if(ajaxData.result != 'success') {
						alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.')
						return false;
					}
					
					$('.up_bgimg img', $(self).closest('.gallog_set')).attr('src', $('.up_bgimg img', $(self).closest('.gallog_set')).data('src'));
					$(self).remove();
					alert('삭제되었습니다.');
				}
			});
		}
	});
	
	// 이미지 첨부
	$('.setting_box .bg_fileup input[type=file]').change(function() {
		if(!$(this).val()) {
			return false;
		}
		
		var self = this;
		var formData = new FormData();
		var type = $(this).attr('name');

        formData.append('mode', 'profile_upload');
        formData.append(type, $('.setting_box .bg_fileup input[type=file][name="'+ type +'"]')[0].files[0]);
        
		$.ajax({
			type: 'POST',
			url: _UPIMG_URL_+"/gallog_upload.php",
			data: formData,
			cache : false,
			processData: false,
			contentType: false,
			xhrFields: { withCredentials: true },
			success: function(data) {
				if(!data.match(/^[\/0-9a-z.]*$/i)) {
					if(data) {
						alert(data);
					}
					
					return false;
				}
				
				$(document).data('profile_'+ type, data);
				
				$('.up_bgimg img', $(self).closest('.gallog_set')).attr('src', _UPIMG_URL_+'/gallog_upload.php?mode=profile_temp&file='+ encodeURIComponent(data) +'&'+ Date.now());
			}
		});
	});
	
	// 저장
	$('#gallog_config_layer .btn_apply').click(function() {
		var top_img = $(document).data('profile_top') || null;
		var bg_img = $(document).data('profile_bg') || null;
		var profile_img = $(document).data('profile_profile') || null;

		var formData = new FormData();

        formData.append('mode', 'profile_apply');
        formData.append('top_img', top_img);
        formData.append('bg_img', bg_img);
        formData.append('profile_img', profile_img);
        
		$.ajax({
			type: 'POST',
			url: _UPIMG_URL_+"/gallog_upload.php",
			data: formData,
			cache : false,
			processData: false,
			contentType: false,
			xhrFields: { withCredentials: true },
			success: function(data) {
				if(data != 'success') {
					alert('이미지 업로드가 실패하였습니다.');
				}
				
				var open_galls = Array();
				var album_conf = $('input[name="album_conf"]:checked').val();
				var scrap_conf = $('input[name="scrap_conf"]:checked').val();
				var repeat = $('#btn_repeat_toggle').hasClass('on') ? '1' : '0';
				var bg_color = $('.gallog_set.bg_color input').val();
				
				$('#gallog_config_layer .set_gall_list li').each(function() {
					open_galls.push($(this).attr('data-no'));
				});
				
				$.ajax({
					type: "POST",
					url: '/'+ gallog_id +'/ajax/config_ajax/update',
					data: { 'ci_t' : csrf_token, 'open_galls' : open_galls, 'album_conf' : album_conf, 'scrap_conf' : scrap_conf, 'repeat' : repeat, 'bgcolor' : bg_color },
					dataType : 'json',
					cache : false,
					async : false,
					success: function(ajaxData) {
						if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
							alert(ajaxData.msg);
						}

						location.reload();
					}
				});
			}
		});
	});
	
	// 닫기
	$('#gallog_config_layer .btn_cancle').click(function() {
		toggle_layer($('#gallog_config_layer'));
	});
});