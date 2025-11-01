const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector('.close');
const scrollContainer = document.querySelector('.gallery-container');

let currentIndex = 0;
let autoScrollInterval;
let scrollSpeed = 3000; //interval for autoscroll in milliseconds


function scrollGallery(direction) {
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (direction === 1) {
        // Check if we are at or near the end
        if (scrollContainer.scrollLeft >= maxScrollLeft) {
            currentIndex = 0; // Reset to the first image
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            currentIndex = (currentIndex + 1) % images.length; // Cycle to the next image
            images[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    } else {
        // Check if we are at the start
        if (scrollContainer.scrollLeft <= 0) {
            currentIndex = images.length - 1; // Reset to the last image
            scrollContainer.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Cycle to the previous image
            images[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    }
}

// Function to auto-scroll to the next image
function autoScroll() {
    currentIndex = (currentIndex + 1) % images.length; // Cycle to next image

    // Get the position of the current image
    const imageRect = images[currentIndex].getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();

    // Calculate the new scroll position
    const scrollPosition = imageRect.left - containerRect.left + scrollContainer.scrollLeft;

    // Smoothly scroll to the calculated position without affecting vertical position
    scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth' // Smooth scrolling effect
    });
}


// Start the auto-scrolling
function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, scrollSpeed); // 1000 ms = 1 second
}

// Stop the auto-scrolling
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Event listeners for navigation buttons and gallery container
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoScroll); // Stop on button click
});

// Start auto-scrolling when the gallery is displayed
startAutoScroll();

document.querySelector('.nav-button.left').addEventListener('click', () => scrollGallery(-1)); // Scroll left
document.querySelector('.nav-button.right').addEventListener('click', () => scrollGallery(1)); // Scroll right
scrollContainer.addEventListener('mouseenter', stopAutoScroll);
scrollContainer.addEventListener('mouseleave', startAutoScroll);



// Open modal when image is clicked
images.forEach((image, index) => {
    image.addEventListener('click', () => {
        modal.style.display = "block"; // Make modal visible immediately
        modalImg.src = image.src;

        // Use setTimeout to delay scaling until the modal is shown
        setTimeout(() => {
            modal.classList.add('show'); // Add show class for fade effect
            modalImg.style.transform = "translate(-50%, -50%) scale(1)"; // Animate opening
        }, 10); // Small delay for rendering

        currentIndex = index; // Set currentIndex to the clicked image
    });
});

// Close modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modalImg.style.transform = "translate(-50%, -50%) scale(0.9)"; // Animate closing
    modal.classList.remove('show'); // Fade out the modal

    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after fading out
    }, 500); // Match the duration of the transition
});

// Close modal when clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal(); // Use the close modal function to keep code DRY
        setTimeout(startAutoScroll, 500); // Delay to allow user to see modal content before auto-scroll resumes
    }
});

// Close modal when clicking on the modal image
modalImg.addEventListener('click', () => {
    closeModal(); // Reuse the closeModal function for the same close behavior
});

// Function to close modal
function closeModal() {
    modalImg.style.transform = "translate(-50%, -50%) scale(0.9)"; // Animate closing
    modal.classList.remove('show'); // Fade out the modal

    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after fading out
    }, 500); // Match the duration of the transition
}

let startX = 0; // To track the start position of touch event

// Add touch event listeners for swiping
gallery.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Store the initial touch position
});

gallery.addEventListener('touchmove', (event) => {
    const moveX = event.touches[0].clientX; // Updated touch position
    const deltaX = startX - moveX; // Calculate the difference

    if (deltaX > 50) { // Swipe left threshold
        navigate(1); // Navigate right
        startX = moveX; // Reset start position
    } else if (deltaX < -50) { // Swipe right threshold
        navigate(-1); // Navigate left
        startX = moveX; // Reset start position
    }
});



function updateVideoSource() {
        const videoElement = document.getElementById('heroVideo');
        const desktopSource = 'Video/TM Hero Video Desktop.mp4';
        const mobileSource = 'Video/TM mobile hero tiny size.mp4'; // Your mobile video

        if (window.innerWidth <= 1120) { // Adjust the width according to your needs
            videoElement.src = mobileSource;
        } else {
            videoElement.src = desktopSource;
        }

        // Load the new video source
        videoElement.load();
    }

    window.onload = updateVideoSource; // Initial load
    window.onresize = updateVideoSource; // Update on resize