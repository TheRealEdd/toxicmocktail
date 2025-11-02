const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector('.close');
const scrollContainer = document.querySelector('.gallery-container');

let currentIndex = 0;
let autoScrollInterval;
let scrollSpeed = 3000; // interval for auto-scroll in milliseconds

function scrollGallery(direction) {
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (direction === 1) {
        if (scrollContainer.scrollLeft >= maxScrollLeft) {
            currentIndex = 0;
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            currentIndex = (currentIndex + 1) % images.length;

            const imageRect = images[currentIndex].getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            const scrollPosition = imageRect.left - containerRect.width / 2 + imageRect.width / 2 + scrollContainer.scrollLeft;

            scrollContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    } else {
        if (scrollContainer.scrollLeft <= 0) {
            currentIndex = images.length - 1;
            scrollContainer.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;

            const imageRect = images[currentIndex].getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            const scrollPosition = imageRect.left - containerRect.width / 2 + imageRect.width / 2 + scrollContainer.scrollLeft;

            scrollContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
}

function autoScroll() {
    currentIndex = (currentIndex + 1) % images.length;
    
    const imageRect = images[currentIndex].getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const scrollPosition = imageRect.left - containerRect.width / 2 + imageRect.width / 2 + scrollContainer.scrollLeft;

    scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Start the auto-scrolling
function startAutoScroll() {
    if (!autoScrollInterval) {
        autoScrollInterval = setInterval(autoScroll, scrollSpeed);
    }
}

// Stop the auto-scrolling
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;  // Reset the interval reference
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
function openModal(image) {
    modal.style.display = "block";
    modalImg.src = image.src;

    setTimeout(() => {
        modal.classList.add('show');
        modalImg.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
    
    currentIndex = Array.from(images).indexOf(image);
    stopAutoScroll(); // Stop auto-scrolling when modal is opened
}

// Function to close modal and restart auto-scrolling
function closeModal() {
    modalImg.style.transform = "translate(-50%, -50%) scale(0.9)";
    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = "none";
        startAutoScroll(); // Restart auto-scrolling when modal is closed
    }, 500);
}

// Update event listener for opening the modal
images.forEach((image) => {
    image.addEventListener('click', () => openModal(image));
});

// Update event listener for closing the modal
closeButton.addEventListener('click', closeModal);
modalImg.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
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



let currentVideoSource = ''; // Initialize a variable to keep track of the current video source

function updateVideoSource() {
    const videoElement = document.getElementById('heroVideo');
    const desktopSource = 'Video/TM Hero Video Desktop.mp4';
    const mobileSource = 'Video/TM mobile hero tiny size.mp4';

    // Determine the new source based on window width
    let newSource = window.innerWidth <= 1120 ? mobileSource : desktopSource;

    // Only update if the new source is different from the current source
    if (newSource !== currentVideoSource) {
        currentVideoSource = newSource; // Update the current source
        videoElement.src = newSource; // Change the video source
        videoElement.load(); // Reload the video
    }
}

// Initial load and resize event listeners
window.onload = updateVideoSource;
window.onresize = updateVideoSource;
