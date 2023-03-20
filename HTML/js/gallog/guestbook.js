var csrf_token = get_cookie('ci_c');
var gallog_id = location.pathname.split('/').slice(1,2).join();

function show_user_data(elm) {
	if($('#gb_comments').data('open_user_data') != $(elm).closest('li').index()) {
		$('#gb_comments .user_data').hide();
		$('#gb_comments').data('open_user_data', $(elm).closest('li').index());
	}
	$(elm).next().toggle();	
}

$(function() {
	// 최대 1000자까지 입력 가능
	$('textarea').keyup(function() {
		var val = $(this).val();
		if(val.length > 1000) {
			alert('1,000자 내로 입력해 주세요.');
			$(this).val(val.substr(0, 1000));
		}
	});
		 
	// 패스워드 입력 (수정,삭제)
	var chk_password = function(btn_elm) {
		var li_elm = $(btn_elm).closest('li');
		
		if($('.ip', li_elm).index() >= 0 && $(li_elm).data('password') == undefined) {
			$('.btn_box .cmt_delpw_box', li_elm).remove();
			$('#gb_password_form-tmpl').tmpl(null).appendTo($('.btn_box', li_elm));

			var no = $(li_elm).closest('li').attr('data-no');
			var pw_form = $('.cmt_delpw_box .cmt_delpw', li_elm);
			
			pw_form.keyup(function(e) {
				if(e.keyCode == 13) {
					$('.cmt_delpw_box .btn_ok', li_elm).click();
				}
			});
			
			$('.cmt_delpw_box .btn_ok', li_elm).click(function() {
				if(pw_form.val() == '') {
					alert('비밀번호를 입력해 주세요.');
					pw_form.focus();
					return false;
				}
				
				var param = {'ci_t' : csrf_token, 'no' : no, 'password' : pw_form.val()};
				
				$.post('./ajax/guestbook_ajax/chk_password', param, function(ajaxData) {
					var data = $.parseJSON(ajaxData);
					
					if(data.result == "success") {
						$(li_elm).data('password', pw_form.val());
						$('.btn_cmtpw_close', li_elm).click();
						$(btn_elm).click();
					}
					
					if(typeof(data.msg) != 'undefined' && data.msg) {
						alert(data.msg);
					}
				});
			});
			
			return false;
		}
		
		return true;
	}
	
	// 댓글
	$('#gb_comments .btn_comment').click(function() {
		var wrapper = $(this).closest('li');
		var secret = $('.icon_secretsquare', wrapper).css('display') != 'none' || $('.writer_nikcon', wrapper).index() < 0 ? false : 'unchecked';
		
		if($('.comments[data-no="'+ $(wrapper).data('no') +'"]').index() >= 0) {
			$('.comments[data-no="'+ $(wrapper).data('no') +'"]').remove();
			return false;
		}
		
		wrapper.after($('#gb_write_form-tmpl').tmpl([{'memo' : '', 'secret' : secret, 'no' : $(wrapper).data('no')}]));
		form_wrapper = wrapper.next();

		$('.btn_modify_submit', form_wrapper).click(function() {
			var no = $(this).closest('li').data('no');
			var memo = $('textarea', $(this).closest('.box2')).val();
			var is_secret = $('input[name="is_secret"]:checked', form_wrapper).val() ? 1 : 0;
			var param = {'ci_t' : csrf_token, 'no' : no, 'memo' : memo, 'is_secret' : is_secret};
			
			$.post('./ajax/guestbook_ajax/comment', param, function(ajaxData) {
				var data = $.parseJSON(ajaxData);
				
				if(data.result == "success") {
					location.reload();
				}
				
				if(typeof(data.msg) != 'undefined' && data.msg) {
					alert(data.msg);
				}
			});
		});
		
		$('.btn_cancel', form_wrapper).click(function() {
			$(form_wrapper).remove();
		});
	});
	
	// 수정
	$('#gb_comments .btn_modify').click(function() {
		var wrapper = $(this).closest('li');
		var memo = $('.memo', wrapper).text();
		var is_reply = $(wrapper).hasClass('replys');
		var secret = $('.icon_secretsquare', wrapper).css('display') != 'none' ? 'checked' : 'unchecked';

		if(is_reply) {
			var headnum = Math.ceil(parseInt($(wrapper).data('headnum')) / 1000) * 1000;
			var p_wrapper = $('#gb_comments li[data-headnum="'+ headnum +'"]');
			var p_secret = $('.icon_secretsquare', p_wrapper).css('display') != 'none';
			
			if(p_secret || $('.writer_nikcon', p_wrapper).index() < 0) {
				secret = false;
			}
		}
		
		if(!chk_password(this)) {
			return false;
		}
		
		$(wrapper).hide();
		wrapper.after($('#gb_write_form-tmpl').tmpl([{'no' : $(wrapper).data('no'), 'nickname' : $('.writer_info', wrapper).html(), 'memo' : memo, 'secret' : secret, 'is_modify' : 1, 'is_reply' : is_reply, 'is_first_reply' : $(wrapper).hasClass('line'), 'password' : $(wrapper).data('password')}]));
		form_wrapper = wrapper.next();
		
		if(wrapper.prev().hasClass('replys') && !wrapper.hasClass('replys')) {
			wrapper.addClass('replys').data('tmp-replys', true);
		}
		
		$('.btn_modify_submit', form_wrapper).click(function() {
			var no = $(this).closest('li').data('no');
			var password = $(this).closest('li').data('password');
			var new_memo = $('textarea', $(this).closest('.box2')).val();
			var is_secret = $('input[name="is_secret"]:checked', form_wrapper).val() ? 1 : 0;
			
			var param = {'ci_t' : csrf_token, 'no' : no, 'memo' : new_memo, 'is_secret' : is_secret, 'password' : password};
			
			$.post('./ajax/guestbook_ajax/modify', param, function(ajaxData) {
				var data = $.parseJSON(ajaxData);
				
				if(data.result == "success") {
					if(is_secret || p_secret) $('.icon_secretsquare', wrapper).show();
					else $('.icon_secretsquare', wrapper).hide();
					
					$('.memo', wrapper).html(new_memo.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, "</br>\n"));
					$('.btn_cancel', form_wrapper).click();
				}
				
				if(typeof(data.msg) != 'undefined' && data.msg) {
					alert(data.msg);
				}
			});
		});
		
		$('.btn_cancel', form_wrapper).click(function() {
			if($(wrapper).data('tmp-replys')) {
				$(wrapper).removeClass('replys');
			}
			$(wrapper).show();
			$(form_wrapper).remove();
		});
	});
	
	// 삭제
	$('#gb_comments .btn_delete').click(function() {
		var headnum = $(this).closest('li').attr('data-headnum');
		var password = $(this).closest('li').data('password');
		var param = {'ci_t' : csrf_token, 'headnum' : headnum, 'password' : password};

		if($('#gallog_config_layer').index() < 0 && !chk_password(this)) {
			return false;
		}
		
		if($(this).closest('li').next().attr('data-headnum') % 1000) {
			if(!confirm('답글까지 삭제됩니다.\n계속하시겠습니까?')) {
				return false;
			}
		}
		else if(!confirm('삭제하시겠습니까?')) {
			return false;
		}
		
		$.post('./ajax/guestbook_ajax/delete', param, function(ajaxData) {
			var data = $.parseJSON(ajaxData);
			
			if(data.result == "success") {
				location.reload();
			}
			
			if(typeof(data.msg) != 'undefined' && data.msg) {
				alert(data.msg);
			}
		});
	});
	
	$('#gb_form').validate({
		rules: {
			name:		'required',
			password:	'required',
			memo:		'required'
		},
		messages: {
			name:		'이름을 입력해 주세요.',
			password:	'비밀번호를 입력해 주세요.',
			memo:		'내용을 입력해 주세요.'
		},
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		showErrors: function(errorMap, errorList) {
			if (errorList && errorList[0]) {
				alert(errorList[0].message);
			}
		},
		submitHandler: function(f) {
			var name = $('input[name="name"]', f).val();
			var password = $('input[name="password"]', f).val();
			var memo = $('textarea[name="memo"]', f).val();
			var is_secret = $('input[name="is_secret"]:checked', f).val() ? 1 : 0;
			
			is_secret = is_secret == undefined ? 0 : is_secret;
			
			$.ajax({
				type: "POST",
				url: f.action,
				data: { 'ci_t' : csrf_token, 'name' : name, 'password' : password, 'memo' : memo, 'is_secret' : is_secret },
				dataType :	'json',
				cache : false,
				async : false,
				success: function(ajaxData) {
					if(ajaxData.result == "success") {
						location.href = location.pathname;
					}
					
					if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
						alert(ajaxData.msg);
					}
				}
			});
	
			return false;
		}
	});
});
//dd