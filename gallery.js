const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById("modal-img");
const closeButton = document.querySelector('.close');
const scrollContainer = document.querySelector('.gallery-container');

let currentIndex = 0;
let autoScrollInterval;
let scrollSpeed = 3000; // interval for auto-scroll in milliseconds
let isModalOpen = false; // Flag to track modal state

function scrollGallery(direction) {
    images.forEach(image => image.classList.remove('active'));
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
    images[currentIndex].classList.add('active');
}

function autoScroll() {
    
    images.forEach(image => image.classList.remove('active'));
    currentIndex = (currentIndex + 1) % images.length;
    
    const imageRect = images[currentIndex].getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const scrollPosition = imageRect.left - containerRect.width / 2 + imageRect.width / 2 + scrollContainer.scrollLeft;

    scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    images[currentIndex].classList.add('active');
    console.log(autoScrollInterval);
    
}

function startAutoScroll() {
    if (!autoScrollInterval && !isModalOpen) { // Check if modal is not open
        autoScrollInterval = setInterval(autoScroll, scrollSpeed);
    }
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null; // Reset the interval reference
}

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoScroll); // Stop on button click
});

// Start auto-scrolling when the gallery is displayed
startAutoScroll();

document.querySelector('.nav-button.left').addEventListener('click', () => scrollGallery(-1)); // Scroll left
document.querySelector('.nav-button.right').addEventListener('click', () => scrollGallery(1)); // Scroll right

// Stop scrolling when the mouse enters the scroll container
scrollContainer.addEventListener('mouseenter', stopAutoScroll);
scrollContainer.addEventListener('mouseleave', startAutoScroll);

// Open modal when an image is clicked
function openModal(image) {
    isModalOpen = true; // Set the flag to true
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
    isModalOpen = false; // Reset the flag
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


    //Switching video in mobile view
let currentVideoSource = '';

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
