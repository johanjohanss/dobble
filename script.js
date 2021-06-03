let i, j, k
let n = 7                 //order of plane, must be a prime number
let numOfSymbols = n + 1  //order of plane + 1
let cards = [] //the deck of cards
let card = []; //the current card we are building

//to start, we build the first card
for (i = 1; i<= n+1; i++) {
    card.push(i)
}

cards.push(card)

//then we build the next n number of cards
for (j=1; j<=n; j++) {
    card = []
    card.push(1)
    
    for (k=1; k<=n; k++) {
        card.push(n * j + (k+1))
    }
    cards.push(card)
}

//finally we build the next n² number of cards
for (i= 1; i<=n; i++) {
    for (j=1; j<=n; j++) {
        card = []
        card.push(i+1)
        
        for (k=1; k<= n; k++) {
            card.push(n+2+n*(k-1)+(((i-1)*(k-1)+j-1)%n))
        }
        cards.push(card)
    }
}

console.log(cards);


//Building the game

let allCards = [];

let activeCards = document.getElementById("activeCards");
let r1, r2;

let match1 = false;
let match2 = false;

let i1, i2;

cards.forEach(c => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("dobble-card");
    
    for(let index = 0 ; index < n+1 ; index++){
        let symbol = document.createElement("p");
        symbol.classList.add("symbol")
        symbol.innerText = c[index];
        console.log(c[index])
        symbol.addEventListener("click", function(){
            checkSymbols(symbol);
        });
        cardDiv.appendChild(symbol);
    }
    
    allCards.push(cardDiv);
});

//Select 2 random cards from allCards
insertCards();

function insertCards(){
    r1 = Math.floor(Math.random() * allCards.length);
    r2 = Math.floor(Math.random() * allCards.length);
}

appendCards();


//Append active cards to activeCards
function appendCards(){
    activeCards.appendChild(allCards[r1]);
    activeCards.appendChild(allCards[r2]);
}

removeCards();

//Remove active cards from allCards array
function removeCards(){
    allCards.splice(r1, 1);
    allCards.splice(r2, 1);
}

function clearActiveCards(){
    activeCards.innerHTML = "";
}

//Let user click symbol and check if symbol exists in both cards
function checkSymbols(symbolIn){

    match1 = false;
    match2 = false;

    let currentCards = activeCards.querySelectorAll("div");
   
    let card1Symbols = currentCards[0].querySelectorAll("p");
    let card2Symbols = currentCards[1].querySelectorAll("p");

    card1Symbols.forEach((symbol, index) => {
        if(symbol.innerText == symbolIn.innerText){
            match1 = true;
            i1 = index;
        }
    });
    card2Symbols.forEach((symbol, index) => {
        if(symbol.innerText == symbolIn.innerText){
            match2 = true;
            i2 = index;
        }
    });

    if(match1 && match2){
        card1Symbols[i1].classList.add("symbol-marked");
        card2Symbols[i2].classList.add("symbol-marked");
        console.log("You clicked on the correct symbol");
    }else{
        console.log("You clicked on the wrong symbol");
    }

}