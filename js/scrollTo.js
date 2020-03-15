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
        const position =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (position) {
            window.scrollBy(0, -Math.max(1, Math.floor(position / 15)));
            // Fire scroll to top
            this.scrollAnimation = requestAnimationFrame(this.scrollToTop);
            // Add event listener to mouse scroll
            document.addEventListener("wheel", function wheel() {
            // Cancel scroll to top if user scrolls the mouse wheel during animation
                window.cancelAnimationFrame(this.scrollAnimation);
                document.removeEventListener("wheel", wheel);
            });
        }
    }
}