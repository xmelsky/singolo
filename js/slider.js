window.onload = function () {
  const sliderContainer = document.querySelector( '.slider' );
  const buttons = document.querySelectorAll( '.phone-button' );
  const screensOff = document.querySelectorAll( '.phone-screen__off' );

  buttons.forEach( el => el.addEventListener( 'click', () => {
    slider.isScreenOn = !slider.isScreenOn;
    console.log(slider);
    if ( !slider.isScreenOn ) {
      screensOff.forEach(el => el.classList.add('switch-off'));
      screensOff.forEach(el => el.classList.remove('switch-on'));
    } else {
      console.log('remove');
      screensOff.forEach(el => el.classList.add('switch-on'));
      screensOff.forEach(el => el.classList.remove('switch-off'));
    }
  } ) );

  sliderContainer.addEventListener( 'click', e => {
    e.stopPropagation();
    if ( e.target.tagName === 'BUTTON' ) {
      switch ( true ) {
        case e.target.dataset.direction == 'left':
          slider.slide( 'left' );
          break;
        case e.target.dataset.direction == 'right':
          slider.slide( 'right' );
          break;
        default:
      }
    }
  } );

  document.addEventListener( 'keyup', e => {
    if ( e.keyCode === 37 ) slider.slide( 'left' );
    else if ( e.keyCode === 39 ) slider.slide( 'right' );
  } );

  const slider = new Slider();
  slider.getImages();
};

class Slider {
  constructor() {
    this.isScreenOn = true;
    this.images = [];
    this.slides = [];
    this.index = null;
    this.isAnimation = false;
  }

  setActive () {
    this.images.map( ( e, i ) => {
      if (
        e.classList.contains( 'phone-screen__image-verical' ) &&
        e.classList.contains( 'active' )
      )
        this.index = i;
    } );
  }

  removeAllClases = ( { target } ) => {
    function removeActiveClasses ( el ) {
      el.classList.remove(
        'move_right',
        'move_left',
        'move_from_right',
        'move_from_left'
      );
    }
    this.images.map( removeActiveClasses );
    this.slides.map( removeActiveClasses );

    target.classList.remove( 'active' );
    target.removeEventListener( 'animationend', this.removeAllClases );
    this.isAnimation = false;
  };

  slide ( animIn ) {
    this.isScreenOn && this.setActive();
    if ( this.isAnimation && !this.index >= 0 ) return;

    const animOut = animIn == 'right' ? 'left' : 'right';

    if ( ['right', 'left'].includes( animIn ) ) {
      this.isAnimation = true;
      let nextV = null;
      let nextH = null;
      const mid = Math.floor( this.images.length / 2 );
      switch ( animIn ) {
        case 'right':
          nextV = this.index + 1 < mid ? this.index + 1 : 0;
          nextH = nextV + mid;
          break;
        case 'left':
          nextV = this.index - 1 >= 0 ? this.index - 1 : mid - 1;
          nextH = nextV + mid;
      }

      const animateItem = ( slide ) => {
        if ( slide.classList.contains( 'active' ) ) {
          slide.classList.add( 'move_' + animOut );
          slide.addEventListener( 'animationend', this.removeAllClases );
        }
      }

      if ( this.isScreenOn ) {
        this.images.forEach( animateItem );
        this.images[nextV].classList.toggle( 'active' );
        this.images[nextV].classList.toggle( 'move_from_' + animIn );
        this.images[nextH].classList.toggle( 'active' );
        this.images[nextH].classList.toggle( 'move_from_' + animIn );
      }

      this.slides.forEach( animateItem );

      this.slides[nextV].classList.toggle( 'active' );
      this.slides[nextV].classList.toggle( 'move_from_' + animIn );
      this.index = nextV;
    }
  }

  getImages () {
    this.images = [...document.querySelectorAll( '[data-image]' )];
    this.slides = [...document.querySelectorAll( '[data-slide]' )]
    this.setActive();
  }
}
