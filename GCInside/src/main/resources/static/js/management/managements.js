var csrf_token = get_cookie('ci_c');
Date.prototype.format = function (f) {
	
	// 호출 date.format('yyyy-MM-dd(KS) HH:mm:ss'); date.format('yyyy-MM-dd a/p hh:mm:ss');
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

$(function() {
	//매니저 알람
	if(typeof(chk_minor_notify) == 'function') {
		chk_minor_notify('mng');
	}
	
	/*
	 * 기본 설정
	 */
	// 툴팁 도움말
	$('.btn_tit_guide').mouseover(function() {
		$(this).next().show();
	}).mouseout(function() {
		$(this).next().hide();
	});
	
	$('.set_disable .set_modify').click(function() {
		if($(this).hasClass('non')) {
			alert($(this).attr('data-error'));
			return;
		}
		
		manage_menu_toggle(this);
	});
	
	$('.set_enable .set_cancel').click(function() {
		manage_menu_toggle(this);
	});
	
	/*
	 * 차단 목록
	 */
	// 처리시간 팝업 open
	$('.block_date').click(function() {
		$('.pop_tipbox', $(this).closest('tr').siblings()).hide();
		toggle_layer($(this).next());
	});
	
	// 처리시간 팝업 close (X 버튼)
	$('.blockday .btn_tipclose').click(function() {
		toggle_layer($(this).parent());
	});
	//말머리 순서 변경 시 기본 말머리 정렬
	$("#headtext_list").sortable({
		update: function (event, ui) {
			chk_seq();
		}
	});
	
	$('.update_time').click(function() {
		var conf_target = '';
		var conf_name = $(this).data('confname'); 
		var conf_time = parseInt($('input[name='+ conf_name +'_time]').val());
		
		if(conf_name == 'img_block') {
			if($("input[name='"+ conf_name +"[]']:checked").length > 0) {
				if($('#img_block_all').prop('checked')) {
					conf_target = $('label', $('#img_block_all').parent()).text() +' ';
				}
				else {
					if($('#img_block_vpn').prop('checked')) {
						conf_target = $('label', $('#img_block_vpn').parent()).text() +' ';
					}
					if($('#img_block_mobile').prop('checked')) {
						if(conf_target) conf_target += ', ';
						conf_target += $('label', $('#img_block_mobile').parent()).text() +' ';
					}
				}
			}
			else {
				$(this).data('use', 0);
				alert('제한 범위를 선택해 주세요.');
				return false;
			}
		}
		
		if(typeof(conf_time) != 'undefined' && conf_time) {
			var tDate = new Date();
			tDate.setMinutes(tDate.getMinutes() + conf_time);
			
			$(this).data('use', 1);
			$('.'+ conf_name +' .off', $(this).closest('.cont_box')).hide();
			$('.'+ conf_name +' .on', $(this).closest('.cont_box')).show();
			$('.'+ conf_name +'_txt', $(this).closest('.cont_box')).text(conf_target + tDate.format('yyyy.MM.dd HH:mm') + ' 까지 제한됨');
			
			// img_block
			if($("input[name='"+ conf_name +"[]']").index() >= 0) {
				var use_set = '';
				
				$("input[name='"+ conf_name +"[]']:checked").each(function () {
					use_set = use_set + $(this).val();
				});
				$(this).data('use_set', use_set);
			}
		} else {
			$(this).data('use', 0);
			alert('시간을 선택해 주세요.');
			return false;
		}
	});
	
	$('#img_block_all').click(function() {
		 if($(this).prop('checked')) {
			 $(this).closest('.set').addClass('all');
		 }
		 else {
			 $(this).closest('.set').removeClass('all');
		 }
		 
		 $('input[name="img_block[]"]', $(this).closest('.set')).prop('checked', $(this).prop('checked'));
	});
	
	$('.nonmember .btn_cancel').click(function(){
		$(this).parent().siblings('.select_box').children('.select_area').html('선택<em class="sp_img icon_option_more"></em>');
		$(this).parent('.on').hide();
		$(this).parent().siblings('.off').show();
	});
	
	$('.decom_use').click(function(){
		if ($(this).hasClass('y')) {
			$('#decom_count').show();
		} else {
			$('#decom_count').hide();
		}
	});
	
	$('.recom_down').click(function(){
		if ($(this).hasClass('y')) {
			$('#recom_down').show();
		} else {
			$('#recom_down').hide();
		}
	});
	
});

function public_set_click(val) {
	if(val == 0) {
		$("input[name='manager_set']").attr("disabled",true);
		$("input[name='public_days']").attr("disabled",true);
	} else {
		$("input[name='manager_set']").attr("disabled",false);
		$("input[name='public_days']").attr("disabled",false);
	}
}

function chk_all(elm, chk_elm) {
	if($(elm).prop('checked')) {
		$(chk_elm).prop('checked', true);
	}
	else {
		$(chk_elm).prop('checked', false);
	}
}

// 갤러리 이름 변경
function update_name() {
    var mgall_name_new = $("#mg_name").val();
    var mgall_name_org = $("#mg_name").attr('data-org');
    var reason = $("#reason").val();
    const grade = $('#grade').val();

    if(mgall_name_new == ''){
        alert('이름을 입력해주세요.');
        return;
    }

    if(mgall_name_org === mgall_name_new) {
        alert('기존 이름과 동일합니다.');
        return;
    }

    var data = {
        "id": $("#mg_name").data('id'),
        "gell_name": mgall_name_org,
        "mg_name": mgall_name_new, // 변경된 이름을 전달
        "reason": reason,
        "grade":grade
    };

    console.log(data);
    console.log(JSON.stringify(data));

    $.ajax({
        url: '/GCInside/gall/management/index',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(ajaxData) {
        console.log("ajaxData.result : ",ajaxData.result);
        if(ajaxData.result == true) {
            console.log('확인');
            location.reload();
        }
        if(ajaxData.result == -1) alert('이미 사용된 갤러리명 입니다.');
        if(ajaxData.result == -2) alert('로그인 하셔야 합니다.');
        if(ajaxData.result == -3) alert('7일 이내 변경하실 수 없습니다.');

        /*
            if(ajaxData.result == "success") {
                if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
                    alert(ajaxData.msg);
                }
                location.reload(true);
            } else {
                if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
                    $( ".name_fail_msg" ).html( "<b class='font_red point-red'>X</b> " + ajaxData.msg).show();
                }
            }
            */
        }
    });
}

//설명 체크
function chk_desc() {
	var strGalleryDesc = $("#mg_desc").val();

	if($('#mg_desc').attr('data-checked') == strGalleryDesc) {
		return true;
	}
	
	$.ajax({
      url: '/GCInside/gall/management/index',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
	  dataType : 'json',
      success: function(ajaxData) {
      console.log("ajaxData.result : ",ajaxData.result);
			$(".desc .alert_txt").remove();

			if(typeof(ajaxData.msg) != 'undefined') {
				var tmpl = $('#error_msg-tmpl').tmpl([{'icon' : 'X', 'msg' : ajaxData.msg}]);

				if($('.alert-ct-box').index() < 0) {
					$('.desc .max_txt').before(tmpl);
				}
				else {
					$('.alert-ct-box').append(tmpl);
				}
			}
			
//			if(ajaxData.result == "success") {
//				$(".mdesc_alert_txt").hide();
//				$('#mg_desc').attr('data-checked', strGalleryDesc);
//			}
//			else {
//				return false;
//			}
		}
  });
	
  return true;
}

// 갤러리 설명 변경
function update_desc() {
    var mgall_desc = $("#mg_desc").val();
    var result = null;
	
    if(mgall_desc.trim() == ''){
        alert($("#mg_desc").attr('placeholder'));
        return;
    }
    
    $.ajax({
          url: '/GCInside/gall/management/index',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data),
    	  dataType : 'json',
          success: function(ajaxData) {
          console.log("ajaxData.result : ",ajaxData.result);
			$(".desc .alert_txt").remove();
        	
			if(ajaxData.result == "success") {
				$('.set_enable .set_cancel').click();
				$('#mg_desc').val(mgall_desc);
				$('#mg_desc_text').text(mgall_desc);
				$('#mg_desc').click();
			}
			else if(typeof(ajaxData.msg) != 'undefined') {
				var tmpl = $('#error_msg-tmpl').tmpl([{'icon' : 'X', 'msg' : ajaxData.msg}]);
				
				if($('.alert-ct-box').index() < 0) {
					$('.desc .max_txt').before(tmpl);
				}
				else {
					$('.alert-ct-box').append(tmpl);
				}
			}
			
			result = ajaxData.result;
        }
    });
    
    return result == "success";
}

// 카테고리 변경
function update_category() {
    var mgall_org_category = $('#category_ul').attr('data-org');
    var mgall_new_category = $('input[name=category]').val();
	var sel_cate_name = $('li[data-value='+ mgall_new_category +']', '#category_ul').text();
    
    if(mgall_org_category == mgall_new_category) {
        alert('기존 카테고리와 동일 합니다.');
        return;
    }
    
    if(mgall_new_category == '3' || mgall_new_category == '18') {	// 3: 여성, 18 : 성인
        alert(sel_cate_name+' 카테고리로 변경이 불가능합니다.');
        return false;
    }
    
    $.ajax({
        type: "POST",
        url: "/ajax/managements_ajax/update_category",
        data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, 'category': mgall_new_category },
		dataType : 'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
        	if(ajaxData.result == "success") {
				$('.set_enable .set_cancel').click();
				$('#category_ul').attr('data-org', mgall_new_category);
				$('input[name=category]').val(mgall_new_category);
				$('#mg_category_text').text(sel_cate_name);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
        }
    });
}

// 관리 서브메뉴 on 활성
function manage_menu_toggle(elm) {
	// 취소시 데이터 복원
	if(document.modify_idx) {
		$('.set_enable', $('.form_group').eq(document.modify_idx)).remove();
		$('.set_disable', $('.form_group').eq(document.modify_idx)).after(document.modify_obj);

		document.modify_idx = null;
		document.modify_obj = null;
	}
	
	if($(elm).closest('.set_disable').siblings('.set_enable').css('display') == 'none') {
		document.modify_idx = $(elm).closest('.form_group').index('.form_group');
		document.modify_obj = $(elm).closest('.set_disable').siblings('.set_enable').clone(true);
	}
	
	$('.set_enable').hide();
	$('.set_disable').show();
	
	$(elm).closest('.set_enable, .set_disable').hide();
	var cur_menu = $(elm).closest('.set_enable, .set_disable').siblings();
	
	var menu_open = false;
	if($(cur_menu[1]).css('display') == 'none') {
		menu_open = true;
	}
	
	if(cur_menu.lenght > 0 && mgall_block == 'B' && cur_menu[0].innerText.trim().indexOf('연관 갤러리') != -1 && menu_open){
		alert('접근 제한 상태일 때 연관 갤러리 수정은 불가능합니다.');
		return false;
	}

	cur_menu.show();
	if(cur_menu.length > 0 && cur_menu[0].innerText.trim().indexOf('금지단어') != -1){
		setTimeout(function() {
			$("#blockword").focus();
			chk_str_length($("#blockword"));
		}, 3);
	}
}

//차단
function set_avoid(btn_elm, avoid_type, no) {
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/set_avoid",
		data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'avoid_type': avoid_type, 'no': no },
		dataType : 'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				$(btn_elm).parent('.status').addClass('on');
				$(btn_elm).closest('.txtbtn').text('해제됨');
			}
			else {
				if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
					alert(ajaxData.msg);
				}
			}
		}
	});
}

// 해임
function del_submanager(manager_status, manager_id) {
    if(manager_id == ""){
        alert('잘못된 접근입니다.');
        return;
    }

    if(manager_status != 'W' && manager_status != 'A' && manager_status != 'M') {
        alert('잘못된 접근입니다.');
        return;
    }

    if(manager_status == 'M'){
        alert('매니저를 위임 중인 부매니저입니다. 해임할 수 없습니다.');
        return;
    }

    var delConfirmMsg = "";
    var delType = 'D';
    
    if(manager_status == 'W') {
        delConfirmMsg = "임명을 취소하시겠습니까?";
        delType = 'C';
    }
    else {
        delConfirmMsg = manager_id +'님을 부매니저에서 해임하시겠습니까?';
    }

    if(confirm(delConfirmMsg)) {
        $.ajax({
            type: "POST",
            url : "/ajax/managements_ajax/del_manager",
            data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'manager_id' : manager_id, 'del_type' : delType, 'passKey' : passKey },
    		dataType : 'json',
            cache : false,
            async : false,
            success: function(ajaxData) {
                if(ajaxData.result == "fail") {
                	if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
                		alert(ajaxData.msg);
                	}
                }
                
                location.reload(true);
            }
        });
    }
}

//부매니저 탈퇴
function out_submanager() {
	if(!confirm('부매니저 권한을 상실하게 됩니다.\n정말 탈퇴하시겠습니까?')) {
		return false;
	}

	$.ajax({
		type: "POST",
		url : "/ajax/managements_ajax/del_manager",
		data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'del_type' : 'D'},
		dataType : 'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == "success") {
				var pathname = location.pathname.split('/');
				location.href = '/'+ pathname[1] +'/board/lists/?id='+ mgall_id;
			}
		}
	});
}

function get_submanager_grant(manager_id) {
    if(manager_id == ""){
        alert('잘못된 접근입니다.');
        return;
    }
    
    var submng_nick = $("#submanager_"+manager_id+" .nickname").text();
    
    
    $.ajax({
        type: "POST",
        url : "/ajax/managements_ajax/get_submanager_grant",
        data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'manager_id' : manager_id, 'passKey' : passKey },
    	dataType : 'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
        	if(ajaxData.result == 'success') {
        		var submngGrant = ajaxData.grant; 
        		
        		if($("#pop_submanager_set").length) {$("#pop_submanager_set").remove();}
        		$('#submanager-set-tmpl').tmpl([{
        			'manager_id' : manager_id, 
        			'manager_nick' : submng_nick,
        			'default_set' : submngGrant.default_set,
        			'gallery_set' : submngGrant.gallery_set,
        			'member_list' : submngGrant.member_list,
        			'avoid_list' : submngGrant.avoid_list,
        			'delete_list' : submngGrant.delete_list,
        			'manage_log' : submngGrant.manage_log,
        			'block_user' : submngGrant.block_user,
        			'drop_member' : submngGrant.drop_member,
        			'delete_general' : submngGrant.delete_general,
        			'delete_recomm' : submngGrant.delete_recomm,
        			'delete_comment' : submngGrant.delete_comment,
        			'notice' : submngGrant.notice,
        			'recomm' : submngGrant.recomm,
        			'headtext' : submngGrant.headtext
        		}]).appendTo('#submanager_'+manager_id);
        	}
        	
        }
    });
}

function set_submanager_grant(manager_id) {
    if(manager_id == ""){
        alert('잘못된 접근입니다.');
        return;
    }
    
    var default_set = $('input:checkbox[name="default_set"]').is(":checked")?1:0;
	var gallery_set = $('input:checkbox[name="gallery_set"]').is(":checked")?1:0;
	var member_list = $('input:checkbox[name="member_list"]').is(":checked")?1:0;
	var avoid_list = $('input:checkbox[name="avoid_list"]').is(":checked")?1:0;
	var delete_list = $('input:checkbox[name="delete_list"]').is(":checked")?1:0;
	var manage_log = $('input:checkbox[name="manage_log"]').is(":checked")?1:0;
	var block_user = $('input:checkbox[name="block_user"]').is(":checked")?1:0;
	var drop_member = $('input:checkbox[name="drop_member"]').is(":checked")?1:0;
	var delete_general = $('input:checkbox[name="delete_general"]').is(":checked")?1:0;
	var delete_recomm = $('input:checkbox[name="delete_recomm"]').is(":checked")?1:0;
	var delete_comment = $('input:checkbox[name="delete_comment"]').is(":checked")?1:0;
	var notice = $('input:checkbox[name="notice"]').is(":checked")?1:0;
	var recomm = $('input:checkbox[name="recomm"]').is(":checked")?1:0;
	var headtext = $('input:checkbox[name="headtext"]').is(":checked")?1:0;

    $.ajax({
        type: "POST",
        url : "/ajax/managements_ajax/set_submanager_grant",
        data: { 
        	'ci_t' : csrf_token, 
        	'gallery_id': mgall_id, 
        	'_GALLTYPE_': _GALLERY_TYPE_, 
        	'manager_id' : manager_id, 
        	'passKey' : passKey,
			'default_set' : default_set,
			'gallery_set' : gallery_set,
			'member_list' : member_list,
			'avoid_list' :  avoid_list,
			'delete_list' : delete_list,
			'manage_log' : manage_log,
			'block_user' : block_user,
			'drop_member' : drop_member,
			'delete_general' : delete_general,
			'delete_recomm' : delete_recomm,
			'delete_comment' : delete_comment,
			'notice' : notice,
			'recomm' : recomm,
			'headtext' : headtext
        },
    	dataType : 'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
        	
        	if(ajaxData.result == 'success') {
        		alert('수정되었습니다.');
        		cls_submanager_grant_pop();
        	} else {
        		alert('에러가 발생했습니다.');
        		
        	}
        }
    });
}

function cls_submanager_grant_pop() {
	$("#pop_submanager_set").remove();
}

function get_public_set(type) {
    
    $.ajax({
        type: "POST",
        url : "/ajax/managements_ajax/get_public_set",
        data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'passKey' : passKey },
    	dataType : 'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
        	if(ajaxData.result == 'success') {
        		var public_set_data = ajaxData.public_set;
        		
        		var public_set = 0;
        		var manager_set = 0;
        		var public_days = 3;
        		var public_set_txt = '';
        		
        		if($("#pop_public_set").length) {$("#pop_public_set").remove();}
        		switch (type) {
        		  case 'block':
        		    public_set = public_set_data.block_list;
        		    manager_set = public_set_data.block_manager;
        		    public_days = public_set_data.block_days;
        		    public_set_txt = '차단 내역';
        		    break;
        		  case 'delete':
        			public_set = public_set_data.delete_list;
          		    manager_set = public_set_data.delete_manager;
          		    public_days = public_set_data.delete_days;
          		    public_set_txt = '삭제 내역';
          		    break;
        		  case 'setting':
        			public_set = public_set_data.setting_list;
            		manager_set = public_set_data.setting_manager;
            		public_days = public_set_data.setting_days;
            		public_set_txt = '관리 기록';
        		    break;
        		  default:
        		}
        		
        		$('#public-set-tmpl').tmpl([{
        			'public_set' : public_set,
        			'manager_set' : manager_set,
        			'public_days' : public_days,
        			'set_type' : type,
        			'public_set_txt' : public_set_txt
        		}]).appendTo('#public_set_div');
        	}
        	
        }
    });
}

function set_public(type) {
    
    
    var public_set = $("input[name='public_set']:checked").val();
	var manager_set = $("input[name='manager_set']:checked").val();
	var public_days = $("input[name='public_days']:checked").val();
	var prev_public_set = $("#prev_public_set").val();
	
    $.ajax({
        type: "POST",
        url : "/ajax/managements_ajax/set_public",
        data: { 
        	'ci_t' : csrf_token, 
        	'gallery_id': mgall_id, 
        	'_GALLTYPE_': _GALLERY_TYPE_,
        	'passKey' : passKey,
        	'set_type':type,
			'public_set' : public_set,
			'manager_set' : manager_set,
			'public_days' : public_days,
			'prev_public_set' : prev_public_set
        },
    	dataType : 'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
        	
        	if(ajaxData.result == "success") {
        		alert('수정되었습니다.');
        		$("#pop_public_set").remove();
        	}
        	
        }
    });
}

// 매니저 위임
function exec_mandate_manager() {
    var mandate_user_id = $("input[name=mandate_user]:checked").val();
    var mandate_user_nick = $("input[name=mandate_user]:checked").attr('data-nick');
    
    if(mandate_user_id == "" || typeof mandate_user_id == "undefined"){
        alert("위임할 부매니저를 선택해주세요");
        return false;
    }
    
    if(!confirm(mandate_user_nick +'님이 위임을 수락하면 취소가 불가능합니다. 매니저를 위임하시겠습니까?')) {
    	return false;
    }

    $.ajax({
        type :		"POST",
        url :		"/ajax/managements_ajax/mandate",
        data :		{ 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'manager_id': mandate_user_id, 'act': 'apply', 'passKey' : passKey },
		dataType :	'json',
        cache :		false,
        async :		false,
        success :	function(ajaxData) {
            if(ajaxData.result == "fail") {
            	if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
            		alert(ajaxData.msg);
            	}
            }
            
            location.reload(true);
        }
    });
}

// 매니저 위임 취소
function exec_mandate_cancel(mandate_user){
    if(!confirm('위임을 취소하시겠습니까?')) {
    	return false;
    }
    
    $.ajax({
        type :		"POST",
        url :		"/ajax/managements_ajax/mandate",
        data :		{ 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'manager_id' : mandate_user, 'act' : 'cancel', 'passKey' : passKey },
		dataType :	'json',
        cache :		false,
        async :		false,
        success :	function(ajaxData) {
            if(ajaxData.result == "fail") {
            	if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
            		alert(ajaxData.msg);
            	}
            	return false;
            }
            
            location.reload(true);
        }
    });
}

// 폐쇄 신청 레이어 open
function open_closure(btn_elm) {
	if($(btn_elm).attr('data-error')) {
		alert($(btn_elm).attr('data-error'));
	}
	else {
		$('.closing_cont_box').addClass('show');
	}
}

// 폐쇄 신청
function apply_closure() {
    var closure_reason = $("#closure_reason").val();
    var user_pw = $("#user_pw").val();

    if(closure_reason.trim() == ''){
        alert('폐쇄 사유를 입력해주세요.');
        return;
    }

    if(user_pw.trim() == ''){
        alert('비밀번호를 입력해주세요.');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/ajax/managements_ajax/closure",
        data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'closure_reason': closure_reason, 'user_pw': user_pw, 'act': 'apply', 'passKey' : passKey },
		dataType :	'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
            if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
        		alert(ajaxData.msg);
        	}
            
            if(ajaxData.result == 'success') {
                location.reload(true);
            }

        	return false;
        }
    });
}

// 폐쇄 신청 취소
function cancel_closure() {
    $.ajax({
        type: "POST",
        url: "/ajax/managements_ajax/closure",
        data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'act' : 'cancel', 'passKey' : passKey },
		dataType :	'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
            if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
        		alert(ajaxData.msg);
        	}
            
            if(ajaxData.result == 'success') {
                location.reload(true);
            }
            
        	return false;
        }
    });
}

// 부매니저 추가
function add_manager(){
	var manager_id = $("#submanager_id").val();
	
	if(manager_id == ''){
		alert('부매니저 식별 코드를 입력해주세요');
		return;
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/add_manager",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'manager_id' : manager_id, 'passKey' : passKey },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
        		alert(ajaxData.msg);
        	}
            
            if(ajaxData.result == 'success') {
				alert(manager_id + "님이 수락 시, 임명이 완료됩니다.");
                location.reload(true);
            }
            else {
				$("#submanager_id").val("");
            }
            
        	return false;
		}
	});
}

// 연관 갤러리 저장
function update_relate() {
	var use_relation = $('[name=use_relation]:checked').val();
	var relate_gall_nos = Array();
	var relate_gall_types = Array();
	var relate_gall_names = Array();
	
	if(use_relation == 'N' && use_relation != $('#use_relate_radio').data('use')) {
		if(!confirm('사용안함으로 저장 시 기존 등록된 연관 갤러리는 모두 삭제됩니다.\n저장하시겠습니까?')) {
			return false;
		}
	}
	
	$('#modify_relate_list .gall_name').each(function() {
		if($(this).attr('data-no')) {
			relate_gall_nos.push($(this).attr('data-no'));
			relate_gall_types.push($(this).attr('data-type'));
			relate_gall_names.push({ 'ko_name': $(this).text() });
		}
	});
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_relate",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_relation' : use_relation, 'gall_nos' : relate_gall_nos, 'gall_types' : relate_gall_types },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			document.modify_idx = null;
			$('.set_enable .set_cancel').click();
			$('.relate_wordlist.result li').remove();
			
			if(use_relation == 'N') {
				relate_gall_names = [{'ko_name':'사용안함'}];
				$('#modify_relate_list .btn_bword_del').click();
			}
			else if(relate_gall_names.length == 0) {
				relate_gall_names = [{'ko_name':'없음'}];
			}
			
			$('#relate_word-tmpl').tmpl(relate_gall_names).appendTo('.relate_wordlist.result');
			
			$('#use_relate_radio').data('use', use_relation);
			$('#mgallery_relate').val('');
			$('.m_relate').hide();
			
			result = ajaxData.result;
		}
	});
	
	return result == "success";
}

// 갤러리 검색
function sch_gallery(elm) {
	if(!$(elm).val().trim()) {
		$('.m_relate').hide();
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/gallery_ajax/sch_gall_name_with_info",
		data: { 'ci_t' : csrf_token, 'q' : $(elm).val() },
		dataType :	'json',
		cache : false,
		async : true,
		success: function(ajaxData) {
			if(ajaxData.length > 0) {
				$('#sch_gall_lsit li').remove();
				$('#sch_mgall_lsit li').remove();
				$('#sch_migall_lsit li').remove();

				$('.sch_list').hide();
				
				var gallData = {'G': [], 'M': [], 'MI': []};
				
				for(var i in ajaxData) {
					eval('gallData.'+ ajaxData[i].gallery_type +'.push(ajaxData[i])');
				}
				
				if(gallData.G.length > 0) $('#sch_gall_lsit').show().prev().show();
				else $('#sch_gall_lsit').hide().prev().hide();
				if(gallData.M.length > 0) $('#sch_mgall_lsit').show().prev().show();
				else $('#sch_mgall_lsit').hide().prev().hide();
				if(gallData.MI.length > 0) $('#sch_migall_lsit').show().prev().show();
				else $('#sch_migall_lsit').hide().prev().hide();
				
				$('#sch_gall_list-tmpl').tmpl(gallData.G).appendTo('#sch_gall_lsit');
				$('#sch_gall_list-tmpl').tmpl(gallData.M).appendTo('#sch_mgall_lsit');
				$('#sch_gall_list-tmpl').tmpl(gallData.MI).appendTo('#sch_migall_lsit');
				
				if(gallData.G.length > 0) $('.sch_list.G').show();
				if(gallData.M.length > 0) $('.sch_list.M').show();
				if(gallData.MI.length > 0) $('.sch_list.MI').show();
				
				$('.m_relate').show();
			}
			else {
				$('.m_relate').hide();
			}
		}
	});
}

function sch_hide_gall() {
	var input = $('#sch_hide input');
	
	if(!input.val().trim()) {
		$('#sch_hide .tiptxt.empty').show().siblings('.tiptxt').hide();
		return false;
	}

	$.ajax({
		type: "POST",
		url: "/ajax/mini_ajax/sch_hide_gallery",
		data: { 'ci_t' : csrf_token, 'q' : input.val() },
		dataType :	'json',
		cache : false,
		async : true,
		success: function(ajaxData) {
			if(ajaxData && mgall_id != ajaxData.name) {
				$('#sch_hide').data('no', ajaxData.no).data('name', ajaxData.ko_name).data('type', ajaxData.gallery_type);
				$('#sch_hide .tiptxt.ok b').text(ajaxData.ko_name);
				$('#sch_hide .tiptxt.ok').show().siblings('.tiptxt').hide();
			}
			else {
				$('#sch_hide .tiptxt.no').show().siblings('.tiptxt').hide();
			}
		}
	});
}

// 비밀 갤러리 검색 레이어 close
function sch_hide_close() {
	toggle_layer($('#sch_hide'));
	
	$('#sch_hide').data('no', null);
	$('#sch_hide').data('name', null);
	$('#sch_hide').data('gallery_type', null);
	$('#sch_hide input').val('');
	$('#sch_hide .tiptxt.empty').show().siblings('.tiptxt').hide();
}

//연관 갤러리 추가
function add_relate(no, name, type) {
	var insert_id = true;
	
	$('#modify_relate_list li').each(function() {
		if($('.gall_name', this).attr('data-no')) {
			if($('.gall_name', this).attr('data-no') == no) {
				alert('이미 선택한 갤러리입니다. 다른 갤러리를 선택해주세요.');
				$('.m_relate').hide();
				insert_id = false;
			}
		}
		else if(insert_id) {
			$('.gall_name', this).attr('data-no', no);
			$('.gall_name', this).attr('data-type', type);
			$('.gall_name', this).text(name);
			$('.m_relate').hide();
			$('#mgallery_relate').val('');
			insert_id = false;
		}
	});
	
	if(insert_id) {
		alert('3개 이상 추가할 수 없습니다.');
		$('.m_relate').hide();
	}
}

// 비밀갤러리 추가
function add_relate_hide() {
	if(!$('#sch_hide').data('no')) {
		alert('연관 갤러리로 등록할 갤러리를 찾아주세요.');
		return false;
	}
	add_relate($('#sch_hide').data('no'), $('#sch_hide').data('name'), $('#sch_hide').data('type'));
	sch_hide_close();
}

// 연관 갤러리 삭제
function remove_relate(elm, use_remove) {
	var clone = $(elm).closest('li').clone();
	
	$(elm).closest('li').remove();
	
	$('.gall_name', clone).attr('data-no', '');
	$('.gall_name', clone).attr('data-type', '');
	$('.gall_name', clone).text('');
	
	if(!use_remove) {
		$('#modify_relate_list').append(clone);
	}
}

// 태그 저장
function update_tags() {
	var result = null;
	var tags = Array();
	
	$('.tag_input').each(function() {
		var value = $(this).prop('tagName') == "INPUT" ? $(this).val() : $(this).text();
		
		if(value.trim() != '') {
			if($.inArray(value, tags) < 0) {
				tags.push(value);
			}
			else {
				if($(this).prop('tagName') == "INPUT") {
					$(this).remove();
				}
				else {
					$(this).closest('li').remove();
				}
			}
		}
	});
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_tags",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'tags' : tags },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			document.modify_idx = null;
			$('.set_enable .set_cancel').click();

			if(ajaxData.tags == '') {
				ajaxData.tags = ['없음'];
			}
			
			$('#tags').text(ajaxData.tags.join(', '));
			
			result = ajaxData.result;
		}
	});
	
	return result == "success";
}

// 개념글 기준 저장
function update_recom_cnt() {
	var result = null;
	var recom_cnt = $('input[name=recom_cnt]').val();
	
	if(recom_cnt < 5 || recom_cnt > 100) {
		alert('개념글 기준 설정은 최소 5에서 최대 100까지 가능합니다.');
		
		if(recom_cnt < 5) $('input[name=recom_cnt]').val(5);
		if(recom_cnt > 100) $('input[name=recom_cnt]').val(100);
		
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_recom_cnt",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'count' : recom_cnt },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				$('.set_enable .set_cancel').click();
				$('input[name=recom_cnt]').val(recom_cnt);
				$('.recom_cnt_text').text(recom_cnt);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

function update_recom_decom(){
	var result = null;
	var decom_use = $('input[name=decom_use]:checked').val();
	var recom_down_use = $('input[name=recom_down_use]:checked').val();
	var recom_cnt = $('input[name=recom_cnt]').val();
	var decom_cnt = $('input[name=decom_cnt]').val();	
	
	if(recom_cnt < 5 || recom_cnt > 100) {
		alert('개념글 기준 설정은 최소 5에서 최대 100까지 가능합니다.');
		
		if(recom_cnt < 5) $('input[name=recom_cnt]').val(5);
		if(recom_cnt > 100) $('input[name=recom_cnt]').val(100);
		
		return false;
	}
	
	if(decom_cnt != 'undefined' && recom_down_use == 1) {
		if(decom_cnt && (decom_cnt < 5 || decom_cnt > 1000)) {
			alert('비추천으로 개념글 내리기 기준 설정은 최소 5에서 최대 1000까지 가능합니다.');
			
			if(decom_cnt < 5) $('input[name=decom_cnt]').val(5);
			if(decom_cnt > 1000) $('input[name=decom_cnt]').val(1000);
			
			return false;
		}
	} else {
		decom_cnt = 0;
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_recom_decom",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'decom_use' : decom_use , 'recom_down_use' :  recom_down_use , 'recom_count' : recom_cnt ,'decom_count' : decom_cnt },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				document.modify_idx = null;
				$('.set_enable .set_cancel').click();
				$('input[name=recom_cnt]').val(recom_cnt);
				$('.recom_cnt_text').text(recom_cnt);
				if(decom_use == 1) {
					var text_decom = '사용함';
					if(recom_down_use == 1) text_decom += '(' + decom_cnt + ' 이상 개념글 불가)';					
					$('.decom_cnt_text').text(text_decom);			
				
				} else {
					$('.decom_cnt_text').text('사용안함');					
				}
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 도배 방지 코드 저장
function update_kcaptcha() {
	var result = null;
	var use_ips = $('[name=use_ips]:checked').val();
	var write_cnt = $('[name=write_kcaptcha_cnt]').val();
	var comment_cnt = $('[name=comment_kcaptcha_cnt]').val();
	var recom_cnt = $('[name=recom_kcaptcha_cnt]').val();
	var use_write = $('[name=use_write_kcaptcha]:checked').val();
	var use_comment = $('[name=use_comment_kcaptcha]:checked').val();
	var use_recom = $('[name=use_recom_kcaptcha]:checked').val();
	var use_recom_r = $('[name=chk_recom_use]:checked').val(); //추천 사용
	var use_recom_n = $('[name=chk_non_recom_use]:checked').val(); //비추 사용 
		
	if(use_recom === '1') {
		if (typeof use_recom_r === 'undefined') use_recom_r = 0;
		if (typeof use_recom_n === 'undefined') use_recom_n = 0;
		if(!use_recom_r && !use_recom_n) {
			alert('추천 또는 비추천을 선택해야 합니다.');
			return false;
		}
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_kcaptcha",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_ips' : use_ips,
			'write_cnt' : write_cnt, 'comment_cnt' : comment_cnt, 'recom_cnt' : recom_cnt, 
			'use_write' : use_write, 'use_comment' : use_comment, 'use_recom' : use_recom,
			'use_recom_r' : use_recom_r, 'use_recom_n' : use_recom_n 
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			document.modify_idx = null;
			$('.set_enable .set_cancel').click();

			$('#use_ips .'+ use_ips).show();
			$('#use_ips .'+ (use_ips ^= 1)).hide();
			
			if(parseInt(use_write) || parseInt(use_comment) || parseInt(use_recom)) {
				$('#use_kcaptcha').hide().siblings().show();
				
				$('#use_kcaptcha_write').text( (use_write == '1' ? write_cnt +'자리 사용' : '사용안함') );
				$('#use_kcaptcha_comment').text( (use_comment == '1' ? comment_cnt +'자리 사용' : '사용안함') );
				$('#use_kcaptcha_recom').text( (use_recom == '1' ? recom_cnt +'자리 사용' : '사용안함') );
			}
			else {
				$('#use_kcaptcha').show().siblings().hide();
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 금지 단어 저장
function update_blockword() {
	var result = null;
	var use_blockword = $('input[name=use_blockword]:checked').val();
	var blockword = $('#blockword').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_blockword",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_blockword' : use_blockword, 'blockword' : blockword },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == 'success') {
				$('.set_enable .set_cancel').click();
				
				var blockword_text = use_blockword == 'Y' ? '사용함' : '사용안함';
				$('#blockword_text').text(blockword_text);
				
				$('input[name=use_blockword]:radio[value="'+ use_blockword +'"]').prop('checked',true);
				$('#blockword').val(ajaxData.blockword);
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

//자동 삭제 저장
function update_autodel() {
	var result = null;
	var use_autodel = $('input[name=use_autodel]:checked').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_autodel",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_autodel' : use_autodel },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == 'success')	$('.set_enable .set_cancel').click();
			
			var use_autodel_text = use_autodel == '1' ? '사용함' : '사용안함';
			$('#autodel_text').text(use_autodel_text);
			
			$('input[name=use_autodel]:radio[value="'+ use_autodel +'"]').prop('checked',true);

			result = ajaxData.result;
		}
	});

	return result == "success";
}

//비밀글 저장
function update_secret() {
	var result = null;
	var use_secret = $('input[name=use_secret]:checked').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_secret",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_secret' : use_secret },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == 'success')	$('.set_enable .set_cancel').click();
			
			var use_secret_text = use_secret == '1' ? '사용함' : '사용안함';
			$('#secret_text').text(use_secret_text);
			
			$('input[name=use_secret]:radio[value="'+ use_secret +'"]').prop('checked',true);

			result = ajaxData.result;
		}
	});

	return result == "success";
}

//#성인 게시물 저장
function update_adult() {
	var result = null;
	var use_adult = $('input[name=use_adult]:checked').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_adult",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_adult' : use_adult },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == 'success')	$('.set_enable .set_cancel').click();
			
			var use_adult_text = use_adult == '1' ? '사용함' : '사용안함';
			$('#adult_text').text(use_adult_text);
			
			$('input[name=use_adult]:radio[value="'+ use_adult +'"]').prop('checked',true);

			result = ajaxData.result;
		}
	});

	return result == "success";
}

//고정글 저장
function update_list_fix() {
	var result = null;
	var list_fix = $('input[name=list_fix]:checked').val();
	var list_fix_limit = $('input[name=list_fix_limit]').val();
	var list_fix_hour = $('input[name=list_fix_hour]').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_list_fix",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'list_fix' : list_fix, 'list_fix_limit' : list_fix_limit, 'list_fix_hour' : list_fix_hour },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			if(ajaxData.result == 'success')	$('.set_enable .set_cancel').click();
			
			var list_fix_text = list_fix == 'Y' ? '사용함' : '사용안함';
			$('#list_fix_text').text(list_fix_text);
			
			$('input[name=list_fix]:radio[value="'+ list_fix +'"]').prop('checked',true);

			if(list_fix == 'Y') {
				$('#list_fix_options').removeClass('hide');
			}
			else {
				$('#list_fix_options').addClass('hide');
			}
			
			result = ajaxData.result;
		}
	});

	return result == "success";
}

//공지 노출 수 저장
function update_notice_cnt() {
	var result = null;
	var notice_cnt = $('[name=notice_cnt]').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_notice_cnt",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'count' : notice_cnt },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				var count_text = notice_cnt == 0 ? '모두' : notice_cnt +'개';
				
				document.modify_idx = null;
				$('.set_enable .set_cancel').click();
				$('.notice_cnt_text').text(count_text);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 이미지 수정
function modify_minor_img(type) {
	var reg_acceptFileTypes = /(.|\/)(jpe?g|png)$/i;
	if(type == 'gate') reg_acceptFileTypes = /(.|\/)(jpe?g|png|gif)$/i;
    // Initialize the jQuery File Upload widget:
    $('#fileupload_'+ type).fileupload({
    	autoUpload: true,
        url: 'https://upimg.dcinside.com/mgallery/?id='+ mgall_id +'&type='+ type,
        maxFileSize: $('#fileupload_'+ type).data('maxsize'),
        minFileSize: 1,
        maxNumberOfFiles: 1,
        sequentialUploads: true,
        acceptFileTypes: reg_acceptFileTypes,
        beforeSend: null,
        done: function(e, data) {
        	var files = data.getFilesFromResponse(data);
        	var img_url = type == 'profile' ? files[0].url : files[0]._s2_url;
        	
            $('.mg_'+ type +'_img_preview').last().attr('src', files[0]._s1_url).data('value', img_url).show();
        }
    }).bind('fileuploadprocessfail', function (e, data) {
        alert(data.files[data.index].error);
    });
}

// 이미지 변경 (대문/짤)
function update_gallery_img(type) {
	
	type = type.split(',');
	
	var img_urls = {};
	var img_prev_urls = {};

	for(var i in type) {
		img_urls[type[i]] = $('#'+ type[i] +'_img_url').data('value');
		img_prev_urls[type[i]] = $('#'+ type[i] +'_img_url').data('prev');
	}
	
    $.ajax({
        type: "POST",
        url: "/ajax/managements_ajax/update_gallery_img",
        data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'img_urls' : img_urls, 'img_prev_urls' : img_prev_urls },
		dataType :	'json',
        cache : false,
        async : false,
        success: function(ajaxData) {
			if(ajaxData.result == "success") {
				location.reload(true);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			result = ajaxData.result;
        }
    });
    
    return typeof(result) != 'undefined' && result == "success";
}

// 대표 이미지 삭제
function del_minor_img(type) {
	$('.mg_'+ type +'_img_preview').last().attr('src', '').data('value', '').hide();
}

// 말머리 추가
function add_headtext() {
	var value = $('#headtext_word').val();
	var min_level = $('#headtext_word').data('minlevel');

	if(value.trim() == '') {
		alert('입력된 정보가 없습니다.');
		v_input.focus();
		return false;
	}
	
	if(value.length > 5) {
		alert('최대 5자까지 입력할 수 있습니다.');
		return false;
	}

	if($('#headtext_list > li').length >= 15 ) {
		alert('최대 15개까지 사용 가능합니다.');
		return false;
	}
	
	$('#headtext_word').val('');
	$('#headtext_list-tmpl').tmpl([{ 'key' : null, 'level' : min_level, 'value' : value}]).appendTo('#headtext_list');
	chk_seq();
}

// 말머리 수정 버튼
function modify_headtext(elm) {
	var parent_li = $(elm).closest('li');
	var v_input = $('.t_input', parent_li);
	var h_input = $('.headtext_input', parent_li);
	var max_txt = $('.max_txt', parent_li);
	var btn = $('.btn_modify', parent_li);
	
	// 수정
	if(parent_li.data('mode') != 'modify') {
		btn.text('완료').addClass('font_red');
		
		v_input.prop('disabled', false).addClass('add');
		//v_input.keyup();
		//max_txt.show();
		
		parent_li.data('mode', 'modify');
		
		$('.sp_img', elm).removeClass('icon_mdf');
		$('.sp_img', elm).addClass('icon_cpl');
	}
	// 완료
	else {
		if(v_input.val().trim() == '') {
			alert('입력된 정보가 없습니다.');
			v_input.focus();
			return false;
		}

		if(v_input.val().length > 5) {
			alert('최대 5자까지 입력할 수 있습니다.');
			return false;
		}
		
		btn.text('수정').removeClass('font_red');
		
		v_input.prop('disabled', true).removeClass('add');
		//max_txt.hide();
		h_input.val(v_input.val());
		
		parent_li.data('mode', '');
		
		$('.sp_img', elm).removeClass('icon_cpl');
		$('.sp_img', elm).addClass('icon_mdf');
		chk_seq();
	}
}

// 말머리 삭제
function del_headtext(elm) {
	var selected = $('input[name="default_selected"]').attr('data-no');
	var del_no = $('.headtext_input', $(elm).closest('li')).attr('data-no');
	
	if(selected != '' && del_no != '' && del_no == selected){
		alert("'글쓰기 시 기본 말머리'를 변경 후 삭제 가능합니다.");
		return false;
	}
	
	if(confirm('삭제하시겠습니까?')) {
		$(elm).closest('li').remove();
		chk_seq();
	}
}

// 말머리 저장
function update_headtext() {
	var result = null;
	var use_headtext = $('input[name=use_headtext]:checked').val();
	var headtext = new Array();
	var selected = $('input[name="default_selected"]').attr('data-no');
	var selected_txt = $('input[name="default_selected"]').val();
	
	//var default_text = '';
	
	if($('#headtext_list > li').length > 15) {
		alert('최대 15개까지 사용 가능합니다.');
		return false;
	}
	
	
	$('.headtext_input').each(function() {
	//	if($(this).val().trim() != '' && $(this).attr('name') == 'default_text'){
		//	default_text = $(this).val();
		if($(this).val().trim() != '') {
			headtext.push({'no': $(this).attr('data-no'), 'level': $(this).attr('data-lv'), 'value': $(this).val()});
		}
	});
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_headtext",
		data: { 'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'use_headtext' : use_headtext, 'headtext' : headtext, 'selected' : selected, 'selected_txt' : selected_txt },
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				var headtext_text = use_headtext == '1' ? '사용함' : '사용안함';
				
				document.modify_idx = null;
				$('.set_enable .set_cancel').click();
				$('#headtext_text').text(headtext_text);
				
				$('#headtext_word').val('');

				$('#headtext_list li .headtext_input').each(function() {
					if(!$(this).attr('data-no')) {
						var array_search = function(str, arr) {
						    for( var key in arr ){
						        if( arr[key] == str ) break;
						        key = false;
						    }
						    return false || key;
						}
						
						var this_no = array_search($(this).val(), ajaxData.headtext.data);
						
						if(this_no) {
							$(this).attr('data-no', this_no);
						}
					}
				});
				
				$('#headtext_list li input.add').each(function() {
					var val = $('.headtext_input', $(this).closest('li')).val();
					$('.t_input', $(this).closest('li')).val(val);
					modify_headtext($(this));
				});

				$('#headtext_list .sp_img.icon_cpl').removeClass('icon_cpl').addClass('icon_mdf');
				$('#headtext_list .option_box').hide();
				
				result = ajaxData.result;
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
		}
	});
	
	return result == "success";
}

// 권한 옵션 레이어 열/닫
function sel_headtext_lv(elm) {
	var selected = $('input[name="default_selected"]').attr('data-no');
	var no = $('.option_box', $(elm).closest('li')).parents('.authority_set').siblings('.headtext_input').attr('data-no');
	
	if(selected && no == selected){
		alert("'글쓰기 시 기본 말머리'를 변경 후 수정 가능합니다.");
		return false;
	}
	
	$('.option_box', $(elm).closest('li').siblings()).hide();
	toggle_layer($(elm).next());
}

function set_headtext_lv(elm) {
	var lv = $(elm).attr('data-value');
	var txt = $(elm).text();
	var array_box_html = $('.select_area', $(elm).closest('.select_arraybox')).html().replace(/^[^<]*/, '');
	
	$('.headtext_input', $(elm).closest('.ui-state-default')).attr('data-lv', lv);
	$('.select_area', $(elm).closest('.select_arraybox')).html(txt + array_box_html);
	$(elm).parent().hide();
	chk_seq();
}

// 개념글 기준 입력 체크
function chk_recom_input(elm) {
	if($(elm).data('bak') == $(elm).val()) {
		return false;
	}
	
	$(".concept_range .alert_txt").remove();

	var allow_char = /^[0-9]+$/;
	
	if($(elm).val() && !allow_char.test($(elm).val())) {
		$(elm).val($(elm).val().replace(/[^0-9]/g, ''));
		
		$(elm).parent().siblings('.tiptxt').hide();
		$(elm).parent().after($('#error_msg-tmpl').tmpl([{'icon' : 'X', 'msg' : '숫자만 입력할 수 있습니다.'}]));

		$(elm).data('bak', $(elm).val());
		window.event = null;
		
		return false;
	}
	
	$(elm).parent().siblings('.tiptxt').show();
}

// 태그 체크
function chk_set_length_tag(elm) {
	chk_str_length(elm);
	add_tag_input(elm);
}

// 태그 입력
function add_tag_input(elm) {
	if($(elm).data('bak') == $(elm).val()) {
		return false;
	}
	
	$(".tag .alert_txt").remove();

	var allow_char = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9ㅣ\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]+$/;
	
	if($(elm).val() && !allow_char.test($(elm).val())) {
		$(elm).val($(elm).val().replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9ㅣ\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/g, ''));
		
		var alert_before_class = $(elm).attr('data-alert_class') || 'max_txt';
		
		$('.'+ alert_before_class, $(elm).parent().parent().parent()).siblings('.tiptxt').hide();
		$('.'+ alert_before_class, $(elm).parent().parent().parent()).after($('#error_msg-tmpl').tmpl([{'icon' : 'X', 'msg' : '한글, 영문, 숫자만 입력할 수 있습니다.'}]));

		$(elm).data('bak', $(elm).val());
		
		chk_str_length(elm);
		
		return false;
	}
	
	$('.tag .max_txt').siblings('.tiptxt').show();
	
	if($(elm).parent().hasClass('cont_box') && $('.tag input').length < 10 && $('.tag input').length == $(elm).index() + 1) {
		var cinp = $('.tag input').last().clone();
		$(cinp).val('');
		$('.tag input').last().after(cinp).after("\n");
	}
}

// 입력 길이 체크
function chk_str_length(elm) {
	var find_maxcount = function(elm) {
		if($('.max_txt b', $(elm).parent()).index() >= 0) {
			return $('.max_txt', $(elm).parent());
		}
		else {
			return find_maxcount($(elm).parent());
		}
	}
	
	var inputVal =		$(elm).val();
	var nInputVal =		inputVal.length;
	var maxcount_elm =	find_maxcount(elm);
	var maxcount =		$('b', maxcount_elm.eq(0)).text();
	
	if (nInputVal > maxcount) {
		inputVal = inputVal.substr(0, maxcount);
		nInputVal = maxcount;
		$(elm).val(inputVal);
	}
	
	$('span', maxcount_elm.eq(0)).text(nInputVal);
}
//팝업 열기/닫기
function showLayer(layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}
//글쓰기 시 기본 말머리 정렬
function chk_seq() {	
	var head_txt = '<li data-value="" data-name="없음" onclick="set_headtext_default(this);">없음</li>';
	var nHCnt = 0;
	$(".headtext_input").each(function(index){
		if($(this).val() != "" && $(this).attr('data-lv') == $('#headtext_word').data('minlevel')) {
			head_txt += "<li data-value='"+$(this).attr('data-no')+"' data-name='"+$(this).val()+"' onclick='set_headtext_default(this);'>"+$(this).val() + "</li>";
			nHCnt++;
		}
	});
	$('#sel_default_headtext').html(head_txt)
}
//글쓰기 시 기본 말머리 선택
function set_headtext_default(elm) {
	var key = $(elm).attr('data-value');
	var txt = $(elm).text();
	var array_box_html = $('.select_area', $(elm).closest('.select_arraybox')).html().replace(/^[^<]*/, '');
	
	$('.default_selected', $(elm).closest('.set_write_subject')).attr('data-no', key);
	$('.default_selected', $(elm).closest('.set_write_subject')).val(txt);
	$('.select_area', $(elm).closest('.select_arraybox')).html(txt + array_box_html);
	$(elm).parent().hide();
}

// 특정 ip 대뎍 입력 레이어
function in_kcaptcha_ips() {
	showLayer('kcaptcha_ips_layer');
}

// ip대역 update
function update_avoid_ips() {
	var result = null;
	var kcaptcha_ips = $('[name=kcaptcha_ips]').val();
		
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_kcaptcha_ips",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'kcaptcha_ips' : kcaptcha_ips
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				in_kcaptcha_ips();
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}

			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 공개 설정
function update_list_only_member() {
	var result = null;
	var list_only_member = $('input[name=list_only_member]:checked').val();
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_list_only_member",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'list_only_member' : list_only_member
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				document.modify_idx = null;
				$('.set_enable .set_cancel').click();

				var list_only_member_text = list_only_member == '1' ? '멤버' : '고정닉';
				$('#list_only_member_text').text(list_only_member_text);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
			}
			
			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 멤버
function update_membership() {
	var result				= null;
	var membership_text		= $('#membership_text');
	var membership			= $('input[name=membership]:checked').val();
	var member_limit		= $('input[name=member_limit]').val();
	var new_join			= $('input[name=new_join]:checked').val();
	var auto_approval		= $('input[name=auto_approval]:checked').val();
	var use_join_question	= $('input[name=use_join_question]:checked').val();
	var join_question		= $('input[name=join_question]').val();
	
	if(membership && membership != membership_text.data('value')) {
		if(membership_text.data('allowed') == false) {
			alert($('.allowed_membership.tiptxt').text());
			return false;
		}
		
		if(membership == '1') {
			if(!confirm('멤버 사용함으로 변경 시, 말머리의 모두와 고정닉 권한은 멤버 권한으로 자동 변경 됩니다. 수정하시겠습니까?')) {
				return false;
			}
		}
		else {
			if(!confirm('멤버 사용안함으로 변경 시, 기존 멤버는 모두 자동 탈퇴됩니다. 기존에 설정된 공개 설정은 고정닉 공개로, 말머리의 멤버 권한은 모두 또는 고정닉 권한으로 자동 변경 됩니다. 수정하시겠습니까?')) {
				return false;
			}
		}
	}
	
	if(use_join_question != '0') {
		if(!join_question) {
			alert('가입 질문을 입력해주세요.');
			$('input[name=join_question]').focus();
			return false;
		}
	}
	else {
		join_question = '';
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_membership",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'membership' : membership, 'member_limit' : member_limit, 'new_join' : new_join, 'auto_approval' : auto_approval, 'use_join_question' : use_join_question, 'join_question' : join_question
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				if(membership && membership != $('#membership_text').data('value')) {
					location.reload();
				}
				else {
					document.modify_idx = null;
					$('.set_enable .set_cancel').click();

					print_membership_text(membership, member_limit, new_join, auto_approval, join_question);
				}
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
				return false;
			}
			
			result = ajaxData.result;
		}
	});

	return result == "success";
}

// 멤버 설정 출력
function print_membership_text(membership, member_limit, new_join, auto_approval, join_question) {
	var membership_text = '';
	var relate_wordlist_text = '';

	if(membership == '1' || (membership != '0' && membership == $('#membership_text').data('value'))) {
		membership_text = '사용함';
		relate_wordlist_text = '멤버 수 ';
		relate_wordlist_text += member_limit > 0 ? member_limit : '제한 없음';
		relate_wordlist_text += ' | ';
		relate_wordlist_text += '가입 신청 ';
		relate_wordlist_text += new_join == 1 ? '받기' : '받지 않기';
		relate_wordlist_text += ' | ';
		relate_wordlist_text += auto_approval == 1 ? '자동' : '직접';
		relate_wordlist_text += ' 승인';
		relate_wordlist_text += ' | ';
		relate_wordlist_text += '가입 질문 ';
		relate_wordlist_text += join_question ? '사용함' : '사용안함';

		$('#membership_text').siblings('.relate_wordlist').children('.result_word').text(relate_wordlist_text);
		$('#membership_text').siblings('.relate_wordlist').show();
	}
	else {
		membership_text = '사용안함';
		$('#membership_text').siblings('.relate_wordlist').hide();
	}
	
	$('#membership_text').text(membership_text);
}

// 익명 체크
function chk_anonymous() {
	var anonymous_name		= $('input[name=anonymous_name]').val();
	
	if($('input[name=anonymous_name]').data('last_value') == anonymous_name) {
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/chk_anonymous",
		data: { 'ci_t' : csrf_token, 'gallery_id': mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'anonymous_name': anonymous_name },
		dataType : 'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				$('.anonymous_name_fail_msg').html($('#error_msg-tmpl').tmpl([{'icon' : 'X', 'msg' : ajaxData.msg}])).show();
				$('input[name=anonymous_name]').val(anonymous_name.replace(/[^0-9a-zㄱ-ㅎㅏ-ㅣ가-힣]/iug, ''));
				$('input[name=anonymous_name]').data('last_value', anonymous_name.replace(/[^0-9a-zㄱ-ㅎㅏ-ㅣ가-힣]/iug, ''));
			}
			else {
				$('input[name=anonymous_name]').data('last_value', anonymous_name);
				$('.anonymous_name_fail_msg').hide();
			}
		}
	});
}

// 익명
function update_anonymous() {
	var result				= null;
	var anonymous			= $('input[name=anonymous]:checked').val();
	var anonymous_name		= $('input[name=anonymous_name]').val();
	var manager_view		= $('input[name=manager_view]:checked').val() || 0;
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_anonymous",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'anonymous' : anonymous, 'anonymous_name' : anonymous_name, 'manager_view' : manager_view
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				var anonymous_text = anonymous == '1' ? '사용함' : '사용안함';
				
				document.modify_idx = null;
				$('.set_enable .set_cancel').click();
				$('#anonymous_text').text(anonymous_text);
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
				return false;
			}
			result = ajaxData.result;
		}
	});

	return result == "success";
}

function update_ipblock() {
	var result = null;
	var proxy_time		= $('input[name=proxy_time]').val();
	var mobile_time		= $('input[name=mobile_time]').val();
	var img_block_time	= $('input[name=img_block_time]').val();
	var proxy_use = 0;
	var mobile_use = 0;
	var img_block_use = $('.img_block .update_time').data('use');
	var img_block_use_set = $('.img_block .update_time').data('use_set');
	var img_block = [];
	
	if($('.proxy .update_time').siblings('.on').css('display') !== 'none') {
		proxy_use = 1; 
	}
	
	if($('.mobile .update_time').siblings('.on').css('display') !== 'none') {
		mobile_use = 1; 
	}
	
	if($('.img_block .update_time').siblings('.on').css('display') == 'none') {
		img_block_use = -1; 
	}
	
	if(typeof(img_block_use_set) != 'undefined') {
		img_block_use_set = img_block_use_set.split('');
		for(var i in img_block_use_set) {
			img_block.push(img_block_use_set[i]);
		}
	}
	
	$.ajax({
		type: "POST",
		url: "/ajax/managements_ajax/update_ipblock",
		data: { 
			'ci_t' : csrf_token, 'gallery_id' : mgall_id, '_GALLTYPE_': _GALLERY_TYPE_, 'proxy_time' : proxy_time, 'mobile_time' : mobile_time, 'proxy_use' : proxy_use, 'mobile_use' : mobile_use, 'img_block_use' : img_block_use, 'img_block_time' : img_block_time, 'img_block' : img_block
		},
		dataType :	'json',
		cache : false,
		async : false,
		success: function(ajaxData) {
			if(ajaxData.result == "success") {
				var ipblock_text = [];
				var img_block_text = [];
				
				if(proxy_use) {
					ipblock_text.push('VPN');
				}
				if(mobile_use) {
					ipblock_text.push('통신사 IP');
				}
				
				if(img_block_use) {
					if(img_block_use < 0) {
						img_block_text.push('사용안함');
					}
					else if(img_block.indexOf('A') >= 0) {
						img_block_text.push('전체 비회원');
					}
					else {
						if(img_block.indexOf('P') >= 0) {
							img_block_text.push('VPN');
						}
						if(img_block.indexOf('M') >= 0) {
							img_block_text.push('통신사 IP');
						}
					}

					$('.img_block .update_time').data('use', 0);
					
					img_block_text = img_block_text.length > 0 ? img_block_text.join(', ') : '사용안함';
					$('#img_block_text').text(img_block_text);
				}

				ipblock_text = ipblock_text.length > 0 ? ipblock_text.join(', ') : '사용안함';
				$('#ipblock_text').text(ipblock_text);
				
				$('.select_area', $('input[name=img_block_time]').parent()).html('선택 <em class="sp_img icon_option_more"></em>');
				$('input[name=img_block_time]').val('');
				
				$('#img_block_all').closest('.cont_inr').removeClass('all');
				if(typeof(img_block_use_set) != 'undefined') {
					$("input[name='img_block[]']").prop('checked', false);

					for(var i in img_block_use_set) {
						$("input[name='img_block[]'][value='"+ img_block_use_set[i] +"']").prop('checked', true);
					}
				}

				$("input[name='img_block[]']:checked").each(function() {
					if($(this).val() == 'A') {
						$('#img_block_all').closest('.cont_inr').addClass('all');
					}
				});
				
				document.modify_idx = null;
				
				$('.set_enable .set_cancel').click();
			}
			
			if(typeof(ajaxData.msg) != 'undefined' && ajaxData.msg) {
				alert(ajaxData.msg);
				return false;
			}
			result = ajaxData.result;
		}
	});
	
}

