var questionIndex = 0;
var questionsDiv = document.getElementById("questions");
var startDiv = document.getElementById("start-screen");
var questionTitle = document.getElementById("question-title");
var time = 60;
const incorrect = new Audio("assets/sfx/incorrect.wav");
const correct = new Audio("assets/sfx/correct.wav");
var timeDisplay = document.getElementById("time");
var choicesDiv = document.getElementById("choices");
var button;
var options;
var correctAnswer;
var feedback = document.getElementById("feedback");


function countDown() {
  time--;
  timeDisplay.innerHTML = time;
  if (time < 1) {
    time = 0;
    clearInterval(counter);
    endQuiz();
  }
}

function startQuiz() {
  startDiv.setAttribute("class", "hide");
  counter = setInterval(countDown, 1000);
  questionsDiv.removeAttribute("class", "hide");
  questions.sort(() => Math.random() - 0.5);
  showQuestions();
}

function showQuestions() {
  options = "";
  options = questions[questionIndex].choices;
  questionTitle.innerHTML = "";
  questionTitle.innerHTML = questions[questionIndex].title;
  choicesDiv.textContent = "";
  for (var i = 0; i < options.length; i++) {
    button = document.createElement("button");
    button.innerHTML = options[i];
    choicesDiv.append(button);
    choicesDiv.addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  correctAnswer = "";
  correctAnswer = questions[questionIndex].answer;
  console.log(correctAnswer);
  if (correctAnswer != event.target.innerHTML) {
    time = time - 10;
    incorrect.play();
    feedback.textContent = "Incorrect!";
  } else {
    correct.play();
    feedback.textContent = "Correct!";
  }
  feedback.removeAttribute("class", "hide");
  setTimeout(() => {
    feedback.setAttribute("class", "hide");
    feedback.textContent = "";
  }, 1000);

  questionIndex++;
  if (questionIndex >= questions.length) endQuiz();
  showQuestions();
}

var finalScore = document.getElementById("final-score");
var resultDiv = document.getElementById("end-screen");

function endQuiz() {
  clearInterval(counter);
  resultDiv.removeAttribute("class", "hide");
  questionsDiv.setAttribute("class", "hide");
  timeDisplay.innerHTML = time;
  finalScore.textContent = time;
  submitBtn.addEventListener('click',submit);
}
var submitBtn = document.getElementById('submit');
var initials = document.getElementById('initials');

function submit() {
  var scoreArr = [ ];
  if (localStorage.getItem('scoreBoard') == null) {
    var newScore = {
      initials : initials.value,
      score : time
    };
    scoreArr.push(newScore);
    console.log('scoreArr',scoreArr)
    scoreArr.sort();
    console.log('scoreArr',scoreArr)
    localStorage.setItem('scoreBoard', JSON.stringify(scoreArr));
    console.log('new score', newScore)
  }

  
};