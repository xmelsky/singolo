export class ScrollTo {
    constructor(  ) {
        this.menuLinks = [...document.querySelectorAll('.menu')];
        this.scrollAnimation = null;
    }

    scrollSmooth = (element, direction, threshold = 0) => {
        let animation;
        const position = element.offsetTop || document.documentElement.scrollTop;
        if (window.scrollY > (element.offsetTop !== 0 ? element.offsetTop - threshold : 0) && (direction == 'up' || direction == undefined)) {
            direction = 'up';
            let smooth =  100 - (window.scrollY - element.offsetTop) / window.scrollY * 100 || 15;
            const offset = -Math.max(1, Math.floor(position / smooth.toFixed(2)));
            window.scrollBy(0, offset);
            animation = requestAnimationFrame(() => this.scrollSmooth(element, direction, threshold));
        }else if (window.scrollY < element.offsetTop - threshold && (direction == 'down' || direction == undefined)){
            direction = 'down';
            let smooth =  100 - (element.offsetTop - window.scrollY) / element.offsetTop * 100 || 15;
            window.scrollBy(0, Math.max(1, Math.floor(position / smooth.toFixed(2)) ));
            animation = requestAnimationFrame(() => this.scrollSmooth(element, direction, threshold));
            if(Math.ceil(window.pageYOffset + window.innerHeight) >= document.documentElement.scrollHeight) cancelAnimationFrame(animation);
        }else{
            cancelAnimationFrame(animation);
        }
        document.addEventListener("wheel", function wheel() {
            cancelAnimationFrame(animation);
            document.removeEventListener("wheel", wheel);
        });
    }
}