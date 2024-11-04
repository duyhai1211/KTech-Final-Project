let slideIndex = 0;
const slides = document.querySelectorAll('.slider-img');
const totalSlides = slides.length;

function showSlide(index) {
    // Ẩn tất cả các ảnh
    for (let i = 0; i < totalSlides; i++) {
        slides[i].classList.remove('active');
    }
    // Hiển thị ảnh có index hiện tại
    slides[index].classList.add('active');
}

function changeSlide(n) {
    slideIndex += n;

    // Nếu index quá lớn hoặc quá nhỏ, quay lại đầu/cuối của slider
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    showSlide(slideIndex);
}

// Tự động chuyển ảnh sau mỗi 5 giây
setInterval(() => {
    changeSlide(1);
}, 5000);

// Hiển thị ảnh đầu tiên khi load trang
showSlide(slideIndex);
