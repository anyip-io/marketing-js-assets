class ImageZoom {
  image: HTMLElement;
  backdrop: HTMLElement;
  imageBCR: DOMRect | undefined;

  constructor(image: HTMLElement) {
    // Image
    this.image = image;

    // Backdrop
    this.backdrop = document.querySelector('[data-zoom-backdrop]') as HTMLElement;
    if (this.backdrop === null) {
      this.backdrop = document.createElement('div');
      this.backdrop.setAttribute('data-zoom-backdrop', '');
      document.body.appendChild(this.backdrop);
    }

    // Pass `this` through to methods
    this.zoomImage = this.zoomImage.bind(this);
    this.resetImage = this.resetImage.bind(this);
    this.resetImageComplete = this.resetImageComplete.bind(this);

    // Add click event handler
    this.image.addEventListener('click', this.zoomImage);
  }

  zoomImage(): void {
    // Prevent an image from zooming while another is already active
    if (this.backdrop.getAttribute('data-zoom-active') === 'true') return;

    // Declare zoom function to be active
    this.backdrop.setAttribute('data-zoom-active', 'true');

    // Handle event listeners
    this.image.removeEventListener('click', this.zoomImage);
    this.image.addEventListener('click', this.resetImage);
    this.backdrop.addEventListener('click', this.resetImage);
    document.addEventListener('keyup', this.resetImage);
    window.addEventListener('scroll', this.resetImage);
    window.addEventListener('resize', this.resetImage);

    // Fade in backdrop
    this.backdrop.setAttribute('data-zoom-backdrop', 'active');

    // Set image style
    this.image.setAttribute('data-zoom-image', 'active');

    // Set image transform
    this.imageBCR = this.image.getBoundingClientRect();
    const scale = Math.min(
      window.innerWidth / this.imageBCR.width,
      window.innerHeight / this.imageBCR.height
    );
    const translateX = (window.innerWidth - this.imageBCR.width) / 2 - this.imageBCR.left;
    const translateY = (window.innerHeight - this.imageBCR.height) / 2 - this.imageBCR.top;
    this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
  }

  resetImage(): void {
    // Handle event listeners
    window.removeEventListener('resize', this.resetImage);
    window.removeEventListener('scroll', this.resetImage);
    document.removeEventListener('keyup', this.resetImage);
    this.backdrop.removeEventListener('click', this.resetImage);
    this.image.removeEventListener('click', this.resetImage);
    this.image.addEventListener('click', this.zoomImage);

    // Fade out backdrop
    this.backdrop.setAttribute('data-zoom-backdrop', '');

    // Reset image style
    this.image.addEventListener('transitionend', this.resetImageComplete);

    // Reset image transform
    this.image.style.transform = '';
  }

  resetImageComplete(): void {
    // Handle event listeners
    this.image.removeEventListener('transitionend', this.resetImageComplete);

    // Declare zoom function to be not active
    this.backdrop.setAttribute('data-zoom-active', 'false');

    // Reset image style
    this.image.setAttribute('data-zoom-image', '');
  }
}

export default () => {
  document.querySelectorAll('.blog-details-rich-content img').forEach((img) => {
    // @ts-ignore
    new ImageZoom(img);
  });
};
