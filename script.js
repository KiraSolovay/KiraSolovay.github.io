// create an in-page chat log
const chat = document.getElementById("chat");

// create a function that adds chat to the log
const logChat = (string) => {
    const p = document.createElement('p');
    p.textContent = string;
    chat.appendChild(p)
}

// prompt the user for difficulty level
const difficultyPrompt = () => {
    const modalContainer = document.getElementById("modal-container")
    const difficultyBtns = document.querySelectorAll(".close-modal")

    const toggleClasses = (event) => {
        modalContainer.classList.toggle('hidden')
        modalContainer.classList.toggle('shown')
    }
    for (let difficultyBtn of difficultyBtns){
        difficultyBtn.addEventListener('click', toggleClasses)
    }
}

// randomly generate who is player X (who goes first)
const isUserX = () => {
    if (Math.round(Math.random())=== 0){
        return true;
    }
    else {
        return false;
    }
}


// make each of the 9 boxes an object with 3 booleans and a "play" method
class boxObject {
    constructor(){
        this.blank = true;
        this.x = false;
        this.o = false;
        this.value = "click to mark"
    }
    mark(xo){
        if (!this.blank) {
            logChat("You can only mark blank boxes.");
            return 1;
        }
        else{
            this.blank = false;
            if (xo === 'x'){
                this.x = true;
                this.value = xo
                return 0;
            }
            else if (xo === 'o'){
                this.o = true;
                this.value = xo
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

const updateGrid = () => {
    for(let i = 0; i < 9; i++) {
        boxButtons[i].textContent = boxObjects[i].value
    }
}

// determine win conditions
const hasWon = (xo) => {
    if (boxObjects[0].value == boxObjects[1].value == boxObjects[2].value == xo){
        return true;
    }
    else if (boxObjects[3].value == boxObjects[4].value == boxObjects[5].value == xo){
        return true;
    }
    else if (boxObjects[6].value == boxObjects[7].value == boxObjects[8].value == xo){
        return true;
    }
    else if (boxObjects[0].value == boxObjects[3].value == boxObjects[6].value == xo){
        return true;
    }
    else if (boxObjects[1].value == boxObjects[4].value == boxObjects[7].value == xo){
        return true;
    }
    else if (boxObjects[2].value == boxObjects[5].value == boxObjects[8].value == xo){
        return true;
    }
    else if (boxObjects[0].value == boxObjects[4].value == boxObjects[8].value == xo){
        return true;
    }
    else if (boxObjects[2].value == boxObjects[4].value == boxObjects[6].value == xo){
        return true;
    }
    else {
        return false;
    }
}

const markBox = (xo, boxButton) => {
    const index = Array.from(boxButtons).indexOf(boxButton);
    boxObjects[index].mark(xo);
    boxButton.textContent = boxObjects[index].value;
    logChat(`Box #${index} has been marked.`);
};

const endTurn = () => {
    for (let boxButton of boxButtons) {
        boxButton.removeEventListener('click', boxClickHandler);
    }
};

const boxClickHandler = (event) => {
    markBox('x', event.target);
    endTurn();
};

const userTurn = () => {
    for (let boxButton of boxButtons) {
        boxButton.addEventListener('click', boxClickHandler);
    }
};
// make easy function, user X
// make easy function, computer X

// make medium function, user X
// make medium function, computer X

// make hard function, user X
// make hard function, computer X

// MAIN
difficultyPrompt();
generateBlankGrid();
updateGrid();
if(isUserX()){
    logChat("You go first as X, the computer will go next as O.")
    userTurn('x');
}
else{
    logChat("The computer goes first as X, you go next as O.")
}

