var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app = angular.module('UpdateCookie', []);
app.controller('clickNbank', function ($scope) {
    //Running time
    function runningTime(start) {
        var current = new Date();
        var time = current.getTime() - start.getTime();
        var dateTime = new Date(time);
        var writtenTime = dateTime.getUTCHours() + " hours, " + dateTime.getMinutes() + " minutes, " + dateTime.getSeconds() + " seconds.";
        return writtenTime;
    }
    $(document).ready(function () {
        var d = new Date();
        setInterval(function () {
            $('#run-time').text(runningTime(d));
        }, 5000);
    });
    //Click cookie event.
    var superCookie = {
        cookieClick: 0,
        cookiePerClick: 1,
        cookieBank: 0,
        cookieAllTime: 0,
        cookieHandMade: 0,
        cookiePerSec: 0,
        buildingsOwn: 0
    };
    $scope.SuperCookie = superCookie;
    $(function () {
        $('#bigCookie').on('click', function () {
            var newCookie = 1 * superCookie.cookiePerClick;
            superCookie.cookieClick += newCookie;
            superCookie.cookieBank += newCookie;
            superCookie.cookieAllTime += newCookie;
            superCookie.cookieHandMade += newCookie;
            $scope.$digest();
        });
    });
    //Gestion des producteurs.
    var productorTable = [];
    var Productor = /** @class */ (function () {
        function Productor(theName, theBasePrice, theCps, theId) {
            this.nb = 0;
            this.name = theName;
            this.cps = theCps;
            this.id = theId;
            this.price = theBasePrice;
            $('#productors').append("<button id=\"" + this.id + "\" type=\"button\" class=\"btn btn-default btn-block\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"" + this.cps + " cookie par seconds\"><p><span class=\"name\">" + this.name + "</span><br/><span class=\"price\" >" + this.price + "</span><br/><span class=\"nb\" >" + this.nb + "</span></p></button >");
            productorTable.push(this);
        }
        return Productor;
    }());
    $(function () {
        var cursor = new Productor("Cursor", 10, 0.25, 'cursor-id');
        var grandMa = new Productor("GrandMa", 20, 1, 'grandma-id');
        var _loop_1 = function (i) {
            var item = productorTable[i];
            var itemId = item.id;
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
                }
                else if (superCookie.cookieBank < item.price) {
                    $("#" + itemId).prop('disabled', true);
                }
                ;
            });
        };
        for (var i = 0; i < productorTable.length; i++) {
            _loop_1(i);
        }
    });
    //Update superCookie.cookieBank.
    $(function () {
        setInterval(function () {
            superCookie.cookieBank += superCookie.cookiePerSec;
            for (var i = 0; i < productorTable.length; i++) {
                var item = productorTable[i];
                var itemId = item.id;
                if (superCookie.cookieBank >= item.price) {
                    $("#" + itemId).prop('disabled', false);
                }
                else {
                    $("#" + itemId).prop('disabled', true);
                }
            }
            ;
            for (var i = 0; i < boostTable.length; i++) {
                var boost = boostTable[i];
                var boostId = boost.id;
                if (superCookie.cookieBank >= boost.price) {
                    $("#" + boostId).prop('disabled', false);
                }
                else {
                    $("#" + boostId).prop('disabled', true);
                }
            }
            ;
            superCookie.cookieAllTime += superCookie.cookiePerSec;
            $scope.$digest();
        }, 1000);
    });
    //Class Boosts.
    var boostTable = [];
    $scope.boostTable = boostTable;
    var Boost = /** @class */ (function () {
        function Boost(theName, theId, thePrice, theMultiplier, theIndex, shakespeare, theType) {
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
        Boost.prototype.effect = function () { };
        ;
        return Boost;
    }());
    var cookieClickBoost = /** @class */ (function (_super) {
        __extends(cookieClickBoost, _super);
        function cookieClickBoost(name, id, price, multiplier, index, citation) {
            return _super.call(this, name, id, price, multiplier, index, citation, "click") || this;
            //$("#" + this.id).append(`<img src="Materials/glowing_cursor.png" width="50px"/><div class="tooltip"><h4><img src="Materials/glowing_cursor.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>Clicking gains +${this.multiplier * 100}%</span><br/><span class="price">Price:${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
        }
        cookieClickBoost.prototype.effect = function () {
            superCookie.cookiePerClick += this.multiplier * superCookie.cookiePerSec;
            $scope.$disgest();
        };
        return cookieClickBoost;
    }(Boost));
    var cookieProdBoost = /** @class */ (function (_super) {
        __extends(cookieProdBoost, _super);
        function cookieProdBoost(name, id, price, multiplier, index, citation) {
            return _super.call(this, name, id, price, multiplier, index, citation, "cookie") || this;
            //$("#" + this.id).append(`<img src="Materials/cookies-icon.png" width="50px"/><div class='tooltip'><h4><img src="Materials/cookies-icon.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>Cookie production multiplier +${this.multiplier * 100}% of your Cps.</span><br/><span class="price">Price:${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
        }
        cookieProdBoost.prototype.effect = function () {
            superCookie.cookiePerSec *= 1 + this.multiplier;
            $scope.$digest();
        };
        return cookieProdBoost;
    }(Boost));
    var prodMultiplierBoost = /** @class */ (function (_super) {
        __extends(prodMultiplierBoost, _super);
        function prodMultiplierBoost(name, id, price, multiplier, index, citation) {
            return _super.call(this, name, id, price, multiplier, index, citation, "prod") || this;
            //$("#" + this.id).append(`<img src="Materials/${this.name}.png" width="50px"/><div class='tooltip'><h4><img src="Materials/${this.name}.png" width="25px"/>${this.name} boost ${this.index}</h4><p><span class='effect'>${this.name} are twice as efficient.</span><br/><span class="price">Price: ${this.price}</span><br/><span class='citation'><q>${this.citation}</q><br/><em>Shakespeare</em></span></p></div>`);
        }
        prodMultiplierBoost.prototype.effect = function () {
            for (var i = 0; i < productorTable.length; i++) {
                var item = productorTable[i];
                if (item.name === this.name) {
                    superCookie.cookiePerSec -= item.cps * item.nb;
                    item.cps *= this.multiplier;
                    superCookie.cookiePerSec += item.cps * item.nb;
                    $scope.$digest();
                }
            }
        };
        return prodMultiplierBoost;
    }(Boost));
    $(function () {
        var clickBoost1 = new cookieClickBoost("Mouse Boost", "cb1", 10, 0.25, 1, "It is not in the stars to hold our destiny but in ourselves.");
        var clickBoost2 = new cookieClickBoost("Mouse Boost", "cb2", 20, 0.25, 2, "Love all, trust a few, do wrong to none.");
        var clickBoost3 = new cookieClickBoost("Mouse Boost", "cb3", 30, 0.25, 3, "A fool thinks himself to be wise, but a wise man knows himself to be a fool.");
        var cookieBoost1 = new cookieProdBoost("Cookie Boost", "c1", 20, 0.5, 1, "No legacy is so rich as honesty.");
        var cookieBoost2 = new cookieProdBoost("Cookie Boost", "c2", 40, 0.5, 2, "There is nothing either good or bad but thinking makes it so.");
        var cookieBoost3 = new cookieProdBoost("Cookie Boost", "c3", 80, 0.5, 3, "Some are born great, some achieve greatness, and some have greatness thrust upon them.");
        var cursorBoost1 = new prodMultiplierBoost("Cursor", "cursor1", 20, 2, 1, "If music be the food of love, play on.");
        var cursorBoost2 = new prodMultiplierBoost("Cursor", "cursor2", 40, 2, 2, "We know what we are, but know not what we may be.");
        var cursorBoost3 = new prodMultiplierBoost("Cursor", "cursor3", 60, 2, 3, "Hell is empty and all the devils are here.");
        var grandMaBoost1 = new prodMultiplierBoost("GrandMa", "gm1", 50, 2, 1, "One touch of nature makes the whole world kin.");
        var grandMaBoost2 = new prodMultiplierBoost("GrandMa", "gm2", 75, 2, 2, "The course of true love never did run smooth.");
        var grandMaBoost3 = new prodMultiplierBoost("GrandMa", "gm3", 100, 2, 3, "Cowards die many times before their deaths; the valiant never taste of death but once.");
        var _loop_2 = function (i) {
            var boost = boostTable[i];
            var boostId = boost.id;
            $("#" + boostId).click(function () {
                if (superCookie.cookieBank >= boost.price) {
                    superCookie.cookieBank -= boost.price;
                    boost.effect();
                    $("#" + boostId).remove();
                    $scope.$digest();
                }
            });
        };
        for (var i = 0; i < boostTable.length; i++) {
            _loop_2(i);
        }
    });
    //Gestion positionnement tooltip par rapport à la souris.
    $(function () {
        var objRectFlex = document.querySelector(".flex-container").getBoundingClientRect();
        $(".flex-container").hover(function () { }).mousemove(function (e) {
            var mousey = e.clientY - objRectFlex.top;
            $('.tooltip').css("top", mousey);
        });
    });
});
app.directive('clickBoost', function () {
    return {
        scope: { cb: '=' },
        templateUrl: 'clickBoost.html'
    };
});
app.directive('cookieProdBoost', function () {
    return {
        scope: { cpb: '=' },
        templateUrl: 'cookieProdBoost.html'
    };
});
app.directive('prodBoost', function () {
    return {
        scope: { pb: '=' },
        templateUrl: 'prodBoost.html'
    };
});
//# sourceMappingURL=file1.js.map