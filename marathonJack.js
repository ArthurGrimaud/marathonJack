

var buttonCard = document.getElementById("buttonCard");
var buttonStay = document.getElementById("buttonStay");

var labelSumDealer = document.getElementById("sumDealerCards");
var labelSumPlayer = document.getElementById("sumPlayerCards");

var buttonBet= document.getElementById("buttonBet");

var buttonContinue = document.getElementById("continue");
var buttonLeave = document.getElementById("leave");

var labelResult = document.getElementById("result");
var labelMoney = document.getElementById("money");

var buttonHelp=document.getElementById("buttonHelp");

var chtCard1 = document.getElementById("cinq");
var chtCard2 = document.getElementById("dix");
var chtCard3 = document.getElementById("huit");
var chtCard4 = document.getElementById("trois");

var playerCardsSumValue = 0;
var dealerCardsSumValue = 0;

var dealerDistracted = true;
var startDistractSecond = 0;

var playerMoney = 1000;
var bet = 0;

var cardList = [...Array(53).keys()];
var pickedCards = [];  //Carte deja tirees
var nbCard = 52

var isHelpHide = true;

/* Tirer un carte et affichage  */

function drawCard(cardList,pickedCards){
  var rand = Math.floor(Math.random() * (nbCard)) + 1;
  while (pickedCards.includes(rand)){ // si la carte a deja ete tiree
    rand = Math.floor(Math.random() * (nbCard)) + 1; //une autre carte est choisie
  }
  pickedCards.push(rand); // on ajoute la carte tiree au carte deja tiree
  return rand;
}

function createImg(path,div) { //crée un objet image de class .card
  var img = document.createElement('img');
  img.setAttribute("class", "cards");
  img.src = path;
  return img;
}

function displayNewCard(cardID,div) { //arg : div : balise "div dans laquelle la carte est crée"
  var path = "img/" + cardID + ".BMP";
  var newImg = createImg(path);
  var divJS = document.getElementById(div);
  divJS.appendChild(newImg);
  return cardID;
}

function getCardValue(cardID,sumScore){ //retourne la valeur du carte en fonction du nom de sont image
  console.log("cardID"+cardID);
  var cardIDbis ;
  cardIDbis = cardID;

  for(var i=1 ; i<10 ; i++ ){
    console.log("cardIDbis"+cardIDbis);
    if (cardIDbis<14){

      if (cardIDbis == 1){
        if(sumScore >29){
          return 1; //si l'as fait deppaser 42
        }else{
          return 11; // si l'as ne fait pas depasser 42
        }
      }
      if (9 < cardIDbis && cardIDbis < 14){
        return 10; // les tetes
      }
      else{
        return cardIDbis; //cartes de 2 a 10
      }
    }
    cardIDbis = cardIDbis - 13;
  }
}
/* Listeners */

function setupListener(){
  buttonCard.addEventListener("click",function(){cardActionManager(cardList,pickedCards)});
  buttonStay.addEventListener("click",function(){dealerActionManager(cardList,pickedCards)});
  buttonContinue.addEventListener("click",function(){resetTurn()});
  buttonHelp.addEventListener("click",function(){openHelp()})
  buttonBet.addEventListener("click",function(){addBet()})
  buttonLeave.addEventListener("click",function(){resetTurn()});
}

/* Initialisation */

function resetTurn(){
  document.getElementById("ddiv").innerHTML = "";
  document.getElementById("ydiv").innerHTML = "";
  playerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  dealerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ddiv"),dealerCardsSumValue);
  labelResult.innerHTML = "Playing...";
  enableButtons();
}

function disableButtons(){
  buttonCard.disabled = true;
  buttonStay.disabled = true;
  buttonBet.disabled =false;
  buttonLeave.disabled = false;
  buttonContinue.disabled = false;

}

function enableButtons(){
  buttonCard.disabled = false;
  buttonStay.disabled = false;
  buttonBet.disabled =true;
  buttonLeave.disabled = true;
  buttonContinue.disabled = true;
}


/* gameManager */

function cardActionManager(cardList,pickedCards){
  var cardScore = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  playerCardsSumValue = playerCardsSumValue + cardScore;
  labelSumPlayer.innerHTML = String(playerCardsSumValue);
  if (playerCardsSumValue > 42){
    console.log("PERDU");
    loose();
  }
  if (playerCardsSumValue == 42){
    console.log("Marathon Jack");
    win();
  }
  isDealerDistracted();
}

function dealerActionManager(cardList,pickedCards){

  while (dealerCardsSumValue<=playerCardsSumValue){
    var cardScore = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ddiv"),playerCardsSumValue);
    dealerCardsSumValue = dealerCardsSumValue + cardScore;
    labelSumDealer.innerHTML = String(dealerCardsSumValue);
  }

  if(dealerCardsSumValue<43){
    loose()
  }
  else{
    win()
  }



  }


/* round end  */

function win(){
  disableButtons();
  labelResult.innerHTML = "You win this turn";
  playerMoney =  playerMoney + (bet*2);
  bet = 0;
  labelMoney.innerHTML = "money: " +String(playerMoney);
}

function loose(){
  disableButtons();
  labelResult.innerHTML = "You loose this turn";
  bet = 0;
  labelMoney.innerHTML = "money: " + String(playerMoney);
}


/* bet   */

function addBet(){
  bet = bet + 10;
  playerMoney = playerMoney - 10;
  labelMoney.innerHTML = "money: " + playerMoney;
}

/*  Help   */

function openHelp() {
  document.getElementById("mySidehelp").style.width = "500px";
}

function closeHelp() {
  document.getElementById("mySidehelp").style.width = "0";
}


/* time */

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

function getSeconds(){
  var dt = new Date();
  var sec = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
  console.log(sec);
  return sec

}

/* progress bar */




/* Cheating */


function isDealerDistracted(){

  var isDisctracted = Math.floor(Math.random() * (3)) + 0;
  if (isDisctracted == 1){
    startDistractSecond = getSeconds() + 1;
    console.log("disrait");
    displayDealerDistracted();
  }
}

function displayDealerDistracted(){

document.getElementById("distracted").style.visibility='visible';
setTimeout(function(){
    document.getElementById("distracted").style.visibility='hidden';
}, 1000);
}

function displayCheatCards(){
  var chtCards = document.getElementById("cheatCards");
  chtCards.style.visibility='visible';

  chtCard1.addEventListener("click",function(){playCheatCard(5)});
  chtCard2.addEventListener("click",function(){playCheatCard(10)});
  chtCard3.addEventListener("click",function(){playCheatCard(8)});
  chtCard4.addEventListener("click",function(){playCheatCard(3)});

}

function playCheatCard(value){

  var cardScore = getCardValue(displayNewCard(value,"ydiv"),playerCardsSumValue);
  playerCardsSumValue = playerCardsSumValue + cardScore;
  labelSumPlayer.innerHTML = String(playerCardsSumValue);
  document.getElementById("cheatCards").style.visibility='hidden';
  if (playerCardsSumValue > 42){
    console.log("PERDU");
    loose();
  }
  if (playerCardsSumValue == 42){
    console.log("Marathon Jack");
    win();
  }
}

document.addEventListener('keydown', function(event){
  if(event.keyCode == 68) {
    if(startDistractSecond > getSeconds()){
      console.log("Cheating succesfully");
      displayCheatCards();
    }
    else{
      console.log("You have been Caught");
    }
  }
} );


/* INITIALISATION */

setupListener();
resetTurn();
document.getElementById("distracted").style.visibility='hidden';
document.getElementById("cheatCards").style.visibility='hidden';
