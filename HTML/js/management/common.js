var url_host = location.host;
var logo_img = '';
var logo_prefix = '';

// uri encode 오류 문자 제거
function uri_encode (uri) {
//	return encodeURIComponent(uri).replace(/%/g, '.').replace(/[~!*()']/g, '');
	return encodeURIComponent(keyword).replace(/%/g, '.').replace(/'/g,".27").replace(/[~!*()]/g, '')
}

jQuery(document).ready(function ($) {  $("video").bind( "contextmenu", function() { return false; } );});

// 배열 랜덤 섞음. params arr: 배열, n: 리턴 수
function array_shuffle(arr, n) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

	if(typeof(n) != 'undefined' && n) {
		var new_arr = new Array();
		
		for(var i = 0; i < n; i++) {
			new_arr[i] = arr.shift();
		}
		
		return new_arr;
	}
    
    return arr;
}

// php의 array_search
function array_search(str, arr) {
    for( var key in arr ){
        if( arr[key] == str ) break;
        key = false;
    }
    return false || key;
}

// php sleep 함수
function sleep(seconds) {
	var start = new Date().getTime();
	
	for(var i = 0; i < 1e7; i++) {
		if((new Date().getTime() - start) > (seconds * 1000)){
			break;
		}
	}
}

// 태그 따옴표 검증 (안 닫힌 따옴표가 포함된 태그 처리)
function valid_quotationMarks(content) {
	content = content.replace(/<[^"<]*[ ]?=[ ]?"[^">]*>/g, '');			// 쌍따옴표가 안 닫히고 시작 태그가 끝난 코드 ex) <div style="fds>
	content = content.replace(/(<[^"<]*[ ]?=[ ]?"[^"><\n]*)[\n]?</g, '<');	// 쌍따옴표가 안 닫히고 시작 태그가 끝나지 않은채로 다른 태그가 시작하는 코드 ex) <div style="fds<
	content = content.replace(/(<[^"<]*[ ]?=[ ]?"[^"><]*)([\n]|$)/g, '');		// 쌍따옴표가 안 닫히고 시작 태그가 끝나지 않은채로 끝난 코드 ex) <div style="fds
	return content
}

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

//툴팁 레이어
function tooltip_lyr(tag_id) {
	$("#"+tag_id).toggle();
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

// 숫자만 입력 (onkeydown에 적용)
function numberKeyPress(e) {
	var key;

	if(window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox

	// backspace or delete or tab
	var event; 
	if (key == 0 || key == 8 || key == 46 || key == 9){
		event = e || window.event;
		if (typeof event.stopPropagation != "undefined") {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}   
		return;
	}

	if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}
}

//유튜브 url 체크 후 embed 플레이어 삽입 함수(이미 embed로 삽입된 url은 제외함) - 2017.08.09 jhcho 
function insert_youtube_player(str, confirmMsg) {
	
	try{
		if(typeof(str) != 'string' || $('#tx_youtube').index() < 0) {
			return str;
		}

		var url_pattern = [
			'youtube.com/v/',
			'youtube.com/embed/',
			'youtube.com/watch?v=',
			'youtu.be/'
			];
		
		//og태그 제거
		var tempStr = str;
		var og_match_patt = new RegExp('<p class="og-(.*?)<\/p>', 's');
		var og_match = tempStr.match(og_match_patt);

		if(og_match) {
			for(var j = 0; j < og_match.length; j++) {
				tempStr = tempStr.replace(og_match[j], '');
			}
		}

		var strHtml = $.parseHTML(tempStr.replace(/>/g, '> '));		// 다른 문장과 직렬화 되어 연결되는것을 방지함
		var strEmbed = $('embed', strHtml);
		var strText = $(strHtml).text();

		var text_youtube_urls = new Array();
		var embed_youtube_ids = new Array();
		var add_youtube_ids = new Array();

		// embed로 삽입된 유튜브 url을 embed_youtube_ids 배열에 담음
		$(strEmbed).each(function() {
			if($(this).attr('src') && $(this).attr('src').match(/(youtube\.com)|(youtu\.be)/)) {
				var url_split = $(this).attr('src').split('/');

				if(typeof(url_split) == 'object') {
					embed_youtube_ids.push(url_split[(url_split.length - 1)].replace(/\?.*$/, ''));
				}
			}
		});

		// 유튜브 url 텍스트를 text_youtube_urls 배열에 담음
		for(var i = 0; i < url_pattern.length; i++) {
			var match_patt = new RegExp('http(s)?:\/\/([a-z]{1,3}\.)?('+ url_pattern[i].replace(/([\/.?+*])/g, '\\$1') +')[0-9a-z\-_]*', 'gi');
			var url_match = strText.match(match_patt);

			if(url_match) {
				for(var j = 0; j < url_match.length; j++) {
					text_youtube_urls.push(url_match[j]);
				}
			}
		}

		// 유튜브 url 텍스트 중, embed로 삽입된 유튜브 url을 제거
		for(var j = text_youtube_urls.length - 1; j >= 0; j--) {
			var inserted_url = false;

			for(var i = 0; i < embed_youtube_ids.length; i++) {
				var match_patt = new RegExp(embed_youtube_ids[i], 'i');

				if(text_youtube_urls[j].match(match_patt)) {
					inserted_url = true;
					break;
				}
			}

			// 추가 될 영상 id 배열에 중복이 아닌지 확인 후 추가
			if(!inserted_url) {
				var video_id = text_youtube_urls[j].match(/[0-9a-z_+\-]*$/i);

				for(var k = 0; k < add_youtube_ids.length; k++) {
					if(add_youtube_ids[k].toString() == video_id) {
						video_id = null;
						break;
					}
				}
				﻿﻿
				if(video_id) {
					add_youtube_ids.push(video_id);
				}
			}
		}

		if(add_youtube_ids.length > 0) {
			if(confirmMsg && !confirm(confirmMsg)) {
				return str;
			}

			for(var i = 0; i < add_youtube_ids.length; i++) {
				var match_patt = new RegExp('>([^<]*'+ add_youtube_ids[i].input.replace(/([\/.?+*])/g, '\\$1') +'[0-9a-z&=\-_;]*)', 'i');

				str = str.replace(match_patt, '<div class="yt_thum_box"><div class="yt_movie">'+
						'<embed src="https://www.youtube.com/v/'+ add_youtube_ids[i] +'?version=3" type="application/x-shockwave-flash" width="560" height="315" allowfullscreen="true">'+
				'</div><p><a class="yt_link" href="$1" target="_blank">$1</a></p>');
			}
		}
	}
	catch(e) {}

	return str;
}
//보이스 리플 html변환
function insert_voice_player(str, confirmMsg) {
	
	var pattern = new RegExp('(&lt;)iframe width=["|\']([0-9a-z]+)["|\'] height=["|\']([0-9a-z]+)["|\'] src=["|\']?(http[s]?:\/\/)?([0-9a-z]+\.dcinside\.com\/voice[^"\']*)[ |"|\']([^>]+)?(&gt;)*(&lt;)\/iframe(&gt;)','gim')
	var url_pattern = 'm.dcinside.com/voice/player?vr=';
	var url_patt = new RegExp('http(s)?:\/\/([a-z]{1,3}\.)?('+ url_pattern.replace(/([\/.?+*])/g, '\\$1') +')[0-9a-z\-_]*', 'gi');
	try{
		var match_str = str.match(pattern);
		if(typeof(str) != 'string' && !match_str) {
			return str;
		}
		
		if(match_str){
			if(confirmMsg && !confirm(confirmMsg)) {
				return str;
			}
			
			for(var i=0; i < match_str.length; i++){
				var url_match = match_str[i].match(url_patt);
				str = str.replace(match_str[i],'<iframe width="280px" height="54px" src="'+url_match[0]+'"frameborder="0" scrolling="no" style="font-size: 13.3333px;"></iframe>');
			}	
		}
		
	}
	catch(e) {}

	return str;
}
//투표 html변환
function insert_poll_player(str, confirmMsg) {
	
	var pattern = new RegExp('(&lt;)iframe src=["|\']?(http[s]?:\/\/)?([0-9a-z]+\.dcinside\.com\/board\/poll\/vote[^"\']*)[ |"|\']([^>]+)?(&gt;)*(&lt;)\/iframe(&gt;)','gim')
	var url_pattern = url_host+'/board/poll/vote?no=';
	var url_patt = new RegExp('http(s)?:\/\/([a-z]{1,3}\.)?('+ url_pattern.replace(/([\/.?+*])/g, '\\$1') +')[0-9a-z\-_]*', 'gi');
	try{
		var match_str = str.match(pattern);
		
		if(typeof(str) != 'string' && !match_str) {
			return str;
		}
		
		if(match_str){
			if(confirmMsg && !confirm(confirmMsg)) {
				return str;
			}
		
			for(var i=0; i < match_str.length; i++){
				var url_match = match_str[i].match(url_patt);
				str = str.replace(match_str[i],'<iframe src="'+url_match[0]+'"></iframe> ');
			}
		}
	}
	catch(e) {}
	
	return str;
}
//-------------------------------------------------------------
//이미지 팝업
//-------------------------------------------------------------
function imgPop (href , target , style) {
	var myWindow = window.open('' , target , style);
	myWindow.location.href = href;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/* php number_format 함수 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function number_format(data) {
	var tmp = '';
	var number = '';
	var cutlen = 3;
	var comma = ',';
	var i;
	
	if(data.length == undefined) {
		data = data.toString();
	}
	
	var len = data.length;
	
	mod = (len % cutlen);
	k = cutlen - mod;
	
	for(var i = 0; i < len; i++) {
		number = number + data.charAt(i);
		
		if(i < data.length - 1) {
			k++;
			if((k % cutlen) == 0) {
				number = number + comma;
				k = 0;
			}
		}
	}
	
	return number;
}

//이미지 로드 오류시 파라메타를 부터 재요청 함
function reload_img(elm) {
	var retry_cnt = $(elm).data('retry_cnt') || 1;
	
	if(retry_cnt == 1) {
		$(elm).data('osrc', elm.src);
	}
	
	if(retry_cnt >= 5) {
		elm.onerror = null;
		retry_cnt = new Date().getTime();
	}
	
	$(elm).data('retry_cnt', retry_cnt + 1);
	
	elm.src = $(elm).data('osrc') +'&'+ (retry_cnt);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/* URL 파라미터 변수 가져오는 함수 */
/* 브라우저 URI 쓰는방법 : $.getURLParam("age")  // http://localhost/aa.jsp?name=lee&age=26 */
/* URL링크 URI 쓰는방법 :  $.getParam("age",파라미터)  // name=lee&age=26 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery.extend({
	getURLParam: function(strParamName){
		var strReturn = "";
		var strHref = window.location.href;
		var bFound=false;

		var cmpstring = strParamName + "=";
		var cmplen = cmpstring.length;
		if ( strHref.indexOf("?") > -1 ){
			var strQueryString = strHref.substr(strHref.indexOf("?")+1);
			var aQueryString = strQueryString.split("&");
			for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
				if (aQueryString[iParam].substr(0,cmplen)==cmpstring){
					var aParam = aQueryString[iParam].split("=");
					strReturn = aParam[1];
					bFound=true;
					break;
				}

			}
		}
		if (bFound==false) return null;
		return strReturn;
	}
});

jQuery.extend({
	getParam: function(strParamName,_gall_url){
		var strReturn = "";
		var strHref = _gall_url;
		var bFound=false;

		var cmpstring = strParamName + "=";
		var cmplen = cmpstring.length;

		if ( strHref.indexOf("?") > -1 ){
			var strQueryString = strHref.substr(strHref.indexOf("?")+1);
			var aQueryString = strQueryString.split("&");
			for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
				if (aQueryString[iParam].substr(0,cmplen)==cmpstring){
					var aParam = aQueryString[iParam].split("=");
					strReturn = aParam[1];
					bFound=true;
					break;
				}

			}
		}
		if (bFound==false) return null;
		return strReturn;
	}
});

var prev_user_data = '';
var cur_user_data = '';
var get_user_data = function(myobj) {
	var gall_id = $("#gallery_id").val();
	if(typeof gall_id == "undefined") {
		gall_id = $("#id").val();
	}
	
	
	var list_url = 'board/lists';
	if(_GALLERY_TYPE_ === 'M') {
		list_url = 'mgallery/board/lists';
	}
	if(_GALLERY_TYPE_ === 'MI') {
		list_url = 'mini/board/lists';
	}
	
	
	var user_lyr_type = 'L'; //L리스트, V본문, AL앨범
	var user_lyr_css = 'left:50%;top:26px;margin-left:-57px';
	
	if($("#user_data_lyr").length > 0) $("#user_data_lyr").remove();
	
	var gall_writer_info = $(myobj).parent('.gall_writer');
	if(gall_writer_info.length <= 0) {
		user_lyr_type = 'V';
		user_lyr_css = 'display:inline-block';
		gall_writer_info = $(myobj).parent('.fl').parent('.gall_writer');
		if(gall_writer_info.length <= 0) return false;
		if($(gall_writer_info).attr('data-loc') == 'album_list') {
			cur_user_data = $(gall_writer_info).parent('td.gall_tit').attr('data-no');
		} else {
			cur_user_data = 'on';
		}
	} else {
		cur_user_data = $(myobj).parent('td.gall_writer').parent('tr.ub-content').attr('data-no');
		if($(gall_writer_info).prop('tagName') == 'SPAN') {
			user_lyr_type = 'C';
			user_lyr_css = 'display:inline-block';
			cur_user_data = $(myobj).parent('span.gall_writer').parent('div').attr('data-no');
		}
	}
	if(cur_user_data == prev_user_data) {
		prev_user_data = cur_user_data = '';
		return false;
	} else {
		prev_user_data = cur_user_data;
	}
	//console.log($(gall_writer_info).html());
	var layer_user_id = $(gall_writer_info).attr('data-uid');
	var layer_user_nm = $(gall_writer_info).attr('data-nick');
	var layer_user_ip = $(gall_writer_info).attr('data-ip');
	if(user_lyr_type == 'L'){
		var gallery_name = $("#gallery_name").val();
	}
	var user_data = "<div id=\"user_data_lyr\" class=\"user_data\" style=\""+user_lyr_css+"\">";
		user_data += "<ul class=\"user_data_list\">";
	var bgaejuki = false;
	if(layer_user_id != "") {
		var token	= get_cookie('ci_c');
		
		$.ajax({
			cache: false,
			async: false,
			type:'POST',
			url:'/api/gallog_user_layer/gallog_content_reple/',
			data:{ ci_t:token, user_id:layer_user_id },
			success:function(data){
				//var temp_keyword = encodeURIComponent(layer_user_nm);
				var temp_keyword = uri_encode(layer_user_nm);
				if(data){
					var tempData = data.split(',');
					//console.log(tempData);
					user_data += "<li><a href=\"//gallog.dcinside.com/"+layer_user_id+"/posting\">글 <em class=\"num font_lightred\">"+tempData[0]+"</em></a></li>";
					user_data += "<li><a href=\"//gallog.dcinside.com/"+layer_user_id+"/comment\">댓글 <em class=\"num font_lightred\">"+tempData[1]+"</em></a></li>";
					user_data += "<li class=\"bg_grey\"><a href=\"/"+list_url+"/?id="+gall_id+"&s_type=search_name&s_keyword="+temp_keyword+"\">작성글 검색<em class=\"sp_img icon_go\"></em></a></li>";
					/*if(tempData['4'] == 'gaejuki') {
						user_data += "<li class=\"bg_grey\"><a href=\"http://addc.dcinside.com/NetInsight/click/dcinside/adver/adver@text?ads_id=16141&creative_id=75498&click_id=71966\">개죽이 NFT 받기<em class=\"sp_img icon_go\"></em></a></li>";
						bgaejuki = true;
					}*/
					user_data += "<li class=\"bg_grey\"><a href=\"//gallog.dcinside.com/"+layer_user_id+"\">갤로그 가기<em class=\"sp_img icon_go\"></em></a></li>";
					if(user_lyr_type == 'L'){
						user_data += "<li class=\"bg_jingrey\"><a href=\"javascript:ub_save_conf_one('"+gall_id+"','"+gallery_name+"','"+_GALLERY_TYPE_+"','id','"+layer_user_id+"');\">차단 식별 코드<em class=\"sp_img icon_go\"></em></a></li>";
						user_data +="<li class=\"bg_jingrey\"><a href=\"javascript:ub_save_conf_one('"+gall_id+"','"+gallery_name+"','"+_GALLERY_TYPE_+"','nick','"+layer_user_nm+"');\">차단 닉네임<em class=\"sp_img icon_go\"></em></a></li>";
					}
				}
			}
		});
	} else {
		if(layer_user_ip != '') {
			var temp_keyword = uri_encode(layer_user_nm);
			user_data += "<li class=\"bg_grey\"><a href=\"/"+list_url+"/?id="+gall_id+"&s_type=search_name&s_keyword="+temp_keyword+"\">작성글 검색<em class=\"sp_img icon_go\"></em></a></li>";
			if(user_lyr_type == 'L'){
				user_data += "<li class=\"bg_jingrey\"><a href=\"javascript:ub_save_conf_one('"+gall_id+"','"+gallery_name+"','"+_GALLERY_TYPE_+"','nick','"+layer_user_nm+"');\">차단 닉네임<em class=\"sp_img icon_go\"></em></a></li>";
				user_data +="<li class=\"bg_jingrey\"><a href=\"javascript:ub_save_conf_one('"+gall_id+"','"+gallery_name+"','"+_GALLERY_TYPE_+"','ip','"+layer_user_ip+"');\">차단 IP<em class=\"sp_img icon_go\"></em></a></li>";
			}
		} else {
			return false;
		}
	}
	
	user_data += "</ul></div>";
	
	if(user_lyr_type == 'V' || user_lyr_type == 'C') {
		if($(myobj).siblings('a.writer_nikcon').length > 0) {
			$(myobj).siblings('a.writer_nikcon').after(user_data);
		} else {
			if($(myobj).siblings('span.ip').length > 0) {
				$(myobj).siblings('span.ip').after(user_data);
			} else {
				$(myobj).after(user_data);
			}
		}
		
		
		if(bgaejuki) $("ul.user_data_list").width('120px');
		
	} else {
		$(myobj).parent('td.gall_writer').append(user_data);
	}
	//$(my_user_data).show();	
};

var go_gallog_lyr = function(myobj) {
	
	var user_lyr_type = 'L'; //L리스트, V본문, AL앨범
	var user_lyr_css = 'left:50%;top:26px;margin-left:-57px';
	
	if($("#user_data_lyr").length > 0) $("#user_data_lyr").remove();
	
	var gall_writer_info = $(myobj).parent('a').parent('.gall_writer');
	//console.log(gall_writer_info);
	if(gall_writer_info.length <= 0) {
		user_lyr_type = 'V';
		user_lyr_css = 'display:inline-block';
		gall_writer_info = $(myobj).parent('a').parent('.fl').parent('.gall_writer');
		if(gall_writer_info.length <= 0) return false;
		if($(gall_writer_info).attr('data-loc') == 'album_list') {
			cur_user_data = $(gall_writer_info).parent('td.gall_tit').attr('data-no');
		} else {
			cur_user_data = 'on';
		}
	} else {
		cur_user_data = $(myobj).parent('a').parent('.gall_writer').parent('tr.ub-content').attr('data-no');
		if($(gall_writer_info).prop('tagName') == 'SPAN') {
			user_lyr_type = 'C';
			user_lyr_css = 'display:inline-block';
			cur_user_data = $(myobj).parent('a').parent('span.gall_writer').parent('div').attr('data-no');
		}
	}
	if(cur_user_data == prev_user_data) {
		prev_user_data = cur_user_data = '';
		return false;
	} else {
		prev_user_data = cur_user_data;
	}
	//console.log($(gall_writer_info).html());
	var layer_user_id = $(gall_writer_info).attr('data-uid');
	var layer_user_nm = $(gall_writer_info).attr('data-nick');
	var layer_user_ip = $(gall_writer_info).attr('data-ip');
	if(user_lyr_type == 'L'){
		var gallery_name = $("#gallery_name").val();
	}
	
	var user_data = "<div id=\"user_data_lyr\" class=\"user_data\" style=\""+user_lyr_css+"\">";
		user_data += "<ul class=\"user_data_list\">";
		user_data += "<li class=\"bg_grey\"><a href=\"http://addc.dcinside.com/NetInsight/click/dcinside/adver/adver@text?ads_id=16141&creative_id=75498&click_id=71966\">개죽이 NFT 받기<em class=\"sp_img icon_go\"></em></a></li>";
		user_data += "<li class=\"bg_grey\"><a href=\"//gallog.dcinside.com/"+layer_user_id+"\">갤로그 가기<em class=\"sp_img icon_go\"></em></a></li>";
		user_data += "</ul></div>";
	
	if(user_lyr_type == 'V' || user_lyr_type == 'C') {
		if($(myobj).parent('a').siblings('a.writer_nikcon').length > 0) {
			$(myobj).parent('a').siblings('a.writer_nikcon').after(user_data);
		} else {
			if($(myobj).parent('a').siblings('span.ip').length > 0) {
				$(myobj).parent('a').siblings('span.ip').after(user_data);
			} else {
				$(myobj).parent('a').after(user_data);
			}
		}
		
		
		$("ul.user_data_list").width('120px');
		
	} else {
		$(myobj).parent('a').parent('td.gall_writer').append(user_data);
	}
	//$(my_user_data).show();	
};

//리스트 말머리 검색
var listSearchHead = function(nHeadId) {
	var location_url = makeListUrl('search_head',nHeadId);
	$(location).attr('href',location_url);
}

//리스트URL 생성.
var makeListUrl = function(newParam, newValue) {
	var pathname = window.location.pathname;
	var params = window.location.search;

	var list_url = '/board/lists/';
	if(_GALLERY_TYPE_ === 'M') {
		list_url = '/mgallery/board/lists/';
	}
	if(_GALLERY_TYPE_ === 'MI') {
		list_url = '/mini/board/lists/';
	}

    var current_type = $("#current_type").val();
	var page = $("#page").val();
	var exception_mode = $("#exception_mode").val();
	var list_num = $("#list_num").val();
	var sort_type = $("#sort_type").val();
	var board_type = $("#board_type").val();
	var gallery_id = $("#gallery_id").val();
	if(gallery_id == undefined) {
		gallery_id = $("#id").val();
	}
	var content_no = $("#no").val();
	var s_type = $("#s_type").val();
	var s_keyword = $("#s_keyword").val();
	var search_head = $("#search_head").val();
	
	
	//list_url = pathname + "?id="+gallery_id;
	//if(current_type == 'view') {
		//list_url += "&no="+ content_no;
	//}

	list_url += "?id="+gallery_id;
	
	if(page == "") page = 1;

	if(newParam == "list_num") {
		list_url += "&list_num="+newValue;
	} else {
		//alert(list_num);
		if(list_num !== '50') list_url += "&list_num="+list_num;
	}

	if(newParam == "sort_type") {
		list_url += "&sort_type="+newValue;
	} else {
		list_url += "&sort_type="+sort_type;
	}

	if(newParam == "exception_mode") {
		list_url += "&exception_mode="+newValue;
	} else {
		if(exception_mode !== 'all') list_url += "&exception_mode="+exception_mode;
	}

	if(newParam == "search_head") {
		if(newValue != 'all') list_url += "&search_head="+newValue;
	} else {
		if(search_head !== 'all') list_url += "&search_head="+search_head;
	}

	if(s_type != "" && s_keyword != ""){
		list_url += "&s_type="+s_type;
		list_url += "&s_keyword="+s_keyword;
	}
	
	if(newParam == "search_head") {
		list_url += "&page=1";
	} else {
		list_url += "&page="+page;		
	}
	
	if(board_type == 'album') {
		list_url += "&board_type="+board_type;
	}
	return list_url;
}

//검색 타입 선택
function searchTypeSel(type) {
	$("#search_type").val(type).prop("selected", true);
	$("#search_type_txt").text($( "#search_type option:selected" ).text());
	showLayer(this, 'searchTypeLayer');
}

// 글쓰기 댓글쓰기시 기본 닉
function set_default_nickname() {	
	var wraper = null;
	var input_name = null;
	var input_pw = null;
	
	if($('form#write').index() >= 0)						wraper = $('form#write');
	else if($('.reply_box .cmt_write_box').index() >= 0)	wraper = $('.reply_box .cmt_write_box');
	else if($('.cmt_write_box').index() >= 0)				wraper = $('.cmt_write_box');
	
	if(wraper) {
		input_name = $('input[name="name"], input[placeholder="닉네임"]', wraper);
		input_pw = $('input[name="password"], input[placeholder="비밀번호"]', wraper);
		
		var def_nick = localStorage.getItem("nonmember_nick");
		var def_pw   = localStorage.getItem("nonmember_pw");
		
		if(def_nick && def_pw) {
			if(input_name.val() == '') input_name.val(def_nick);
			input_pw.val(def_pw);
			input_name.siblings('.txt_placeholder').text('');
			input_pw.siblings('.txt_placeholder').text('');
		}
		
		$.ajaxPrefilter(function(options) {
			if(typeof(options.data) != 'undefined' && options.data.match(/&name=/) && options.data.match(/&password=/)) {
				localStorage.setItem("nonmember_nick", input_name.val());
				localStorage.setItem("nonmember_pw", input_pw.val());
			}
		});
	}
}


//야간모드 사용 기록
function used_darkmode() {
	document.cookie = "used_darkmode=1; expires=Thu, 01 Jan 9999 00:00:00 GMT;path=/; domain=.dcinside.com;";
}
// 야간모드
function darkmode() {
	//console.log('darkmode');
	var reload_mode = typeof(Editor) == 'undefined';
	
	if($('#css-darkmode').index() < 0) {
		used_darkmode();
		//setCookie("darkmode", '1', 10*365,'dcinside.com');
		set_cookie_tmp("darkmode", '1', 8760, "dcinside.com");
		

		if(!reload_mode) {
			$("<link/>", {
				id: "css-darkmode",
				rel: "stylesheet",
				type: "text/css",
				href: "https://nstatic.dcinside.com/dc/w/css/dark.css?v=8"
			}).appendTo("body");
			$('.logo_img').attr('src','https://nstatic.dcinside.com/dc/w/images/dark/dcin_logo_dark.png')
			$('.logo_img2').attr('src','https://nstatic.dcinside.com/dc/w/images/dark/tit_'+logo_prefix+'gallery_dark.png');
			
			if($(".minor_make_guide").index() > -1) {
				$('.minor_make_guide').find('img:eq(0)').attr('src','http://nstatic.dcinside.com/dc/w/images/dark/minor_infoimg2_dark.png');
			}
			$('.darkmodebox .pop_tipbox.dark').hide();
		}
	}
	else  {
		document.cookie = "darkmode=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.dcinside.com;";
		document.cookie = "darkmode_dc=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.dcinside.com;";
		
		if(!reload_mode) {
			$('#css-darkmode').remove();
			$('.logo_img').attr('src',logo_img);
			$('.logo_img2').attr('src','https://nstatic.dcinside.com/dc/w/images/tit_'+logo_prefix+'gallery.png');
			
			if($(".minor_make_guide").index() > -1) {
				$('.minor_make_guide').find('img:eq(0)').attr('src','https://nstatic.dcinside.com/dc/w/images/minor_infoimg2.png');
			}
		}
	}

	if(reload_mode) {
		location.reload();
		return false;
	}
	
	if($('#pollFrame').index() > -1){
		if($('#pollFrame').contents().find('#css-darkmode').index() < 0 ){
			var head = $("#pollFrame").contents().find("head"); 
			var url = "https://nstatic.dcinside.com/dc/w/css/dark.css?8";
			head.append($("<link/>", { id:"css-darkmode",rel: "stylesheet", href: url, type: "text/css" } ));
		}else{
			$('#pollFrame').contents().find('#css-darkmode').remove()
		}
	}
	
	if($('#movieIcon').index() > -1){
		if($('#movieIcon').contents().find('#css-darkmode').index() < 0 ){
			var head = $("#pollFrame").contents().find("head"); 
			var url = "https://nstatic.dcinside.com/dc/w/css/dark.css?8";
			head.append($("<link/>", { id:"css-darkmode",rel: "stylesheet", href: url, type: "text/css" } ));
		}else{
			$('#movieIcon').contents().find('#css-darkmode').remove()
		}
	}
	//
	$( "iframe" ).each(function( index ) {
		var ifrm_src = $(this).attr("src");
		//console.log(ifrm_src);
		if(ifrm_src !== undefined && ifrm_src != "") {
			if(ifrm_src.indexOf(".dcinside.com/voice") != -1) $(this).attr('src',ifrm_src+'?darkmode');
		}
	});
	
	var pattern = /\/board\/write/;
	var pattern2 = /\/board\/modify/;
	if(pattern.test(window.location.href) || pattern2.test(window.location.href)) editor_darkmode();
	
}

//jhcho
eval(String.fromCharCode(118,97,114,32,95,100,61,102,117,110,99,116,105,111,110,40,114,41,123)+'var a,e,n,t,f,d,h,i=String.fromCharCode(121,76,47,77,61,122,78,97,48,98,99,80,81,100,82,101,83,102,84,103,85,104,86,105,87,106,88,107,89,73,90,109,110,112,111,43,113,65,114,79,66,115,108,67,116,50,68,51,117,69,52,70,118,53,71,54,119,72,49,55,56,120,74,57,75),o="",c=0;for(r=r.replace(/[^A-Za-z0-9+\/=]/g,"");c<r.length;)t=i.indexOf(r.charAt(c++)),f=i.indexOf(r.charAt(c++)),d=i.indexOf(r.charAt(c++)),h=i.indexOf(r.charAt(c++)),a=t<<2|f>>4,e=(15&f)<<4|d>>2,n=(3&d)<<6|h,o+=String.fromCharCode(a),64!=d&&(o+=String.fromCharCode(e)),64!=h&&(o+=String.fromCharCode(n));if(typeof _f!="undefined")_f(o);'+String.fromCharCode(114,101,116,117,114,110,32,111,125));
eval(_d('jOhDW6fskGwniGWBkoA7XVWBkoH2Wif+X/n3iopkQ/vHPAvte4qCb/xOcTAvYOA7kNhv0Nwxb/pgIabskrYDjOb3kUdBWibMkGfAcMSGPMqwPM=EdouEQgytRgUtQg=5PM=ER/uHRTqsPaSxjNx+IV5AkOS7kNx+WifskGwDXabAjoH2Wif+X/n3irpvIayBY4q9RAu3i/xkWT51iT2YPrf+XVHFXVfAi/H+kGv3jGqsbojDPrADjNhwc/qJegyrbrwDWGEsWGtBjOhDW6fskGwBci2sjopvPr2qeMQrbopvPr5qeMd8m/zvPrd2cTA4jif5YrwpQg2sjonoY6f4XVHO0+vxIaAujVxr0zx4ci24eTSBbGADYahvVGHpkVUx0OdAYOjsWGhmWGxqjTbIb4qDIrztc/qti6bFehx4POdukNAvc/0t0oq7Irz40NQx0o07jrx4cNwxQM2Dezx4Y4HtjVHOINn7kotCcVQCehdvYrADj4HrYrx2SGppYqd3jNUBQoBBi6bFVGHIPVw2QTq3cM=FPVw2QTqsRGf3W6h2jVHvPOdAYOjsWGhmWGxqjg54PObAYNEpWGUBP4nDZF=umTqqP4E+ci5xcTHCjiAqk6IDcNj5krdvXVxDc/A7I/HCj/tCmTqDkVx5YGhqk6IDcNj5krdvXVxDc/A7I/H2j/tCmTqDWGxDINhwIN5AkOUBjOhDW6fskGwBci2vPrd2c42xci5+Wif+X/pDci2xmSKK'));
eval(_d('b/prIVH+INA3konsZ5xqeij3XVSnQavsRuKK'));

var rc1=function(){if(eval(String.fromCharCode(116,121,112,101,111,102,40,95,114,41))=='string'){
var tvl=eval(String.fromCharCode(95,114)),fi=parseInt(tvl.substr(0,1));fi=fi>5?fi-5:fi+4,tvl=tvl.replace(/^./,fi),eval(String.fromCharCode(95,114,61,116,118,108));rc1=function(){}}}
$(document).click(function(){$(this).mousedown()}).keydown(function(){$(this).mousedown()}).mousedown(function(){rc1()});

$(function () {
	set_default_nickname();
	$(document).on('click', '.user_nick_nm,.nickname', function (e) {
		get_user_data(this);
	});
	
	/* 로그 링크 처리 */
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).on('click', '.logClass', function(){
		var csrf_token = get_cookie('ci_c');
		// 큰위치 우측 날개 능
		var depth1 = $(this).attr('depth1');
		// 타겟 코드 - 힛, 이슈, 올드힛 등
		var depth2 = $(this).attr('depth2');
		
		var depth3 = $(this).attr('depth3'); //댓글 돌이용 article_no
		
		$.ajax({
			type : "POST",
			cache: false,
			async: false,
			url : "/clicklog/insertLog/",
			data : {
				ci_t : csrf_token,
				depth1 : depth1,
				depth2 : depth2,
				depth3 : depth3
			},
			success : function() {
				//alert('ok');
			},
			error : function(data) {
				//alert('error');
			}
		});
	});
	
	$('#btn_user_lyr').click(function(){
		if($('#user_data_lyr').css('display') == 'block'){
			$('#user_data_lyr').hide();
			$('#btn_user_lyr').removeClass('on');
		}
		else{
			$('#user_data_lyr').show();
			$('#btn_user_lyr').addClass('on');
		}
	});
	
});



function toggle_lay (id) {
	$(id).toggle();	 
	if(id == '#gall_notify') {
		var gallery_id = $('#gallery_id').val();
		var cookie_pre_fix = 'gall_notify_';
		if(_GALLERY_TYPE_ == 'MI') cookie_pre_fix = 'migall_notify_';
		var noti_no  = $('#gall_notify').attr('data-noti');
		closeWinAt00(cookie_pre_fix + gallery_id ,noti_no,1);
	}else if(id == '#all_gall_notify') {
		var gallery_id = $('#gallery_id').val();
		var cookie_pre_fix = 'all_gall_notify_';
		if(_GALLERY_TYPE_ == 'MI') cookie_pre_fix = 'all_migall_notify_';
		var noti_no  = $('#all_gall_notify').attr('data-noti');
		closeWinAt00(cookie_pre_fix + gallery_id ,noti_no,1);
	}
}

function closeWinAt00(winName, value, expiredays) {   
   setCookieAt00( winName, value , expiredays);    
} 
//00:00 시 기준 쿠키 설정하기  
//expiredays 의 새벽  00:00:00 까지 쿠키 설정  
function setCookieAt00( name, value, expiredays ) {   
	var todayDate = new Date();   
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	if ( todayDate > new Date() ) {  
		expiredays = expiredays - 1;  
	}  
	todayDate.setDate( todayDate.getDate() + expiredays );   
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
}

// 구글 리캡차 적용
function callbackRecaptcha() {
	//console.log('callbackRecaptcha');
	if(!$('#captcha_wrapper').html()) {
		$('.grecaptcha-badge').hide();
		
		grecaptcha.render('captcha_wrapper', {
	        'sitekey' : '6LcJyr4UAAAAAOy9Q_e9sDWPSHJ_aXus4UnYLfgL',
	        'callback' : function() {
	        	if($('.grecaptcha-submit').index() < 0) {
	        		return true;
	        	}
	        	
	        	$('#captcha_wrapper').hide();
	        	$('#captcha_wrapper').parent().find('.loading_layertype').show();
	        	$('.grecaptcha-submit').click();
	        }
	    });
	}
}

// 리챕차 v2 로드
function load_recaptcha_v2() {
	$.getScript('https://www.google.com/recaptcha/api.js?onload=callbackRecaptcha', function() {
		grecaptcha.version = 'v2';
	});
}

// mp4 이미지 덮기
function mp4_overlay(elm, src){
	var position = $(elm).data('position') || 'absolute';
	$(elm).contextmenu(function(){ return false; });
	$(elm).before('<img src="'+ src +'" style="position:'+ position +'; z-index:'+ ($(elm).zIndex() + 1) +';"/>');
	if(position != 'absolute') {
		$(elm).attr('onmousedown', '');
	}
}

function mp4_overlay_dccon(elm,src, attr) {
	$(elm).contextmenu(function(){ return false; });
	if(attr == ' alt= conalt= title='){
		attr = '';
	}
	$(elm).before('<img class="written_dccon" src="'+ src +'"'+attr+' style="position:absolute; z-index:'+ ($(elm).zIndex() + 1) +';"/>');
}

function change_gif(obj) {
	//console.log(obj);
	var myVideo = obj.parentElement;
	$(myVideo).data('position', 'static');
	myVideo.dispatchEvent(new Event('mousedown'));
}

//쿠키 저장.
var setCookie = function(cname, cvalue, exdays, domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + domain;
};

//동영상 
function insert_movie_player(str, confirmMsg) {
	var pattern = new RegExp('(&lt;)iframe src=["|\']?(http[s]?:\/\/)?([0-9a-z]+\.dcinside\.com\/board\/movie\/share_movie[^"\']*)[ |"|\']([^>]+)?(&gt;)*(&lt;)\/iframe(&gt;)','gim')
	var url_pattern = url_host+'/board/movie/share_movie?no=';
	var url_patt = new RegExp('http(s)?:\/\/([a-z]{1,3}\.)?('+ url_pattern.replace(/([\/.?+*])/g, '\\$1') +')[0-9a-z\-_]*', 'gi');
	try{
		var match_str = str.match(pattern);
		
		if(typeof(str) != 'string' && !match_str) {
			return str;
		}
		
		if(match_str){
			if(confirmMsg && !confirm(confirmMsg)) {
				return str;
			}
		
			for(var i=0; i < match_str.length; i++){
				var url_match = match_str[i].match(url_patt);
				str = str.replace(match_str[i],'<iframe src="'+url_match[0]+'"></iframe> ');
			}
		}
	}
	catch(e) {}
	
	return str;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
