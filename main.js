
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
let hintLetters = '';
let solution = document.querySelector("#solution");


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
    hintLetters = '';
    solution.textContent = "";

    for(let i = 0; i < currentWord.length; i++){ 
        displayWord.push('X'); 
        tempWord[i] = currentWord[i];
    }

    for(let i = 0; i < 2; i++) {
        hintLetters += currentWord[Math.floor(Math.random() * currentWord.length)];
    }

    for(let i = 0; i < currentWord.length; i++) {
        for(let j = 0; j < hintLetters.length; j++){

            if(currentWord[i] == hintLetters[j] ) {
                tempWord.splice(i,1);
                displayWord.splice(i,1,hintLetters[j]);
            }
        }
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
        solution.textContent = "Solution was : " + currentWord;
    }
    else if(displayWord.join('') == currentWord){
        gameState = 0;
        userInput.textContent = "you won";
        solution.textContent = "Solution was : " + currentWord;
    }

}

resetButton.addEventListener('click', function() { reset() });

reset();

document.addEventListener("keydown", function(e) {
    if ((e.keyCode >= 65 || e.which >= 65 ) && (e.keyCode <= 90 || e.which <= 90) && gameState == 1) { 
        if(enteredKeyStack.indexOf(e.key) == -1){
            enteredKeyStack += e.key;

            if(currentWord.indexOf(e.key.toLowerCase().toString()) == -1){
                livesRemaining -= 1;
                imageState += 1;
                displayOutput();
            }
            else {
                for(let i = 0; i < currentWord.length; i++) {
                    if(currentWord[i] == e.key.toLowerCase().toString()) {
                        tempWord.splice(i,1);
                        displayWord.splice(i,1,e.key.toLowerCase().toString());
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
