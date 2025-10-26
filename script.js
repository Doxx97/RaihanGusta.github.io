const scriptURL = 'https://script.google.com/macros/s/AKfycbwUsuHqu6O4GBLyEnIQvxhpwK4n8bwUpfCUGFjTIrfisi0iDtkv9FV_j1x8_pMDfci59w/exec';
const form = document.forms['submit-to-google-sheet'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');

// fungsi tampilkan popup
function showPopup(type, message) {
  const popup = document.getElementById('popupAlert');
  const popupBox = popup.querySelector('.popup-box');
  const popupIcon = document.getElementById('popupIcon');
  const popupMessage = document.getElementById('popupMessage');

  popup.classList.remove('d-none');
  popupBox.className = `popup-box ${type}`;
  popupMessage.textContent = message;

  if (type === 'success') {
    popupIcon.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
  } else {
    popupIcon.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
  }

  // otomatis hilang setelah 2.5 detik
  setTimeout(() => {
    popup.classList.add('d-none');
  }, 2500);
}

// validasi form sebelum kirim
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();

  if (!nama || !email || !pesan) {
    showPopup('error', 'Semua kolom harus diisi!');
    return;
  }

  btnKirim.classList.toggle('d-none');
  btnLoading.classList.toggle('d-none');

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      btnKirim.classList.toggle('d-none');
      btnLoading.classList.toggle('d-none');
      showPopup('success', 'Pesan berhasil dikirim!');
      form.reset();
    })
    .catch((error) => {
      btnKirim.classList.toggle('d-none');
      btnLoading.classList.toggle('d-none');
      showPopup('error', '❌ Terjadi kesalahan, coba lagi!');
      console.error('Error!', error.message);
    });
});

// Efek animasi masuk (fade-in) saat section muncul di viewport
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100 && rect.bottom > 100;

    if (inView) {
      sec.classList.add('show');
      sec.classList.remove('hide');
    } else if (rect.top < window.innerHeight && rect.bottom < 50) {
      // saat sudah lewat viewport bawah → fade-out
      sec.classList.add('hide');
      sec.classList.remove('show');
    } else {
      sec.classList.remove('show', 'hide');
    }
  });
});

// Animasi awal di jumbotron (gambar & teks)
window.addEventListener('load', () => {
  document.querySelector('.jumbotron img').classList.add('show');
  document.querySelector('.jumbotron h1').classList.add('show');
  document.querySelector('.jumbotron p').classList.add('show');
});

const projectSection = document.querySelector('#projects');
const projectTitle = projectSection.querySelector('h2');
const projectCards = projectSection.querySelectorAll('.project-card');

window.addEventListener('scroll', () => {
  const rect = projectSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight - 150 && rect.bottom > 100;

  if (inView) {
    // Munculkan judul
    projectTitle.classList.add('show');

    // Animasi kartu satu per satu
    projectCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('show');
      }, i * 200);
    });
  } else {
    projectTitle.classList.remove('show');
    projectCards.forEach((card) => card.classList.remove('show'));
  }
});

const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
  progressBars.forEach((bar) => {
    const barPos = bar.getBoundingClientRect().top;
    const screenPos = window.innerHeight - 100;

    if (barPos < screenPos) {
      bar.style.width = bar.getAttribute('data-width');
    }
  });
}

window.addEventListener('scroll', showProgress);

// Pastikan halaman selalu mulai dari atas
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 10);
});
