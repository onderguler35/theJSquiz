// let's start with grabing the elements and assigning them to variables
var scoreBoard = document.getElementById("highscores");
var clrBtn = document.getElementById("clear");              // Button to reset scoreBoard

function init() {
  clrBtn.addEventListener("click", clearScoreBoard);        // listening to clicks to the clear button
  displayScoreBoard();
}

function displayScoreBoard() {
  scoreArr = JSON.parse(localStorage.getItem("scoreBoard")); // getting stored data from the local storage and parsing the json to object
  if (scoreArr == null) scoreArr = [];                       // initially if the score array is empty check to avoid null value and assign it empty array if null.
  scoreArr = scoreArr.sort((a, b) => b.score-a.score);       // this line sorts the scores array so the higher score top to buttom
  // for loop below iterates through the array and creates a li element for each item in it.
  for (i = 0; i < scoreArr.length; i++) {
    li = document.createElement("li");
    li.innerText = '   ' + scoreArr[i].initials +' : ' + scoreArr[i].score ;
    scoreBoard.append(li); // appends the created li elements to the parent <ol>.
  }
}

function clearScoreBoard() {
    confirm = confirm("Are you sure, this will delete all scores!");   //When the clear button clicked, this pops up a confirmatin window to check the user is sure to delete.
    if (confirm) localStorage.removeItem('scoreBoard');      //if the user clicks ok then it deletes the scoreboard
    location.reload();  // after deleting the scoreboard from storage, this refreshes the page so the new empty state shows on the page.
    // if user clicks cancel, which returns false, then just refreshes the page.
}

init(); // start init function 
