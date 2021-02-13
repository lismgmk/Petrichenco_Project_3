import Slider from './slider';

export default class MainSlider extends Slider {

    constructor(btns) {
        super (btns);
    };

    showSlides(n){
        if( n > this.slides.length){
           this.slideIndex = 1;
       };

       try{
           this.hanson.style.opacity = '0';
          
           if ( n === 3){
                this.hanson.classList.add('animated')
               setTimeout(()=>{
                   this.hanson.style.opacity = '1';
                   this.hanson.classList.add('slideInUp');
               }, 3000);
           } else { 
               this.hanson.classList.remove('slideInUp');
           }
       } catch{}
       

       if ( n < 1) {
           this.slideIndex = this.slides.length;
       };

       this.slides.forEach(element => {
           element.style.display = 'none';
       });
       this.slides[this.slideIndex-1].style.display = 'block';
   };
   

   goIndex (n) {
      this.showSlides(this.slideIndex += n); 
      console.log(this.slideIndex)
   };

   bindTriggers () {
    this.btns.forEach(btn => {
        btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
            e.preventDefault();
            this.slideIndex = 1;
            this.showSlides( this.slideIndex);
        })
        btn.addEventListener('click', () => {
            this.goIndex(1);
            this.slides[this.slideIndex-1].style.display = 'block';
        } )

    })
     

    const btnPrevmodule = document.querySelectorAll('.prevmodule');
    btnPrevmodule.forEach((btn) => {
         btn.addEventListener('click', (e) => {
             e.stopPropagation();
             e.preventDefault();
             this.goIndex(-1);
         })
    })

    const btnNextmodule = document.querySelectorAll('.nextmodule');
    btnNextmodule.forEach((btn) => {
       
         btn.addEventListener('click', (e) => {
             e.stopPropagation();
             e.preventDefault();
             this.goIndex(1);
         })
    })
   }

   render () {
    if (this.container) {
        try{
           this.hanson = document.querySelector('.hanson');
       } catch {};

       this.showSlides( this.slideIndex);

       this.bindTriggers();
       

        } 

    } 
       

};