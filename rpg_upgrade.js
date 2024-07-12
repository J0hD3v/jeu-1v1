// #region Variables utilitaires

// Infos partagées
const characterPlayer1 = document.getElementById("characterPlayer1");
const recap = document.getElementsByClassName("recap")[0];
const btnAttack = document.getElementsByClassName("control")[0];
const btnSpell1 = document.getElementsByClassName("control")[1];
const btnSpell2 = document.getElementsByClassName("control")[2];
const btnPotion = document.getElementsByClassName("control")[3];

// Player 1
const name_player1 = document.getElementsByClassName("name")[0];
const health_player1 = document.getElementsByClassName("health")[0];
const mana_player1 = document.getElementsByClassName("mana")[0];
const strength_player1 = document.getElementsByClassName("strength")[0];
const spell1_player1 = document.getElementsByClassName("spell1")[0];
const spell2_player1 = document.getElementsByClassName("spell2")[0];

// Player 2
const characterPlayer2 = document.getElementById("characterPlayer2");
const name_player2 = document.getElementsByClassName("name")[1];
const health_player2 = document.getElementsByClassName("health")[1];
const mana_player2 = document.getElementsByClassName("mana")[1];
const strength_player2 = document.getElementsByClassName("strength")[1];
const spell1_player2 = document.getElementsByClassName("spell1")[1];
const spell2_player2 = document.getElementsByClassName("spell2")[1];


// #region Personnages

let character1 = {
    name : "Naruto",
    image: "./images/naruto.gif",
    health : 50,
    mana : 100,
    strength : 10,
    spells : [
        {
            name : "Lancer de shuriken",
            damages : 25,
            cost : 10
        },
        {
            name : "Rasengan",
            damages : 40,
            cost : 20
        }
    ]
}
let character2 = {
    name : "Spiderman",
    image: "./images/spiderman.gif",
    health : 120,
    mana : 20,
    strength : 50,
    spells : [
        {
            name : "Toile collante",
            damages : 10,
            cost : 5
        },
        {
            name : "Spider-PUNCH",
            damages : 30,
            cost : 10
        }
    ]
}
let character3 = {
    name : "Goku",
    image: "./images/goku.gif",
    health : 120,
    mana : 20,
    strength : 50,
    spells : [
        {
            name : "Toile collante",
            damages : 10,
            cost : 5
        },
        {
            name : "Spider-PUNCH",
            damages : 30,
            cost : 10
        }
    ]
}
let character4 = {
    name : "DRStrange",
    image: "./images/drstrange.gif",
    health : 120,
    mana : 20,
    strength : 50,
    spells : [
        {
            name : "Toile collante",
            damages : 10,
            cost : 5
        },
        {
            name : "Spider-PUNCH",
            damages : 30,
            cost : 10
        }
    ]
}


let player1;
let player2;

let activePlayer = player1;
let inactivePlayer = player2;

// #region Fonctions

function getInfo(nbrPlayer) {
    let message = `Choix du joueur ${nbrPlayer}
    Spiderman - Naruto - Goku - DR Strange`;
    let playerName = prompt(message);
    if(playerName == "naruto" || playerName == "Naruto") {
        if(nbrPlayer == 1) {
            player1 = character1;
        }
        else if(nbrPlayer == 2) {
            player2 = character1;
            player2.image = "./images/naruto-reverse.gif";
        }
    }
    else if(playerName == "spiderman" || playerName == "Spiderman") {
        if(nbrPlayer == 1) {
            player1 = character2;
        }
        else if(nbrPlayer == 2) {
            player2 = character2;
            player2.image = "./images/spiderman-reverse.gif";
        }
    }
    else if(playerName == "goku" || playerName == "Goku") {
        if(nbrPlayer == 1) {
            player1 = character3;
        }
        else if(nbrPlayer == 2) {
            player2 = character3;
            player2.image = "./images/goku-reverse.gif"
        }
    }
    else if(playerName == "dr strange" || playerName == "DR Strange") {
        if(nbrPlayer == 1) {
            player1 = character4;
        }
        else if(nbrPlayer == 2) {
            player2 = character4;
            player2.image = "./images/drstrange-reverse.gif"
        }
    }
    activePlayer = player1;
    inactivePlayer = player2;
}

function actualiseInfo() {
    // noms
    name_player1.innerText = player1.name;
    name_player2.innerText = player2.name;
    // images
    characterPlayer1.src = player1.image;
    characterPlayer2.src = player2.image;
    // stats
    health_player1.innerText = `Santé : ${player1.health}`;
    health_player2.innerText = `Santé : ${player2.health}`;
    mana_player1.innerText = `Mana : ${player1.mana}`;
    mana_player2.innerText = `Mana : ${player2.mana}`;
    strength_player1.innerText = `Force : ${player1.strength}`;
    strength_player2.innerText = `Force : ${player2.strength}`;
    // spells
    spell1_player1.innerText = `Sort 1 : ${player1.spells[0].name}`;
    spell2_player1.innerText = `Sort 2 : ${player1.spells[1].name}`;
    spell1_player2.innerText = `Sort 1 : ${player2.spells[0].name}`;
    spell2_player2.innerText = `Sort 2 : ${player2.spells[1].name}`;
}

function switchActivePlayer() {
    if(activePlayer == player1) {
        activePlayer = player2;
        inactivePlayer = player1;
    }
    else {
        activePlayer = player1;
        inactivePlayer = player2;
    }
}

function animationAttack(character) {
    if(character == player1) {
        characterPlayer1.classList.add("attackMoveFromLeft");
        setTimeout(()=>{characterPlayer1.classList.remove("attackMoveFromLeft")},1000)
    }
    else if(character == player2) {
        characterPlayer2.classList.add("attackMoveFromRight");
        setTimeout(()=>{characterPlayer2.classList.remove("attackMoveFromRight")},1000)
    }
}

function animationDeath(character) {
    if(character == player1) {
        characterPlayer1.classList.add("death");
        //setTimeout(()=>{characterPlayer1.classList.remove("death")},1000)
        setTimeout(()=>{characterPlayer1.style.display = "none"},700);
    }
    else if(character == player2) {
        characterPlayer2.classList.add("death");
        //setTimeout(()=>{characterPlayer2.classList.remove("death")},1000)
        setTimeout(()=>{characterPlayer2.style.display = "none"},500);
    }
    setTimeout(()=>{popupDeath();},800);
}

function checkDeath() {
    if(player1.health <= 0) {
        animationDeath(player1);
        return true;
    }
    else if(player2.health <= 0) {
        animationDeath(player2);
        return true;
    }
    else {
        return false;
    }
}

function popupDeath() {
    let message = `${inactivePlayer.name} a gagné !`;
    alert(message);
}

// actions (+ console.log)


function displayInfo(player) {
    // gestion orthographe "point(s)"
    let hp = "point";
    if(player.health>1) {
        hp = "points";
    }
    let mp = "point";
    if(player.mana>1) {
        mp = "points";
    }
    let sp = "point";
    if(player.strength>1) {
        sp = "points";
    }

	console.log(player.name,"a :\n--------\n",player.health,hp,"de vie\n",player.mana,mp,"de mana\n",player.strength,sp,"de force");
}

function directHit(player1, player2) {
	player2.health -= player1.strength;
    console.log(player1.name,"frappe",player2.name,"et lui inflige",player1.strength,"points de dégâts !\n",player2.name,"a",player2.health,"points de vie");
    recap.innerText += `${player1.name} frappe ${player2.name} et lui inflige ${player1.strength} points de dégâts !
    ${player2.name} a ${player2.health} points de vie
    `;
}

function takePotions(player, number) {
    let potion = "potion";
    if(number>1) {
        potion = "potions";
    }
    player.health += 3*number;
    console.log(player.name,"s'apprête à boire",number,potion,"de vie...\n",player.name,"a récupéré",3*number,"points de vie !");
    console.log(player.name,"a",player.health,"points de vie");
    recap.innerText += `${player.name} s'apprête à boire ${number} ${potion} de vie...
    ${player.name} a récupéré ${3*number} points de vie !
    `;
}

function spell(player1, player2,spell) {
    if(player1.mana>player1.spells[spell-1].cost) {
        player1.mana -= player1.spells[spell-1].cost;
        player2.health -= player1.spells[spell-1].damages;
        console.log(player1.name,"lance",player1.spells[spell-1].name,"sur",player2.name,"...\n",player2.name,"perd",player1.spells[spell-1].damages,"points de vie !\n",player2.name,"a",player2.health,"points de vie");
        recap.innerText += `${player1.name} lance ${player1.spells[spell-1].name} sur ${player2.name}...
        ${player2.name} perd ${player1.spells[spell-1].damages} points de vie !
        ${player2.name} a ${player2.health} points de vie
        `;
    }
    else {
        console.log(player1.name,"n'a pas assez de mana");
        recap.innerText += `${player1.name} n'a pas assez de mana
        `;
    }
}

function displayActivePlayer() {
    recap.innerText += `Au tour de ${activePlayer.name} !
    `;
}



// #region Controls

btnAttack.addEventListener("click",() => {
    directHit(activePlayer,inactivePlayer);
    actualiseInfo();
    displayActivePlayer();
    animationAttack(activePlayer);
    checkDeath();
    switchActivePlayer();
})

btnSpell1.addEventListener("click",() => {
    spell(activePlayer,inactivePlayer,1);
    actualiseInfo();
    displayActivePlayer();
    animationAttack(activePlayer);
    checkDeath();
    switchActivePlayer();
})

btnSpell2.addEventListener("click",() => {
    spell(activePlayer,inactivePlayer,2);
    actualiseInfo();
    displayActivePlayer();
    animationAttack(activePlayer);
    checkDeath();
    switchActivePlayer();
})

btnPotion.addEventListener("click",() => {
    takePotions(activePlayer,1);
    switchActivePlayer();
    actualiseInfo();
    displayActivePlayer();
})





// #region Displays

// affichage Infos

getInfo(1);
getInfo(2);
displayInfo(player1);
displayInfo(player2);

actualiseInfo();
displayActivePlayer();