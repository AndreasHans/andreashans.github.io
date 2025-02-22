const slidingPuzzleObject = {
    rows:0,
    cols:0,
    state: [],
    goal: [],
    initialize: function(rows,cols){
        console.log("initialize");
        this.rows = rows;
        this.cols = cols;
        const arr = [...Array(this.rows*this.cols).keys().map(e => e+1)];
        arr[rows*cols-1]= '';
        this.goal = this.arrToGrid(arr);
        this.state = this.arrToGrid(this.randomize(arr));
    },
    arrToGrid: function(arr){
        console.log("arrayToGrid");
        const obj = [];
        for(let row = 0; row < this.rows; row++){
            obj.push([])
            for(let col = 0; col < this.cols; col++){
                obj[row].push(arr[row*this.cols + col]);
            }
        }
        console.log(obj);
        return obj;
    },
    randomize: function(arr){
        console.log("randomize");
        let obj = arr.map(e => [e,Math.random()]);
        const sorted = obj.sort((a,b) => a[1]-b[1]);
        const res = sorted.map(e => e[0]);

        //compute inversions
        const k = inversions(res.filter(e => 0 < e && e < this.rows*this.cols));
        console.log("inversions",k);

        if (k % 2 === 0) return res;
        return this.randomize(arr);
    },
    move: function(dir){
        console.log("move");
        const emptyCell = this.getEmptyCell();
        const emptyRow = emptyCell[0];
        const emptyCol = emptyCell[1];

        const delta = this.getDelta(dir);
        const deltaRow = delta[0];
        const deltaCol = delta[1];

        if(emptyCol + deltaCol < 0 || emptyCol + deltaCol >= this.cols){
            console.log("invalid move");
            return false;
        }
        if(emptyRow + deltaRow < 0 || emptyRow + deltaRow >= this.rows){
            console.log("invalid move");
            return false;
        }
        console.log("valid move");

        const t = this.state[emptyRow][emptyCol]
        this.state[emptyRow][emptyCol] = this.state[emptyRow+deltaRow][emptyCol+deltaCol];
        this.state[emptyRow+deltaRow][emptyCol+deltaCol] = t;
        return true;
    },
    getDelta: function (direction){
        console.log("getDelta");
        switch(direction){
            case "ArrowUp":
                return [1,0];
            case "ArrowLeft":
                return [0,1];
            case "ArrowDown":
                return [-1,0];
            case "ArrowRight":
                return [0,-1];
            default:
                return [0,0];
        }
    },
    getEmptyCell: function(){
        console.log("getEmptyCell");
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(this.state[i][j] === ''){
                    return [i,j];
                }
            }
        }
        throw Error("No cell is empty");
    },
    isGoalState: function(){
        console.log("isGoalState");
        console.log(this.state, this.goal);
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(this.state[i][j] !== this.goal[i][j]){
                    return false;
                }
            }
        }
        return true;
    }
}


function inversions(arr){
    console.log(arr);
    let k = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] > arr[j]){
                k++;
            }
        }
    }
    return k;
}