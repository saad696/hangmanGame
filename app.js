const colorNames = [
"Red",
"Orange",
"Yellow",
"Green",
'Blue',
'Purple',
'Brown',
'Magenta',
'Tan',
'Cyan',
'Olive',
'Maroon',
'Navy',
'Aquamarine',
'Turquoise',
'Silver',
'Lime',
'Teal',
'Indigo',
'Violet',
'Pink',
'Black',
'White',
'Gray'
];

let wrongGuesses = 0;
let totalWrongGuesses = 6;
let answer = "";
let guessed = [];
let wordStatus = "";

const answerGeneration = () => {
    answer = colorNames[Math.floor(Math.random()*colorNames.length)].toLowerCase();
    console.log(answer);
}

const generateKeyBoard = () => {
    let keyboardBtns = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => 
        `
        <button
          class="button is-info my-2 mx-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
    
    document.getElementById("keyboard").innerHTML = keyboardBtns;
    
}

const handleGuess = (choosenLetter) => {
    //console.log(choosenLetter)
   guessed.indexOf(choosenLetter) === -1 ? guessed.push(choosenLetter) : null;
   console.log(guessed)
    document.getElementById(choosenLetter).setAttribute('disabled', true);


    if(answer.indexOf(choosenLetter) >= 0){
        guessedWord();
        won();
    }else if(answer.indexOf(choosenLetter) === -1){
        wrongGuesses++
        updateCounter();
        lost();
        updatePicture();
    }
}

const guessedWord = () => {
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("words-display").innerHTML = wordStatus
}

const won = () => {
    if(wordStatus === answer){
        document.getElementById("body-bg").classList.add("won");
        document.getElementById("keyboard").innerHTML =
         `<p class="has-text-success subtitle is-size-2 has-text-centered has-background-light py-3 px-6 mt-5">You Won!!</p>`
    }
}

const lost = () => {
    if(wrongGuesses === totalWrongGuesses){
        document.getElementById("body-bg").classList.add("lost");
        document.getElementById("words-display").innerHTML = `<p>the correct answer is ${answer}</p>`
        document.getElementById("keyboard").innerHTML = 
        `<p class="has-text-danger subtitle is-size-2 has-text-centered has-background-light py-3 px-6 mt-5">You Lost!!</p>`;
    }
}

const updateCounter = () => {
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses;
}

const updatePicture = () => {
    document.getElementById("hangman-img").src = `images/${wrongGuesses}.jpg`
}

const reset = () => {
    wrongGuesses = 0;
    guessed = [];
    document.getElementById('hangman-img').src = './images/0.jpg';
    document.getElementById("body-bg").classList.remove("won");
    document.getElementById("body-bg").classList.remove("lost");
    answerGeneration();
    guessedWord();
    updateCounter();
    generateKeyBoard();
}

document.getElementById("total-wrong-guesses").innerHTML = totalWrongGuesses;
answerGeneration();
generateKeyBoard();
guessedWord();