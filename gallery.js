const gallery = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector('.close');

let currentIndex = 0;

// Function to navigate gallery images
function updateGallery() {
    const galleryWidth = gallery.scrollWidth; // Total width of the gallery
    const viewportWidth = document.querySelector('#gallery').clientWidth; // Width of the gallery section
    const offset = currentIndex * -700; // Scroll by fixed distance of 700 pixels

    // Calculate maximum offset
    const maxOffset = galleryWidth - viewportWidth; // Max allowed offset
    
    // Apply constraints to the scrolling
    gallery.style.transform = `translateX(${Math.max(offset, -maxOffset)}px)`;
}

// Navigate to the next or previous image
function navigate(direction) {
    currentIndex += direction;

    // Calculate max index based on number of images
    if (currentIndex < 0) {
        currentIndex = 0; // Prevent going too far left
    } else if (currentIndex >= images.length) {
        currentIndex = images.length - 1; // Prevent going too far right
    }

    updateGallery();
}

// Event listeners for navigation buttons
document.querySelector('.nav-button.left').addEventListener('click', () => navigate(-1));
document.querySelector('.nav-button.right').addEventListener('click', () => navigate(1));





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


// Handling shift scrolling behavior
window.addEventListener('wheel', (event) => {
    if (event.shiftKey) {
        event.preventDefault(); // Prevent default vertical scrolling
        if (event.deltaY > 0) {
            // Scroll down (navigate right)
            navigate(1);
        } else {
            // Scroll up (navigate left)
            navigate(-1);
        }
    }
});