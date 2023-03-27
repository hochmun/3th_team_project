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
///////////////////////////////////////////////////////////////////////////////////
///////////////2023.03.23 // 라성준 // GCInside 메인 화면 신설갤 동적처리///////////////
///////////////////////////////////////////////////////////////////////////////////
$(function(){

    //신설갤 미니 페이지 이전 버튼
    $(document).on('click','.new_prev', function(e) {
        var grade = $(this).attr('data-grade');

        let $page;
        let $totalPage;

        // 만약 미니 갤러리 탭에서 클릭되었다면
        if(grade == 'mini') {
            $page = $('.newPageMI .now_num');
            $totalPage = $('.newPageMI .total_num');

            // 이전 페이지를 숨김
            $('.newMI_'+$page.text()).hide();

            // 현재 페이지 번호를 변경
            if($page.text() == 1) $page.text($totalPage.text());
            else $page.text($page.text() - 1);

            // data-pg 속성 값을 변경
            $(this).attr('data-pg',$page.text());

            // 만약 이전 페이지에 포스트가 없다면, 새로운 포스트를 가져온다
            if($('.newMI_'+$page.text()+' > li').length == 0) {
                new_gall_list($(this));
            }

            // 이전 페이지를 보여준다
            $('.newMI_'+$page.text()).show();
        }
    });

    //신설갤 미니 페이지 다음 버튼
    $(document).on('click','.new_next', function(e) {

            // grade 변수는 클릭한 요소에서 `data-grade` 속성 값을 가져와 할당한다
            var grade = $(this).attr('data-grade');

            let $page;
            let $totalPage;

            // `if` 문을 사용하여 `grade` 변수가 `mini` 와 같을 때 코드 블록이 실행한다
            if(grade == 'mini') {
                // 코드 블록

                // 안쪽의 코드 블록에서 $page 변수는 .newPageMI .now_num
                // 선택자를 사용하여 현재 페이지 번호를 나타내는 요소를 가져온다
                // $totalPage 변수는 .newPageMI .total_num 선택자를 사용하여 전체 페이지 수를 나타내는 요소를 가져온다
                $page = $('.newPageMI .now_num');
                $totalPage = $('.newPageMI .total_num');

                // $page 요소에 표시된 페이지를 숨기고, 이전 페이지로 이동하여 표시해야 할 페이지 번호를 업데이트 한다
                $('.newMI_'+$page.text()).hide();

                if($page.text() == $totalPage.text()) $page.text(1);
                else $page.text(parseInt($page.text()) + 1);

                $(this).attr('data-pg',$page.text());

                // 마지막으로, $page 요소에 표시된 페이지 번호에 해당하는 요소를 보여주며,
                // 해당 페이지에 이미 로드된 목록이 없으면 new_gall_list 함수를 호출하여 새 목록을 가져온다
                if($('.newMI_'+$page.text()+' > li').length == 0) {
                    new_gall_list($(this));
                }

                $('.newMI_'+$page.text()).show();
            }
        });

    //신설갤 마이너 페이지 이전 버튼
    $(document).on('click','.new_prev2', function(e) {

        // grade 변수는 클릭한 요소에서 `data-grade` 속성 값을 가져와 할당한다
        var grade = $(this).attr('data-grade');

        let $page;
        let $totalPage;

        // `if` 문을 사용하여 `grade` 변수가 `mgall`과 같을 때 코드 블록이 실행한다
        if(grade == 'mgall') {

            // 코드 블록에서 $page 변수는 .newPageMG .now_num
            // 선택자를 사용하여 현재 페이지 번호를 나타내는 요소를 가져온다
            // $totalPage 변수는 .newPageMG .total_num 선택자를 사용하여 전체 페이지 수를 나타내는 요소를 가져온다
            $page = $('.newPageM .now_num');
            $totalPage = $('.newPageM .total_num');

            // $page 요소에 표시된 페이지를 숨기고, 이전 페이지로 이동하여 표시해야 할 페이지 번호를 업데이트 한다
            $('.newM_'+$page.text()).hide();

            if($page.text() == 1) $page.text($totalPage.text());
            else $page.text($page.text() - 1);

            $(this).attr('data-pg',$page.text());

            // 마지막으로, $page 요소에 표시된 페이지 번호에 해당하는 요소를 보여주며,
            // 해당 페이지에 이미 로드된 목록이 없으면 new_gall_list 함수를 호출하여 새 목록을 가져온다
            if($('.newM_'+$page.text()+' > li').length == 0) {
                new_gall_list($(this));
            }

            $('.newM_'+$page.text()).show();
        }
    });

 //신설갤 마이너 페이지 다음 버튼
    $(document).on('click','.new_next2', function(e) {

        // grade 변수는 클릭한 요소에서 `data-grade` 속성 값을 가져와 할당한다
        var grade = $(this).attr('data-grade');

        let $page;
        let $totalPage;

        // `if` 문을 사용하여 `grade` 변수가 `mgall`과 같을 때 코드 블록이 실행한다
        if(grade == 'mgall') {

            // 코드 블록에서 $page 변수는 .newPageMG .now_num
            // 선택자를 사용하여 현재 페이지 번호를 나타내는 요소를 가져온다
            // $totalPage 변수는 .newPageMG .total_num 선택자를 사용하여 전체 페이지 수를 나타내는 요소를 가져온다
            $page = $('.newPageM .now_num');
            $totalPage = $('.newPageM .total_num');

            // $page 요소에 표시된 페이지를 숨기고, 이전 페이지로 이동하여 표시해야 할 페이지 번호를 업데이트 한다
            $('.newM_'+$page.text()).hide();

            if($page.text() == 1) $page.text($totalPage.text());
            else $page.text($page.text() - 1);

            $(this).attr('data-pg',$page.text());

            // 마지막으로, $page 요소에 표시된 페이지 번호에 해당하는 요소를 보여주며,
            // 해당 페이지에 이미 로드된 목록이 없으면 new_gall_list 함수를 호출하여 새 목록을 가져온다
            if($('.newM_'+$page.text()+' > li').length == 0) {
                new_gall_list($(this));
            }

            $('.newM_'+$page.text()).show();
        }
    });




    	//신설갤 갤러리 클릭
    	$('.newGallTab').click(function(){                    // '신설갤러리 탭'을 클릭했을 때 실행되는 이벤트 핸들러 함수를 정의
    		if($('.newGallTab').hasClass('on')) return false; // 신설갤러리 탭'이 선택되어 있는 경우, 추가적인 동작을 수행하지 않도록 한다

    		$(this).siblings().removeClass('on');             // 현재 클릭된 '신설갤러리 탭'을 제외한 다른 탭들의 'on' 클래스를 삭제한다
    		$(this).addClass('on');                           // 현재 클릭된 '신설갤러리 탭'에 'on' 클래스를 추가한다
    		$('.new_gall .rank_list').hide();                 // 신설갤러리 탭'과 연결된 모든 갤러리 목록을 감춘다
    		$('.newPageG .now_num').text('1')                 // 신설갤러리 탭'의 페이지 번호를 1로 설정한다
    		$('.newG_1').show();                              // 첫 번째 갤러리 목록을 보여준다
    		$('.new_gall .box_bottom').hide()                 // 갤러리 목록 아래쪽에 있는 박스 영역을 감춘다
    		$('.newPageG').show();                            // 신설갤러리 탭'의 페이지 네비게이션을 보여준다
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
    		$('.newMI_1').show();
    		$('.new_gall .box_bottom').hide()
    		$('.newPageMI').show();
    	});

        $('.new_mini').one('click', function(){
              new_gall_list($(this));
        });

        $('.newGallTab').one('click', function(){
            new_gall_list($(this));
        });

});
const new_gall_list = function($this) {
    console.log($this);

    // 클릭한 버튼에서 데이터 속성 가져오기
    const type = $this.data("type");
    const grade = $this.data("grade");
    const pg = $this.data("pg");


    // JSON 형태로 서버에 전송할 데이터 생성
    const jsonData = {"type":type, "grade":grade, "pg":pg}

    console.log(jsonData);

    // AJAX를 이용하여 서버에 데이터 전송 및 결과 받아오기
    $.ajax({
        url:'/GCInside/mainPagingUtil',         // Ajax 요청을 보낼 URL
        method: 'POST',                         // HTTP 요청 메소드 (POST)
        contentType: 'application/json',        // 서버로 전송할 데이터의 타입 (JSON)
        data: JSON.stringify(jsonData),         // 서버로 전송할 데이터 (jsonData)
        dataType:'json',                        // 서버에서 받아올 데이터의 타입 (JSON)
        success: function(data) {               // Ajax 요청이 성공했을 때 실행할 함수
            if(data.galleryVOS != null) {       // 받아온 데이터가 null이 아닐 때

                // 서버로부터 받은 데이터를 이용하여 리스트 업데이트
                let grade;
                data.galleryVOS.forEach(function(vo){
                    let li = $('.newM_1 > li:first').clone();                                 // 리스트 아이템을 복사해서 li 변수에 저장
                    grade = vo.gell_grade == 0 ? 'm' : vo.gell_grade == 1 ? 'mgall' : 'mini';       // 갤러리 등급을 문자열로 저장
                    li.find('a').attr('href', '/GCInside/'+grade+'/board/lists?id='+vo.gell_address);  // 링크 href 속성 값 설정
                    li.find('span').text(vo.gell_name);                                                     // span 태그 내용 설정
                    if(data.pagingDTO != null) {                                                            // pagingDTO 데이터가 null이 아닐 때
                        if(vo.gell_grade == 2) $('.newMI_1').append(li);                                    // 갤러리 등급이 2인 경우 mini 갤러리 리스트에 추가
                        if(vo.gell_grade == 0) $('.newG_1').append(li);                                // 갤러리 등급이 0인 경우 m 갤러리 리스트에 추가
                    } else {                                                                        // pagingDTO 데이터가 null일 때
                        if(vo.gell_grade == 2) $('.newMI_'+pg).append(li);                   // 갤러리 등급이 2인 경우 현재 페이지에 추가
                        if(vo.gell_grade == 1) $('.newM_'+pg).append(li);                    // 갤러리 등급이 1인 경우 현재 페이지에 추가
                    }

                })

                console.log("grade : ", grade);          // grade 변수 값을 출력
                console.log("paging : ",data.pagingDTO); // pagingDTO 값을 출력

                // mini 갤러리일 경우 페이지 정보 업데이트
                if(grade == 'mini' && data.pagingDTO != null) {
                    $('.newPageMI .total_num').text(data.pagingDTO.lastPage); // mini 갤러리의 총 페이지 수 업데이트
                }
                if(grade == 'mgall' && data.pagingDTO != null) {
                    $('.newPageMG .total_num').text(data.pagingDTO.lastPage); // mgall 갤러리의 총 페이지 수 업데이트
                }

            } else { // 받아온 데이터가 null일 때
                // 실패
                alert('실패');
            }
        }
    })
}






