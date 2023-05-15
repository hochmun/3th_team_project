//카테고리 펼치기
function showOptions() {
  var selectArea = document.getElementById("gell_create_cate");
  var options = document.getElementById("options");
  options.style.display = "block";
  selectArea.style.display = "none";
  options.addEventListener("change", function() {
    var selectedValue = options.options[options.selectedIndex].value;
    selectArea.innerHTML = selectedoptions + "<em class='sp_img icon_option_more'></em>";
    options.style.display = "none";
    selectArea.style.display = "block";
  });
}

/* 글자 수 확인 */
$(function() {
  let countChar = function() {
    var length = $(this).val().length;
    $(this).parent().parent().find('.max_txt').find('span:first').text(length);
    // input 요소의 형제 요소 중 .max_txt를 선택하고 그 첫 번째 자식 요소를 선택하여 글자 수 출력
  };
  $('#gell_create_name, #gell_create_intro, #gell_create_address, #gell_create_reason').on('input', countChar);
  // 여러 개의 요소에 동시에 이벤트를 적용할 때, 콤마(,)를 이용해 연결할 수 있습니다.
});

/* 갤러리 생성 이름 validation */
$(function() {
    isnameok = false;

    $("input[name='gell_create_name']").focus(function(){
         $('#nametip1').show();
         $('#nametip2').show();
         $('#gell_create_name_tip').hide();
         $('#duplicationName').hide();
         $('#noduplicationName').hide();
         isnameok = false;
    });

   $("input[name='gell_create_name']").focusout(function() {
     var selectname = document.getElementById("gell_create_name"); // var 키워드 추가
     var gell_create_name = $("input[name='gell_create_name']").val();
     if (selectname.value.length > 1 && selectname.value.length < 13) {
       let jsonData = {"gell_create_name":gell_create_name};
       $.ajax({
         type : "GET",
         url : "/GCInside/mgall/chkName",
         data : jsonData,
         success : function(data){
           if(data.result==="success"){
             $('#nametip1').show();
             $('#nametip2').show();
             $('#gell_create_name_tip').hide();
             $('#duplicationName').hide();
             $('#noduplicationName').show();
             isnameok = true;
           }else{
             $('#nametip1').hide();
             $('#nametip2').hide();
             $('#gell_create_name_tip').hide();
             $('#duplicationName').show();
             $('#noduplicationName').hide();
             isnameok = false;
           }
         }
       });
     } else {
       $('#nametip1').hide();
       $('#nametip2').hide();
       $('#gell_create_name_tip').show();
       $('#duplicationName').hide();
       $('#noduplicationName').hide();
       isnameok = false;
     }
   });
});

$(function() {
    isaddressok = false;
    let pattern1 = /[0-9]/;
	let pattern2 = /[a-z]/;
	let pattern4 = /[A-Z]/; //대문자
    $("input[name='gell_create_address']").focus(function(){
        $('.gell_create_address_tip').hide();
        $('.ad_success').hide();
        isaddressok = false;
    });
    $("input[name='gell_create_address']").focusout(function() {
    var gell_create_address = $("input[name='gell_create_address']").val(); // var 키워드 추가
    if(gell_create_address.length < 1 && gell_create_address.length > 21){
        $('.gell_create_address_tip').show();
        isaddressok = false;
    }else if(!pattern1.test(gell_create_address) && !pattern2.test(gell_create_address) && !pattern4.test(gell_create_address)){
        $('.gell_create_address_tip').show();
        isaddressok = false;
    }else{
    let jsonData = {"gell_create_address":gell_create_address};
           $.ajax({
             type : "GET",
             url : "/GCInside/mgall/chkAddress",
             data : jsonData,
             success : function(data){
               if(data.result==="success"){
                 $('.ad_success').show();
                 $('.ad_fail').hide()
                 isaddressok = true;
               }else{
                 $('.ad_success').hide();
                 $('.ad_fail').show()
                 isaddressok = false;
               }
             }
           });
    }
    });
});

/* 제출 validation */
$(function() {
   let agree = function() {
     $('#submitbutton').click(function() {
       if (!$('#gell_create_name').val()) { // 추가된 부분
         alert('갤러리 이름을 입력해 주세요.');
         return false;
       }
       if (!$('input:checkbox[id="person_agree"]').is(":checked")) {
         alert('마이너 갤러리 개인정보보호정책에 동의해 주세요.');
         return false;
       }
       if (!$('input:checkbox[id="use_agree"]').is(":checked")) {
         alert('마이너 갤러리 운영원칙에 동의해 주세요.');
         return false;
       }
       if (!$('input:checkbox[id="upgrade_agree"]').is(":checked")) {
         alert('메인 갤러리 승격에 동의해 주세요.');
         return false;
       }
       if (!isnameok){
         alert('갤러리 이름을 확인해 주세요');
         return false;
       }
       if (!isaddressok){
         alert('갤러리 주소를 확인해 주세요');
         return false;
       }
       $('#frmCreate').submit(); // 폼전송
       alert('성공적으로 마이너 갤러리 생성신청이 완료 되었습니다.')
     });
   };
   agree();
 });

