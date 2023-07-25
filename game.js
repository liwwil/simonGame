var gamePattern = []; /*Collect all pattern */
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var userClickedPattern = [];
var level = 0;
var state = "wrong";


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function (event) {

    var userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    for(let i = 0; i < userClickedPattern.length; i++){
        if(gamePattern[i] != userClickedPattern[i]){
            playSound(state);
            setTimeout(function () {
                location.reload();
            }, 500)
        }
    };
    if (userClickedPattern.length == level) {
        console.log(userClickedPattern)
        checkAnswer(userClickedPattern);
        userClickedPattern = [];
    }
});




function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * (3) + 0);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(level)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var currentColourClicked = "#" + currentColour
    $(currentColourClicked).addClass("pressed");
    setTimeout(function () {
        $(currentColourClicked).removeClass("pressed");
    }, 100)
}

function checkAnswer(userClickedPattern) {
    /*var currentLevel = */
    var patternInGame = gamePattern.toString();
    var clickedPattern = userClickedPattern.toString();
    console.log(patternInGame, ":", clickedPattern)
    if (patternInGame != clickedPattern) {
        playSound(state);
        setTimeout(function () {
            location.reload();
        }, 500)
    } else {
        console.log(patternInGame, ":", clickedPattern)
        setTimeout(function () {
            nextSequence();
        }, 500)
    }

}

