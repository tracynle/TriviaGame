/* 

Create variables for:
-keeping count of correct questions set to zero
-keeping count of wrong questions set to zero
-keeping count of unanswered questions set to zero
-a timer set to 30 seconds
-user's guess/answer they choose

Create functions for:
-Start button to start the game once clicked. Using the .on click event
-to display array questions in a loop with radio buttons using HTML
-Timer to start
-Timer to countdown: will notify how many seconds you have left in increments of 10 until it ends

*/
var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;
var timer = 30;
var pick;
var index = 0;
var holder = [];
var intervalId;
var userGuess;
var running = false;
var questions = [
    { 
        question: "What Quidditch position does Harry play for Griffyndor?",
        choices: ["Chaser", "Bludger", "Keeper", "Seeker"],
        answer: 3,
    },
    {
        question: "How did Harry get the scar on his forehead?",
        choices: [
            "in a fight with Dudley", "Voldemort tried to kill him when he was a baby", 
            "he was attacked by Mrs. Norris, Finch's cat", "Buckbeak scratched him"
            ],
        answer: 1,
    },
    {
        question: "Where does Moaning Murtle live in Hogwarts?",
        choices: ["in the Chamber of Secrets", "in Hagrid's house", "in the girl's bathroom above the Great Hall", "in the boy's bathroom"],
        answer: 2,
    // },
    // {
    //     question: "How did Harry destroy Tom Riddle's diary?",
    //     choices: ["The Sword of Gryffindor", "he pierced it with a Basilisk's fang", "he put a spell on it", "he burned the book"],
    //     answer: 1,
    // },
    // {
    //     question: "What were Ron's and Hermione's children's names?",
    //     choices: ["Rose and Hugo", "Vanessa and Jack", "Jane and Sam", "Violet and Matthew"],
    //     answer: 0,
    // },
    // {
    //     question: "What language did Harry discover he could speak in Book 2, The Chamber of Secrets?",
    //     choices: [" Giant", "Gobbledegook with Goblins", "Mermish with Merpeople", " Parseltongue with snakes"],
    //     answer: 3,
    // },
    // {
    //     question: "What does Lavender Brown's nickname for Ron?",
    //     choices: ["Freckles", "Honey-bunny", " Won-won", "Snuggles"],
    //     answer: 2,
    // },
    // {
    //     question: "Which of the following is not one of Voldemort's horcruxes?",
    //     choices: ["a. The Sword of Gryffindor", "Nagini", "Tom Riddle's Diary", "Helga Hufflepuff's Cup"],
    //     answer: 0,
    // 
}
];
var qCount = questions.length;
$(document).ready(function() {


console.log(questions);

$("#restart-btn").hide();
$("#next-btn").hide();
$("#next-btn").on("click", displayQuestion);

// Game begins when you click on the 'Start' button
$("#start-btn").on("click", function() {
    // Once you click, the 'Start' button hides/goes away
    $("#start-btn").hide();
    $(".lead").empty();
    // Calls this function to display questions in an array for loop
    displayQuestion();
    runTimer();
    for(var i = 0; i < questions.length; i++) {
        holder.push(questions[i]);
    }
})

function runTimer() {
    if(!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
}

function decrement() {
    $("#timeleft").text("Time remaining: " + timer);
    timer--;

    if (timer === 0) {
        unansweredCount++;
        stopTimer();
        $("#answerblock").text("Time is up! The correct answer is: " + pick.choices[pick.answer]);
        showResults();
    }
}

function stopTimer() {
    running = false;
    clearInterval(intervalId);
}

// Function displays the questions in a loop randomly
function displayQuestion() {
    // Randomly show a question
    // index = Math.floor(Math.random() * 1);
    // pick = questions[index];
    // questions.splice(index, 1);

    // Pick a question in order
    pick = questions[index++];

    // Displays questions in the #questionblock div in an array
    $("#questionblock").text(pick.question);
    for( var i = 0; i < pick.choices.length; i++) {
        var userChoice = $("<div>");

        userChoice.addClass("answerchoice");
        userChoice.text(pick.choices[i]);
        userChoice.attr("data-guessvalue", i);
        userChoice.on("click", checkAnswer);
        $("#answerblock").append(userChoice);
    }
}
function checkAnswer () {
    // Grabs the user's answer from the array
    userGuess = parseInt($(this).attr("data-guessvalue"));

    stopTimer();
    $("#answerblock").empty();
    if (userGuess === pick.answer) {
        correctCount++;
        $("#answerblock").text("Correct! The correct answer is: " + pick.choices[pick.answer]);
    }
    else {
        wrongCount++;
        $("#answerblock").text("Wrong! The Correct answer is: " + pick.choices[pick.answer]);
       
    }
    userGuess= "";
    showResults();

    if (!haveAllQuestionsBeenProcessed()) {
        $("#next-btn").show();
    }
}

// When game ends.
function showResults () {
    if (haveAllQuestionsBeenProcessed()) {
        $("#questionblock").empty();
        $("#questionblock").text("Game Over! Here's your results: ");
        $("#answerblock").append("Correct: " + correctCount);
        $("#answerblock").append("Incorrect: " + wrongCount);
        $("#answerblock").append("Unanswered: " + unansweredCount);
        $("#restart-btn").show();
        correctCount = 0;
        wrongCount = 0;
        unansweredCount = 0;
    }
}

function haveAllQuestionsBeenProcessed() {
    return wrongCount + correctCount + unansweredCount === qCount;
}

$("#restart-btn").on("click", function() {
    $("#restart-btn").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
        questions.push(holder[i]);
    }
    runTimer();
    displayQuestion();
})
})
