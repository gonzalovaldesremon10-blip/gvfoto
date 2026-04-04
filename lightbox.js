const images = document.querySelectorAll(".photoGrid img");
const lightbox = document.querySelector(".lightbox");
const lightImg = document.querySelector(".lightbox img");
const next = document.querySelector(".arrow.right");
const prev = document.querySelector(".arrow.left");

let index = 0;

function getFullSrc(img) {
  return img.dataset.full || img.src;
}

function openLightbox(i) {
  if (!lightbox || !lightImg || images.length === 0) return;

  index = i;
  lightImg.src = getFullSrc(images[index]);
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

  index++;
  if (index >= images.length) index = 0;
  lightImg.src = getFullSrc(images[index]);
}

function showPrev() {
  if (!lightImg || images.length === 0) return;

  index--;
  if (index < 0) index = images.length - 1;
  lightImg.src = getFullSrc(images[index]);
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

  if (e.key === "ArrowRight") {
    showNext();
  }

  if (e.key === "ArrowLeft") {
    showPrev();
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}