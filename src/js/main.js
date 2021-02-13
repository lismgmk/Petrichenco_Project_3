import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Differenc from './modules/differenc';
import BigForm from './modules/bigForms';
import Accordeon from './modules/accordeon';
import Download from './modules/download';


window.addEventListener('DOMContentLoaded', () => {

    const slider = new MainSlider( {btns: '.next', container: '.page'});
    slider.render();

    const modulesPageSlider = new MainSlider( {btns: '.next', container: '.moduleapp'});
    modulesPageSlider.render();

    

    const showUpSlider = new MiniSlider({ 
        container :'.showup__content-slider',
        next: '.showup__next', 
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();


    const modulesSlider = new MiniSlider({
        container :'.modules__content-slider',
        next: '.modules__info-btns .slick-next', 
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    
    const feedSlider = new MiniSlider({
        container :'.feed__slider',
        next: '.feed__slider .slick-next', 
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    const playerModules = new VideoPlayer('.module__video-item .play', '.overlay');
    playerModules.init();

    new Differenc('.officerold', '.officernew', '.officer__card-item').init();

    const bigForm = new BigForm ('.form');
    bigForm.getData();

    const accordeon = new Accordeon('.module__info-show .plus');
    accordeon.init();

    const download = new Download ('.module__info-book .download');
    download.init();
})