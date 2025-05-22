$(document).ready(function() {
    // Image Slider Functionality
    const $sliderWrapper = $('.slider-wrapper');
    const $sliderImages = $('.slider-image');
    const $prevBtn = $('.slider-prev');
    const $nextBtn = $('.slider-next');
    const imageCount = $sliderImages.length;
    let currentIndex = 0;

    function updateSliderPosition() {
        $sliderWrapper.css('transform', `translateX(-${currentIndex * 100}%)`);
    }

    $nextBtn.on('click', function() {
        currentIndex = (currentIndex + 1) % imageCount;
        updateSliderPosition();
    });

    $prevBtn.on('click', function() {
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        updateSliderPosition();
    });

    // Auto-slide functionality (optional)
    setInterval(function() {
        currentIndex = (currentIndex + 1) % imageCount;
        updateSliderPosition();
    }, 5000); // Change image every 5 seconds

    // --- Lightbox/Modal Functionality for Gallery ---
    const $lightboxModal = $('#lightbox-modal');
    const $lightboxImg = $('#lightbox-img');
    const $lightboxCaption = $('#lightbox-caption');
    const $closeLightboxBtn = $('#close-lightbox');

    // Open lightbox when a gallery item is clicked
    $('.gallery-item').on('click', function() {
        const imageUrl = $(this).find('img').data('src'); // Get the full-size image URL from data-src
        const imageAlt = $(this).find('img').attr('alt'); // Get the alt text for caption

        $lightboxImg.attr('src', imageUrl);
        $lightboxCaption.text(imageAlt);
        $lightboxModal.removeClass('hidden'); // Show the modal
        $('body').addClass('overflow-hidden'); // Prevent scrolling of background
    });

    // Close lightbox when close button is clicked
    $closeLightboxBtn.on('click', function() {
        $lightboxModal.addClass('hidden'); // Hide the modal
        $('body').removeClass('overflow-hidden'); // Re-enable background scrolling
    });

    // Close lightbox when clicking outside the image content (on the overlay)
    $lightboxModal.on('click', function(e) {
        // Check if the click occurred directly on the modal overlay, not its content
        if ($(e.target).is($lightboxModal)) {
            $lightboxModal.addClass('hidden'); // Hide the modal
            $('body').removeClass('overflow-hidden'); // Re-enable background scrolling
        }
    });

    // Optional: Close lightbox with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && !$lightboxModal.hasClass('hidden')) {
            $lightboxModal.addClass('hidden');
            $('body').removeClass('overflow-hidden');
        }
    });

    // Upcoming News Slide (Down to Up direction)
    // This part is handled primarily by CSS animation, but you can add JS if more complex logic is needed
    // For a simple continuous scroll, CSS is often more performant.
    // The CSS @keyframes `news-scroll` handles the upward movement.
    // The `news-list:hover { animation-play-state: paused; }` handles pausing on hover.

    // If you need more dynamic news loading or interaction, you'd add more jQuery/JS here.
});