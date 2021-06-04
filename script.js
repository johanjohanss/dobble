
window.addEventListener("load", function(){


    //order of plane, must be a prime number
    let n = 7    

    //order of plane + 1
    let numOfSymbols = n + 1 

    //the deck of cards
    let cards = [] 

    function createDeck(){
        let i, j, k;

        //the current card we are building
        let card = []; 

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
    }

    createDeck();

    console.log(cards);

    //Building the game

    let allCards = [];

    let activeCards = document.getElementById("activeCards");
    let r1, r2;

    let match1 = false;
    let match2 = false;

    let i1, i2;

    let cardToKeep = null;

    //timer
    let timer;
    let time;

    let allImagesLoaded = false;
    let imagesLoaded = 0;

    //let progressBar = document.getElementById("loading-inner");


    init();


    //Select 2 random cards from allCards
    function getCards(){
        r1 = Math.floor(Math.random() * allCards.length);
        r2 = Math.floor(Math.random() * allCards.length);
    }

    function updateCards(){
        //r2 = cardToKeep;
        r1 = Math.floor(Math.random() * allCards.length);
        console.log("Deck size: " + allCards.length)
    }

    //Append active cards to activeCards
    function appendCards(){
        activeCards.appendChild(allCards[r1]);

        if(cardToKeep != null){
            activeCards.appendChild(cardToKeep);
        }else{
            activeCards.appendChild(allCards[r2]);
        }
        
        
    }

    //Remove active cards from allCards array
    function removeCards(){
        allCards.splice(r1, 1);
        allCards.splice(r2, 1);
    }
    function removeCard(){
        console.log(allCards[r1]);
        cardToKeep = allCards[r1];
        allCards.splice(r1, 1);
    }

    //Clears active card area
    function clearActiveCards(){
        activeCards.innerHTML = "";
    }

    //Initialises html cards
    function init(){
        time = 0;

        timer = setInterval(function(){ 
            time += 1;
        }, 1000);

        cards.forEach(card => {
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("dobble-card");
            
            for(let i = 0 ; i < n+1 ; i++){
                let symbol = document.createElement("img");
                symbol.classList.add("symbol");

                symbol.setAttribute("src", "img/cyber/" + card[i] + ".png");
                symbol.style.width = Math.floor(Math.random() * 14) + 12 + "%";
                
                symbol.onload = function() {
                    //console.log("Image loaded");
                    imagesLoaded += 1;

                    //progressBar.style.width = imagesLoaded / 4 + "%";

                    if(imagesLoaded == cards.length * (n+1) - (n+1)){
                        //console.log("LOADING DONE: " + (cards.length * 8 - 8))
                        activeCards.innerHTML = "";
                        getCards();
                        appendCards();
                    }
                };

                symbol.addEventListener("click", function(){
                    checkSymbols(symbol);
                });
                cardDiv.appendChild(symbol);
            }
            
            allCards.push(cardDiv);
        });
    }

    //Check if symbol exists in both cards
    function checkSymbols(symbolIn){

        match1 = false;
        match2 = false;

        let currentCards = activeCards.querySelectorAll("div");
    
        let card1Symbols = currentCards[0].querySelectorAll("img");
        let card2Symbols = currentCards[1].querySelectorAll("img");

        card1Symbols.forEach((symbol, i) => {
            if(symbol.getAttribute("src") == symbolIn.getAttribute("src")){
                match1 = true;
                i1 = i;
            }
        });
        card2Symbols.forEach((symbol, i) => {
            if(symbol.getAttribute("src") == symbolIn.getAttribute("src")){
                match2 = true;
                i2 = i;
            }
        });

        if(match1 && match2){
            card1Symbols[i1].classList.add("symbol-marked");
            card2Symbols[i2].classList.add("symbol-marked");
            console.log("You clicked on the correct symbol");

            if(allCards.length != 1){
                clearActiveCards();
                removeCard();
                updateCards();
                appendCards();
            }else{
                showGameOverMessage();
                console.log("Game completed!");
            }

        }else{
            console.log("You clicked on the wrong symbol");
        }

    }

    function showGameOverMessage(){

        clearInterval(timer);
        let finalTime = time;

        activeCards.innerHTML = "";

        let div = document.createElement("div");
        div.classList.add("win-message-div");

        let message = document.createElement("h2");
        message.innerText = "You completed the game!";

        let medal = document.createElement("img");
        medal.setAttribute("src", "img/quality.png");
        medal.setAttribute("width", "25%");

        let p = document.createElement("p");
        p.innerText = "It took you " + finalTime +  " seconds. Do you want to try again?"

        let button = document.createElement("button");
        button.innerText = "Play again";
        button.addEventListener("click", restartGame);

        div.appendChild(message);
        div.appendChild(medal);
        div.appendChild(p);
        div.appendChild(button);

        activeCards.appendChild(div);
    }

    function restartGame(){
        //Run restart game code
        activeCards.innerHTML = "";
        allCards = [];
        init();
        getCards();
        appendCards();

        //restart timer
    }

    //Information section
    var infoText = document.querySelector(".infotext");
    infoText.addEventListener("click", toggleInfo);

    let xBtn = document.querySelector(".x-btn");
    xBtn.addEventListener("click", toggleInfo);

    let infoSection = document.getElementById("information")

    function toggleInfo(){
        infoSection.classList.toggle("show-info");
    }

});
