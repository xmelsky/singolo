import {ScrollTo} from './scrollTo.js';

const scroll = new ScrollTo();

export class tabs {
    constructor(){
        this.tabs = document.querySelector();
    }
}

export const activeLinkHandler = (element, link, parent, cb) => {
    element.addEventListener('click', (e) => {
      if (!link) {
        e.preventDefault();
        const className = e.target.getAttribute('href');
        const element =  document.querySelector('.' + className);
        if(className) scroll.scrollSmooth(element);
        return;
      }
      if (e.target.tagName === link) {
          e.preventDefault();
          const activeElement = element.querySelector((parent || link) + '.active') || element.querySelector((parent || link));

          if(activeElement === e.target) return;

          activeElement.classList.remove('active');
          if (parent) {
            e.target.closest(parent).classList.add('active');
          } else {
            e.target.classList.add('active');
          }

          //ScrollTo handler when click on menu
          // const target = e.target.getAttribute('href');
          // if(target) target == 'home' ? scroll.scrollToTop() : scroll.smooth(e.target.getAttribute('href'));

          if ( typeof cb === 'function') cb();
        }
      });
  }