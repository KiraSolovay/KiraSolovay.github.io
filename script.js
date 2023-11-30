// create an in-page chat log
const chat = document.getElementById("chat");

// create a function that adds chat to the log
const logChat = (string) => {
    const p = document.createElement('p');
    p.textContent = string;
    chat.appendChild(p)
}

let easyMode, mediumMode, hardMode = false;
let isItXTurn = true;
const userStartsAsX = Math.random() > 0.5 ? true : false;

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

    difficultyBtns[0].addEventListener('click', function() {easyMode = true;
        easyGame();})
    difficultyBtns[1].addEventListener('click', function() {mediumMode = true;
        mediumGame();
    logChat("Medium Difficulty!");})
    difficultyBtns[2].addEventListener('click', function() {hardMode = true;
        hardGame();
    logChat("Hard Mode!")})
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

const isGameTied = () => {
    for (let boxObject of boxObjects) {
        if (boxObject.blank === true) {
            return false;
        }
    }
    return true;
};


const markBox = (xo, boxButton) => {
    const index = Array.from(boxButtons).indexOf(boxButton);
    boxObjects[index].mark(xo);
    boxButton.textContent = boxObjects[index].value;
    logChat(`Box #${index} has been marked as ${xo}.`);
};

const endTurn = () => {
    for (let boxButton of boxButtons) {
        boxButton.removeEventListener('click', boxClickHandlerX);
        boxButton.removeEventListener('click', boxClickHandlerO);
    }
    isItXTurn = !isItXTurn;
    playGame();
};

const boxClickHandlerO = (event) => {
    markBox('o', event.target);
    endTurn();
};

const boxClickHandlerX = (event) => {
    markBox('x', event.target);
    endTurn();
};

const userTurn = (xo) => {
    logChat("it is your turn.")
    if(xo == 'x'){
        for (let boxButton of boxButtons) {
            boxButton.addEventListener('click', boxClickHandlerX);
        }
    }
    else if (xo =='o'){
        for (let boxButton of boxButtons) {
            boxButton.addEventListener('click', boxClickHandlerO);
        }
    }
};

const computerTurn = (xo) => {
    if(easyMode){
        logChat(`it is the computer's turn.`
        )
        let turnCompleted = false;
        while (!turnCompleted) {
            let targetBox = Math.floor(Math.random() * 9);
            if(boxObjects[targetBox].blank) {
                boxObjects[targetBox].mark(xo);
                boxButtons[targetBox].textContent = xo;
                logChat(`Box #${targetBox} has been marked as ${xo}.`)
                updateGrid();
                isItXTurn = !isItXTurn;
                playGame();
                turnCompleted = true;
            }
        }  
    }
}

// PlayGame Function

const playGame = () => {
    logChat(`playGame function called`)
    if (!hasWon('x') && !hasWon('o') && !isGameTied()) {
        if (isItXTurn && userStartsAsX) {
            userTurn('x');   
        } 
        else if (isItXTurn && !userStartsAsX) {
            computerTurn('x');   
        }
        else if (!isItXTurn && userStartsAsX){
            computerTurn('o'); 
        }
        else if(!isItXTurn && !userStartsAsX){
            userTurn('o');
        }
    }
    else{
        logChat("the game is over")
    }
};


// easy game function
const easyGame = () => {
    generateBlankGrid();
    updateGrid();
    logChat(`You are playing on easy mode.`)
    if (userStartsAsX) {
        logChat("You go first as X, the computer will go next as O.");
    } else {
        logChat("The computer goes first as X, you go next as O.");
    }
    playGame();
};

// MAIN
difficultyPrompt();


