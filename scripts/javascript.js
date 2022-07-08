class GameController{
	constructor(){
    	this.model=new GameModel();
      	this.view=new GameView();
        
        this.score = {
            "player": 0,
            "computer": 0,
        }
    }

    game(playerSelection){
        let selection = this.selections(playerSelection);
        let result = this.model.processData(selection);

        this.score.player += result.player;
        this.score.computer += result.computer;

        result.player = this.score.player;
        result.computer = this.score.computer;

        this.view.showResult(result);
    }

    selections(playerSelection){
        return {
            "player": playerSelection,
            "computer": this.model.computerSelection(),
        };
    }
}

class GameModel{

    getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    computerSelection(){
        let a = this.getRandomNumberBetween(0,2);
        let selections = {
            0: "rock",
            1: "paper",
            2: "scissors",
        };
        return selections[a];
    }

    processData(selections){

        let res = {
            "movePlayer": selections.player,
            "moveComputer": selections.computer,
            "player": 0,
            "computer": 0,
            "message": "",
        };

        let t;
        if (selections.computer == selections.player){
            t = "You both chose " + selections.computer;
        } else{

            if (selections.computer == selections.player){
                t = "You both chose " + selections.player; 
            }
        
            if (selections.player == "paper" && selections.computer == "rock"){
                t = "You Win! " + selections.player + " beats " + selections.computer + "!";
                res.player++;
            }

            if (selections.player == "paper" && selections.computer == "scissors"){
                t = "You Lose! " + selections.computer + " beats " + selections.player + "!";
                res.computer++;
            }

            if (selections.player == "rock" && selections.computer == "scissors"){
                t = "You Win! " + selections.player + " beats " + selections.computer + "!";
                res.player++;
            }

            if (selections.player == "rock" && selections.computer == "paper"){
                t = "You Lose! " + selections.computer + " beats " + selections.player + "!";
                res.computer++;
            }

            if (selections.player == "scissors" && selections.computer == "paper"){
                t = "You Win! " + selections.player + " beats " + selections.computer + "!";
                res.player++;
            }

            if (selections.player == "scissors" && selections.computer == "rock"){
                t = "You Lose! " + selections.computer + " beats " + selections.player + "!";
                res.computer++;
            }
        }
        res.message = t;
        //console.log(res);
        return res;
    }
}

class GameView{

    constructor(){
        this.setupSelection();
    }

    showResult(data){
        const message = document.querySelector('#message');
        const score = document.querySelector('#score');
        score.textContent = "player: " + data.player + " computer: " + data.computer;
        message.textContent = data.message;
    }

    setupSelection(){
        const rock = document.querySelector("#rock");
        const paper = document.querySelector("#paper");
        const scissors = document.querySelector("#scissors");
        const reset = document.querySelector("#reset");

        rock.addEventListener('click', rockClick);
        paper.addEventListener('click', paperClick);
        scissors.addEventListener('click', scissorsClick);
        reset.addEventListener('click', resetClick);
    }
}

let controller = new GameController()

function rockClick(){
    controller.game("rock");
}
function paperClick(){
    controller.game("paper");
}
function scissorsClick(){
    controller.game("scissors");
}

function resetClick(){
    controller = new GameController();
    window.location.reload();
}