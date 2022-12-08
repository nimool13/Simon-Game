var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern= [];
let level = 0;
var started = false;

function checkAnswer (lastColor){
if (gamePattern[lastColor] === userClickedPattern[lastColor]){
   console.log("sucess");
   if (gamePattern.length === userClickedPattern.length)
   setTimeout(function (){
     nextSequence();
   },1000);
}
  else {
  playWrongAnswer();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  changeToGameOver();
  startOver();
}

}



$(document).keydown(function(){ // keypress on h1
  if (!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;}
});


$(".btn").click(function(){
 var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
 let randomNum = Math.floor(Math.random() * 4) ;
 // console.log(randomNum);
 var randomChosenColor= buttonColors[randomNum];
 gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function playWrongAnswer(){
  var audio= new Audio("sounds/wrong.mp3");
  audio.play();
}

function animatePress(currentColor){
$("#" + currentColor).addClass("pressed"); // $(=(".") can be used alternatively
setTimeout (function(){
  $("#"+ currentColor).removeClass("pressed");
},100);
}

function changeToGameOver(){
  return $("#level-title").text("Game over, press any key to Restart");

}

function startOver(){
  level=0;
  gamePattern =[] ;
  started= false;
}
