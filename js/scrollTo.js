export class ScrollTo {
    constructor(  ) {
        this.menuLinks = [...document.querySelectorAll('.menu')];
        this.scrollAnimation = null;
    }

    smooth( className ) {
        const element =  document.querySelector('.' + className);
        element && element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }

    scrollToTop = () => {
        let animation;
        const position =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (position) {
            window.scrollBy(0, -Math.max(1, Math.floor(position / 15)));
            animation = requestAnimationFrame(this.scrollToTop);
            document.addEventListener("wheel", function wheel() {
                cancelAnimationFrame(animation);
                document.removeEventListener("wheel", wheel);
            });
        }
    }
}