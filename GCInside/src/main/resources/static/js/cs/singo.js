// 2023/03/13 // 라성준 //

$.extend({
    getParam: function (paramName, url) {
        var paramValue = "";
        var url = decodeURIComponent(url);
        var params = url.slice(url.indexOf("?") + 1).split("&");
        $.each(params, function (index, param) {
            var temp = param.split("=");
            if (temp[0].toUpperCase() == paramName.toUpperCase()) {
                paramValue = temp[1];
                return false;
            }
        });
        return paramValue;
    }
});


$(function () {
    // 회원
    $('.btn_rpt_listgo.btn_blue').click(function () {

        var m_division = $('#m_division').val();

        if (m_division != "1") {
            alert("로그인한 회원만 사용가능합니다");
            return false;
        }

        location.href = 'https://GC/board/lists/?id=singo';

    });

    // 비회원
    $('.btn_rpt_listgo.btn_grey').click(function () {
        var m_division = $('#m_division').val();

        if (m_division != "0") {
            alert("비회원만 사용가능합니다");
            return false;
        }

        location.href = 'https://GC/singo/singo_nonmember/?id=singo';
    });
});




$(function(){
    //신고 faq
	$('#singo_faq').click(function () {
		if($('#singo_faq_txt').css('display') == 'none'){
			$('#singo_info_txt').hide();
			$('#singo_faq_txt').show();
			$('#singo_faq').addClass('on');
			$('#singo_info_box').addClass('faq');
		}else{
			$('#singo_faq_txt').hide();
			$('#singo_info_txt').show();
			$('#singo_faq').removeClass('on');
			$('#singo_info_box').removeClass('faq');
		}
		
	});

	$('.opt_list > li > a').click(function(){
	    const idx = $(this).data('idx');
	    const singo_url = window.location.href;
	    const add_param = '';

        //신고 분류 선택
	    const singo_id = $.getParam('singo_id', singo_url);
        const singo_no = $.getParam('singo_no', singo_url);
        const ko_name = $.getParam('ko_name', singo_url);
        const s_url = $.getParam('s_url', singo_url);
        const type = $.getParam('type', singo_url);
        const gall_type = $.getParam('gall_type', singo_url);
        const m_division = $('#m_division').val();
        if(singo_id && singo_no && ko_name) {
        			add_param += '&singo_id=' + singo_id + '&singo_no=' + singo_no + '&ko_name=' + ko_name + '&s_url=' + s_url + '&gall_type=' + gall_type ;
        		}

        		if(type == 'enter' && m_division != '1'){
        			if(confirm('로그인을 해야 이용할 수 있는 서비스입니다. 로그인 하시겠습니까? 정확한 분류에 의한 신고가 아닐 경우 허위 신고로 판단되어 서비스 이용에 제한을 받으실 수 있습니다.')){
        				const s_url = encodeURIComponent(location.href);
        				location.href = "http://localhost:8082/GCInside/cs/singo/login?s_url=" + encodeURIComponent('http://localhost:8082/GCInside/cs/singo_write/?id=singo&idx=' + idx + add_param);
        			}
        			return false;
        		}


	    alert('click!'+idx);
	});
});


