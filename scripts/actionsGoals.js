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
            [ ///Effects description
                {"character": "userChar", "attr": "has", "value": "targetChar"} //userChar no longer has ammo
            ],
            function effects(){ //Effects function
                this.userChar.addItem(this.targetChar);
                console.log("Minute " + currTime + ": " + this.userChar.name + " picks up the " + this.targetChar.name + ".");
                
            },
            function duration() {
                return 2;
            }          
        ),       
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
            "or",
            [], //desired effects
            null
        ),

        "wait": new Goal(
            "wait",
            null,
            [],
            "or",
            [],
            null
        ),

        "killTibbs": new Goal(
            "kill Tibbs",
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
            "move to the gun",
            "getGun",
            [],
            "and",
            [
                {"character": il.gun, "attr": "prox", "value": true}
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