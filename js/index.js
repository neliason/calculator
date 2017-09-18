var equation = "";
var lastPressed = "";
var mathChars = ['÷', 'X', '-', '+'];

$(".num-btn").on("click", function() {
  var curText = $("#display-main").text()
  var buttonText = $(this).text()
  if(!(buttonText === '.' && curText.indexOf('.') > -1) && !(curText === '0' && buttonText === '0')) { //dont do anything if try to enter multiple '.'
    if (isMathChar(lastPressed)) {
      curText = ""
    } else if (lastPressed === '=' || curText === '0') {
      equation = ""
      lastPressed = ""
      $("#display-main").text("");
      $("#display-secondary").text("")
      curText = ""
    }
    if(curText.length >= 8) {
      digitLimitExceeded()
    } else {
      $("#display-main").text(curText + buttonText)
      $("#display-secondary").text("")
      equation += buttonText
      lastPressed = buttonText
    }
    console.log(equation)
  }
})

$(".math-btn").on("click", function() {
  var buttonText = $(this).text()
  if (!isMathChar(lastPressed) && lastPressed !== "") {
    $("#display-main").text(buttonText);
    $("#display-secondary").text("")
    if (buttonText === 'X') {
      equation += "*"
    } else if(buttonText === '÷') {
      equation += "/"
    } else {
      equation += buttonText
    }
    lastPressed = buttonText
  }
  console.log(equation)
})

$("#equal-btn").on("click", function() {
  var equationEval = eval(equation)
  if(!Number.isInteger(equationEval)) {
    equationEval = equationEval.toFixed(2)
  }
  if (equationEval.toString().length > 8) {
    digitLimitExceeded()
  } else {
    $("#display-main").text(equationEval)
    $("#display-secondary").text("")
    equation = equationEval
    lastPressed = '='
  }
  console.log(equation)
})

$("#ac-btn").on("click", function() {
  reset()
  console.log(equation)
})

$("#ce-btn").on("click", function() {
  console.log(lastPressed)
  if (lastPressed === '=') {
    reset()
  }
  else if(isMathChar(lastPressed)) {
    equation = equation.slice(0, -1)
  } else {
    var highestIndex = -1
    for(var i = 0; i < mathChars.length; i++) {
      var lastIndex = equation.lastIndexOf(mathChars[i])
      if(lastIndex > highestIndex) {
        highestIndex = lastIndex
      }
    }
    if (highestIndex === -1) {
      reset()
    } else {
      equation = equation.slice(0, highestIndex+1)
      $("#display-main").text(equation[highestIndex])
      $("#display-secondary").text("")
      lastPressed = equation[highestIndex]
    }
  }
  console.log(equation)
})

function reset() {
  $("#display-main").text("0")
  $("#display-secondary").text("")
  equation = ""
  lastPressed = ""
}

function isMathChar(char) {
  return mathChars.indexOf(char) > -1
}

function digitLimitExceeded() {
  reset()
  $("#display-secondary").text("digit limit exceeded")
}