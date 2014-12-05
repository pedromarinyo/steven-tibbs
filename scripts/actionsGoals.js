/*
Action Class
--
Constructor: (
    name                //actions's name
    preconditions       //action's preconditions
    effectDesc          //description of effects
    effects             //action's effects
)
*/

function initActions() {

    al = 
    {
        "shootGun": new Action( //Shoot gun
            "shootGun",
            [ //Preconditions
                {"character": "userChar", "attr": "has", "value": il.gun}, //Check that the user has a gun;
                {"character": "userChar", "attr": "has", "value": il.ammo}, //Check that the user has ammo;
                {"character": "targetChar", "attr": "alive", "value": true}, //Check that the target character is alive;
                {"character": "userChar", "attr": "alive", "value": true}, //Check that the user character is alive;
                {"character": "userChar", "attr": "prox", "value": "targetChar"}
            ],
            [ ///Effects description
                {"character": "targetChar", "attr":  "alive", "value": false}, //targetChar is dead
                {"character": "userChar", "attr": "drops", "value": il.ammo} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.targetChar.alive = false; //Target character is dead;
                this.userChar.removeItem(il.ammo); //User character no longer has ammo;
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " shoots " + this.targetChar.name + ".");
                $("#simOutput").append("<hr>" +this.targetChar.name + " is dead.");

                //Save info for quest generation.
                weapon = il.gun;
                murderer = this.userChar;
                crimeScene = this.targetChar.loc;

                $("#simOutput").append("<hr>" +"Murderer: " + murderer.name);
                $("#simOutput").append("<hr>" +"Weapon: " + weapon.name);
                $("#simOutput").append("<hr>" +"Crime Scene: " + crimeScene.name);
                return true;
            },
            function duration() {
                return 5;
            }          
        ),

        "usePoison": new Action( //Shoot gun
            "usePoison",
            [ //Preconditions
                {"character": "userChar", "attr": "has", "value": il.poison},
                {"character": "targetChar", "attr": "alive", "value": true}, //Check that the target character is alive;
                {"character": "userChar", "attr": "alive", "value": true}, //Check that the user character is alive;
                {"character": "userChar", "attr": "prox", "value": "targetChar"}
            ],
            [ ///Effects description
                {"character": "targetChar", "attr":  "alive", "value": false}, //targetChar is dead
                {"character": "userChar", "attr": "drops", "value": il.poison} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.targetChar.alive = false; //Target character is dead;
                this.userChar.removeItem(il.poison); //User character no longer has poison;
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " poisons " + this.targetChar.name + ".");
                $("#simOutput").append("<hr>" +this.targetChar.name + " is dead.");
                
                //Save info for quest generation.
                weapon = il.poison;
                murderer = this.userChar;
                crimeScene = this.targetChar.loc;

                $("#simOutput").append("<hr>" +"Murderer: " + murderer.name);
                $("#simOutput").append("<hr>" +"Weapon: " + weapon.name);
                $("#simOutput").append("<hr>" +"Crime Scene: " + crimeScene.name);
                return true;
            },
            function duration() {
                return 10;
            }          
        ),

        "useRope": new Action( //Shoot gun
            "useRope",
            [ //Preconditions
                {"character": "userChar", "attr": "has", "value": il.rope},
                {"character": "targetChar", "attr": "alive", "value": true}, //Check that the target character is alive;
                {"character": "userChar", "attr": "alive", "value": true}, //Check that the user character is alive;
                {"character": "userChar", "attr": "prox", "value": "targetChar"}
            ],
            [ ///Effects description
                {"character": "targetChar", "attr":  "alive", "value": false}, //targetChar is dead
                {"character": "userChar", "attr": "drops", "value": il.rope} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.targetChar.alive = false; //Target character is dead;
                this.userChar.removeItem(il.rope); //User character no longer has poison;
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " strangles " + this.targetChar.name + ".");
                $("#simOutput").append("<hr>" +this.targetChar.name + " is dead.");
                
                //Save info for quest generation.
                weapon = il.rope;
                murderer = this.userChar;
                crimeScene = this.targetChar.loc;

                $("#simOutput").append("<hr>" +"Murderer: " + murderer.name);
                $("#simOutput").append("<hr>" +"Weapon: " + weapon.name);
                $("#simOutput").append("<hr>" +"Crime Scene: " + crimeScene.name);
                return true;
            },
            function duration() {
                return 10;
            }          
        ),

        "useInjection": new Action( //Shoot gun
            "useRope",
            [ //Preconditions
                {"character": "userChar", "attr": "has", "value": il.injection},
                {"character": "targetChar", "attr": "alive", "value": true}, //Check that the target character is alive;
                {"character": "userChar", "attr": "alive", "value": true}, //Check that the user character is alive;
                {"character": "userChar", "attr": "prox", "value": "targetChar"}
            ],
            [ ///Effects description
                {"character": "targetChar", "attr":  "alive", "value": false}, //targetChar is dead
                {"character": "userChar", "attr": "drops", "value": il.injection} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.targetChar.alive = false; //Target character is dead;
                this.userChar.removeItem(il.rope); //User character no longer has poison;
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " injects " + this.targetChar.name + ".");
                $("#simOutput").append("<hr>" +this.targetChar.name + " is dead.");
                
                //Save info for quest generation.
                weapon = il.injection;
                murderer = this.userChar;
                crimeScene = this.targetChar.loc;

                $("#simOutput").append("<hr>" +"Murderer: " + murderer.name);
                $("#simOutput").append("<hr>" +"Weapon: " + weapon.name);
                $("#simOutput").append("<hr>" +"Crime Scene: " + crimeScene.name);
                return true;
            },
            function duration() {
                return 7;
            }          
        ),

        "moveToLoc": new Action( //Move to targetChar
            "moveToLoc",
            [ //Preconditions
                {"character": "userChar", "attr": "knowsLoc", "value": "targetChar"}, //Check that user knows targetChar's location.
                {"character": "targetChar", "attr": "alive", "value": true}, //Check that the target character is alive;
                {"character": "userChar", "attr": "alive", "value": true} //Check that the user character is alive;
            ],
            [ ///Effects description
                {"character": "targetChar", "attr": "prox", "value": true} //userChar and targetChar are in the same location.
            ],
            function effects(){ //Effects function
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " arrives at " + this.targetChar.loc.name + ".");
                this.userChar.moveToLoc(this.targetChar.loc); 
                return true;
            },
            function duration() {
                var oCoor = this.userChar.loc.coor; //Origin coordinates.
                var tCoor = this.targetChar.loc.coor; //Target coordinates.
                //Computing distance between coordiantes.
                var distance = Math.sqrt(Math.pow((tCoor.lat - oCoor.lat), 2) + Math.pow((tCoor.long - oCoor.long), 2));
                var duration = Math.floor(distance * 2500) + (Math.random() * 5);
                return duration;
            }          
        ),

        "moveToItemLoc": new Action( //Move to targetChar
            "moveToItemLoc",
            [ //Preconditions
                {"character": "userChar", "attr": "knowsLoc", "value": "targetChar"}, //Check that user knows targetChar's location.
                {"character": "userChar", "attr": "alive", "value": true} //Check that the user character is alive;
            ],
            [ ///Effects description
                {"character": "targetChar", "attr": "prox", "value": true} //userChar and targetChar are in the same location.
            ],
            function effects(){ //Effects function
                //Move to where character thinks item is located. 
                var loc = this.userChar.knowledgeItemLoc(this.targetChar);
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " arrives at " + loc.name + "."); 
                this.userChar.moveToLoc(loc);

                //Check if item is in location.
                if (this.userChar.checkProx(this.targetChar)) { //if userChar finds item...
                    if (this.targetChar.owner == null) {
                        //If item is in same location and not being carried by another character...
                        $("#simOutput").append("<hr>" +this.userChar.name + " sees the " + this.targetChar.name);
                        return true;
                    } 
                    else {
                        //If item is here, but being carrried by another character...
                        $("#simOutput").append("<hr>" +this.userChar.name + " sees that "+ this.targetChar.owner.name +" is carrying the " + this.targetChar.name);
                        //Record knowledge to userChar.
                        this.userChar.knowledge.push(new Knowledge(this.targetChar.owner, null, "has", null, this.targetChar));
                        return false;
                    }
                }
                else { //if item isn't in location specified... 
                    //Change affection for character to -1. 
                    this.userChar.setRelationAttr(this.userChar.lastCharAsked.handle, "aff", -1); 
                    this.userChar.knowledge[this.userChar.knowledge.length -1].remove();

                    $("#simOutput").append("<hr>" +this.userChar.name + " doesn't see the " + this.targetChar.name + "; s/he distrusts " + this.userChar.lastCharAsked.name);
                    return "learnFail";
                }  
            },
            function duration() {
                var oCoor = this.userChar.loc.coor; //Origin coordinates.
                var tCoor = this.targetChar.loc.coor; //Target coordinates.
                //Computing distance between coordiantes.
                var distance = Math.sqrt(Math.pow((tCoor.lat - oCoor.lat), 2) + Math.pow((tCoor.long - oCoor.long), 2));
                var duration = Math.floor(distance * 2500) + (Math.random() * 5);
                return duration;
            }          
        ),

        "getItem": new Action( //Get item
            "getItem",
            [ //Preconditions
                {"character": "userChar", "attr": "alive", "value": true}, //Check that the user character is alive;
                {"character": "userChar", "attr": "prox", "value": "targetChar"} //Check that the user and item are in the same location;
            ],
            [ //Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"}
            ],
            function effects(){ //Effects function
                this.userChar.addItem(this.targetChar);
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " picks up the " + this.targetChar.name);
                return true;
                
            },
            function duration() {
                return 2;
            }          
        ), 

        "buyItemFromBlackmarket": new Action (
            "buyItemFromBlackmarket",
            [ //Preconditions
                {"character": "userChar", "attr": "prox", "value": il.blackMarket}
            ],
            [ //Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"} 
            ],
            function effects() {
                //Generating item price.
                var price = Math.random() * 10000;
                price -= this.userChar.getPersonality("van") * 5000;
                price = Math.floor(price);

                if (this.userChar.money > price) {
                    this.userChar.addItem(this.targetChar);
                    $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " purchases the " + this.targetChar.name + " from the black market");
                    this.userChar.money -= price;
                    $("#simOutput").append("<hr>" +this.userChar.name + " is carrying $" + this.userChar.money);
                    return true;
                } else {
                    $("#simOutput").append("<hr>" +this.userChar.name + " doesn't have enough money.");
                    return false;
                }
            },
            function duration() { return 10;}
        ),

        "askAboutCharItem": new Action(
            "askAboutCharItem",
            [ //Preconditions
                {"character": "userChar", "attr": "alive", "value": true} //User is alive
            ],
            [ //Effects description
                {"character": "userChar", "attr": "learns", "value": "targetChar"} //User learn's location of item.
            ],
            function effects() {
                //Decide which character to ask, from list of known characters and locations. 
                var askChar = this.userChar.decide(); //Decide based on nearest character and most affectionate, weighed in decision heuristic.
            
                //Call character 
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " calls " + askChar.name + " to ask about " + this.targetChar.name);
                //askChar learns that user is looking for item.

                $("#simOutput").append("<hr>" +askChar.name + " learns that " + this.userChar.name + " is asking after the " + this.targetChar.name);
                askChar.knowledge.push(new Knowledge(this.targetChar, null, "asked", null, this.userChar));
                //askChar plans reponse. 
                return askChar.planResponse(this.userChar, this.targetChar);
            },
            function duration() { return 5; }
        ),        

        "tellAboutItem": new Action(
            "tellAboutItem",
            [ //Preconditions
                {"character": "userChar", "attr": "prox", "value": "targetChar"} //User and targetChar are in the same location.
            ],
            [ //Effects description.
                {"character": "userChar", "attr": "respond", "value": "targetChar"} //User responds to targetChar.
            ],
            function effects() {
                $("#simOutput").append("<hr>" +"Minute " + currTime + ": " + this.userChar.name + " responds truthfully"); 
                
                //If user doesn't know location of item in question...                
                if (!this.userChar.checkKnow(this.targetItem, "loc")) { 
                    $("#simOutput").append("<hr>" +this.userChar.name + " says s/he doesn't know the location of the " + this.targetItem.name);
                    return false;
                } else {
                    //User's last seen location of the item.
                    var lastLocation = this.userChar.checkKnow(this.targetItem, "loc");
                    $("#simOutput").append("<hr>" +this.userChar.name + " reveals that s/he's last seen the " + this.targetItem.name + " at the " + lastLocation.name);

                    //Add knowledge of item's location to targetChar.
                    this.targetChar.knowledge.push(new Knowledge(this.targetItem, null, "loc", null, lastLocation));
                    //targetChar remembers who told them the location; 
                    this.targetChar.lastCharAsked = this.userChar;
                    return true;
                }
            },
            function duration() { return 0; }
        ),

        "ignoreAsk": new Action(
            "ignoreAsk",
            [ //Preconditions
                {"character": "userChar", "attr": "prox", "value": "targetChar"}, //User and targetChar are in the same location.
            ], 
            [ //Effects description
                {"character": "userChar", "attr": "respond", "value": "targetChar"} //User reponds to targetChar. 
            ], 
            function effects(){
                $("#simOutput").append("<hr>" +this.userChar.name + " refuses to answer");
                return false;
            }, 
            function duration() { return 5; }
        )         
    }
}

/*
Goal CLass
--
Constructor: (
    name                //goal's name
    parent              //goal's parent in goal hierarchy
    child               //goal's child in goal hierarchy
    desiredEffects      //desired world state
)
*/

function initGoals() {

    gl = 
    {
        "live": new Goal(
            "live",
            null, //parent
            [], //children
            "or", //and/or property
            [], //desired effects
            null //
        ),

        "wait": new Goal(
            "wait",
            null,
            [],
            "or",
            [],
            null
        ),

        "respond": new Goal(
            "respond",
            null,
            [
                {character: "userChar", attr: "alive", value: true}
            ],
            "and",
            [
                {character: "userChar", attr: "respond", value: "targetChar"}
            ],
            null
        ),

        "killTibbs": new Goal(
            "kill Steven Tibbs",
            null,
            [
                "shootTibbs",
                "poisonTibbs",
                "strangleTibbs",
                "bashTibbs",
                "injectTibbs"
            ],
            "or",
            [],
            null
        ),
        
        "shootTibbs": new Goal(
            "shoot Tibbs",
            "killTibbs",
            [
                "moveToTibbsWithGun"
            ],
            "and",
            [
                {"character": cl.tibbs, "attr": "alive", "value": false}
            ], 
            "hon"
        ),

        "moveToTibbsWithGun": new Goal(
            "move to Tibbs' location w/ gun",
            "shootTibbs",
            [
                "getGun",
                "buyGun"
            ],
            "or",
            [
                {"character": cl.tibbs, "attr": "prox", "value": true}
            ],
            null
        ),

        "getGun": new Goal(
            "get the gun",
            "moveToTibbsWithGun",
            [
                "moveToGun"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.gun}
            ],
            "knd"
        ),

        "moveToGun": new Goal(
            "move to the gun's location", //Name
            "getGun", //Parent
            [ //Children
                "learnGunLoc"
            ], 
            "and", // And/or 
            [ //Desired effects
                {"character": il.gun, "attr": "prox", "value": true}
            ],
            null
        ),

        "learnGunLoc": new Goal(
            "learn the gun's location",
            "moveToGun",
            [],
            "and",
            [
                {"character": "userChar", "attr": "learns", "value": il.gun}
            ],
            null
        ),

        "poisonTibbs": new Goal(
            "poison Tibbs",
            "killTibbs",
            [
                "moveToTibbsWithPoison"
            ],
            "and",
            [
                {"character": cl.tibbs, "attr": "alive", "value": false}
            ],
            "int"
        ),

        "moveToTibbsWithPoison": new Goal(
            "move to Tibbs' location w/ poison",
            "poisonTibbs",
            [
                "getPoison",
                "buyPoison"
            ],
            "or",
            [
                {"character": cl.tibbs, "attr": "prox", "value": true}
            ],
            null
        ),

        "getPoison": new Goal(
            "get the poison",
            "moveToTibbsWithPoison",
            [
                "moveToPoison"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.poison}
            ],
            "int"
        ),

        "moveToPoison": new Goal(
            "move to the poison",
            "getPoison",
            [
                "learnPoisonLoc"
            ],
            "and",
            [
                {"character": il.poison, "attr": "prox", "value": true}
            ],
            "hon"
        ),

        "learnPoisonLoc": new Goal(
            "learn the poison's location",
            "moveToPoison",
            [],
            "and",
            [
                {"character": "userChar", "attr": "learns", "value": il.poison}
            ],
            null
        ),

        "strangleTibbs": new Goal(
            "poison Tibbs",
            "killTibbs",
            [
                "moveToTibbsWithRope"
            ],
            "and",
            [
                {"character": cl.tibbs, "attr": "alive", "value": false}
            ],
            "van"
        ),

        "moveToTibbsWithRope": new Goal(
            "move to Tibbs' location w/ rope",
            "shootTibbs",
            [
                "getRope",
                "buyRope"
            ],
            "or",
            [
                {"character": cl.tibbs, "attr": "prox", "value": true}
            ],
            null
        ),

        "getRope": new Goal(
            "get the rope",
            "moveToTibbsWithRope",
            [
                "moveToRope"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.rope}
            ],
            null
        ),

        "moveToRope": new Goal(
            "move to the rope",
            "getRope",
            [
                "learnRopeLoc"
            ],
            "and",
            [
                {"character": il.rope, "attr": "prox", "value": true}
            ],
            "knd"
        ),

        "learnRopeLoc": new Goal(
            "learn the ropes's location",
            "moveToRope",
            [],
            "and",
            [
                {"character": "userChar", "attr": "learns", "value": il.rope}
            ],
            null
        ),

        "buyRope": new Goal(
            "buy rope from the black market",
            "moveToTibbsWithRope",
            [
                "moveToBlackMarketRope"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.rope}
            ],
            "van"
        ),

        "buyPoison": new Goal(
            "buy poison from the black market",
            "moveToTibbsWithPoison",
            [
                "moveToBlackMarketPoison"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.poison}
            ],
            "van"
        ),

        "buyGun": new Goal(
            "buy gun from the black market",
            "moveToTibbsWithGun",
            [
                "moveToBlackMarketGun"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.gun}
            ],
            "van"
        ),

        "moveToBlackMarketRope": new Goal(
            "move to the black market",
            "buyRope",
            [],
            "and",
            [
                {"character": il.blackMarket, "attr": "prox", "value": true}
            ],
            null
        ),

        "moveToBlackMarketGun": new Goal(
            "move to the black market",
            "buyGun",
            [],
            "and",
            [
                {"character": il.blackMarket, "attr": "prox", "value": true}
            ],
            null
        ),

        "moveToBlackMarketPoison": new Goal(
            "move to the black market",
            "buyPoison",
            [],
            "and",
            [
                {"character": il.blackMarket, "attr": "prox", "value": true}
            ],
            null
        ),

        "bashTibbs": new Goal(
            "bash Tibbs",
            "killTibbs",
            [
                "moveToTibbsWithRope"
            ],
            "and",
            [
                {"character": cl.tibbs, "attr": "alive", "value": false}
            ],
            "knd"
        ),

        "moveToTibbsWithBat": new Goal(
            "move to Tibbs' location w/ rope",
            "shootTibbs",
            [
                "getBat",
                "buyBat"
            ],
            "or",
            [
                {"character": cl.tibbs, "attr": "prox", "value": true}
            ],
            null
        ),

        "getBat": new Goal(
            "get the bat",
            "moveToTibbsWithBat",
            [
                "moveToBat"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.bat}
            ],
            "int"
        ),

        "moveToBat": new Goal(
            "move to the bat",
            "getBat",
            [
                "learnBatLoc"
            ],
            "and",
            [
                {"character": il.bat, "attr": "prox", "value": true}
            ],
            "knd"
        ),

        "learnBatLoc": new Goal(
            "learn the bat's location",
            "moveToBat",
            [],
            "and",
            [
                {"character": "userChar", "attr": "learns", "value": il.bat}
            ],
            null
        ),

        "buyBat": new Goal(
            "buy bat from the black market",
            "moveToTibbsWithBat",
            [
                "moveToBlackMarketBat"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.bat}
            ],
            "van"
        ),

        "moveToBlackMarketBat": new Goal(
            "move to the black market",
            "buyBat",
            [],
            "and",
            [
                {"character": il.blackMarket, "attr": "prox", "value": true}
            ],
            null
        ),

        "injectTibbs": new Goal(
            "inject Tibbs",
            "killTibbs",
            [
                "moveToTibbsWithInjection"
            ],
            "and",
            [
                {"character": cl.tibbs, "attr": "alive", "value": false}
            ],
            "int"
        ),

        "moveToTibbsWithInjection": new Goal(
            "move to Tibbs' location w/ injection",
            "shootTibbs",
            [
                "getInjection",
                "buyInjection"
            ],
            "or",
            [
                {"character": cl.tibbs, "attr": "prox", "value": true}
            ],
            null
        ),

        "getInjection": new Goal(
            "get the bat",
            "moveToTibbsWithInjection",
            [
                "moveToInjection"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.injection}
            ],
            "int"
        ),

        "moveToInjection": new Goal(
            "move to the injection",
            "getInjection",
            [
                "learnInjectionLoc"
            ],
            "and",
            [
                {"character": il.injection, "attr": "prox", "value": true}
            ],
            "knd"
        ),

        "learnInjectionLoc": new Goal(
            "learn the injection's location",
            "moveToInjection",
            [],
            "and",
            [
                {"character": "userChar", "attr": "learns", "value": il.injection}
            ],
            null
        ),

        "buyInjection": new Goal(
            "buy bat from the black market",
            "moveToTibbsWithInjection",
            [
                "moveToBlackMarketInjection"
            ],
            "and",
            [
                {"character": "userChar", "attr": "has", "value": il.injection}
            ],
            "van"
        ),

        "moveToBlackMarketInjection": new Goal(
            "move to the black market",
            "buyInjection",
            [],
            "and",
            [
                {"character": il.blackMarket, "attr": "prox", "value": true}
            ],
            null
        )

    };          
}