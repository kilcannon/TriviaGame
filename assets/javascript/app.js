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
      answers: ['The liver', 'The stomach', 'The lungh'],
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


  function startGame() {
    $(".game-restart").hide()
    $(".next-question").hide()
    $(".opening-instructions").on("click", function() {
      $(".opening-instructions").hide()
      questionDisplay()
      gameTimer()
      responseChecker()
    })
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
      userIncorrectAnswer++
      questionCounter++
      stopCountdown()
      questionTransition()
      questionRemaining()
    }
  }

  function responseChecker() {
    $("tr").on("click", function() {
      userAnswer = $(this).text()
      if (userAnswer === triviaTemp.questions[questionCounter].correctAnswer) {
        $("thead").empty()
        $("thead").hide()
        $("tbody").html("<h2>Correct Answer!</h2>")
        userCorrectAnswer++
        questionCounter++
        stopCountdown()
        questionTransition()
        questionRemaining()
      }
      else {
        $("thead").empty()
        $("thead").hide()
        $("tbody").html("<h2>Incorrect answer!</h2>")
        userIncorrectAnswer++
        questionCounter++
        stopCountdown()
        questionTransition()
        questionRemaining()
      }
    })
  }

  function stopCountdown() {
    clearInterval(timer)
  }

  function questionTransition() {
    if (questionCounter < 10) {
      $(".next-question").show()
      timeRemaining = 16
      $(".next-question").on("click", function() {
        $("tbody").empty()
      })
    }
    else {
      $("thead").hide()
      $("tbody").html("Game Over! Here are the results of the game: <br>" + 
        "Correct answers: " + userCorrectAnswer + "<br>" + 
        "Incorrect answers: " + userIncorrectAnswer)
    }
  }

  function questionRemaining() {
    $(".donut" + questionCounter).hide()
  }

  startGame()

})