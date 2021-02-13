export default class Differenc {

    constructor(officerold, officernew, items){
        try{
            this.officerold = document.querySelector(officerold);
            this.officernew = document.querySelector(officernew);
            this.items = items;
            this.countOld = 0;
            this.countNew = 0;
            this.allOld = this.officerold.querySelectorAll(items);
            this.allNew = this.officernew.querySelectorAll(items);
        } catch(e){}
        
    }

    hideCard(elem){
        
        elem.forEach((item, i, arr) => {
            if(arr[i] !== arr[arr.length - 1]){
                item.style.display = 'none'
            }
        });
    }

    showCard(block, item, count){
        block.querySelector('.plus').addEventListener('click', () => {
            if(count !== item.length - 2){
                item[count].style.display = 'flex';
                count++;   
            } else {
                item[count].style.display = 'flex';  
                item[item.length-1].remove(); 
            }
            
        });
    }
    init() {
        try{
            this.hideCard(this.allOld);
            this.hideCard(this.allNew);
            this.showCard( this.officerold, this.allOld, this.countOld);
            this.showCard( this.officernew, this.allNew, this.countNew);

        } catch(e){}
        
    }
};