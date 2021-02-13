export default class BigForm {

    constructor(block) {
        this.blocks = document.querySelectorAll(block);
        this.message = {
            loaded: 'Идет загрузка',
            send: 'Форма отправлена',
            err: 'Что-то пошло не так'
        };
        this.inputs = document.querySelectorAll('input');
        this.mail = document.querySelectorAll('[name = "email"]');
    };

    initMask() {
        let setCoursorePosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if(elem.createTextRange){
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        } 
    
        function createMask(event) {
            let matrix = '+1 (__) ___-__',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
                if(def.length >= val.length){
                    val = def;
                }
    
                this.value = matrix.replace(/./g, function(a){
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                });
    
                if(event.type === 'blur') {
                    if(this.value.length == 2){
                        this.value = '';
                    } 
                } else {
                    setCoursorePosition(this.value.length, this);
                }
        }
    
        let inputs = document.querySelectorAll('[name = "phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        })
    
    }



    filterEmail(){
        this.mail.forEach((item) => {
            item.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)){
                    e.preventDefault();
                }
            })
        })
    }

   
    async postData (url, data){
        let response = await fetch(url, {
            method: 'POST',
            body: data
        });
        // return await response.text()
    };

    clearInputs(){
        this.inputs.forEach((input)=> {
            input.value = '';
        })
    }

    getData(){
        this.filterEmail();
        this.initMask();
        this.blocks.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let elementDiv = document.createElement('div');
                elementDiv.style.cssText = `
                    height = 100px;
                    weight = 100px;
                    color = 'red'
                `;
                item.parentNode.appendChild(elementDiv);
                elementDiv.innerHTML = this.message.loaded;

                const formData = new FormData(item);

                this.postData('assets/question.php', formData)
                .then((res) => {
                    console.log(res);
                    elementDiv.innerHTML = this.message.send;
                })
                .catch(() => {
                    console.log('Ошибка');
                    elementDiv.innerHTML = this.message.err;
                })
                .finally(()=>{
                    this.clearInputs();
                    setTimeout(()=>{
                        elementDiv.remove()
                    }, 3000)
                })

            })
        })
    }
    
};