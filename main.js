let livesRemaining;
let imageState;
let currentWord = '';
let livesDiplayed = document.querySelector('#lives');
let imageDisplayed = document.querySelector('#image');
var userInput = document.querySelector('#userInput');
let resetButton = document.querySelector('button');
let enteredKeyStack = '';
var tempWord = [];
var displayWord = [];
let gameState = 1;


function reset() {
    gameState = 1;
    livesRemaining = 6;
    livesDiplayed.textContent = livesRemaining;
    imageState = 1;
    imageDisplayed.src = "images/" + imageState + ".png";
    currentWord = wordList[Math.floor(Math.random() * (wordList.length))];
    enteredKeyStack = '';
    tempWord = [];
    displayWord = [];

    for(let i = 0; i < currentWord.length; i++){ 
        displayWord.push('X'); 
        tempWord[i] = currentWord[i];
    }
    userInput.textContent = displayWord.join('');
    displayOutput();
    
}

function displayOutput() {
    livesDiplayed.textContent = livesRemaining;
    imageDisplayed.src = "images/" + imageState + ".png";
    userInput.textContent = displayWord.join('');

    if(livesRemaining == 0) {
        gameState = 0;
        userInput.textContent = "you lost";
    }
    else if(displayWord.join('') == currentWord){
        gameState = 0;
        userInput.textContent = "you won";
    }

}

resetButton.addEventListener('click', function() { reset() });

reset();

document.addEventListener("keydown", function(e) {
    if ((e.keyCode >= 65 || e.which >= 65 ) && (e.keyCode <= 90 || e.which <= 90) && gameState == 1) { 
        if(enteredKeyStack.indexOf(e.key) == -1){
            enteredKeyStack += e.key;

            if(currentWord.indexOf(e.key.toUpperCase().toString()) == -1){
                livesRemaining -= 1;
                imageState += 1;
                displayOutput();
            }
            else {
                for(let i = 0; i < currentWord.length; i++) {

                    if(currentWord[i] == e.key.toUpperCase().toString()) {
                        tempWord.splice(i,1);
                        displayWord.splice(i,1,e.key.toUpperCase().toString());
                    }
                }
                displayOutput();
            }
        }
        // console.log("lives = " + livesRemaining);
        // console.log("imageState = " + imageState);
        // console.log("tempWord = " + tempWord);
        // console.log("displayWord = " + displayWord);
        // console.log("enteredStack = " + enteredKeyStack);
        
    }
});
