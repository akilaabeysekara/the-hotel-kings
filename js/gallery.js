const images = [
  "assets/images/hotel-img1.jpg",
  "assets/images/hotel-img2.jpg",
  "assets/images/hotel-img3.jpg",
  "assets/images/hotel-img4.jpg",
  "assets/images/hotel-img5.jpg",
  "assets/images/hotel-img9.jpg"
];

let currentIndex = 1;
let autoPlayInterval;

function switchGallery(index) {
  currentIndex = index;
  updateGallery();
}

function changeImage(step) {
  currentIndex += step;
  if (currentIndex > images.length) currentIndex = 1;
  if (currentIndex < 1) currentIndex = images.length;
  updateGallery();
}

function updateGallery() {
  const photo = document.getElementById("active-photo");

  photo.classList.add("fade-out");
  setTimeout(() => {
    photo.src = images[currentIndex - 1];
    photo.classList.remove("fade-out");
  }, 250);

  document
    .querySelectorAll(".gallery-pagination .page-item")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".gallery-pagination .page-item")
    [currentIndex - 1].classList.add("active");
}

function startAutoPlay() {
  stopAutoPlay(); 
  autoPlayInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

window.onload = startAutoPlay;
