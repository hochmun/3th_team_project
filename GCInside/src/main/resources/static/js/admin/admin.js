// 개설 이유 글 자르기
function truncateText(selector, maxLength) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var text = element.textContent;
    if (text.length > maxLength) {
      var truncated = text.substring(0, maxLength) + '...';
      element.textContent = truncated;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  truncateText('.truncate', 7); // 적용할 클래스와 최대 길이 설정
});

// 상세보기 / 개설관리 팝업 창
document.addEventListener('DOMContentLoaded', function() {
    var showDetailButtons = document.querySelectorAll('.show-details');
    for (var i = 0; i < showDetailButtons.length; i++) {
        showDetailButtons[i].addEventListener('click', showDetails);
    }

    var showApprovalButtons = document.querySelectorAll('.approval');
    for (var i = 0; i < showApprovalButtons.length; i++) {
        showApprovalButtons[i].addEventListener('click', showApprovalPopup);
    }
    document.querySelector('.approval').addEventListener('click', function() {
        const gellNum = this.parentElement.parentElement.querySelector('.gell_create_num').innerText;
        const gellName = this.parentElement.parentElement.querySelector('.gell_create_name').innerText;
        const gellAddress = this.parentElement.parentElement.querySelector('.gell_create_address').innerText;
        const gellCate = this.parentElement.parentElement.querySelector('.gell_create_cate').innerText;
        const gellUid = this.parentElement.parentElement.querySelector('.gell_create_uid').innerText;
        const gellIntro = this.parentElement.parentElement.querySelector('.gell_create_intro').innerText;

        document.querySelector('[name="gell_create_num"]').value = gellNum;
        document.querySelector('[name="gell_create_name"]').value = gellName;
        document.querySelector('[name="gell_create_address"]').value = gellAddress;
        document.querySelector('[name="gell_create_cate"]').value = gellCate;
        document.querySelector('[name="gell_create_uid"]').value = gellUid;
        document.querySelector('[name="gell_create_intro"]').value = gellIntro;
    });

    var closeApprovalPopupButton = document.querySelector('.close-approval-popup');
    closeApprovalPopupButton.addEventListener('click', closeApprovalPopup);

    var closePopupButton = document.querySelector('.close-popup');
    closePopupButton.addEventListener('click', closePopup);

    var rejectButton = document.querySelector('.reject');
    rejectButton.addEventListener('click', showRejectionReason);

    var submitRejectionButton = document.querySelector('.submit-rejection');
    submitRejectionButton.addEventListener('click', submitRejection);
});



function showRejectionReason() {
    var rejectionReasonDiv = document.querySelector('.rejection-reason');
    rejectionReasonDiv.style.display = 'block';
}

function submitRejection() {
    var rejectionReasonText = document.querySelector('.rejection-reason-text').value;

    closeApprovalPopup();
    document.querySelector('.rejection-reason').style.display = 'none';
}

function showDetails(event) {
    event.preventDefault();
    var content = event.target.dataset.fullText;
    var popup = document.querySelector('.popup');
    var popupContent = document.querySelector('.popup-content');
    popupContent.innerHTML = content; // textContent 대신 innerHTML 사용
    popup.style.display = 'block';
}

function showApprovalPopup(event) {
    event.preventDefault();
    var popup = document.querySelector('.approval-popup');
    popup.style.display = 'block';

    // 클릭된 행의 정보 추출
    var row = event.target.closest('tr');
    var num = row.querySelector('td:nth-child(1)').textContent;
    var name = row.querySelector('td:nth-child(2)').textContent;
    var address = row.querySelector('td:nth-child(3)').textContent;
    var category = row.querySelector('td:nth-child(4)').textContent;
    var rdate = row.querySelector('td:nth-child(5)').textContent;
    var uid = row.querySelector('td:nth-child(6)').textContent;
    var intro = row.querySelector('td:nth-child(7) button').dataset.fullText;
    var reason = row.querySelector('td:nth-child(8) button').dataset.fullText;
    var stat = row.querySelector('td:nth-child(9)').textContent;

    // 추출된 정보를 팝업 내부로 전달
    popup.querySelector('.num').textContent = num;
    popup.querySelector('#gell_create_num').value = num;

    popup.querySelector('.name').textContent = name;
    popup.querySelector('#gell_create_name').value = name;

    popup.querySelector('.address').textContent = address;
    popup.querySelector('#gell_create_address').value = address;

    popup.querySelector('.category').textContent = category;
    popup.querySelector('#gell_create_cate').value = category;

    popup.querySelector('.rdate').textContent = rdate;

    popup.querySelector('.uid').textContent = uid;
    popup.querySelector('#gell_create_uid').value = uid;

    popup.querySelector('.intro').textContent = intro;
    popup.querySelector('#gell_create_intro').value = intro;

    popup.querySelector('.reason').textContent = reason;

    popup.querySelector('.stat').textContent = stat;
    popup.querySelector('#gell_create_status').value = stat;

    popup.querySelector('#gell_create_num_reject').value = num;
    popup.querySelector('#gell_create_status_reject').value = stat;

    popup.style.display = 'block';
}

function closePopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'none';
}

function closeApprovalPopup() {
    var popup = document.querySelector('.approval-popup');
    popup.style.display = 'none';
}