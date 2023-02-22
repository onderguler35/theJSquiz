// Let's grab the elements we need and assign them to variables ready for  use when we need them
var timeDisplay = document.getElementById("time");
var startDiv = document.getElementById("start-screen");
var startBtn = document.getElementById('start');
var questionsDiv = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesDiv = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var finalScore = document.getElementById("final-score");
var resultDiv = document.getElementById("end-screen");
var submitBtn = document.getElementById('submit');
var initials = document.getElementById('initials')
var button;
var options;
var correctAnswer;
// the audio files are assigned to variables to play when needed
const correct = new Audio("assets/sfx/correct.wav");
const incorrect = new Audio("assets/sfx/incorrect.wav");
var time = 60;                                              // Quiz time is set to 60 secs when time is up quiz ends
var questionIndex = 0;                                      //our index to determine which question currently we are dealing with

startBtn.addEventListener('click', startQuiz);              // listens to click events on the start button on the first page

function startQuiz() {                                      // startQuiz function hides starting screen, starts countdown function and shuffles questions
  startDiv.setAttribute("class", "hide");                   //hide the initial screen 
  counter = setInterval(countDown, 1000);                   //repeats the countdown function every sec until cleared
  questionsDiv.removeAttribute("class", "hide");            // make questions visible
  questions.sort(() => Math.random() - 0.5);                // this code shuffles the questions array so each time the quiz starts it changes the order of questions randomly. Less boring ! :)
  showQuestions();
}

// countdown function counts down from 60 secs to limit the quiz time. it ends the quiz after clearing interval
function countDown() {
  time--;
  timeDisplay.innerHTML = time;
  if (time < 1) {                                           //we don't want the counter to negative values
    clearInterval(counter);
    endQuiz();                                              // time is up. drop the mouse!
  }
}

function showQuestions() {
  console.log(questionIndex)
  if (questionIndex >= questions.length-1) endQuiz();         // if done with all questions, runs the endQuiz function
  options = questions[questionIndex].choices;               // assigns the choices part of question array for each question 
  questionTitle.innerHTML = questions[questionIndex].title; // assings each question grabing it from the title seciton of the questions array which is the question itself
  choicesDiv.textContent = "";                              // let's clear the area so it won't show previous questions options
  // below for loop iterates the options for each answer and creates a button for each option and appends it to choicesDiv so the necessary html is created dynamically.
  for (var i = 0; i < options.length; i++) {
    button = document.createElement("button");              //creates a button for each option
    button.innerHTML = options[i];
    choicesDiv.append(button);                              //appends it to choicesDiv
  }
  choicesDiv.addEventListener("click", checkAnswer);      // listening for a click to one of the choices of the answer and calls the checkAnswer function to see if it is correct or incorrect
}

function checkAnswer(event) {
  correctAnswer = questions[questionIndex].answer;          //getting each correct answer from the questions array depending on the value of the questionIndex which determines the current question
  if (correctAnswer != event.target.innerHTML) {
    time = time - 10;                                       // penalise the player by 10 secs deducted from the score time after a wrong answer.
    incorrect.play();                                       // plays the sound for wrong answers
    feedback.textContent = "Incorrect!";                    // modifying the feedback to confirm wrong answer
  } else {
    correct.play();                                         // plays the sound for correct answers
    feedback.textContent = "Correct!";                      // modifying the feedback to confirm correct answer
  }
  questionIndex++;                                          // here is where we increment the questionIndex to follow the next question
  feedback.removeAttribute("class", "hide");                // makes feedback line visible  and the below setTime out clears it after 1 sec.
  setTimeout(() => {
    feedback.setAttribute("class", "hide");
  }, 1000);
  showQuestions();                                          // if not done with all questions repeat the showQuestions process until all done
}

function endQuiz() {
  clearInterval(counter);                                   // stop the clock ticking, time is up!
  questionsDiv.setAttribute("class", "hide");               // hides the questions screen
  resultDiv.removeAttribute("class", "hide");               // makes the result screen visible
  if (time<0) {      //if score goes negative value, 
    time = 0;        //this resets it to make sure it will be 0 minimum
    timeDisplay.innerHTML = time;    // and reflects this reset to the actual time display.
  }                                    
                              
  finalScore.textContent = time;                            // the remaining secs are used as score as per the requirements
  submitBtn.addEventListener('click',submit);               // listening to the submit button which will take the initials and score and put to the local storage with the submit function
}

function submit() {       
  var newScore = {         //let's create a new object with the initials entered and the score done.
    initials : initials.value,
    score : time
  };
  scoreArr = JSON.parse(localStorage.getItem("scoreBoard"));   // gets the scoreboard from the local storage and assign it to a variable 
  if (scoreArr == null) scoreArr = []; // checking if the local storage is null and assigning it an empty array if it is null to avaid errors .push etc.
  scoreArr.push(newScore);          // pushes our new object into the array of the scores                             
  localStorage.setItem('scoreBoard', JSON.stringify(scoreArr));    // now our combined score array is ready to be sent back to localstorge in one peice after converting into json string as that is the only way local storage accepts data 
  window.location.assign('./highscores.html'); // after initials entered and submitted this takes us to highscores html page to show the list of scores everbody else scored
};


