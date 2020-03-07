window.onload = function() {
  const sliderContainer = document.querySelector('.slider');

  sliderContainer.addEventListener('click', e => {
    e.stopPropagation();
    if (e.target.tagName === 'BUTTON') {
      switch (true) {
        case e.target.dataset.direction == 'left':
          slider.slide('left');
          break;
        case e.target.dataset.direction == 'right':
          slider.slide('right');
          break;
        default:
      }
    }
  });

  document.addEventListener('keyup', e => {
    if (e.keyCode === 37) slider.slide('left');
    else if (e.keyCode === 39) slider.slide('right');
  });

  const slider = new Slider();
  slider.getImages();
};

class Slider {
  constructor() {
    this.images = [];
    this.index = null;
    this.isAnimation = false;
  }

  setActive() {
    this.images.map((e, i) => {
      if (
        e.classList.contains('phone-screen__image-verical') &&
        e.classList.contains('active')
      )
        this.index = i;
    });
  }

  removeAllClases = ({ target }) => {
    this.images.map(e => {
      e.classList.remove(
        'move_right',
        'move_left',
        'move_from_right',
        'move_from_left'
      );
    });
    target.classList.remove('active');
    target.removeEventListener('animationend', this.removeAllClases);
    this.isAnimation = false;
  };

  slide(animIn) {
    if (this.isAnimation && !this.index >= 0) return;

    const animOut = animIn == 'right' ? 'left' : 'right';

    if (['right', 'left'].includes(animIn)) {
      this.isAnimation = true;
      let nextV = null;
      let nextH = null;
      const mid = Math.floor(this.images.length / 2);
      switch (animIn) {
        case 'right':
          nextV = this.index + 1 < mid ? this.index + 1 : 0;
          nextH = nextV + mid;
          break;
        case 'left':
          nextV = this.index - 1 >= 0 ? this.index - 1 : mid - 1;
          nextH = nextV + mid;
      }

      this.images.filter(slide => {
        if (slide.classList.contains('active')) {
          slide.classList.add('move_' + animOut);
          slide.addEventListener('animationend', this.removeAllClases);
        }
      });

      this.images[nextV].classList.toggle('active');
      this.images[nextV].classList.toggle('move_from_' + animIn);
      this.images[nextH].classList.toggle('active');
      this.images[nextH].classList.toggle('move_from_' + animIn);
      this.index = nextV;
    }
  }

  getImages() {
    this.images = [...document.querySelectorAll('[data-image]')];
    this.setActive();
  }
}
