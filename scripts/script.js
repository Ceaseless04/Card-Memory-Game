// initialize variables
const scoreElement = document.getElementById('score');
const cards = document.querySelectorAll('.card');
let pattern = []; // the order of which the cards will highlight a card
let isListening = true; // if the program will respond to the user clicks
let userProgress = 0; // how much of the pattern the user has clicked
let score = 0;

for(const card of cards) {
    card.addEventListener("click", function(event) {
        if(isListening) {
            const cardId = event.target.getAttribute("id");
            handledCardClick(cardId);
        }
    })
}

function getRandomNumber() {
    // random number between 1 and 10
    // Important: cannot go above the number of cards that you have
    // from the html document
    return Math.ceil(Math.random() * 10);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function showPattern() {
    for(const card of pattern) {
        // get the card from the DOM
        const cardElement = document.getElementById(card);

        // wait
        await sleep(500);

        // highlight
        cardElement.classList.add("highlight");

        // wait
        await sleep(500);

        // remove highlighting
        cardElement.classList.remove("highlight");
    }
}

function handledCardClick(cardId) {
    // check if user has clicked the correct card
    if(pattern[userProgress] == cardId) userProgress++;
    else resetGame(); // otherwise reset the game

    // check to see if the user clicked everything from the pattern
    if(userProgress > 0 && userProgress == pattern.length) {
        score++; // increment the score
        pattern.push(getRandomNumber()) // add a new card to the pattern
        userProgress = 0; // reset the click index
        showPattern(); // show the new cards
    }

    // modify the score on the screen so the user could see
    scoreElement.textContent = 'Score: ' + score;
}

// once the player hit incorrect card, game will reset along with values
function resetGame() {
    isListening = false;

    score = 0;
    userProgress = 0;
    pattern = [];

    startGame();
}

function startGame() {
    // pick a card to highlight
    pattern.push(getRandomNumber())

    // show the highlighting so the user can view
    showPattern();

    // and listen for what the user is clicking on 
    isListening = true;
}

startGame();