function showLayer(layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}

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
function chk_gellname(){

}
$(document).ready(function() {
  let agree = function() {
    $('#submitbutton').click(function() {
      if(!$('#gell_create_name').is())
      if (!$('input:checkbox[id="person_agree"]').is(":checked")) {
        alert('마이너 갤러리 개인정보보호정책에 동의해주세요.');
        return false;
      }
      if (!$('input:checkbox[id="use_agree"]').is(":checked")) {
        alert('마이너 갤러리 운영원칙에 동의해주세요.');
        return false;
      }
      if (!$('input:checkbox[id="upgrade_agree"]').is(":checked")) {
        alert('메인 갤러리 승격에 동의해주세요.');
        return false;
      }
      $('#frmCreate').submit(); // 폼전송
      alert('성공적으로 마이너 갤러리 생성신청이 완료되었습니다.')
      location.replace('/GCInside/m/index');
    });
  };
  agree();
});
