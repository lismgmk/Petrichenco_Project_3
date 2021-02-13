
export default class Accordeon {
    
    constructor(trigger){
        this.trigger = document.querySelectorAll(trigger);
    };

    showText(){
       
        this.trigger.forEach((btn) => {
            btn.addEventListener('click', () => {
                const block = btn.closest('.module__info-show').nextElementSibling;
                    block.classList.toggle('msg');
            })
        })
    };

    init(){
        this.showText();
    };
};