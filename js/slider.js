const buttons = document.querySelectorAll( '.phone-button' );
const screensOff = document.querySelectorAll( '.phone-screen__off' );

buttons.forEach( el => el.addEventListener( 'click', () => {
    slider.isScreenOn = !slider.isScreenOn;
  if ( !slider.isScreenOn ) {
    screensOff.forEach( el => el.classList.add( 'switch-off' ) );
    screensOff.forEach( el => el.classList.remove( 'switch-on' ) );
  } else {
    screensOff.forEach( el => el.classList.add( 'switch-on' ) );
    screensOff.forEach( el => el.classList.remove( 'switch-off' ) );
  }
} ) );

 export class Slider {
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

      const animateItem = ( item ) => {
        if ( item.classList.contains( 'active' ) ) {
          item.classList.add( 'move_' + animOut );
          item.addEventListener( 'animationend', this.removeAllClases );
        }
      }

      this.images.forEach( animateItem );
      this.slides.forEach( animateItem );
      this.images[nextV].classList.toggle( 'active' );
      this.images[nextV].classList.toggle( 'move_from_' + animIn );
      this.images[nextH].classList.toggle( 'active' );
      this.images[nextH].classList.toggle( 'move_from_' + animIn );



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
