const images = document.querySelectorAll(".photoGrid img");
const lightbox = document.querySelector(".lightbox");
const lightImg = document.querySelector(".lightbox img");
const next = document.querySelector(".arrow.right");
const prev = document.querySelector(".arrow.left");

let index = 0;

function getFullSrc(img) {
  return img.dataset.full || img.src;
}

// Pre-carga silenciosa de una URL para que el navegador la tenga en caché
function preload(url){
  if (!url) return;
  const img = new Image();
  img.src = url;
}

function preloadNeighbors(i){
  if (images.length === 0) return;
  const nextI = (i + 1) % images.length;
  const prevI = (i - 1 + images.length) % images.length;
  preload(getFullSrc(images[nextI]));
  preload(getFullSrc(images[prevI]));
}

function setLightboxImage(i){
  if (!lightImg || !images[i]) return;
  // Mostramos la thumb inmediatamente como placeholder
  const thumb = images[i].src;
  const full = getFullSrc(images[i]);

  lightImg.src = thumb;
  lightImg.classList.add("loading");

  // Y descargamos la versión grande en paralelo
  const big = new Image();
  big.onload = () => {
    // Solo aplicamos si seguimos en la misma imagen (no han cambiado)
    if (index === i){
      lightImg.src = full;
      lightImg.classList.remove("loading");
    }
  };
  big.src = full;

  preloadNeighbors(i);
}

function openLightbox(i) {
  if (!lightbox || !lightImg || images.length === 0) return;
  index = i;
  setLightboxImage(index);
  lightbox.classList.add("active");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.classList.remove("lightbox-open");
}

function showNext() {
  if (!lightImg || images.length === 0) return;
  index = (index + 1) % images.length;
  setLightboxImage(index);
}

function showPrev() {
  if (!lightImg || images.length === 0) return;
  index = (index - 1 + images.length) % images.length;
  setLightboxImage(index);
}

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    openLightbox(i);
  });
});

if (next) {
  next.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
}

if (prev) {
  prev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Soporte táctil: swipe izq/der en móvil
if (lightbox){
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 50) return;
    if (diff < 0) showNext(); else showPrev();
  }, { passive: true });
}
