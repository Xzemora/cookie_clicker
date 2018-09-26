//Gestion du temps de fonctionnement.
var d = new Date();

function runningTime() {
    var current = new Date();
    var time = current.getTime() - d.getTime();
    time = new Date(time);
    var writtenTime = time.getUTCHours() + " hours, " + time.getMinutes() + " minutes, " + time.getSeconds() + " seconds.";
    return writtenTime;
}




//Gestion des consommables.
function Item(id, name, price, cps) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.cps = cps;    
    this.nb = 0;
}

var cursor = new Item("cursors", "Cursor", 10, 0.1 );
var grandMa = new Item("grandMa", "GrandMa", 50, 1 );

var itemTable = [cursor, grandMa];

//Gestion des boots.
function Boost(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.boostEffect= 1;
    this.effect = function () { };
}

var cursorBoost = new Boost("cursor-boost", "Cursor Boost", 10);
cursorBoost.effect = function () {
    this.boostEffect *= 3;
}

var grandMaBoost = new Boost("grandMa-boost", "GrandMa Boost", 50);
grandMaBoost.effect = function () {
    this.boostEffect *= 2 ;
}

var clickBoost = new Boost("click-boost", "Click Boost", 5);
clickBoost.effect = function () {
    this.boostEffect += 1;
}

var boostTable = [cursorBoost, grandMaBoost, clickBoost];

var countItem = 0;
var totalSpent = 0;
var cookie_per_sec = 0;


function generateListener(item) {
    return function () {
        var itemId = item.id;
        var domItem = document.getElementById(itemId);
        item.nb++;
        var nbDom = domItem.querySelector(".nb");
        nbDom.innerHTML = item.nb;        
        countItem++;
        var buildingsOwned = document.getElementById("buildings");
        buildingsOwned.innerText = countItem;
        totalSpent +=  item.price;
        cpsEngine();                
    }
}

function generateBoost(boost) {
    return function () {
        var boostId = boost.id;
        var $domBoost = $('#' + boostId);
        totalSpent += boost.price;
        boost.effect();
        cpsEngine();
        $domBoost.remove();

    }
}

function cpsEngine() {
    cookie_per_sec = 0;
    for (let i = 0; i < itemTable.length; i++) {
        let item = itemTable[i];
        let boost = boostTable[i];
        cookie_per_sec += item.cps * item.nb * boost.boostEffect;
    }
    var cookiePerSec = document.getElementById("cookie-per-sec");
    cookiePerSec.innerText = cookie_per_sec;
}


$(function () {
    //Gestion d'achat des consomables.

    for (var i = 0; i < itemTable.length; i++) {
        var item = itemTable[i];
        var itemId = item.id;
        var domItem = document.getElementById(itemId);

        domItem.addEventListener("click", generateListener(item));
        
    };

    //Génération des boutons des boost.
    for (let i = 0; i < boostTable.length; i++) {
        var boost = boostTable[i];
        $(".flex-container").append('<button id=' + boost.id + ' type="button" class="btn btn-default ">' + boost.name + '<br /><span class="price">'+boost.price+'</span><br /><span class="effect"></span></button>');
    }
    //Gestion d'achat des boost.
    for (let i = 0; i < boostTable.length; i++) {
        var boost = boostTable[i];
        var boostId = boost.id;
        var domBoost = document.getElementById(boostId);

        domBoost.addEventListener("click", generateBoost(boost))
    }
   
    //Enregistrement des clicks sur le cookie.
    var cookieClicks = 0;


    document.getElementById("clickCookie").addEventListener("click", function () {
        cookieClicks += 1 * clickBoost.boostEffect;
        var cookie = document.getElementById('cookie-clicks');
        cookie.innerHTML = cookieClicks;
    });

    setInterval(function () {
        document.getElementById('run-time').innerHTML = runningTime();
    }, 5000);

    //Insertion et mise à jour des cookies en bank et all time.

    var cookieBank = document.getElementById("cookie-bank");
    var cookieBaked = document.getElementById("cookie-baked");
    var cookieBakedAsc = document.getElementById("cookie-baked-asc");
    var cookieProduced = 0;
    var cookieInTheBank = 0;
    setInterval(function () {
        cookieProduced += cookie_per_sec;
    }, 1000);
    setInterval(function () {
        cookieInTheBank = cookieClicks - totalSpent + cookieProduced;
        cookieBank.innerText = cookieInTheBank;
        for (let i = 0; i < itemTable.length; i++) {
            var item = itemTable[i];
            var itemP = item.price;
            if (itemP <= cookieInTheBank) {
                $("#" + item.id).prop("disabled", false);
                continue;
            } else {
                $("#" + item.id).prop("disabled", true);
            }
        };
        for (let i = 0; i < boostTable.length; i++) {
            var boost = boostTable[i];
            var boostP = boost.price;
            if (boostP <= cookieInTheBank) {
                $("#" + boost.id).prop("disabled", false);
                continue;
            } else {
                $("#" + boost.id).prop("disabled", true);
            };
            
        }
    }, 1000);
    setInterval(function () {
        cookieBaked.innerText = cookieClicks + cookieProduced;
    }, 1000);
    setInterval(function () {
        cookieBakedAsc.innerText = cookieClicks + cookieProduced;
    }, 1000);
    

    





})