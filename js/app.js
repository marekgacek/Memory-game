/*
 * Create a list that holds all of your cards
 */
const deckList = document.querySelector('.deck');
let cards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];
const li = document.getElementsByTagName('li');

// set the variable which handle the array with cards which have class 'open'
let openCards = [];

// set the variable which handle the array with cards which have class 'matched'
let matchedCards = [];

const movesBox = document.getElementById('moves');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//  set the value for clicks counter and timer
let clicks = 0;
let m = 0;
let s = 0;
let timeGoes = true;
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
  movesCounter();
  cardMatch();
 // score();
}
}


function cardMatch() {
	if(li.className = 'card open'){
		openCards.push(document.getElementsByClassName('card open'));
		if (openCards.length === 2) {
			for (const openCard of openCards) {
				let openCard1 = openCard[0];
				let openCard2 = openCard[1];
			
			// check if these two elements have the same class name
			if (openCard1.firstChild.className === openCard2.firstChild.className){
				
				// add to siblings of these elements class mame 'matched'
				  openCard1.className += ' match';
				  openCard2.className += ' match';
				  
				  // remove from these elements class name 'open'
				  openCard1.classList.remove('open');
				  openCard2.classList.remove('open');
				  // add to array with matched elements these two elements
				  matchedCards.push(openCard1);
				  matchedCards.push(openCard2);
				  //  reset quantity of elements in array with open elements to 0
				  openCards.length = 0;
				  // check if quantity of elements in array with matched elements equals 16
				  if(matchedCards.length == 16){

					  // TODO: call to function finishGame
					  finishGame();
			}
		}
		
		else {
			  // if these two elements haven't the same class change the class name of previous sibling element of these elements for 'lid'
				  setTimeout(function(){
					 openCard1.className = 'card';
				 	 openCard2.className = 'card';
				  }, 850);

				  // reset quantity of elements in array with open elements to 0
				  openCards.length = 0;
		}
		 
		}
	}
	
}
}
function movesCounter(){

	// counting clicks on cards
	clicks = clicks + 1;
	movesBox.innerHTML = 'Moves: ' + clicks;

	// Remove event listener 'click' for function timerStart
	if(clicks == 1){
		for(let i = 0; i < clickedCard.length; i++){
			clickedCard[i].removeEventListener('click', timerStart);
		}
	}
}
function score(){
	star1=document.getElementById('star1');
	star2=document.getElementById('star2');
	star3=document.getElementById('star3');
	if(clicks <= 26){
		star1.className += ' score';
		star2.className += ' score';
		star3.className += ' score';
	}
	else if(clicks > 26 && clicks < 34){
		star1.className += ' score';
		star2.className += ' score';
		
	}
	else if(clicks > 34 ){
		star1.className += ' score';
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
