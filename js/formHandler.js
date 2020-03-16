export class FormHandler {
    constructor(form, { messageOk = 'Message sent', closeButton = 'OK', fields = [] }){
        this.form = form,
        this.messageOk = messageOk,
        this.closeButton = closeButton,
        this.fields = fields.filter(el => el.add)
    }

    validate = (e) => {
        e.preventDefault();
        this.showModal();
    }

    showModal() {
        const overlay = document.createElement('div');
        overlay.setAttribute('style', overlayStyles)
        const modal = document.createElement('div');
        modal.setAttribute('style', modalStyles);
        modal.classList.add('modal');
        const style = document.createElement('style');
        style.innerHTML = `
        .modal p {overflow: hidden;text-overflow: ellipsis;white-space: nowrap; padding: 10px 0;}
         body {overflow: hidden !important;}
        `;
        document.head.appendChild(style);
        const close = document.createElement('button');
        close.innerText = this.closeButton;
        close.setAttribute('style', closeStyles);

        close.onclick = () => overlay.remove() || style.remove() || this.form.reset();

        modal.innerHTML = `<p><h3>${this.messageOk}</h3></p>`;


        //Set all field that described in formOptions object
        this.fields.map(field => {
            const formField = [...this.form.elements].find(el => el.name === field.name);
            if(formField) {
                modal.innerHTML += `<p>${formField.value ? field.desc + ' ' + formField.value : field.ifEmpty}</p>`
            }
        });

        modal.appendChild(close);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        //this.form.reset();
    }
}

const overlayStyles = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 10;background-color: rgba(0,0,0,0.5);';
const modalStyles = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #fff; width: 300px; max-height: 380px; padding: 25px;'
const closeStyles = 'padding: 10px 20px; margin: 10px 0; cursor: pointer;'