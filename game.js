$(document).ready(function () {
  let gameGeneratedPattern = [];
  let userClickedPattern = [];
  let audioElement = document.querySelector(".buttonSound");
  let level = 0;
  let userBlocked = true;
  let userClicks = 0;

  const startGame = () => {
    $("h1").text("Press A Key to Start");

    // reset global variables
    gameGeneratedPattern = [];
    userClickedPattern = [];
    level = 0;
    userBlocked = true;
    userClicks = 0;

    //   Adds listener for when the user presses a key for the first time
    // to start the game and then removes the listener
    $("body").on("keydown", () => {
      // This function selects one of the buttons
      nextSequence();

      $("body").off("keydown");

      userBlocked = false;
    });
  };

  startGame();

  //   Add listener for all the four buttons
  $("div.btn").on("click", (btn) => {
    if (userBlocked) {
      userClicks = 0;
      return;
    }

    let userSelectedButtonColour = btn.target.id;

    // Animates the button click
    animatePress(userSelectedButtonColour);

    // Plays sound of the user clicked button
    playSound(userSelectedButtonColour);

    // Pushes the last clicked button by user into userClickedPattern
    userClickedPattern.push(userSelectedButtonColour);

    // For each click, userClicks is incremented
    userClicks += 1;

    //check answer is run here immediately after user
    //completes clicking of patterns
    if (userClicks === gameGeneratedPattern.length) {
      userClicks = 0;
      userBlocked = true;
      checkAnswer();
    }
  });

  //   This function plays corresponding sound of the button clicked by the user
  const playSound = (name) => {
    audioElement.src = "sounds/" + name + ".mp3";
    audioElement.play();
  };

  const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  };

  const nextSequence = () => {
    $("h1").text("Level " + level);

    let randomNumber = Math.round(Math.random() * 3);

    const colours = ["green", "red", "yellow", "blue"];

    let randomChosenColour = colours[randomNumber];

    playSound(randomChosenColour);

    //Animates the randomly selected button
    $("#" + randomChosenColour).fadeOut();
    $("#" + randomChosenColour).fadeIn();

    gameGeneratedPattern.push(randomChosenColour);

    //level += 1;

    userBlocked = false;

    // Checks to see if user selected sequence matches the generated sequence
    // if (userClicks === gameGeneratedPattern.length - 1 && userBlocked) {
    //   userBlocked = true;
    //   checkAnswer();
    //   return;
    // } else {
    //   userBlocked = false;
    //   return;
    // }
  };

  const checkAnswer = () => {
    if (gameGeneratedPattern.join("-") === userClickedPattern.join("-")) {
      level += 1;
      userClickedPattern = [];
      nextSequence();
      return;
    }

    startGame();
  };
});
