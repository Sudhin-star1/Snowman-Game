const words = ["APPLE", "BANANA", "CUCUMBER", "DONUT", "EGG", "FISH", "GUAVA"];

let guessedLetter,
  guessCount = 4,
  wordToBeGuessed = "",
  wrongGuesses = 0,
  imageCount = 1;

const wordsContainer = document.querySelector(".word");
let lettersContainer = document.querySelector(".letters");
let guessesLeft = document.querySelector(".guesses-left");
const messageContainer = document.querySelector(".message");
const shortMessage = document.querySelector(".short-message");
const MeltingSnowman = document.querySelector(".melting-snowman");

const randomGuess = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const initializeGame = () => {
  wordToBeGuessed = randomGuess();
  guessedLetter = Array(wordToBeGuessed.length).fill("_");
  // word.innerHTML = wordToBeGuessed + "<br />";

  displayRemainingGuess();
  updateWordDisplay();
  updateMeltingSnowman();

  for (let i = 0; i < 26; i++) {
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(65 + i);

    button.addEventListener("click", () => {
      handleGuess(button.innerText);
    });
    lettersContainer.appendChild(button);

    messageContainer.innerHTML = "";
  }

  displayRemainingGuess();
};

const updateWordDisplay = () => {
  wordsContainer.innerHTML = guessedLetter.join(" ");
};

const updateMeltingSnowman = () => {
  MeltingSnowman.innerHTML = `<img src="img/${imageCount}.png" />`;
  imageCount != 5 ? imageCount++ : imageCount;
};

const displayRemainingGuess = () => {
  let what = guessCount - wrongGuesses > 1 ? "guesses" : "guess";
  guessesLeft.innerHTML = `<h1>You have ${
    guessCount - wrongGuesses
  } ${what} left.</h1>`;
};

const handleGuess = (letter) => {
  if (guessedLetter.includes(letter)) {
    shortMessage.innerHTML = "<h1>Vaisakyo</h1>";
  } else {
    shortMessage.innerHTML = " ";
  }

  guessedLetter.forEach((guess, index) => {
    if (wordToBeGuessed[index] === letter) {
      guessedLetter[index] = letter;
    }
  });

  if (!wordToBeGuessed.includes(letter)) {
    wrongGuesses++;
    displayRemainingGuess();
    updateMeltingSnowman();
  }


  updateWordDisplay();

  checkWinorLose();
};

const checkWinorLose = () => {
  if (wrongGuesses == 4) {
    messageContainer.innerHTML = ` <h1>You lose!!</h1> <br /> <h3>The word to be guessed was ${wordToBeGuessed}. </h3>`;
  }

  if (guessedLetter.join("") === wordToBeGuessed) {
    messageContainer.innerHTML = "<h1>Congratulations!! You won!</h1>";
  }
};

window.addEventListener("load", initializeGame);

//hints
