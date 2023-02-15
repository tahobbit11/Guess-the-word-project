const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "Mangolia";
const guessedLetters = [];

const holder = function(word){
    const holderLetters = [];
    for (const letter of word){
        console.log(letter);
        holderLetters.push("●");
    }
    wordInProgress.innerText = holderLetters.join("");
};

holder(word);

guessedLetterButton.addEventListener("click", function(e){
    e.preventDefault(); //Can press the button to use but also allows enter key
    message.innerText = ""; //Empty message
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        //Checks if anything was entered
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        //Checks if too many things are entered
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)){
        //Checks if it a letter and not a number
        message.innerText = "Please enter a letter from a to z.";
    } else {
       return input; 
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed this letter. Try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};