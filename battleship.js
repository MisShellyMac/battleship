$(document).ready(function(){

  /* Stores the board info
    "⬛" for empty
    "🚢" for ship
    "✅" when hit
    "🚫" when miss
  */
  var board = [];

  // Stores the locations of the ships
  var ships = [];

  // Current number of ships
  var shipNum = 2;

  // Size of the board
  var boardSize = 10;

  // Bool indicating whether or not game is over
  var gameOver = false;

  // Number of ship hits
  var hits = 0;

  // Number of guesses
  var guesses = 0;

  // Maximum number of guesses allowed
  var guessLimit = 5;

  initializeGame();

  function initializeGame(){
    generateRandomBoard();
    printBoard();
  }

  function generateRandomBoard(){
    // Add some random ships
    var shipsAdded = 0;
    while (shipsAdded < shipNum) {
      var randomVal = Math.floor(Math.random() * (boardSize - 1));
      if (ships.indexOf(randomVal) < 0) { // Not already one of the ships
        ships.push(randomVal);
        shipsAdded++;
      }
    }

    // Set the board values based on ships added
    for(var j = 0; j < boardSize; j++) {
      if (ships.indexOf(j) < 0) { // This location not a ship
        board[j] = "⬛";   // Empty
      } else {
        board[j] = "🚢";   // Ship!
      }
    }
  }

  function printBoard() {
    var boardOut = "";
    for(var i = 0; i < boardSize; i++) {
      boardOut += board[i];
    }
    $("#board").text(boardOut);
  }

  function endGame(won) {
    if (won)
    {
      $("#end-game").text("Congratulations! You sunk the battleships!");
    }
    else
    {
      $("#end-game").text("Sorry, you ran out of guesses!");
    }
    // ADDED FUN: Disable submit button
    $("#submit").prop('disabled', true);
    console.log("End game");
  }

  // CLICK HANDLERS
  $("#submit").click(userGuess);

  function userGuess(){
    // Retrieve the guess from the input box
    var guess = $("#guess").val();

    // If I type just spaces or leave the input box blank,
    // the number conversion makes it 0!
    // Check for this before converting to a number.
    if (guess.trim() === "")
    {
      alert("You must enter a number.");
      return;
    }

    guess = Number(guess);

    // Verify the guess is in a valid range
    // When letters are typed in, I get back NaN.
    // The isNaN function detects this.
    if (isNaN(guess) || guess < 0 || guess > boardSize - 1)
    {
        alert("You must enter a number between 0 and " + (boardSize - 1) + ".");
        return;
    }

    // Check to see if this number was already guessed
    if (board[guess] == "✅" || board[guess] == "🚫")
    {
      alert("You have already guessed this number!");
      return;
    }

    // It is a valid guess
    guesses += 1;

    // Reset the guess input box
    $("#guess").val("");

    // Check if the guess matches one of our ships locations
    // If it does, mark is as a HIT
    // If it doesn't, mark it as a MISS
    if (board[guess] == "🚢")
    {
      board[guess] = "✅";
      hits += 1;
    }
    else
    {
      board[guess] = "🚫";
    }

    // Continue gameplay
    // Redraw the board if it has changed
    printBoard();

    // Tell the user how many guesses they've made
    $("#guess-count").text("Num guesses: " + guesses);

    // Check for game end
    if (hits == 2)
    {
      endGame(true);
    }
    else if (guesses == guessLimit)
    {
      endGame(false);
    }
  }
});
