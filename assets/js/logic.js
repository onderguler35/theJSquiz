var questionIndex = 0;
var questionsDiv = document.getElementById("questions");
var startDiv = document.getElementById("start-screen");
var questionTitle = document.getElementById("question-title");
var time = 600;
const incorrect = new Audio("assets/sfx/incorrect.wav");
const correct = new Audio("assets/sfx/correct.wav");
var timeDisplay = document.getElementById("time");

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
var choicesDiv = document.getElementById("choices");
var button; 
var options;
var correctAnswer;
var feedback = document.getElementById("feedback");

function showQuestions() {
  options = '';
  options = questions[questionIndex].choices;
  questionTitle.innerHTML = '';
  questionTitle.innerHTML = questions[questionIndex].title;
  choicesDiv.textContent = "";
  for (var i = 0; i < options.length; i++) {
    button = document.createElement("button");
    button.innerHTML = options[i];
    choicesDiv.append(button);
    choicesDiv.addEventListener("click", checkAnswer);
  }
  console.log(options, choicesDiv);

function checkAnswer(event) {
  correctAnswer = '';
  correctAnswer = questions[questionIndex].answer;
  console.log(correctAnswer)
  if (correctAnswer != event.target.innerHTML) {
    time = time - 2;
    incorrect.play();
    feedback.textContent = "Incorrect!";
  } 
  else {
    correct.play();
    feedback.textContent = "Correct!";
  }
  feedback.removeAttribute("class", "hide");
    setTimeout(() => {
      feedback.setAttribute("class", "hide");
      feedback.textContent = "";
    }, 1000);
    console.log(questionIndex, event.target.innerText);
    if (questionIndex >= questions.length) endQuiz();
    questionIndex++;
    showQuestions();
}  
  
}
var finalScore = document.getElementById("final-score");
var resultDiv = document.getElementById("end-screen");

function endQuiz() {
  clearInterval(counter);
  resultDiv.removeAttribute("class", "hide");
  questionsDiv.setAttribute("class", "hide");
  finalScore.textContent = time;
}