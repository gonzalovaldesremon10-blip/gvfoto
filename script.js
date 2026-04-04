const slides = document.querySelectorAll(".slide");

let i = 0;
let interval = null;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  i++;
  if (i >= slides.length) i = 0;
  showSlide(i);
}

function startCarousel() {
  if (slides.length === 0) return;

 
  clearInterval(interval); // evita duplicados
  interval = setInterval(nextSlide, 8000);
}

// iniciar
startCarousel();