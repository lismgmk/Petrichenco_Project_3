export default class VideoPlayer {

    constructor(trigger, overlay){
        this.btns = document.querySelectorAll(trigger);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    };

    createPlayer (url){          
            this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {      
                'onStateChange': this.onPlayerStateChange
            }
        });              
    };

   

    bindTriggers() {
        
        this.btns.forEach( (btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if( i % 2 == 0) {
                    blockedElem.setAttribute('data-block', 'true');
                }
            } catch(e){}
           

          
            
                    btn.addEventListener('click', () => {
                        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-block') !== 'true'){

                    this.activeBtn = btn;

                
                        if(document.querySelector('iframe#frame')) {
                            if(this.patch !== btn.getAttribute('data-url')){
                                this.patch = btn.getAttribute('data-url');
                                this.player.loadVideoById({videoId: this.patch})
                            }
                            this.overlay.style.display = 'flex';
                        } else {
                            this.patch = btn.getAttribute('data-url');
                            this.createPlayer(this.patch);
                        }  

                    };
                
                });
            
            
        });
    };

     onPlayerStateChange (e) {
       try{
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
                const activeSvg = this.activeBtn.querySelector('svg').cloneNode(true);
                
                console.log(activeSvg);
                
                    if (e.data == 0){
                        if(blockedElem.querySelector('.play__text').classList.contains('attention')){

                            blockedElem.querySelector('.play__circle').classList.remove('closed');
                            blockedElem.querySelector('svg').remove();
                            blockedElem.querySelector('.play__text').textContent = 'play video';
                            blockedElem.querySelector('.play__text').classList.remove('attention');
                            blockedElem.querySelector('.play__circle').appendChild(activeSvg);
                            blockedElem.style.cssText = `
                            filter: none;
                            opacity: 1;
                            `; 
                            blockedElem.setAttribute('data-block', 'false')
                        }
                    };
       }
       catch(e) {}
       

        
        
        
    }

    bindCloseBtn () {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    };

    init() {
        if(this.btns.length > 0) {
            const tag = document.createElement('script');
    
            tag.src = "https://www.youtube.com/iframe_api";

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.bindTriggers();
            this.bindCloseBtn();
        }
               
    }
};