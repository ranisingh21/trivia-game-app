let firstPlayerName = "";
let secondPlayerName = "";

let categoryDropdown = "";
let selectedCategory = "";

let categorySelectionSection = document.getElementById("category-section");
let questionDisplaySection = document.getElementById("question-display-section");
let continueAndQuitSection = document.getElementById("continue-and-quit-section");
let displayWinnerSection = document.getElementById("winner-section");

let j = 0;

let firstPlayerScore = 0;
let secondPlayerScore = 0;

let questionObjects = [];
let options = [];

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function () {
    firstPlayerName = document.getElementById("first-player-name").value;
    secondPlayerName = document.getElementById("second-player-name").value;

    let playerNameSection = document.getElementById("player-name-section");

    playerNameSection.style.display = "none";
    categorySelectionSection.style.display = "block";

    document.getElementById("dis-first-player-name").innerHTML = firstPlayerName;
    document.getElementById("dis-second-player-name").innerHTML = secondPlayerName;
});

let categoryForm = document.getElementById("form-category");
categoryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    categoryDropdown = document.getElementById("category");
    selectedCategory = categoryDropdown.value;
    categoryDropdown.remove(categoryDropdown.selectedIndex);

    categorySelectionSection.style.display = "none";
    questionDisplaySection.style.display = "block";

    fetchQuestions();
    displayQuestions();
});

function fetchQuestions() {
    let diff = ["easy", "easy", "medium", "medium", "hard", "hard"];

    for (let i = 0; i < diff.length; i++) {
        fetch(`https://the-trivia-api.com/v2/questions?limit=1&categories=${selectedCategory}&difficulties=${diff[i]}`)
            .then(response => 
                response.json())              
            .then(data => {
                questionObjects.push(data);
            })
            .catch(error => {
                console.error("showing error", error);
            });
    }
}

function displayQuestions() {
    let displayQuestion = document.getElementById("display-question");
    let firstPlayerScoreEl = document.getElementById("first-player-score");
    let secondPlayerScoreEl = document.getElementById("second-player-score");

    displayQuestion.innerHTML = questionObjects[j].question.text;

    correctAnswer = questionObjects[j].correctAnswer;
    options = questionObjects[j].incorrectAnswers;
    options.push(correctAnswer);
    options.sort(() => Math.random() - 0.5);

    displayOptions();

    firstPlayerScoreEl.innerHTML = `${firstPlayerName}: ${firstPlayerScore}`;
    secondPlayerScoreEl.innerHTML = `${secondPlayerName}: ${secondPlayerScore}`;
}

function displayOptions() {
    let playerTurn = 1;
    
    let collectionLabel = document.getElementsByClassName("optionLabel");
    let collectionInput = document.getElementsByClassName("option");
    
    let difficultyLevel = questionObjects[j].difficulty;
    let correctAnswer = questionObjects[j].correctAnswer;
    
    for (let i = 0; i < collectionLabel.length; i++) {
        collectionInput[i].value = options[i];
        collectionLabel[i].textContent = options[i];

        collectionInput[i].addEventListener("click", function () {
            let checkedOption = collectionInput[i].value;

            if (correctAnswer === checkedOption) {
                if (difficultyLevel === "easy") {
                    if (playerTurn === 1) {
                        firstPlayerScore += 10;
                        playerTurn = 2;
                    } else {
                        secondPlayerScore += 10;
                        playerTurn = 1;
                    }
                } else if (difficultyLevel === "medium") {
                    if (playerTurn === 1) {
                        firstPlayerScore += 15;
                        playerTurn = 2;
                    } else {
                        secondPlayerScore += 15;
                        playerTurn = 1;
                    }
                } else if (difficultyLevel === "hard") {
                    if (playerTurn === 1) {
                        firstPlayerScore += 20;
                        playerTurn = 2;
                    } else {
                        secondPlayerScore += 20;
                        playerTurn = 1;
                    }
                }
            }
        });
    }
}

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", function () {
    displayNextQuestion();
});

function displayNextQuestion() {
    if (j < questionObjects.length - 1) {
        j++;
        displayQuestions();
    } else {
        questionDisplaySection.style.display = "none";
        continueAndQuitSection.style.display = "block";
    }
}

let continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", function () {
    continueAndQuitSection.style.display = "none";
    categorySelectionSection.style.display = "block";
});

let quitButton = document.getElementById("quit-button");
quitButton.addEventListener("click", function () {
    continueAndQuitSection.style.display = "none";
    displayWinnerSection.style.display = "block";

    showWinner();
});

function showWinner() {
    let winnerNameElement = document.getElementById("winner-name");

    if (firstPlayerScore > secondPlayerScore) {
        winnerNameElement.innerHTML = firstPlayerName;
    } else {
        winnerNameElement.innerHTML = secondPlayerName;
    }
}

