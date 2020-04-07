
var buttonColours = ["red", "blue", "green", "yellow"];  //setting the colors for the box buttons

var gamePattern = []; // creating a empty game patter to store the pattern later
var userClickedPattern = []; // to check with the user clicked pattern against the game gamePattern

var started = false;  // checking the game has started or not.. by default setting it to 0
var level = 0; // initial level is kept to 0

$(document).keypress(function() {  //to log the key to start the game.
  if (!started) {  // checking if the game has already started or yet to be started...
    $("#level-title").text("Level " + level);  // logs the level from the above variable
    nextSequence();  // calls the function to generate the next sequence
    started = true; // assigns the variable to true as the game has been started
  }
});

function nextSequence() {   // user defined function to find the next sequence
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);       // generating a random patter using the random numbers and mapping with the button and its color

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // for animation
  playSound(randomChosenColour); // will play the sound of the corresponding button pressed
}


$(".btn").click(function() { //logs the button pressed and calls the call back function

  var userChosenColour = $(this).attr("id"); //mapping with the user chosen color with the pressed color
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
