$(function() {
    
});


 let currentSlide1 = 0;
        let currentSlide2 = 0;

        function showSlide(slideshowId, slideIndex) {
            const slideshow = document.getElementById(slideshowId);
            const slides = slideshow.getElementsByClassName('slides')[0];
            const totalSlides = slides.children.length;

            if (slideIndex >= totalSlides) {
                slideIndex = 0;
            } else if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            }

            slides.style.transform = `translateX(${-slideIndex * 100}%)`;

            if (slideshowId === 'slideshow1') {
                currentSlide1 = slideIndex;
            } else {
                currentSlide2 = slideIndex;
            }
        }

        function nextSlide(slideshowId) {
            if (slideshowId === 'slideshow1') {
                showSlide(slideshowId, currentSlide1 + 1);
            } else {
                showSlide(slideshowId, currentSlide2 + 1);
            }
        }

        function prevSlide(slideshowId) {
            if (slideshowId === 'slideshow1') {
                showSlide(slideshowId, currentSlide1 - 1);
            } else {
                showSlide(slideshowId, currentSlide2 - 1);
            }
        }

        // Initialize slideshows
        showSlide('slideshow1', 0);
        showSlide('slideshow2', 0);