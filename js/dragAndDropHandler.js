export class DragAndDrop {
    constructor(parent, childTagName) {
        this.parent = parent;
        this.childs = [...this.parent.querySelectorAll('li')];
        this.childTag = childTagName;
        this.mouseHold = null;
        this.activeItem = null;
    }

    init =() => {
        this.parent.addEventListener('mousedown', (e) => {
            if (e.which == 1 && e.target.tagName === this.childTag ) {
                this.childs.map(el => el.classList.remove('active'));
                this.activeItem = e.target.closest('LI');
                this.tempItem = document.createElement('LI');
                this.tempItem.classList.add('gallery-content__item');

                this.shiftX = e.clientX - this.activeItem.getBoundingClientRect().left;
                this.shiftY = e.clientY - this.activeItem.getBoundingClientRect().top;

                this.activeItem.style.left = e.pageX - this.shiftX + 'px';
                this.activeItem.style.top = e.pageY - this.shiftY + 'px';

                this.activeItem.ondragstart = this.cancelDefaultDragDrop;
                this.parent.insertBefore(this.tempItem, this.activeItem);
                document.onmousemove = this.onMouseMove;

                this.activeItem.classList.add('drag-active');
                this.activeItem.classList.add('active');
                document.body.appendChild(this.activeItem)

                this.activeItem.addEventListener('mouseup', this.resetElement);
            }
        });
        return this;
    }

    cancelDefaultDragDrop = () => {
        return false;
    }

    onMouseMove = (e) => {
        this.activeItem.style.left = e.clientX - this.shiftX  + 'px';
        this.activeItem.style.top = e.pageY - this.shiftY + 'px';
        this.setPosition();
    }

    setPosition = () => {
        this.childs.forEach( item  => {
            if (
                item.offsetLeft < this.activeItem.offsetLeft &&
                item.offsetLeft + item.offsetWidth > this.activeItem.offsetLeft &&
                item.offsetTop < this.activeItem.offsetTop &&
                item.offsetTop + item.offsetHeight > this.activeItem.offsetTop
            ) {
                item.classList.add('active');
                this.toReplace = item;
            }else {
                if (!item.classList.contains('drag-active')) item.classList.remove('active');
                if (this.toReplace && !this.toReplace.classList.contains('active')) {
                    this.toReplace = null;
                }
            }
        })
    }

    resetElement = () => {
        if (this.activeItem) {
            if (this.toReplace) {
                this.parent.insertBefore( this.activeItem, this.toReplace);
                this.parent.insertBefore( this.toReplace, this.tempItem);
                this.toReplace = null;
            } else {
                this.parent.insertBefore(this.activeItem, this.tempItem);
            }
            this.activeItem.removeEventListener('mouseup', this.resetElement);
            this.activeItem.classList.remove('drag-active');
            this.activeItem.removeAttribute('style');
            document.onmousemove = null;
            this.tempItem.remove();
        }
    }

    setStyles = (styles) => {
        this.style = document.createElement('style');
        this.style.innerHTML = styles || `
        .drag-active {
            position: absolute !important;
            z-index: 999;
            margin: 0 !important;
            list-style: none;
        }
        `;
        document.head.appendChild(this.style);
    }
}