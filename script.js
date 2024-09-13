function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }


var timer = document.querySelector('h3');
var timerInterval;
var enableLose = document.querySelector('.loosing');


const easyImages = [
        'img/1.jpg', 'img/1.jpg',
        'img/2.jpg', 'img/2.jpg',
        'img/3.jpg', 'img/3.jpg',
        'img/4.jpg', 'img/4.jpg',
        'img/5.jpg', 'img/5.jpg',
        'img/6.jpg', 'img/6.jpg',
]

const hardImages = [
        'img/1.jpg', 'img/1.jpg',
        'img/2.jpg', 'img/2.jpg',
        'img/3.jpg', 'img/3.jpg',
        'img/4.jpg', 'img/4.jpg',
        'img/5.jpg', 'img/5.jpg',
        'img/6.jpg', 'img/6.jpg',
        'img/7.jpg', 'img/7.jpg',
        'img/8.jpg', 'img/8.jpg',
        'img/9.jpg', 'img/9.jpg',
        'img/10.jpg', 'img/10.jpg',
        'img/11.jpg', 'img/11.jpg',
        'img/12.jpg', 'img/12.jpg'
]

function randomizeCards(images) {
    shuffle(images);
    let fullcard = document.querySelectorAll('.card');
    fullcard.forEach((card, index) => {
        card.querySelector('.back').style.backgroundImage = `url(${images[index]})`;
        card.dataset.image = images[index];
    });
}

function randomizeHard() {
    randomizeCards(hardImages);
}

function randomizePictures() {
    randomizeCards(easyImages);
}

function showAllCards()
{
    document.querySelectorAll('.frontpage').forEach(frontcard =>
        {
            frontcard.classList.add('animate')
        })   
        
        document.querySelectorAll('.back').forEach(backcard =>{
            backcard.classList.add('ranimate')
        })
    
}

function hideAllCards()
{
    document.querySelectorAll('.back').forEach(backcard => {
        backcard.classList.remove('ranimate');
        backcard.classList.add('animate');
    });

    document.querySelectorAll('.frontpage').forEach(frontcard => {
        frontcard.classList.remove('animate');
        frontcard.classList.add('ranimate');
    });
}

function showCards ()
{
   showAllCards();
   setTimeout(() => hideAllCards(), 3000);
}

function easyShowCards()
{
    showAllCards()
    setTimeout(() => hideAllCards(), 3000);
}

function addCardsForHardMode() {

    const cardsContainer = document.getElementById('cards');

    if (cardsContainer.childElementCount < 13){
        const additionalCardsCount = 12;

        for (let i = 0; i < additionalCardsCount; i++) {
            const card = document.createElement('li');
            card.classList.add('card');
    
            const front = document.createElement('div');
            front.classList.add('frontpage');
    
            const back = document.createElement('div');
            back.classList.add('back');
    
            card.appendChild(front);
            card.appendChild(back);
    
            cardsContainer.appendChild(card);
        }   
    } else return;
    
}

function removeCards() {
    let cards = document.querySelectorAll('.card');

    for (let i = 0; i < 12; i++) {
        if (cards[i]) {
            cards[i].remove();
        }
    }
}

function fTimer(timel)
{
    timer.style.display = "block";
    timeLeft = timel;
    timer.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            enableLose.style.display="block";
        }

    }, 1000);
}

function startEasyGame(){

    randomizePictures();
    easyShowCards();

    timer.style.display = "none";
    totalPairs=6;
    const allCards = document.querySelectorAll('.card');

    setTimeout(() => {
        allCards.forEach(card => card.addEventListener('click', flipCard));
    }, 3000);
        
}

function startMediumGame(){
    randomizePictures();
    showCards();
    setTimeout(() => {
        fTimer(40)    
    }, 3000);;
    totalPairs=6;
    const allCards = document.querySelectorAll('.card');

    setTimeout(() => {
        allCards.forEach(card => card.addEventListener('click', flipCard));
    }, 3000);
}

function startHardGame(){
    addCardsForHardMode();
    mutateCards();
    randomizeHard();
    showCards();

    setTimeout(() => {
        fTimer(120);    
    }, 3000);

    totalPairs=12;
    const allCards = document.querySelectorAll('.card');
    setTimeout(() => {
        allCards.forEach(card => card.addEventListener('click', flipCard));
    }, 3000);
}

function mutateCards()
{
    var a = document.querySelectorAll('.cards li');
    a.forEach(card => card.setAttribute("style", "left:3%;"))

    var b = document.querySelectorAll('.cards li div');
        b.forEach(card => {
        card.style.width = '127px';
        card.style.height = '187px';
        card.style.marginBottom = '10px';
        card.style.boxSizing = 'border-box';
        });

    var c= document.querySelectorAll('.cards div.frontpage');
    c.forEach(card =>{
        card.style.width = '127px';
        card.style.height = '187px';
        card.style.backgroundSize = "100% 100%";

    });

    var d = document.querySelectorAll('.cards div.back');
    d.forEach(card =>{
        card.style.width = '127px';
        card.style.height = '187px';
        card.style.backgroundSize = '127px 187px';
    });

}

function unmutateCards()
{
    var a = document.querySelectorAll('.cards li');
    a.forEach(card => card.setAttribute("style", "left:0;"))

    var b = document.querySelectorAll('.cards li div');
        b.forEach(card => {
        card.style.width = '190px';
        card.style.height = '280px';
        card.style.marginBottom = '20px';
        card.style.boxSizing = "none";
        });

    var c= document.querySelectorAll('.cards div.frontpage');
    c.forEach(card =>{
        card.style.width = '190px';
        card.style.height = '280px';
        card.style.backgroundSize = "190px 280px";

    });

    var d = document.querySelectorAll('.cards div.back');
    d.forEach(card =>{
        card.style.width = '190px';
        card.style.height = '280px';
        card.style.backgroundSize = '190px 280px';
    });
}

var selectedOption = null;
var firstCard = null;
var firstCardOwner = null;
var totalOnBoard = 0;
var matchedPairs = 0;
var victory = false;
var totalPairs = 0;

function startButton(){

    document.body.style.cursor = "wait";

    setTimeout(() => {
        selectedOption = document.querySelector('input[name="difficulty"]:checked').value;

        var header = document.querySelector('h1');
        header.style.display = "none";

        var header = document.querySelector('h2');
        header.style.display = "none";

        var difficulty = document.querySelector('.selectdif');
        difficulty.style.display = "none";

        var startButton = document.getElementById("startbutt");
        startButton.style.display = "none";
        
        var returnButton = document.querySelector('.return');
        returnButton.style.display = "block"

        var allcards = document.getElementById("cards");
        allcards.setAttribute("style", "display: block;");

        enableLose.style.display="none";

        if (selectedOption=='Easy')
        {
            startEasyGame();
        }

        else if (selectedOption=='Medium')
        {
            startMediumGame();
        }

        else if (selectedOption=='Hard')
        {
            startHardGame();
        }

        document.body.style.cursor='default';
        
    }, 1000);    

}

function turnOn(element)
{

    const frontcard = element.querySelector('.frontpage');
    const backcard = element.querySelector('.back');

    frontcard.classList.remove('ranimate');
    backcard.classList.remove('animate');

    frontcard.classList.add('animate');
    backcard.classList.add('ranimate');
    element.classList.add('flipped');
    
}

function returnBack(element){

    const frontcard = element.querySelector('.frontpage');
    const backcard = element.querySelector('.back');
    
    backcard.classList.remove('ranimate');
    frontcard.classList.remove('animate');
    element.classList.remove('flipped');

    backcard.classList.add('animate');
    frontcard.classList.add('ranimate');
}


function resetCards(){
    firstCard=null;
    firstCardOwner=null;
    totalOnBoard=0;
}

const winningLabel = document.querySelector('.winning');
const retryLabel = document.querySelector('.winning-label');

function checkVictory(){
    if (matchedPairs === totalPairs) {
        victory=true;
        winningLabel.style.display = "block";
        winningLabel.classList.add('showback');
        retryLabel.classList.add('winan');
        clearInterval(timerInterval);
    }

}


function flipCard(){

    if (this.classList.contains('flipped') || this.classList.contains('matched')||totalOnBoard>=2||victory) {
        return; 
    }

    const card = this.dataset.image;
    this.classList.add('flipped');
    turnOn(this);
    totalOnBoard++;

    if (firstCard===null){
        firstCard=card;
        firstCardOwner=this;

    } 
        else if  (firstCard===card){
            matchedPairs+=1;
            this.classList.add('matched');
            firstCardOwner.classList.add('matched'); 
            resetCards();
            checkVictory();
        }
            else{
                timeoutthird=setTimeout(() => {
                    returnBack(firstCardOwner);
                    returnBack(this);
                    firstCardOwner.classList.remove('flipped');
                    this.classList.remove('flipped');
                    resetCards();
                }, 1000);
                
            }

}

function restartParams(){

    firstCard = null;
    firstCardOwner = null;
    totalOnBoard = 0;
    matchedPairs = 0;
    victory = false;
    totalPairs=0;
    timer.style.display = "none";
    winningLabel.style.display = "none";
    winningLabel.classList.remove('showback');
    retryLabel.classList.remove('winan');
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {card.classList.remove('flipped'); card.classList.remove('matched');})
    document.querySelectorAll('.frontpage').forEach(frontcard =>
    {
        frontcard.classList.remove('animate')
        frontcard.classList.remove('ranimate')
    })   

    document.querySelectorAll('.back').forEach(backcard =>{
        backcard.classList.remove('ranimate')
        backcard.classList.remove('animate')
    })

    clearInterval(timerInterval);

}

function returnButton(){

    document.body.style.cursor = "wait";
    setTimeout(() =>{

        if(selectedOption==="Hard"){
            removeCards();
        }
    
        unmutateCards();
        restartParams();
        
        selectedOption = null;
        var header = document.querySelector('h1');
        header.style.display = "block";
    
        var header = document.querySelector('h2');
        header.style.display = "block";
    
        var difficulty = document.querySelector('.selectdif');
        difficulty.style.display = "block";
    
        var startButton = document.getElementById("startbutt");
        startButton.style.display = "inline-block";
    
        
        var returnButton = document.querySelector('.return');
        returnButton.style.display = "none"
    
        var allcards = document.getElementById("cards");
        allcards.setAttribute("style", "display: none;");
    
        timer.style.display="none";
        
        document.body.style.cursor='default';
    }, 1000)
}

function restartGame(){

    restartParams();
    startButton();
}