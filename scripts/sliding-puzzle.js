/* eslint-disable no-undef */
let rows = 2;
let cols = 3;
let moves = 0;
const content = document.querySelector("#content");
const startBtn = document.createElement("button");

const gridWrapper = document.createElement("div");
gridWrapper.className = "grid-wrapper";

const statusText = document.createElement("div");
const movesText = document.createElement("div");


startBtn.textContent = "Restart"
startBtn.classList.add("startBtn");
startBtn.addEventListener("click", () => {

    var input = prompt("Grid size?");
    rows = Number(input);
    cols = rows;

    moves = 0;
    slidingPuzzleObject.initialize(rows,cols);
    updateGraphics();
});


content.appendChild(startBtn);
content.appendChild(statusText);
content.appendChild(movesText);
content.appendChild(gridWrapper);



slidingPuzzleObject.initialize(rows,cols);

const divGrid = slidingPuzzleObject.state.map(dataRow => {
    const row = document.createElement('div');
    row.classList.add("gridRow");
    const cols = dataRow.map(_ => {
        const col = document.createElement('div')
        col.classList.add("gridCol");
        return col;
    });
    cols.forEach(r => row.appendChild(r));
    return row;
})
divGrid.forEach(r => gridWrapper.appendChild(r));

document.addEventListener('keydown', handleKeyDown);

updateGraphics();

function handleKeyDown(event){
    const usedKeys = ["ArrowUp","ArrowLeft","ArrowDown","ArrowRight"];
    if (usedKeys.includes(event.key)){
        if(slidingPuzzleObject.isGoalState()){
            return; // do nothing
        }

        const isSuccess = slidingPuzzleObject.move(event.key);
        if(isSuccess){
            moves++;
            updateGraphics();
        }
    }
    else{
        console.log("Discard event");
    }
}


function updateGraphics(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            divGrid[i].children[j].textContent = slidingPuzzleObject.state[i][j];
        }
    }
    statusText.textContent = "Game over:" + slidingPuzzleObject.isGoalState();
    movesText.textContent = "Moves:" + moves;
}
