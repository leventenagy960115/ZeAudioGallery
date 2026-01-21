document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("data-full");
      openLightbox(src);
    });
  });
});

function openLightbox(src) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${src}" />
      <span class="lightbox-close">&times;</span>
    </div>
  `;

  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target.className === "lightbox" || e.target.className === "lightbox-close") {
      document.body.removeChild(lightbox);
    }
  });
}
