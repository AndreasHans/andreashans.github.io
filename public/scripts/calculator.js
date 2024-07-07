class Controller{
    constructor(){
        this.model = new Model();
        this.view = new View();

        this.reset();

    }

    reset(){
        this.o = '';
        this.a = 0;
        this.b = 0;
        this.view.clearDisplay();
        this.view.displayThis(this.a);
        this.hitNum = false;
    }

    isEqualsSign(value){
        return value == "=";
    }

    isOperator(value){
        return isNaN(value);
    }

    isClearButton(value){
        return value == "ce";
    }

    isPlusMinus(value){
        return value == "+/-";
    }

    isComma(value){
        return value == ".";
    }

    isFactorial(value){
        return value == "!";
    }

    isDeleteLast(value){
        return value == "<=";
    }

    handleInput(val){

        if (this.isClearButton(val)){
            this.reset();
        } 
        else if (this.isFactorial(val)){
            this.doFactorial();
        }
        
        else if (this.isPlusMinus(val)){
            this.doPlusMinus();
        }

        else if (this.isComma(val)){
            this.doComma();
        }
        else if (this.isDeleteLast(val)){
            this.doDeleteLast();
        }
        
        else if (this.isEqualsSign(val)){

            let d = this.view.getDisplayValue();

            this.b = this.hitNum? d: this.b;
            this.a = this.operate(this.a,this.b,this.o);
            this.view.displayThis(this.a);
            this.hitNum = false;
        }
        
        else if (this.isOperator(val)){
            this.a = this.view.getDisplayValue();
            this.o = val;
            this.view.clearValue();

        }
        
        else {
            this.hitNum = true;
            this.view.displayAppend(val);
        }

        //debug
        //console.log("a:" + this.a + " b:" + this.b + " o:" + this.o);
        //console.log("display:" + this.view.getDisplayValue());
    }

    operate(a,b,o){
        a = parseFloat(a);
        b = parseFloat(b);
        switch (o){
            case '+':
                return this.model.add(a,b);
            case '-':
                return this.model.subtract(a,b);     
            case '*':
                return this.model.multiply(a,b); 
            case '/':
                return this.model.divide(a,b);
            default:
                return 0;  
        }
    }

    doPlusMinus(){
        let displayValue = this.view.getDisplayValue();
        this.view.displayThis(-displayValue);
    }

    doDeleteLast(){
        let displayValue = new String(this.view.getDisplayValue());
        let r = displayValue.substring(0,displayValue.length-1);
        this.view.displayThis(r);
    }

    doComma(){
        let displayValue = this.view.getDisplayValue();

        if (!displayValue.includes('.')){
            this.view.displayThis(displayValue + ".");
        }
    }

    doFactorial(){
        let displayValue = this.view.getDisplayValue();
        this.view.displayThis(this.model.doFactorial(displayValue));
    }

}

class Model{

    doFactorial(value){
        let res = 1;
        value = value > 171 ? value = 171: value;
        for (let i = 2; i <= value; i++){
            res *= i;
        }
        return res;
    }

    add(a,b) {
        return a+b;
    }

    subtract(a,b){
        return a-b;
    }

    multiply(a,b){
        return a*b;
    }

    divide(a,b){
        if (b != 0){
            return a/b;
        } else {
            return "lmao";
        } 
    }
}

class View{

    constructor(){
        this.value = '';

        this.numToVal = {
            0:'ce',
            1:7,
            2:4,
            3:1,
            4:'+/-',
            5:'!',
            6:8,
            7:5,
            8:2,
            9:0,
            10:'/',
            11:9,
            12:6,
            13:3,
            14:'.',
            15:'<=',
            16: '*',
            17: '-',
            18: '+',
            19: '='
        }
        this.makeDisplayButtonContainers();
        this.buttons = [];
        
        this.makeButtons();
    }

    clearValue(){
        this.value = '';
    }

    getDisplayValue(){
        let display = document.querySelector('#displayText');
        return display.textContent;
    }

    clearDisplay(){
        this.value = '';
        let display = document.querySelector('#displayText');
        display.textContent = "";
    }

    displayAppend(value){
        let display = document.querySelector('#displayText');

        if (isNaN(this.value)){
            this.value = 0;
        }

        this.value = String(this.value);

        if (this.value[0] == 0){
            this.value = this.value.substring(1,this.value.length);
        }

        this.value += value;
        display.textContent = this.value;
    }

    displayThis(value){
        let display = document.querySelector('#displayText');
        this.value = value;
        display.textContent = this.value;
    }

    makeDisplayButtonContainers(){

        let home = document.querySelector('#home');
        home.addEventListener('mouseover',(e) => {console.log(e.target.style.backgroundColor = "#79a9cf")});
        home.addEventListener('mouseout',(e) => {e.target.style.backgroundColor = "#cae4fa"});



        let container = document.querySelector('#container');

        let content = document.createElement('div');
        content.id = 'content';

        let display = document.createElement('div');
        display.id = 'display';
        content.appendChild(display);

        let displayText = document.createElement('div');
        displayText.id = 'displayText';
        display.appendChild(displayText);

        let buttons = document.createElement('div');
        buttons.id = 'buttons';
        content.appendChild(buttons);
        container.appendChild(content);
    }

    makeButtons(){

        let buttons = document.querySelector('#buttons');

        for (let i = 0; i < 4; i++){
            let row = document.createElement('div');
            row.classList.add('row');


            for (let j = 0; j < 5; j++){
                let btn = document.createElement('div');
                btn.classList.add('button');

                let index = 5*i+j;

                btn.textContent = this.numToVal[index];

                btn.addEventListener('click',(e) => onClick(e.target))
                btn.addEventListener('mouseover',(e) => onHover(e.target))
                btn.addEventListener('mouseout',(e) => onHoverLeave(e.target))
                row.appendChild(btn);
            }
            buttons.appendChild(row);
        }
    }
}

function onClick(e){
    controller.handleInput(e.textContent);
}

function onHover(e){
    e.style.backgroundColor = '#e9b015';
}


function onHoverLeave(e){
    e.style.backgroundColor = '#c5991f';
}

let controller = new Controller();