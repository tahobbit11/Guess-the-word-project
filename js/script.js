const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "Mangolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    holder(word);
}

getWord(); //Starts the game

const holder = function(word){
    const holderLetters = [];
    for (const letter of word){
        console.log(letter);
        holderLetters.push("●");
    }
    wordInProgress.innerText = holderLetters.join("");
};



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
        updateGuessesRemaining(guess);
        showGuesses();
        updateWord(guessedLetters);
    }
};

const showGuesses = function(){
    //clear list first
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function(guess){
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)){
        message.innerText = `The word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `The word does contain ${guess}.`
    }

    if (remainingGuesses === 0){
        message.innerHTML = `Game over! The word was <span class="highlights">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("li");
        message.innerHTML = `<p class ="highlights">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function(){
    guessedLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();

    guessedLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});



