import {Slider} from './slider.js';
import {FormHandler} from './formHandler.js';
import {activeLinkHandler} from './tabs.js';


// Set handlers to set active element after click

const menu = document.querySelector('.menu');
const filter = document.querySelector('.filter-buttons');
const gallery = document.querySelector('.gallery');

activeLinkHandler(menu, 'A');
activeLinkHandler(filter, 'BUTTON', undefined, () => manageGalleryImages(gallery, 'LI'));
activeLinkHandler(gallery, 'IMG', 'LI');


// Use form handler for validation and prompt messages

const form = document.querySelector('form.contact-form');
const formOptions = {
  messageOk: "Письмо отправлено",
  fields:[{
            name: 'Subject',
            desc: 'Тема:',
            ifEmpty: 'Без темы',
            add: true
          },
          {
            name: 'Description',
            desc: 'Описание:',
            ifEmpty: 'Без описания',
            add: true
          },
         ],
  closeButton: 'OK'
}
const formHandler = new FormHandler(form, formOptions);
form.onsubmit = (e) => formHandler.validate(e);

// Set slider prerequisites

const sliderContainer = document.querySelector( '.slider' );
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

// Initialize slider
const slider = new Slider();
slider.getImages();

// Set slider handler for slide buttons

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

// Set slider handler for arrow keys <- and ->
document.addEventListener( 'keyup', e => {
  if ( e.keyCode === 37 ) slider.slide( 'left' );
  else if ( e.keyCode === 39 ) slider.slide( 'right' );
} );



// This funtion is to use in callback for activeLinkHandler

function manageGalleryImages(element, link) {
  const galleryImages = [...element.querySelectorAll(link)];
  const shuffle = (arr) => [...arr].sort((a,b) => 0.5 - Math.random());
  let randomizedArr = shuffle(galleryImages);

  while(randomizedArr.some( (elem,i) => elem === galleryImages[i] )) {
    randomizedArr = shuffle(randomizedArr);
  }
  randomizedArr.forEach(elem => {
    elem.classList.add('hidden');
    setTimeout(()=> {
      element.appendChild(elem);
      setTimeout(()=>  elem.classList.remove('hidden'),150);
    }, 250);
  });
}

// Set function to manage Header states: sticky, up, relative

const header = document.querySelector( 'header' );
const headerPosition = header.offsetTop + header.offsetHeight;
window.onscroll = (e) => stickyHeader(e);
let scrollPosition = window.scrollY;


function stickyHeader(e) {
  // Set header state
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
  // Manage active links during scroll event
  scrollPosition = window.scrollY;
  menu.querySelectorAll('a.menu__link').forEach(link => {
      let section = document.querySelector(`.${link.getAttribute('href')}`);
    if (section.offsetTop  <= scrollPosition + 200 &&  section.offsetTop + section.offsetHeight > scrollPosition + 200) {
        menu.querySelector('a.active').classList.remove('active')
        link.classList.add('active');
    }

  });
}
