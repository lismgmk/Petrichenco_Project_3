import Slider from './slider';

export default class MiniSlaider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay){
        super(container, next, prev, activeClass, animate, autoplay);
    };

    decorizeSlides(){
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate){
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0.4';
            }
        });

        if(!this.slides[0].closest('button')){
            this.slides[0].classList.add(this.activeClass);
        }
        
        
        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    };

    nextSlide(){

        if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON'){
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } else if(this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0])
            this.decorizeSlides();
        }
    };

    bindTriggers(){
        this.next[0].addEventListener('click', () => this.nextSlide());
        
        this.prev[0].addEventListener('click', () => {

            for( let i = this.slides.length - 1; i > 0; i--){
                if( this.slides[i].tagName !== 'BUTTON'){
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                } 
            }
        })
    };
    playPausedAutoplay() {
        const startAutoplay = setInterval(() => this.nextSlide(), 5000);
 
        this.container.addEventListener('mouseenter', () => {
            clearInterval(startAutoplay);
        });
 
        this.container.addEventListener('mouseleave', () => {
            this.playPausedAutoplay();
        });
}
    init () {

        try{
            this.container.style.cssText = 
            `display: flex;
            align-items: start;
            overflow: hidden;
            flex-wrap: wrap;`


            this.bindTriggers();
            this.decorizeSlides();
            if(this.autoplay) {
            this.playPausedAutoplay(); 
        }
        } catch(e){}
        
    };
}

