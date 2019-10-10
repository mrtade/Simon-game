// Provides a means to track the users array
var userClickedPattern = [];

// Provides a means to track the games array
var gamePattern = [];

// Array of button possible colours to be querries
var buttonColours = ["red","blue","green","yellow"];

// This function generates a random colour and adds to the gamePattern array
function nextSequence() {

  // generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random()*4);

  // create a new variable called randomChosenColour and use the randomNumber from to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // add the new randomChosenColour generated to the end of the gamePattern array.
  gamePattern.push(randomChosenColour);

  console.log("game colour: " + randomChosenColour);
  console.log("game array: " + randomChosenColour);

  // Select the randomChosenColour and animate it
  $("."+randomChosenColour).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);

  // Use this function to play sound globally--in this case from this function
  playSound(randomChosenColour);

  // Increment game level and change h1 text
  level++;
  $("h1").html("Level " + level );

  // Reset the user clicked pattern as the user is expected to re-input this while playing
  userClickedPattern = [];

}

// Function to trigger an action on click event
$(".btn").click(function(){

  var userChosenColour = event.currentTarget.id;

  // Use this function to play sound globally--in this case from this function
  playSound(userChosenColour);

  /*
  Below also works by selecting the id attribute of the "this" element that triggered the function

  var userChosenColour = $(this).attr("id");

  */

  // add the new userChosenColour generated to the end of the userClickedPattern array.
  userClickedPattern.push(userChosenColour);

  // Call the animate function on button click
  animatePress(userChosenColour);

  // length-1 is used because an array with one item has array position 0 only
  checkAnswer(userClickedPattern.length-1);

  console.log("user colour: " + userChosenColour);
  console.log("user array: " + userClickedPattern);
});

// Audio function which works for both user click and computer random selection
function playSound(name){
  var gameAudio = new Audio("sounds/" + name + ".mp3");
  gameAudio.play();
}

/* Below also works for the audio by editing the src attribute

var gameAudio = new Audio();
gameAudio.src = "sounds/"+randomChosenColour+".mp3";
gameAudio.play();
console.log(gameAudio.src);

*/

// Animation function when button is clicked which has a timeout for removing class after a set period
function animatePress(currentColour) {
  $("."+ currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// started variable is boolean and used to detect when the keyboard is pressed
var started = false ;
// level is 0 is used as a starting point
var level = 0 ;

  // Detect if started is not true, if still false, call nextSequence and set started to attribute
    //also change h1 html as level increases via level variable
  $(document).keypress(function(){
    if (started != true){
    nextSequence();
    $("h1").html("Level " + level );
    started = true ;
    /*
    Below if statement can also be used for the conditional true or false variable

    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
    */

  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
