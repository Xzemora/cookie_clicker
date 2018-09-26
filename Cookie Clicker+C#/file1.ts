var app = angular.module('UpdateCookie', []);

app.controller('clickNbank', function ($scope) {
//Running time
function runningTime(start: Date) {
    let current = new Date();
    let time = current.getTime() - start.getTime();
    let dateTime = new Date(time);
    let writtenTime = dateTime.getUTCHours() + " hours, " + dateTime.getMinutes() + " minutes, " + dateTime.getSeconds() + " seconds.";
    return writtenTime;
}

$(document).ready(function () {
    let d = new Date();
    setInterval(function () {
        $('#run-time').text(runningTime(d));
    }, 5000);   

})

//Click cookie event.
    let superCookie = {
        cookieClick:  0,
        cookiePerClick: 1,
        cookieBank:  0,
        cookieAllTime:  0,
        cookieHandMade:  0,
        cookiePerSec:  0,
        buildingsOwn:  0
    }

    $scope.SuperCookie = superCookie;



$(function () {    

    $('#bigCookie').on('click', () => {
        let newCookie = 1 * superCookie.cookiePerClick;
        superCookie.cookieClick += newCookie;
        superCookie.cookieBank += newCookie;
        superCookie.cookieAllTime += newCookie;
        superCookie.cookieHandMade += newCookie;
        $scope.$digest();
    });

})

//Gestion des producteurs.
let productorTable: Productor[] = [];

class Productor {

    name: string;
    id: string;      
    cps: number;
    nb: number = 0;
    price: number;

    constructor(theName: string, theBasePrice: number, theCps: number, theId : string) {
        this.name = theName;
        
        this.cps = theCps;
        this.id = theId;
        this.price = theBasePrice;

        $('#productors').append(`<button id="${this.id}" type="button" class="btn btn-default btn-block" data-toggle="tooltip" data-placement="left" title="${this.cps} cookie par seconds"><p><span class="name">${this.name}</span><br/><span class="price" >${this.price}</span><br/><span class="nb" >${this.nb}</span></p></button >`);

        productorTable.push(this);
    }
}

$(function () {
    let cursor = new Productor("Cursor", 10, 0.25, 'cursor-id');
    let grandMa = new Productor("GrandMa", 20, 1, 'grandma-id');

    for (let i = 0; i < productorTable.length; i++) {
        let item = productorTable[i];
        let itemId = item.id;

        $("#" + itemId).click(function () {
            if (superCookie.cookieBank >= item.price) {
                superCookie.cookieBank -= item.price;
                item.nb++;
                superCookie.buildingsOwn++;
                $("#" + itemId + " p span.nb").text(item.nb);
                item.price += item.price * 0.1 * item.nb;
                $("#" + itemId + " p span.price").text(item.price);

                superCookie.cookiePerSec += item.cps;
                $scope.$digest();
            } else if (superCookie.cookieBank < item.price) {
                $("#" + itemId).prop('disabled', true);
            };
            

        });
    }
});

//Update superCookie.cookieBank.
$(function () {
    setInterval(function () {
        superCookie.cookieBank += superCookie.cookiePerSec;
        for (let i = 0; i < productorTable.length; i++) {
            let item = productorTable[i];
            let itemId = item.id;
            if (superCookie.cookieBank >= item.price) {
                $("#" + itemId).prop('disabled', false);
            } else {
                $("#" + itemId).prop('disabled', true);
            }
        };
        for (let i = 0; i < boostTable.length; i++) {
            let boost = boostTable[i];
            let boostId = boost.id;
            if (superCookie.cookieBank >= boost.price) {
                $("#" + boostId).prop('disabled', false);
            } else {
                $("#" + boostId).prop('disabled', true);
            }
        };
        
        superCookie.cookieAllTime += superCookie.cookiePerSec;
        
        $scope.$digest();
    }, 1000);

});

//Class Boosts.
    let boostTable: Boost[] = [];
    $scope.boostTable = boostTable;
type boostType = "cookie" | "click" | "prod";
class Boost {
    name: string;
    id: string;
    price: number;
    multiplier: number;
    index: number;
    citation: string;
    type: boostType;
    constructor(theName: string, theId: string, thePrice: number, theMultiplier: number, theIndex: number, shakespeare: string, theType: boostType) {

        this.name = theName;
        this.id = theId;
        this.price = thePrice;
        this.multiplier = theMultiplier;   
        this.index = theIndex;
        this.citation = shakespeare;
        this.type = theType;
        boostTable.push(this);
        //$(".flex-container").append(`<button id='${this.id}' type="button" class="btn btn-default boost"></button>`);
        $("#" + this.id).prop('disabled', true);
    }
    effect(): void { };
}

class cookieClickBoost extends Boost  {
    constructor(name:string, id:string, price:number, multiplier:number, index:number, citation:string) {
        super(name, id, price, multiplier, index, citation, "click");
        
        //$("#" + this.id).append(`<img src="Materials/glowing_cursor.png" width="50px"/><div class="tooltip"><h4><img src="Materials/glowing_cursor.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>Clicking gains +${this.multiplier * 100}%</span><br/><span class="price">Price:${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
    }

    effect() {
        superCookie.cookiePerClick += this.multiplier * superCookie.cookiePerSec;
        $scope.$disgest();
    }
}

    class cookieProdBoost extends Boost  {
        constructor(name: string, id: string, price: number, multiplier: number, index: number, citation: string) {
            super(name, id, price, multiplier, index, citation, "cookie");
        
        //$("#" + this.id).append(`<img src="Materials/cookies-icon.png" width="50px"/><div class='tooltip'><h4><img src="Materials/cookies-icon.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>Cookie production multiplier +${this.multiplier * 100}% of your Cps.</span><br/><span class="price">Price:${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
                
    }
    effect() {
        superCookie.cookiePerSec *= 1 + this.multiplier;
        $scope.$digest();
    }
}

    class prodMultiplierBoost extends Boost {
        constructor(name: string, id: string, price: number, multiplier: number, index: number, citation: string) {
            super(name, id, price, multiplier, index, citation, "prod");
            
        //$("#" + this.id).append(`<img src="Materials/${this.name}.png" width="50px"/><div class='tooltip'><h4><img src="Materials/${this.name}.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>${this.name} are twice as efficient.</span><br/><span class="price">Price: ${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
        
    }
    effect() {
        for (let i = 0; i < productorTable.length; i++) {
            let item = productorTable[i];
            if (item.name === this.name) {
                superCookie.cookiePerSec -= item.cps * item.nb;
                item.cps *= this.multiplier;
                superCookie.cookiePerSec += item.cps * item.nb;
                
                $scope.$digest();
            }
        }
    }
}

$(function () {
    let clickBoost1 = new cookieClickBoost("Mouse Boost", "cb1", 10, 0.25, 1, "It is not in the stars to hold our destiny but in ourselves.");
    let clickBoost2 = new cookieClickBoost("Mouse Boost", "cb2", 20, 0.25, 2, "Love all, trust a few, do wrong to none.");
    let clickBoost3 = new cookieClickBoost("Mouse Boost", "cb3", 30, 0.25, 3, "A fool thinks himself to be wise, but a wise man knows himself to be a fool.");

    let cookieBoost1 = new cookieProdBoost("Cookie Boost", "c1", 20, 0.5, 1, "No legacy is so rich as honesty.");
    let cookieBoost2 = new cookieProdBoost("Cookie Boost", "c2", 40, 0.5, 2, "There is nothing either good or bad but thinking makes it so.");
    let cookieBoost3 = new cookieProdBoost("Cookie Boost", "c3", 80, 0.5, 3, "Some are born great, some achieve greatness, and some have greatness thrust upon them.");

    let cursorBoost1 = new prodMultiplierBoost("Cursor", "cursor1", 20, 2, 1, "If music be the food of love, play on.");
    let cursorBoost2 = new prodMultiplierBoost("Cursor", "cursor2", 40, 2, 2, "We know what we are, but know not what we may be.");
    let cursorBoost3 = new prodMultiplierBoost("Cursor", "cursor3", 60, 2, 3, "Hell is empty and all the devils are here.");

    let grandMaBoost1 = new prodMultiplierBoost("GrandMa", "gm1", 50, 2, 1, "One touch of nature makes the whole world kin.");
    let grandMaBoost2 = new prodMultiplierBoost("GrandMa", "gm2", 75, 2, 2, "The course of true love never did run smooth.");
    let grandMaBoost3 = new prodMultiplierBoost("GrandMa", "gm3", 100, 2, 3, "Cowards die many times before their deaths; the valiant never taste of death but once.");

    

    for (let i = 0; i < boostTable.length; i++) {
        let boost = boostTable[i];
        let boostId = boost.id;
        $("#" + boostId).click(function () {
            if (superCookie.cookieBank >= boost.price) {
                superCookie.cookieBank -= boost.price;
                
                boost.effect();
                $("#" + boostId).remove();
                $scope.$digest();
            }
        });
    }
})

//Gestion positionnement tooltip par rapport à la souris.
$(function () {
    let objRectFlex = document.querySelector(".flex-container").getBoundingClientRect();
    $(".flex-container").hover(function () { }).mousemove(function (e) {        
        let mousey = e.clientY - objRectFlex.top;
        $('.tooltip').css("top", mousey);        
    })
})
    

});

app.directive('clickBoost', function () {
    return {
        scope: {cb:'='},
        templateUrl: 'clickBoost.html'
    }
})
app.directive('cookieProdBoost', function () {
    return {
        scope: {cpb:'='},
        templateUrl: 'cookieProdBoost.html'
    }
})
app.directive('prodBoost', function () {
    return {
        scope: {pb:'='},
        templateUrl: 'prodBoost.html'
    }
})



    
       
    
