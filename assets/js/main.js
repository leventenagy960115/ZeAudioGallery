const gallery = [
  { src: "assets/img/foto1.webp", caption: "Outdoor setup - Bear" },
  { src: "assets/img/foto2.webp", caption: "Outdoor setup - Citadell" },
  { src: "assets/img/foto3.webp", caption: "Indoor setup - Ceremony" },
  { src: "assets/img/foto4.webp", caption: "Indoor setup - Palace" },
  // ide jöhet a többi kép
];

let currentIndex = 0;
let startX = 0;

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".gallery");

  // galéria feltöltése
  gallery.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption;
    img.dataset.index = index;
    galleryContainer.appendChild(img);
  });

  // kép kattintás
  galleryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentIndex = parseInt(e.target.dataset.index);
      openLightbox(currentIndex);
    }
  });
});

function openLightbox(index) {
  const item = gallery[index];

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${item.src}" alt="${item.caption}">
      <div class="lightbox-caption">${item.caption}</div>
      <button class="lightbox-close">&times;</button>
      <div class="lightbox-nav">
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
    </div>
  `;

  document.body.appendChild(lightbox);

  // gombok
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => closeLightbox(lightbox));
  lightbox.querySelector(".prev").addEventListener("click", () => navigate(-1));
  lightbox.querySelector(".next").addEventListener("click", () => navigate(1));

  // kattintás a háttérre
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(lightbox);
  });

  // billentyűzet
  document.addEventListener("keydown", keyHandler);

  // swipe mobilon
  lightbox.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
  lightbox.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) navigate(-1);
    if (startX - endX > 50) navigate(1);
  });

  function navigate(direction) {
    currentIndex = (currentIndex + direction + gallery.length) % gallery.length;
    const img = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");
    img.src = gallery[currentIndex].src;
    caption.textContent = gallery[currentIndex].caption;
  }

  function closeLightbox(lb) {
    document.body.removeChild(lb);
    document.removeEventListener("keydown", keyHandler);
  }

  function keyHandler(e) {
    if (e.key === "Escape") closeLightbox(lightbox);
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }
}
