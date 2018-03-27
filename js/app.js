/*
 * Create a list that holds all of your cards
 */
const deckList = document.querySelector('.deck');
let cards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];
const li = document.getElementsByTagName('li');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
newCards=shuffle(cards);
/* - add each card's HTML to the page */

function game(item){
 deckList.innerHTML += '<li class="card"><i class="item"></i></li>';
 document.querySelector('.item').className = item;
}
/* - loop through each card and create its HTML */ 
newCards.forEach(game);

//  Add event listener 'click' for element ul for function startGame
deckList.addEventListener('click', startGame);

// Event listener for timer
const clickedCard = document.querySelectorAll('.card');
for(let i = 0; i < clickedCard.length; i++){
 clickedCard[i].addEventListener('click', timerStart);
}
function startGame (e){
 
 //stop propagation for click event
 e.stopPropagation();
 

 // TODO: set variable for one event target
 let usedCard = e.target;
 // TODO: set variable for tag name on event target
 let cardCheck = e.target.tagName;
 // TODO: check if class name is 'card' and if tag name isn't 'UL'
 if( usedCard.className == 'card' && cardCheck != 'UL'){
  // TODO: if check is correct change class of element for 'open'
  usedCard.className += ' open';
  // TODO: call to functions: clicksCounter, cardMatch and score
  clicksCounter();
  cardMatch();
  score();
}
}
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
