// ==================================================
// PHOTO SLIDER
// ==================================================

const photoScroll = document.querySelector('.photo-scroll');
const photoPrev = document.querySelector('.prev');
const photoNext = document.querySelector('.next');

if (photoScroll && photoPrev && photoNext) {

  const photos = photoScroll.querySelectorAll('img');
  let currentPhoto = 0;

  function movePhoto(index) {
    if (!photos.length) return;

    currentPhoto = Math.max(
      0,
      Math.min(index, photos.length - 1)
    );

    photoScroll.scrollTo({
      left: photoScroll.clientWidth * currentPhoto,
      behavior: 'smooth'
    });
  }

  photoPrev.addEventListener('click', () => {
    movePhoto(currentPhoto - 1);
  });

  photoNext.addEventListener('click', () => {
    movePhoto(currentPhoto + 1);
  });

}


// ==================================================
// 주소 복사
// ==================================================

function copyAddress() {

  const address = '경기 성남시 분당구 성남대로 808';

  copyText(address);

}


// ==================================================
// 텍스트 복사
// ==================================================

function copyText(text) {

  if (navigator.clipboard && window.isSecureContext) {

    navigator.clipboard.writeText(text)
      .then(() => {
        showToast('복사되었습니다.');
      })
      .catch(() => {
        fallbackCopy(text);
      });

  } else {

    fallbackCopy(text);

  }

}


// ==================================================
// 구형 브라우저용 복사
// ==================================================

function fallbackCopy(text) {

  const textarea = document.createElement('textarea');

  textarea.value = text;

  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  try {

    document.execCommand('copy');

    showToast('복사되었습니다.');

  } catch (error) {

    showToast('복사하지 못했습니다.');

  }

  document.body.removeChild(textarea);

}


// ==================================================
// 계좌 열기 / 닫기
// ==================================================

function toggleAccount(id) {

  const content = document.getElementById(id);

  if (!content) return;

  const button = content.previousElementSibling;

  content.classList.toggle('open');

  if (button) {
    button.classList.toggle('active');
  }

}


// ==================================================
// 공유하기
// ==================================================

function shareInvitation() {

  const shareData = {
    title: '제6회 콰이어가이스트 정기연주회',
    text: '희망을 나누는 화음에 여러분들을 초대합니다.',
    url: window.location.href
  };

  // 모바일 등 Web Share API를 지원하는 경우
  if (navigator.share) {

    navigator.share(shareData)
      .catch((error) => {

        // 사용자가 공유창을 닫은 경우에는 아무것도 하지 않음
        if (error.name !== 'AbortError') {
          showToast('공유할 수 없습니다.');
        }

      });

  } else {

    // Web Share를 지원하지 않는 PC에서는 주소 복사
    copyText(window.location.href);

  }

}


// ==================================================
// TOAST
// ==================================================

let toastTimer;

function showToast(message) {

  const toast = document.getElementById('toast');

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove('show');

  }, 2000);

}
