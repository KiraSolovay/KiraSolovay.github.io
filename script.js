// prompt the user for difficulty level
const modalContainer = document.getElementById("modal-container")
const difficultyBtns = document.querySelectorAll(".close-modal")

const toggleClasses = (event) => {
    modalContainer.classList.toggle('hidden')
    modalContainer.classList.toggle('shown')
}

for (let difficultyBtn of difficultyBtns){
    difficultyBtn.addEventListener('click', toggleClasses)
}

// randomly generate who is player X (who goes first)
let playerX;
let playerO;
if (Math.round(Math.random())=== 0){
    playerX = "user"
    playerO = "computer"
}
else {
    playerX = "computer"
    playerO = "user"
}
console.log (`${playerX} goes first as X, ${playerO} goes next as O.`)

// make each of the 9 boxes an object with 3 booleans and a "play" method
class boxObject {
    constructor(){
        this.blank = true;
        this.x = false;
        this.o = false;
        this.value = "blank"
    }
    mark(player){
        if (!this.blank){
            console.log("You can only mark blank boxes.")
            return 1;
        }
        else{
            this.blank = false;
            if (player === playerX){
                this.x = true;
                this.value = "x"
                return 0;
            }
            else if (player === playerO){
                this.o = true;
                this.value = "x"
                return 0;
            }
        }
    }
}
// create an array with the box objects
let boxObjects = [];

// create an array containing every div that has a box
let boxDivs = document.querySelectorAll(".box")

// create an array that contains the button for each box
let boxButtons = [];
// assign a button to every box div
const generateBlankGrid = () => {
    for (let i = 0; i < 9; i++) {
        boxObjects[i] = new boxObject
        let button = document.createElement('button')
        boxDivs[i].appendChild(button);
        boxButtons.push(button);
    }
}

generateBlankGrid();
const updateGrid = () => {
    for(let i = 0; i < 9; i++) {
        boxButtons[i].textContent = boxObjects[i].value
    }
}
updateGrid();

// determine win conditions


// make easy computer turn function

// make medium computer turn function

// make hard computer turn function

// alternate turns