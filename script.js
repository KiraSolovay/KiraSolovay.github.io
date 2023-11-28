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
let playerOne;
if (Math.round(Math.random())=== 0){
    playerOne = "user"
}
else {
    playerOne = "computer"
}
console.log (`${playerOne} goes first.`)

// make each of the 9 boxes an object with 3 booleans and a "play" method

// determine win conditions

// make easy computer turn function

// make medium computer turn function

// make hard computer turn function

// alternate turns