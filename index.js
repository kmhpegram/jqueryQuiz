"use strict";

let STORE = {
	questions: [{
		state: "Florida", 
		choices: ["Orlando", "Tampa", "Tallahassee", "Jacksonville"],
		answer: 2},

		{state: "Maryland",
		choices: ["Annapolis", "Baltimore", "Rockville", "College Park"],
		answer: 0},

		{state: "Massachusetts",
		choices: ["Salem", "Boston", "Groveland", "Framingham"],
		answer: 1},

		{state: "Virginia",
		choices: ["Alexandria", "Charlottesville", "Williamsburg", "Richmond"],
		answer: 3},

		{state: "North Carolina",
		choices: ["Raleigh", "Charlotte", "Greensboro", "Asheville"],
		answer: 0},

		{state: "Georgia",
		choices: ["Savannah", "Augusta", "Athens", "Atlanta"],
		answer: 3},

		{state: "California",
		choices: ["San Francisco", "Los Angeles", "Sacramento", "Oakland"],
		answer: 2},

		{state: "New York",
		choices: ["Rochester", "Albany", "New York", "Rome"],
		answer: 1},

		{state: "Kansas",
		choices: ["Topeka", "Wichita", "Manhattan", "Kansas City"],
		answer: 0},

		{state: "Minnesota",
		choices: ["Minneapolis", "Duluth", "Saint Paul", "Edina"],
		answer: 2},
		],

	praise: "You're correct",
	admonishment: "You're wrong",
	currentQuestion: 0,
	score: 0
}

function beginQuiz() {
	//listener for start button & hide what we don't want to see
	console.log("beginQuiz ran");
	$("#btn-start").on("click", function() {
		console.log("you clicked start");
		$(".startContainer").hide();
		$("#js-quiz-form").show();
		$(".navigation").show();
		//$(".js-next").hide();
	})
}

function currentQuestion() {
	let currentQuestion = STORE.questions[STORE.currentQuestion];
	return currentQuestion;
}

function renderQuiz() {
	console.log("renderQuiz ran");
	renderState();
	renderChoices();
}


function renderState() {
	//render question to DOM
	console.log("renderState ran");
	
	let currentState = currentQuestion().state;
	console.log(currentState);
	$("legend").html(`What is the capital of ${currentState}?`);
}

function renderChoices() {
	//render choices to DOM
	console.log("renderChoices ran");

	let currentChoices = currentQuestion().choices;
	
	let currentChoicesString = "";
	
	$.each(currentChoices, function (index, value) {
		currentChoicesString += `<input id="${value}" type="radio" name="choice" value="${index}" required>` +
		`<label for="${value}">${value}</label><br>`;
	})

	console.log(currentChoicesString);
	$(".choiceContainer").html(currentChoicesString);
}

function handleAnswer() {
	//compare users choice against the answer
	console.log("handleAnswer ran");
	$(".js-check").on("click", function() {
		//collect what user answered, comparison to see how user scored, progression to next question
		let userAnswer = $("input[type='radio']:checked").attr("value");
		console.log(userAnswer);
		checkAnswer(userAnswer);
		$(this).prop("disabled",true);
	});
}

function checkAnswer(userChoice) {
	//is correct answer, run feedback
	console.log(currentQuestion().answer);
	if (userChoice == currentQuestion().answer) {
		console.log("correct");
		renderFeedback(true);
	}
	else {
		console.log("incorrect");
		renderFeedback(false);
	}
}

function renderFeedback(boolean) {
	//render praise or admonishment
	console.log("renderFeedback ran");
	$(".questionContainer legend").hide();
	$(".choiceContainer").hide();
	$(".js-next").show();

	if (boolean == true) {
		//where put feedback? append to map section
		$(".map").append(`<h1>${STORE.praise}.</h1>`);
	}
	else {
		$(".map").append(`<h1>${STORE.admonishment}.</h1>`);
	}
}

function handleNext() {
	//listener for user submitting next
	console.log("handleNext ran");
	$(".js-next").on("click", function() {
		console.log("you want the next question!");
		//currentQuestion().score = +1;
		STORE.currentQuestion = +1;
		
		$(".map").hide();
		renderQuiz();
	});
}

function renderFinalResults() {
	//render how user scored
	console.log("renderFinalResults ran");
}

function restartQuiz() {
	console.log("restartQuiz ran");
}


function handleQuiz() {
	beginQuiz();
	renderQuiz();
	handleAnswer();
	handleNext();

}


$(handleQuiz);

// a listener to start the quiz
//once the quiz has started display the question and their choices
//listen for the users answer
//compare the answer with the correct choice, give feedback, take score and advance the question
//at end, display end of quiz overall score and restart game option



