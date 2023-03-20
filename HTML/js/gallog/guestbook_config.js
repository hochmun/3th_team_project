$(function() {
	var csrf_token = get_cookie('ci_c');
	var gallog_id = location.pathname.split('/').slice(1,2).join();
	
	$('#block_layer .use_block_radio').change(function() {
		if($(this).val() == '0') {
			$('#'+ $(this).attr('name') +'_text').show();
		}
		else {
			$('#'+ $(this).attr('name') +'_text textarea').val($('#'+ $(this).attr('name') +'_text textarea').data('org'));
			$('#'+ $(this).attr('name') +'_text').hide();
		}
	});
	
	$('#btn_guestbook_conf').click(function() {
		if($('#block_layer').css('display') != 'none') {
			toggle_layer($('#block_layer'));
			return false;
		}
		
		$.ajax({
			type: "POST",
			url: '/'+ gallog_id +'/ajax/config_ajax/block_config',
			data: { 'ci_t' : csrf_token },
			dataType :	'json',
			cache : false,
			async : false,
			success: function(ajaxData) {
				if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
					alert(ajaxData.msg);
				}
				
				$('#use_block_id_text textarea').val(ajaxData.blacklist.id.join("\n"));
				$('#use_block_id_text textarea').data('org', ajaxData.blacklist.id.join("\n"));
				$('#use_block_ip_text textarea').val(ajaxData.blacklist.ip.join("\n"));
				$('#use_block_ip_text textarea').data('org', ajaxData.blacklist.ip.join("\n"));
				
				toggle_layer($('#block_layer'));
			}
		});
	});
	
	// 저장
	$('#block_layer .btn_apply').click(function() {
		var formData = new FormData();
		
        formData.append('use_block_id', $('input[name="use_block_id"]:checked').val());
        formData.append('use_block_ip', $('input[name="use_block_ip"]:checked').val());
        
        if($('input[name="use_block_id"]:checked').val() == '0') {
        	formData.append('block_ids', $('textarea[name="block_ids"]').val());
        }
        
        if($('input[name="use_block_ip"]:checked').val() == '0') {
        	formData.append('block_ips', $('textarea[name="block_ips"]').val());
        }
        
		$.ajax({
			type: "POST",
			url: '/'+ gallog_id +'/ajax/config_ajax/block_update',
			data: formData,
			dataType : 'json',
			cache : false,
			processData: false,
			contentType: false,
			xhrFields: { withCredentials: true },
			success: function(ajaxData) {
				if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
					alert(ajaxData.msg);
					return false;
				}

				if(ajaxData.result == 'success') {
					alert('적용되었습니다.');
					
					toggle_layer($('#block_layer'));
				}
			}
		});
	});
	
	// 닫기
	$('#block_layer .poply_whiteclose').click(function() {
		toggle_layer($('#block_layer'));
	});
});

// 개별 차단 추가
function add_block(btn, type, val) {
	if(!type || !val) {
		return false;
	}
	
	var formData = new FormData();
	
    formData.append('type', type);
    formData.append('val', val);
    
	$.ajax({
		type: "POST",
		url: '/'+ gallog_id +'/ajax/config_ajax/block_update_one',
		data: formData,
		dataType : 'json',
		cache : false,
		processData: false,
		contentType: false,
		xhrFields: { withCredentials: true },
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
				return false;
			}
			
			if(ajaxData.result == 'success') {
				alert('적용되었습니다.');
				
				$(btn).closest('.user_data').hide();
			}
		}
	});
}