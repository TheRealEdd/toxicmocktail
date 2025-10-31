const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector('.close');

let currentIndex = 0;

const galleryContainer = document.querySelector('.gallery-container');

// Smooth scroll to the next image
function scrollGallery(direction) {
    const imageWidth = galleryContainer.clientWidth; // Width of the gallery section
    const scrollAmount = direction === 1 ? imageWidth : -imageWidth; // Calculate scroll amount

    galleryContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Event listeners for navigation buttons
document.querySelector('.nav-button.left').addEventListener('click', () => scrollGallery(-1)); // Scroll left
document.querySelector('.nav-button.right').addEventListener('click', () => scrollGallery(1)); // Scroll right





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

    // Remove the show class after a delay to let fade out happen
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after fading out
    }, 500); // Match the duration of the transition
});

// Close modal when clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modalImg.style.transform = "translate(-50%, -50%) scale(0.9)"; // Animate closing
        modal.classList.remove('show'); // Fade out the modal

        setTimeout(() => {
            modal.style.display = "none"; // Hide the modal after fading out
        }, 500); // Match the duration of the transition
    }
});

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