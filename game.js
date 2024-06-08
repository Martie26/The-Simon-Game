var buttonColours = ["blue", "green", "red", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keypress(function () {
  if (!started) {

    $("h1").html("Level " + level);
    nextSequence();
    started = true;

  }

});


  $(".btn").click(function userAnswer() {
      var userChosenColour = $(this).attr("id");

      userClickedPattern.push(userChosenColour);

      playSound(userChosenColour);

      animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length-1);

  });


  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel] ) {
      console.log("success");

      if (gamePattern.length == userClickedPattern.length) {
          setTimeout(function () {
            nextSequence();
          }, 1000);
      }

    } else {
      console.log("failed");

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");

      setTimeout (function() {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").html("Game Over. Press Any Key To Restart");

      startOver();

    }

  }


function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  gamePattern.length;

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

};

function startOver() {
  level = 0
  started = false;
  gamePattern = [];
}
