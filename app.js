let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#New-Game");

let turn0 = true; //playerX, playerO
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxs.forEach( (box) =>{
    box.addEventListener("click", function(){
        count++;
        if(turn0){
            box.innerText = "O";
            box.style.color = "silver";
            turn0 = false;
        } else{
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    })
})

function showWinner(winner){
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                for(let box of boxs){
                    box.disabled = true;
                }
                showWinner(pos1Val);
            }
            else if(count == 9){
                let draw = "Oops!  it's a draw";
                msg.innerText = draw;
                msgContainer.classList.remove("hide");
            }
        }
    }
}

function resetGame(){
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

function enableBoxes(){
    for(let box of boxs){
        box.disabled = false;
        box.innerText = "";
    }
}

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);
