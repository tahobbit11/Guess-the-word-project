const guessedLetters = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "Mangolia";

const holder = function(word){
    const holderLetters = [];
    for (const letter of word){
        console.log(letter);
        holderLetters.push("●");
    }
    wordInProgress.innerText = holderLetters.join("");
};

holder(word);


