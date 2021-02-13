export default class Download {

    constructor (trigger) {
        this.triggers = document.querySelectorAll(trigger);
        this.patch = './assets/img/Bitmap.jpg';
    };

    createHref(patch) {

        let newBlock = document.createElement('a');
        newBlock.setAttribute('href', patch);
        newBlock.setAttribute('download', 'name');
        newBlock.style.display = 'none';
        document.body.appendChild(newBlock);

        newBlock.click();

        document.body.removeChild(newBlock);
    }

    init() {
        this.triggers.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                this.createHref(this.patch);
            })
        });
    }

}