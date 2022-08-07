//// SIMON GAME ////


// 4 Colors for the game
var buttonColors = ["red", "blue", "green", "yellow"];
// Order of the Game
var gameOrder = [];
// Order of Player choices
var playerOrder = [];
//starting level
var level = 0;
// using boolean for game start
var gameStarted = false;

//keypress uses 'document' to cover entire webpage, no matter where youre clicked
$(document).keypress(function() {
    if (!gameStarted) {
        //Resets everything to normal for when you lose
        $("body").css("background-color", "#011F3F");
        $("h2").remove()
        $("#level-title").text("Level " + level);
        //runs the game sequence and starts the game
        gameSequence()
        gameStarted = true;
    };
});

// our click event that plays sound and animation for button press
$(".btn").on("click", function() {
    // gets the .attr("id") of the specific .btn we click
    var chosenColor = $(this).attr("id");
    //.push adds our clicked button to an array
    playerOrder.push(chosenColor);
    animatePress(chosenColor);
    playSound(chosenColor);

    //runs check answer using the length - 1 so we can get the proper indexing
    checkAnswer(playerOrder.length - 1);

});




//Checking answer using the current level
function checkAnswer(currentLevel) {
    // if the your guess is correct, it will make sure the length is the same at that guess.
    if (gameOrder[currentLevel] === playerOrder[currentLevel]) {

        // if correct, runs the next sequence after 1000ms
        if (gameOrder.length === playerOrder.length) {
            setTimeout(function() {
                gameSequence();
            }, 1000);
        };
    }
    // otherwise, you lose
    else {
        //Plays audio
        var loseAudio = new Audio("sounds/wrong.mp3")
        loseAudio.play()

        //Changes background and adds text
        $("body").css("background-color", "red")
        $("#level-title").text("You Lose!");
        $("h1").after("<h2>Your Final Score is : " + level + "</h2>");
        $("h2").after("<h2>Press a button to play again!</h2>");
        //Resets game variables in case of restart without refreshing
        gameStarted = false;
        level = 0
        gameOrder = []

    };
   
};

//Game sequence that is called on each correct answer
function gameSequence() {
    // resets player order so the player has to guess each color again
    playerOrder = [];
    //increase level number each time gameSequence is called
    level++;
    $("#level-title").text("Level " + level);

    //random number that selects a random color to use as the next color in the sequence
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gameOrder.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};



//Our animation for the players click
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
};


// Audio for each color
function playSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}


///////////////////// Code is not 100% my own. //////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Completed during Udemy course The Complete 2022 Web Development Bootcamp//
/////////////////////////////////////////////////////////////////////////////
