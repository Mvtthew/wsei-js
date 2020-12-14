const lightboxImage = document.getElementById('lightbox-img');
const lightboxElement = document.getElementById('lightbox');
const imagesElements = document.querySelectorAll('.images img');

const showLightbox = (imageUrl) => {
  lightboxImage.style.backgroundImage = `url(${imageUrl})`;
  lightboxElement.classList.add('show');
}

const hideLightbox = () => {
  lightboxElement.classList.remove('show');
}

const initImagesClick = () => {
  imagesElements.forEach(imageElement => {
    imageElement.addEventListener('click', (e) => {
      showLightbox(e.target.getAttribute('src'));
    })
  });
};

const initLightboxHide = () => {
  lightboxElement.addEventListener('click', () => {
    hideLightbox();
  })
}

initImagesClick();
initLightboxHide();