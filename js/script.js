$(document).ready(function() {
    // Particles.js initialization (only on index.html if needed)
    // You might want to move this to a separate particles.js if not global
    if ($('#particles-js').length) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Event Highlights Slider Logic
    const sliderWrapper = $('.slider-wrapper');
    const sliderImages = $('.slider-image');
    const totalImages = sliderImages.length;
    let currentIndex = 0;

    function updateSliderPosition() {
        if (sliderWrapper.length) { // Check if slider exists on the page
            sliderWrapper.css('transform', 'translateX(' + (-currentIndex * 100) + '%)');
        }
    }

    $('.slider-next').on('click', function() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSliderPosition();
    });

    $('.slider-prev').on('click', function() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSliderPosition();
    });

    // Optional: Auto-slide
    // setInterval(() => {
    //     $('.slider-next').click();
    // }, 5000); // Change image every 5 seconds


    // Lightbox Functionality for Gallery Page
    const $galleryItems = $('.gallery-item');
    const $lightboxModal = $('#lightbox-modal');
    const $lightboxImg = $('#lightbox-img');
    const $lightboxCaption = $('#lightbox-caption');
    const $closeLightbox = $('#close-lightbox');
    const $prevLightbox = $('#prev-lightbox');
    const $nextLightbox = $('#next-lightbox');

    let currentGalleryIndex = 0; // To keep track of the current image in the lightbox

    // Function to show a specific image in the lightbox
    function showLightboxImage(index) {
        if (index < 0 || index >= $galleryItems.length) {
            return; // Invalid index
        }

        currentGalleryIndex = index;
        const $currentItem = $($galleryItems[currentGalleryIndex]);
        const fullSrc = $currentItem.find('img').data('fullsrc');
        const caption = $currentItem.data('caption');

        $lightboxImg.attr('src', fullSrc);
        $lightboxCaption.text(caption);
        $lightboxModal.removeClass('hidden'); // Show the lightbox
    }

    // Open lightbox when gallery item is clicked
    $galleryItems.on('click', function() {
        const clickedIndex = $galleryItems.index(this);
        showLightboxImage(clickedIndex);
    });

    // Close lightbox
    $closeLightbox.on('click', function() {
        $lightboxModal.addClass('hidden');
        $lightboxImg.attr('src', ''); // Clear image source
    });

    // Navigate to previous image
    $prevLightbox.on('click', function() {
        let prevIndex = currentGalleryIndex - 1;
        if (prevIndex < 0) {
            prevIndex = $galleryItems.length - 1; // Loop to the last image
        }
        showLightboxImage(prevIndex);
    });

    // Navigate to next image
    $nextLightbox.on('click', function() {
        let nextIndex = currentGalleryIndex + 1;
        if (nextIndex >= $galleryItems.length) {
            nextIndex = 0; // Loop to the first image
        }
        showLightboxImage(nextIndex);
    });

    // Close lightbox when clicking outside the content (on the overlay)
    $lightboxModal.on('click', function(e) {
        if (e.target.id === 'lightbox-modal') {
            $closeLightbox.click();
        }
    });

    // Close lightbox with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && !$lightboxModal.hasClass('hidden')) {
            $closeLightbox.click();
        }
    });
    
    $('.page-transition').on('click', function(e) {
    e.preventDefault(); // Stop default link behavior
    const targetUrl = $(this).attr('href');

    $('body').addClass('fade-out');

    setTimeout(function() {
        window.location.href = targetUrl;
    }, 200); // Match this to your CSS transition time
});
$(document).ready(function() {
    // Toggle menu button click
    $('.menu-toggle').on('click', function() {
        const navUL = $('#primary-navigation');
        navUL.toggleClass('show');
        
        // Toggle aria-expanded for accessibility
        const expanded = $(this).attr('aria-expanded') === 'true' || false;
        $(this).attr('aria-expanded', !expanded);
    });

    // Optional: close menu when clicking a nav link on mobile
    $('#primary-navigation a').on('click', function() {
        if ($(window).width() < 481) {
            $('#primary-navigation').removeClass('show');
            $('.menu-toggle').attr('aria-expanded', false);
        }
    });

    // ... your existing JS code here ...
});


// Initialize AOS
        $(document).ready(function() {
            AOS.init({
                once: true, // Only animate once as elements enter the viewport
                duration: 800, // Animation duration in ms
                easing: 'ease-out-quad' // Easing function
            });
        });

    // Navigate with arrow keys when lightbox is open
    $(document).on('keydown', function(e) {
        if (!$lightboxModal.hasClass('hidden')) {
            if (e.key === 'ArrowLeft') {
                $prevLightbox.click();
            } else if (e.key === 'ArrowRight') {
                $nextLightbox.click();
            }
        }
    });

});