import {Slider} from './slider.js';
import {ScrollTo} from './scrollTo.js';


const sliderContainer = document.querySelector( '.slider' );
const slider = new Slider();
slider.getImages();

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

const menu = document.querySelector('.menu');
const scroll = new ScrollTo();

menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        menu.querySelector('a.active').classList.remove('active')
        e.target.classList.add('active');
        const target = e.target.getAttribute('href');
        target == 'home' ? scroll.scrollToTop() : scroll.smooth(e.target.getAttribute('href'));
    }
});

const header = document.querySelector( 'header' );
const headerPosition = header.offsetTop + header.offsetHeight;
window.onscroll = (e) => stickyHeader(e);
let scrollPosition = window.scrollY;


function stickyHeader(e) {
    if (window.pageYOffset > headerPosition + 50) {
        header.classList.add("sticky");
        if(scrollPosition > window.scrollY && scrollPosition > headerPosition + 200){
            header.classList.add("up");
        } else {
            header.classList.remove("up");
        }
      } else {
        header.classList.remove("sticky");
      }
      scrollPosition = window.scrollY;
      menu.querySelectorAll('a.menu__link').forEach(link => {
          let section = document.querySelector(`.${link.getAttribute('href')}`);
        if (section.offsetTop  <= scrollPosition + 200 &&  section.offsetTop + section.offsetHeight > scrollPosition + 200) {
            menu.querySelector('a.active').classList.remove('active')
            link.classList.add('active');
        }

      });
}
