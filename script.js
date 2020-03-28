import {Slider} from './js/slider.js';
import {FormHandler} from './js/formHandler.js';
import {activeLinkHandler} from './js/tabs.js';
import {DragAndDrop} from './js/dragAndDropHandler.js';
import preloader from './js/preloader.js';

// Run preloader
const Preloader = new preloader();

// Set handlers to set active element after click

const menu = document.querySelector('.menu');
const filter = document.querySelector('.filter-buttons');
const gallery = document.querySelector('.gallery');

activeLinkHandler(menu, false, undefined, () => closeOpenMenu());
activeLinkHandler(filter, 'BUTTON', undefined, () => manageGalleryImages(gallery, 'LI'));
activeLinkHandler(gallery, 'IMG', 'LI');



//Set Drag&Drop handler and send parent and childTagname

const dragDrop = new DragAndDrop(gallery, 'IMG');
dragDrop.init().setStyles();



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

buttons.forEach( el => el.addEventListener( 'click', () => {
    el.nextElementSibling.firstElementChild.classList.toggle( 'switch-on' );
    el.nextElementSibling.firstElementChild.classList.toggle( 'switch-off' );
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
    elem.classList.remove('active');
    setTimeout(()=> {
      element.appendChild(elem);
      setTimeout(()=>  elem.classList.remove('hidden'),150);
    }, 250);
  });
}


// Set function to manage Header states: sticky, up, relative

const header = document.querySelector( 'header' );
const loadBar = document.querySelector('.scroll-progress');
const headerPosition = header.offsetTop + header.offsetHeight;
const menuButton = document.querySelector('.menu-button');
let scrollPosition = window.scrollY;
window.onscroll = () => stickyHeader();
window.onload = () => {
  stickyHeader();
  document.querySelector('.load-screen').style.display = 'none';
  Preloader.stopAnimation();
};
window.onresize = () => adjustSliderScale();


function stickyHeader(e) {
  // Set header state
  if (window.pageYOffset > headerPosition + 25) {
    header.classList.add("sticky");
    if(window.pageYOffset > headerPosition + 50){
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
    if (section.offsetTop  <= scrollPosition + 250 &&  section.offsetTop + section.offsetHeight > scrollPosition + 250) {
      menu.querySelector('a.active').classList.remove('active')
      if(Math.ceil(window.pageYOffset + window.innerHeight) >= document.documentElement.scrollHeight) {
        menu.lastElementChild.lastElementChild.classList.add('active');
      }else{
        link.classList.add('active');
      }

    }

  });


  // Scroll status bar
  const initialWidth = parseInt(window.getComputedStyle(header).getPropertyValue('width'));
  const scrollBase = document.documentElement.scrollHeight - window.innerHeight;
  const percentWidth = (scrollBase - Math.ceil(window.pageYOffset)) / scrollBase;
  loadBar.style.width = initialWidth * ( 1 - percentWidth) + 'px';


  adjustSliderScale();
  }

function closeOpenMenu() {
  header.querySelector('nav').classList.remove('visible');
  header.querySelector('.logo').classList.remove('hide');
  menuButton.classList.remove('open');
}

function adjustSliderScale(){
  const vw1020 = window.matchMedia('(min-width: 769px) and (max-width: 1019px)');
  const vw768 = window.matchMedia('(min-width: 376px) and (max-width: 767px)');
  const vw375 = window.matchMedia('(max-width: 374px)');
  const phoneBody = document.querySelectorAll('.slider__phone');
  const loader = document.querySelector('.loader');

  if (vw1020.matches) {
    const scale = (1020 - document.documentElement.clientWidth) / 800;
    phoneBody.forEach(el => el.style.transform = `scale(${ 1 -  scale }`);
  } else if ( vw768.matches ) {
    const scale = (768 - document.documentElement.clientWidth) / 800;
    phoneBody.forEach(el => el.style.transform = `scale(${ 1 -  scale }`);
  } else if ( vw375.matches ) {
    const scale = (374 - document.documentElement.clientWidth) / 800;
    phoneBody.forEach(el => el.style.transform = `scale(${ 1 -  scale }`);
  } else {
    phoneBody.forEach(el => el.style.transform = `scale(1)`);
  }
}


menuButton.addEventListener('click', ({currentTarget}) => {
  if (currentTarget.classList.contains('open')) {
    currentTarget.classList.remove('open');
    header.querySelector('nav').classList.remove('visible');
    header.querySelector('.logo').classList.remove('hide');
  } else {
    currentTarget.classList.add('open');
    header.querySelector('.logo').classList.add('hide');
    header.querySelector('nav').classList.add('visible');
  }

});


// Use intersectionObserver API instead of window scroll calculations due to perfomance

//   let options = {
//     root: null,
//     rootMargin: "-40% 5%",
//     threshold: 0.01
//   }

//   const linkObserver = new IntersectionObserver(intersectionHandler, options);
//   document.querySelectorAll('[data-observe]').forEach(element => {
//     linkObserver.observe(element);
//   });

//   function intersectionHandler(entries) {

//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         menu.querySelector(`.active`).classList.remove('active');
//         menu.querySelector(`[data-link=${entry.target.dataset.observe}]`).classList.add('active');
//       }
//     })
//   }
// } else {}

