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
                {"character": "targetChar", "attr": "prox", "value": true},
                {"character": "userChar", "attr": "knd", "value": -0.5}
            ],
            [ ///Effects description
                {"character": "targetChar", "attr":  "alive", "value": false}, //targetChar is dead
                {"character": "userChar", "attr": "drops", "value": il.ammo} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.targetChar.alive = false; //Target character is dead;
                this.userChar.removeItem(il.ammo); //User character no longer has ammo;
                console.log("Minute " + currTime + ": " + this.userChar.name + " shoots " + this.targetChar.name + ".");
                console.log(this.targetChar.name + " is dead.");
            },
            function duration() {
                return 5;
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
                this.userChar.moveToLoc(this.targetChar.loc); 
                console.log("Minute " + currTime + ": " + this.userChar.name + " arrives at " + this.targetChar.loc.name + ".");
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
                this.userChar.moveToLoc(this.targetChar.loc); 
                console.log("Minute " + currTime + ": " + this.userChar.name + " arrives at " + this.targetChar.loc.name + ".");
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
                {"character": "targetChar", "attr": "prox", "value": true} //Check that the user and item are in the same location;
            ],
            [ //Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"}
            ],
            function effects(){ //Effects function
                this.userChar.addItem(this.targetChar);
                console.log("Minute " + currTime + ": " + this.userChar.name + " picks up the " + this.targetChar.name + ".");
                
            },
            function duration() {
                return 2;
            }          
        ), 

        "stealItemFromChar": new Action( //Steal an item from a character
            "stealItemFromChar",
            [ //Preconditions
                {"character": "userChar", "attr": "prox", "value": "targetChar"}, //User and targetChar are in the same location.
                {"character": "userChar", "attr": "hon", "value": -0.5} //User has a dishonest personality
            ],
            [ //Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"} //User has targetItem
            ],
            function effects() {},
            function duration() { return 5;}
        ),

        "stealItemFromBlackmarket ": new Action (
            "stealItemFromBlackmarket",
            [ //Preconditions
                {"character": "userChar", "attr": "int", "value": 0.5} //User is very intelligent.
            ],
            [ //Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"} // User has targetItem
            ],
            function effects() {},
            function duration() { return 20;}
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
                console.log("Minute " + currTime + ": " + this.userChar.name + " calls " + askChar.name + " to ask about " + this.targetChar.name);
                //askChar learns that user is looking for item.
                console.log(askChar.name + " learns that " + this.userChar.name + " is asking after the " + this.targetChar.name);
                askChar.knowledge.push(new Knowledge(this.userChar, null, "asked", null, this.targetChar));
                //askChar plans reponse. 
                askChar.planResponse(this.askChar, this.targetChar); 
            },
            function duration() { return 0; }
        ),
            
        "lieAboutItem": new Action(
            "lieAboutItem",
            [ //Preconditons
                {"character": "userChar", "attr": "hon", "value": -0.5}, //User has low honesty.
                {"character": "userChar", "attr": "prox", "value": "targetChar"} //User and targetChar are in the same location.
            ],
            [ //Effects description
                {"character": "userChar", "attr": "respond", "value": "targetChar"} //User responds to targetChar.
            ],
            function effects() {},
            function duration() { return 4; }
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
                
                console.log("Minute " + currTime + ": " + this.userChar.name + " responds truthfully"); 
                if (!this.userChar.checkKnow(this.targetItem, "loc")) { //If user doesn't know location of item in question...
                    console.log(this.userChar.name + " says s/he doesn't know the location of the " + this.targetItem.name);
                    return "fail";
                } 
            },
            function duration() { return 5; }
        ),

        "ignoreAsk": new Action(
            "ignoreAsk",
            [ //Preconditions
                {"character": "userChar", "attr": "prox", "value": "targetChar"}, //User and targetChar are in the same location.
                {"character": "userChar", "attr": "knd", "value": -0.5} //User is unkind. 
            ], 
            [ //Effects description
                {"character": "userChar", "attr": "respond", "value": "targetChar"} //User reponds to targetChar. 
            ], 
            function effects(){}, 
            function duration() { return 5; }
        ),

        "buyItemFromBlackmarket": new Action(
            "buyItemFromBlackmarket", 
            [ //Preconditions
                {"character": "userChar", "attr": "knowsLoc", "value": "blackmarket"}
            ], 
            [
                {"character": "userChar", "attr": "has", "value": "targetChar"} //User has targetItem
            ]
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
            "celebrate her victory!",
            null,
            [
                "shootTibbs",
                "poisonTibbs"
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
                "getGun"
            ],
            "and",
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
            null
        ),

        "moveToGun": new Goal(
            "move to the gun", //Name
            "getGun", //Parent
            ["learnGunLoc"], //Children
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
                "getPoison"
            ],
            "and"
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
            null
        ),

        "moveToPoison": new Goal(
            "move to the poison",
            "getPoison",
            [],
            "and",
            [
                {"character": il.poison, "attr": "prox", "value": true}
            ],
            null
        )
    };          
}