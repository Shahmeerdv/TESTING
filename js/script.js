$(document).ready(function() {

    // --- Particles.js Initialization for Hero Section ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80, // Number of particles
                "density": {
                    "enable": true,
                    "value_area": 800 // Area where particles are distributed
                }
            },
            "color": {
                "value": "#ffffff" // Particle color (white for futuristic look)
            },
            "shape": {
                "type": "circle", // Shape of particles
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
                "value": 0.5, // Opacity of particles
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3, // Size of particles
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
                "distance": 150, // Max distance for lines between particles
                "color": "#ffffff", // Color of lines
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6, // Speed of particle movement
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
                    "mode": "grab" // Particles react on hover (grab, repulse, bubble)
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Particles react on click (push, remove, bubble)
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
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

    // Your existing jQuery code for the image slider and lightbox goes here
    // ... (rest of your script.js content)
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
    $('.page-transition').on('click', function(e) {
    e.preventDefault(); // Stop default link behavior
    const targetUrl = $(this).attr('href');

    $('body').addClass('fade-out');

    setTimeout(function() {
        window.location.href = targetUrl;
    }, 200); // Match this to your CSS transition time
});


    // Upcoming News Slide (Down to Up direction)
    // This part is handled primarily by CSS animation, but you can add JS if more complex logic is needed
    // For a simple continuous scroll, CSS is often more performant.
    // The CSS @keyframes `news-scroll` handles the upward movement.
    // The `news-list:hover { animation-play-state: paused; }` handles pausing on hover.

    // If you need more dynamic news loading or interaction, you'd add more jQuery/JS here.
});