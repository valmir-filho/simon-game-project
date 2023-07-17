var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// This function uses jQuery to add a keypress event to the document (HTML page). When a key is pressed, this function is triggered. It checks if the game hasn't started yet (!started). If so, it updates the level title to display "Level" followed by the current level number ($("#level-title").text("Level " + level);), and then calls the nextSequence() function to start the game. The started variable is set to true, indicating that the game has started.
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// This function uses jQuery to add a click event to elements with the class "btn" (the colored buttons of the game). When one of the buttons is clicked, this function is triggered. It retrieves the color chosen by the user through the id attribute of the clicked button (var userChosenColour = $(this).attr("id");), adds this color to the userClickedPattern array, plays the sound associated with the color using the playSound() function, and animates the clicked button using the animatePress() function. Then, it calls the checkAnswer() function to verify if the user's sequence is correct, passing the current index of the user's sequence as an argument (checkAnswer(userClickedPattern.length - 1);).
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// This function checks if the color clicked by the user at position currentLevel of the userClickedPattern array matches the color at position currentLevel of the gamePattern array. If it matches, it means the user has clicked the correct color. The function then checks if the user has completed the whole correct sequence (if (userClickedPattern.length === gamePattern.length)). If true, the game waits for one second (setTimeout) and then calls the nextSequence() function to start the next level. Otherwise, the game continues to wait for the user to complete the correct sequence. If the user gets the sequence wrong, the function calls playSound("wrong") to play a sound indicating the error. The background of the page turns red ($("body").addClass("game-over")) to provide a visual effect for the error. The level title is updated to display "Game Over, Press Any Key to Restart". Then, the page waits for 200 milliseconds (setTimeout) and removes the red background class ($("body").removeClass("game-over")) to return to the normal state. The startOver() function is called to restart the game.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
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

// This function is responsible for starting the next level of the game. It clears the userClickedPattern array, increments the level, updates the level title to display the new level number ($("#level-title").text("Level " + level);), generates a random number between 0 and 3 (var randomNumber = Math.floor(Math.random() * 4);), and based on that number, selects a random color from the buttonColours array (var randomChosenColour = buttonColours[randomNumber];). This color is added to the end of the gamePattern array, and the corresponding button for the color is animated with fadeIn and fadeOut effects ($("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);). The sound associated with the color is played using the playSound() function.
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// This function receives the name of a color (currentColor) and adds the "pressed" class to the element with the corresponding id for that color ($("#" + currentColor).addClass("pressed");). This visually presses the button. After 100 milliseconds, the "pressed" class is removed, returning the button to its normal state (setTimeout(function () {$("#" + currentColor).removeClass("pressed");}, 100);).
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// This function receives the name of a color (name) and creates an audio element to play the sound associated with that color. The sound file is obtained through the URL "sounds/name.mp3", where name is the name of the color provided. The sound is then played using the audio.play() method.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// This function is called when the game ends (when the user gets the sequence wrong). It resets the game by setting level, gamePattern, and started back to their initial values. This way, the game is ready to be played again.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}