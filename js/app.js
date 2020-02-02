/*
 * Create a list that holds all of your cards
 */
const allCards = document.querySelectorAll('.card');
let imgIcons = []; // to collct all the image icons from the cards
let holdCards = []; //to hold the chosen cards
let moves = 0; //calculate moves num
let stars = 3; //calculate stars num
let timerprocess;
let sec = 0;
let min = 0


function begintheGame() {
    for (card of allCards) {
        //add eventlistener to each card
        card.addEventListener('click', Clicking);
        //saving icons names of these cards
        let icons = card.children[0];
        //console.log(icons);
        imgIcons.push(icons.className);
    }
    //Adding events into dialog btns
    document.getElementById('btnplay').addEventListener('click', Restart);
    document.getElementById('btnclose').addEventListener('click', CloseBox);
    //Adding event into for restarting
    //document.getElementsByClassName('restart').addEventListener('click', Restart);
    document.querySelector(".restart").addEventListener('click', Restart);
}

function hideCards() {
    for (card of allCards) {
        //hide all the cards
        card.classList.remove("open", "match", "show");
    }
}

//for clearing the results and startin the game
//changeresults();
begintheGame();
Restart();

function Restart() {
    CloseBox();
    sec = 0;
    min = 0;
    stars = 3;
    moves = 0;
    holdCards = [];
    changeresults();
    shufflingCards();
    hideCards();
    timerOn();
}

function timerOn() {
    if (!timerprocess) {
        timerprocess = setInterval(function() {
            sec += 1;
            if (sec > 59) {
                sec = 0;
                min += 1;
            }
            document.querySelector("#timer").innerText = `${min}:${sec}`
        }, 1200);
    }
}

function timerOff() {
    clearInterval(timerprocess);
    timerprocess = null;
}

function CloseBox() {
    document.getElementById('mydialog').close();
}

function shufflingCards() {
    //start shuffle the cards then adding them to the cards
    imgIcons = shuffle(imgIcons);
    //console.log(imgIcons);
    let i = 0;
    for (card of allCards) {
        let icons = card.children[0];
        icons.className = imgIcons[i];
        i++;
        //card.classList.add("open", "show");
    }

}

function Clicking() {
    //max 2 cards
    if (holdCards.length < 2) {
        //view then push to array
        this.classList.toggle("show");
        this.classList.toggle("open");
        holdCards.push(this);
        //console.log(holdCards);
        if (holdCards.length == 2) {
            //wait 500 milisecond before moving to match
            setTimeout(matching, 500);
        }
    }
}

function matching() {
    if (holdCards.length == 2) {
        //save cards
        let card1 = holdCards[0];
        let card2 = holdCards[1];
        //save icons name
        let icons1 = card1.children[0].className;
        let icons2 = card2.children[0].className;
        let icons1id = card1.children[0].id;
        let icons2id = card2.children[0].id;
        //compare the 2 cards
        if (icons1 == icons2 && icons1id !== icons2id) {
            //change calss into match
            card1.classList.add("match");
            card2.classList.add("match");
        } else {
            //change calss into card
            card1.className = "card";
            card2.className = "card";
        }
        //clear the chosen cards
        holdCards = [];
        //increments moves
        if (icons1id !== icons2id) {
            changeMoves();
        }
    }
    const othercards = document.querySelectorAll(".card:not(.match)");
    if (othercards.length == 0) {
        //alert("heyyy");
        showWinDialog();

    }
}

function showWinDialog() {
    let dialog = document.getElementById('mydialog');
    let starsresult = document.getElementById('end-stars');
    starsresult.innerText = stars;
    let totaltime = document.querySelector('#end-time');
    let taketime = document.querySelector("#timer").textContent.toString();
    totaltime.innerText = taketime;
    dialog.showModal();
    timerOff();
}

function changeMoves() {
    moves += 1;
    //change the stars depands on the moves num
    if (moves < 15) {
        stars = 3;
    } else if (moves < 20) {
        stars = 2;
    } else {
        stars = 1;
    }
    changeresults();
}

function changeresults() {
    //save the span in order to update its values
    const movesspan = document.querySelector(".moves");
    movesspan.innerText = moves;
    //save the star in order to update its values
    const starsul = document.querySelector(".stars");
    starsul.innerHTML = "";
    //loop for changing the stars
    for (let i = 0; i < stars; i++) {
        let temp = "<li><i class='fa fa-star'></i></li>"
        starsul.innerHTML += temp;
    }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//shufflingCards();
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