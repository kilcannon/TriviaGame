$(document).ready(function() {

// question set for game
var trivia = {
  questions: [
    {
      question: 'How many tentacles does a squid have?',
      answers: ['Six', 'Eight', 'Ten'],
      correctAnswer: 'Ten'
    },
    {
      question: 'What aquatic reptile can hold its breath under water for up to 15 minutes?',
      answers: ['A snake', 'A crocodile', 'A lizard'],
      correctAnswer: 'A crocodile'
    },
    {
      question: 'What type of cloud can form a tornado?',
      answers: ['Cirrus', 'Cumulostratus', 'Cumulonimbus'],
      correctAnswer: 'Cumulonimbus'
    },
    {
      question: 'How many calories must you burn to lose one pound?',
      answers: ['3500', '3000', '2500'],
      correctAnswer: '3500'
    },
    {
      question: 'What ­word is the mathematical term for a triangle whose sides are all different lengths?',
      answers: ['Equilateral', 'Isosceles', 'Scalene'],
      correctAnswer: 'Scalene'
    },
    {
      question: 'What colour are mosquitos most attracted to?',
      answers: ['Blue', 'Red', 'Green'],
      correctAnswer: 'Blue'
    },
    {
      question: 'At what temperature are Celcius and Fahrenheit equal?',
      answers: ['-40 degrees', '0 degrees', '100 degrees'],
      correctAnswer: '-40 degrees'
    },
    {
      question: 'The average human body contains how many pints of blood?',
      answers: ['Eight', 'Ten', 'Twelve'],
      correctAnswer: 'Ten'
    },
    {
      question: 'What is the largest internal organ in the human body?',
      answers: ['The liver', 'The stomach', 'The lung'],
      correctAnswer: 'The liver'
    },
    {
      question: 'In what month is the Earth closest to the sun?',
      answers: ['March', 'September', 'January'],
      correctAnswer: 'January'
    },
  ]
};
  
  var timeRemaining = 16
  var triviaTemp = trivia
  var questionCounter = 0
  var userCorrectAnswer = 0
  var userIncorrectAnswer = 0
  var doh = new Audio("assets/images/doh.mp3")
  var woohoo = new Audio("assets/images/woohoo.mp3")

    $(".opening-instructions").on("click", function() { //sets event listener on opening instructions button
      $(".opening-instructions").fadeOut(750)
      questionDisplay()
      gameTimer()
      responseChecker()
    })

  function startGame() { //initializes game
    $(".game-restart").hide()
    $(".next-question").hide()
    $(".opening-instructions").show()
  }

  function questionDisplay() { //sets questions and possible answers on the screen for user
    $(".next-question").hide()

    var tHeader = $("thead");
    var tBody = $("tbody");

    $("thead").show()
    tHeader.append(triviaTemp.questions[questionCounter].question)
    var newQuestion = $("<th align='center'>").text(triviaTemp.questions[questionCounter].question);
    for (var i = 0; i < 3; i++) {
      var answerOption = $("<tr align='center'>").text(triviaTemp.questions[questionCounter].answers[i])
      tBody.append(answerOption)
    }
  }

  function gameTimer() { // sets game timer to display
    timer = setInterval(decrement, 1000)
  }

  function decrement() { //establishes countdown and display for gameTimer function
    timeRemaining--;
    if (timeRemaining >= 0) {
      $(".game-time").html("<p>Time remaining: </p>" + "<p class='time-remaining'>" + timeRemaining + "</p>")
    }
    else {
      $(".game-time").html("Time's up!")
      $("tbody").empty()
      $("thead").empty()
      $("tbody").html("<h2>The correct answer was: </h2>" + "<h2>" + 
        triviaTemp.questions[questionCounter].correctAnswer + "</h2>")
      doh.play()
      userIncorrectAnswer++
      questionCounter++
      stopCountdown()
      questionTransition()
      questionRemaining()
    }
  }

  function responseChecker() { //checks whether user's selected answer was correct
    $("tr").on("click", function() {
      userAnswer = $(this).text()
      if (userAnswer === triviaTemp.questions[questionCounter].correctAnswer) {
        $("thead").empty()
        $("thead").hide()     
        $("tbody").html("<h2>Correct Answer!</h2>")
        woohoo.play()
        userCorrectAnswer++
        questionCounter++
        stopCountdown()
        questionTransition()
        questionRemaining()
      }
      else {
        $("thead").empty()
        $("thead").hide()
        $("tbody").html("<h2>Incorrect answer!<br><br> The correct answer was: </h2>" + "<h2>" + 
          triviaTemp.questions[questionCounter].correctAnswer + "</h2>")
        doh.play()
        userIncorrectAnswer++
        questionCounter++
        stopCountdown()
        questionTransition()
        questionRemaining()
        alienAttack()
      }
    })
  }

  function stopCountdown() { //clears timer
    clearInterval(timer)
  }

  $(".next-question").on("click", function() { //event listener to move to next question on click
    $("tbody").empty()
    questionDisplay()
    gameTimer()
    responseChecker()
  })

  $(".game-restart").on("click", function() { //event listener to move to next question on click
    timeRemaining = 16
    questionCounter = 0
    userCorrectAnswer = 0
    userIncorrectAnswer = 0
    $("thead").empty()
    $("tbody").empty()
    startGame()
  })

  function questionTransition() { //provides ability to move from question to question upon button click
    if (questionCounter < 10) {
      $(".next-question").show()
      timeRemaining = 16
    }
    else {  //sets condition for results to be displayed at end of game
      $("thead").hide()
      $("tbody").html("<h2>Game Over! <br><br> Here are the results of your game:<br>" + 
        "Correct answers: " + userCorrectAnswer + "<br>" + 
        "Incorrect answers: " + userIncorrectAnswer) + "</h2>"
      $(".game-restart").show()
      }
    }

    function alienAttack () { //floats an alien across the screen once when an answer is incorrect
      $(function(){
          alien($("#alien"), 10000);
      })

      var alien = function($alien,speed){
        $alien.animate({
            "left": "100%"
        }, speed);
      }
    }

  function questionRemaining() {  //sets donuts to disappear as game progresses with each question
    $(".donut" + questionCounter).fadeOut(1000)
  }

  startGame()  //launches game on page load

})