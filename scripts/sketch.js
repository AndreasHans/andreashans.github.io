
let btn = document.querySelector("#reset")
btn.addEventListener('click',promptSize);

const container = document.querySelector("#top");
container.appendChild(btn);

let x = 700;
let y = 700;
let a = 10;
let aMax = 100;
let divs = [];
let mouseIsDown = false;

removeGrid();
buildGrid();


function promptSize(){
    removeGrid();
    a = parseInt(prompt("Size of grid:"));

    a > aMax ? a = aMax: a;
    isNaN(a) ? a = 5: a;

    buildGrid();
    console.log(a);
}

function removeGrid(){
    divs = [];
    const e = document.querySelector("#content");
    e.parentElement.removeChild(e);
    const content = document.createElement('div');
    content.id = "content";
    content.height = y;
    content.width = x;

    const container = document.querySelector("#container")

    container.appendChild(content);
}

function buildGrid(){

    const content = document.querySelector("#content");
    content.height = y;
    content.width = x;
    
    for (let j = 0; j < a; j++){
        const row = document.createElement('div');
        row.style.display = 'flex';
    
        for (let i = 0; i < a; i++){
            const div = document.createElement('div');
            div.style.backgroundColor = 'aliceblue';
            div.style.width = x/a+'px';
            div.style.height = y/a+'px';
            divs.push(div)
            row.appendChild(div);
            div.addEventListener('mousedown',mouseDown)
            div.addEventListener('mouseup',mouseUp)
            div.addEventListener('mouseover',(e) => changeColor(e.target))
        }
        content.appendChild(row);
    }
}

function mouseDown(){
    mouseIsDown = true;
}

function mouseUp(){
    mouseIsDown = false;
}

function changeColor(e){

    if (mouseIsDown){
        currentColor = "rgb(" + getRandom(0,255) + ", " + getRandom(0,255) + ", " + getRandom(0,255) + ")";
        e.style.backgroundColor = currentColor;
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
