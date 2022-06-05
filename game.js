/* Arrays */
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

/* Variables */
var level = 0;
var started = false;
var flag = 0;

$(".btn").click(function() {
  if (flag) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    animatePress(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }

})

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
    flag = 1;
  }
})

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //Generate a number b/w 0 to 3
  // console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);
  // console.log(gamePattern[0]);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

    jQuery("body").addClass("game-over");

    setTimeout(function() {
      jQuery("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over!");

    startOver();

  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  flag=0;

  setTimeout(function() {
    $("h1").text("Press Any Key to Restart");
  }, 2000);
}
