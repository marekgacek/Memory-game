/*
 * Create a list that holds all of your cards
 */
let symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

const deckList = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const stars = document.querySelectorAll('.stars li')
const popup = document.querySelector('.popup');
const header = document.querySelector('header');
const timer = document.querySelector('.timer');
const restart = document.querySelector('.restart');
const movesBox = document.getElementById('moves');
// set the variable with 'open' cards
let openCards = [];

// set the variable with 'matched' cards
let matchedCards = [];

let clicks = 0;
let time = true;
let startTime;
let endTime;
let timerInterval;
let timerCounter = 0;
let timerMin = 0;
let s = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/* shuffle the list of cards using the provided "shuffle" method below  */
let newCards = shuffle(symbols);

/* - add each card's HTML to the page */
function game(item) {
    deckList.innerHTML += '<li class="card"><i class="item"></i></li>';
    document.querySelector('.item').className = item;
}
/* - loop through each card and create its HTML */
newCards.forEach(game);



deckList.addEventListener('click', function startGame(e) {

    // variable for one event target
    let usedCard = e.target;

    // check if 
    if (!(e.target.className === 'deck') && (openCards.length <= 2) && !(e.target.isClicked === 1) && !(e.target.localName === 'i')) {

        showCards(e);
        addCardToOpenCards(e);
        movesCounter();

        if (clicks === 1) {
            timerInterval = setInterval(function() {
                startTimer();
            }, 1000);
        }
        score();
    }
})


/*
 * Functions for game
 */

//  if check is correct change class of element for 'open'
function showCards(e) {
    e.target.className = 'card open';
    e.target.isClicked = 1;
}
// add the card to a *list* of "open" cards 
function addCardToOpenCards(e) {
    openCards.push(e.target.firstChild);
    cardMatch(openCards);
    cardNoMatch(openCards);
}

// The same cards
function cardMatch(array) {

    // check if these two elements have the same class name
    if (openCards.length === 2 && openCards[0].className === openCards[1].className) {

        // add to parent of these elements class mame 'matched'
        openCards[0].parentNode.className = 'card match';
        openCards[1].parentNode.className = 'card match';


        // add to array with matched elements these two elements
        matchedCards.push(array[0]);
        matchedCards.push(array[1]);
        //  reset quantity of elements in array with open elements to 0
        clearOpenCards(array);

        // check if quantity of elements in array with matched elements equals 16
        if (matchedCards.length == 16) {

            //  call to function finishGame
            finishGame();
        }
    }
}

// Diffrent cards
function cardNoMatch(array) {
    if (array.length === 2 && array[0].className !== array[1].className) {
        setTimeout(function() {
            array[0].parentNode.className = 'card';
            array[1].parentNode.className = 'card';
            array[0].parentNode.isClicked = 0;
            array[1].parentNode.isClicked = 0;

            // reset quantity of elements in array with open elements to 0                
            clearOpenCards(array);
        }, 800);
    }


}
//Clear array					 
function clearOpenCards(array) {
    for (let i = 0; i < 2; i++) {
        array.shift();
    }
    return array;
}




function movesCounter() {

    // counting clicks on cards
    clicks = clicks + 1;
    movesBox.innerHTML = 'Moves: ' + clicks;

}

//Display stars on screen
function score() {

    if (clicks > 28 && clicks < 38) {
        stars[0].style.visibility = 'hidden';
    } else if (clicks > 38) {
        stars[1].style.visibility = 'hidden';
    }
}


/*
 Timer 
*/


function startTimer() {

    timerCounter++
    s = timerCounter;
    if (timerCounter === 60) {
        timerMin++;
        s = 0;
        timerCounter = 0;
    }
    //show time on page
    timer.innerHTML = 'Time: ' + timerMin + ' min ' + s + ' sec';
}

function stopTimer() {
    clearInterval(timerInterval);
    timerCounter = 0;
    timerMin = 0;
    timer.innerHTML = "Time: 0 min 0 sec";
}

//End game when all cards are matched and show popup window	
function finishGame() {

    let myTime = timerMin + ' min ' + s + ' sec';
    if (clicks <= 28) {
        let rating = stars[0].innerHTML + stars[1].innerHTML + stars[2].innerHTML;
        popup.innerHTML = '<p><span class="popup-title">Congratulations!!!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + myTime + '<br>Rating: ' + rating + '<br>Moves: ' + clicks + '<br><br><button id="play-again">Play again</button></p>';

    } else if (clicks > 28 && clicks < 38) {
        let rating = stars[0].innerHTML + stars[1].innerHTML;
        popup.innerHTML = '<p><span class="popup-title">Congratulations!!!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + myTime + '<br>Rating: ' + rating + '<br>Moves: ' + clicks + '<br><br><button id="play-again">Play again</button></p>';

    } else if (clicks > 38) {
        let rating = stars[0].innerHTML;
        popup.innerHTML = '<p><span class="popup-title">Congratulations!!!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + myTime + '<br>Rating: ' + rating + '<br>Moves: ' + clicks + '<br><br><button id="play-again">Play again</button></p>';

    }

    deckList.style.display = 'none';
    popup.style.visibility = 'visible';
    header.style.visibility = 'hidden';

    stopTimer();

    //handle button with id nextGame
    nextGame = document.getElementById('play-again');

    //add to variable next-game event listener which call function playAgain
    nextGame.addEventListener('click', playAgain);

}

//Reload game
function playAgain() {
    newCards.forEach(game);
    window.location.reload();

}

restart.addEventListener('click', playAgain);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */