const loadList = ['scripts', 'styles', 'images', 'icons', 'fonts', 'modules', 'layouts', 'themes', 'resolution'];
const actions = ['loading', 'importing', 'analyzing']

let i = 0;
let loader = null;
let timeout = null;
let timeout2 = null;
let animation = null;

const Preloader = function() {

    while (!loader) {
        loader = getElement();
    }
    const loadMessage = document.createElement('div');
    loadMessage.classList.add('load-message');


    const dots = document.createElement('div');
    dots.classList.add('dots');

    loader.appendChild(loadMessage);
    loader.appendChild(dots);


    function setAnimation(){
        setTimer(i);
        if(!/\.{5}/.test(dots.innerHTML)) {
            dots.innerHTML += '.';
        } else {
            dots.innerHTML = '.';
        }
        i++;

        timeout = setTimeout(() => animation = window.requestAnimationFrame(setAnimation), 500)

    }

    function setTimer(position) {

        const rnd = Math.ceil(Math.random() * (12 - 3) + 3);
        timeout2 = setTimeout(()=> {
            if (!position || position % 3 == 0) loadMessage.innerText = !loadMessage.innerText ? actions[position-=position] : actions[!position ? position : position - 2 <= 3 ? position - 2 : position-(position-2)]
            else loadMessage.innerText = loadMessage.innerText.split(' ')[0];
            loadMessage.innerHTML+= ` <strong>${loadList[position < loadList.length ? position : position-=position ]}</strong>`
            position++;
        }, !loadMessage.innerText ? 0 : rnd * 300);
    }

    window.requestAnimationFrame(setAnimation);
}

Preloader.prototype.stopAnimation = () => {
    window.cancelAnimationFrame(animation);
    window.clearTimeout(timeout);
    loader.remove();
};

function getElement() {
    return document.querySelector('.load-screen');
}

export default Preloader;
