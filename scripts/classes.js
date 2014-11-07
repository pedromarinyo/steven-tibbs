
(function (window) {
    /*
    Chracter Class
    --
    Constructor: (
        name                //character's name
        personality         //character's personality, assoc. array of vlaues (-1 - 1); e.g. personality[dc] = -0.5;
            knd             //kindness
            van             //vanity
            hon             //honesty
            int             //intelligence
        relations           //character's relationship, assoc. array of values (see relationship class below); e.g. relation[Tibbs] = new Relaionship();
        knowledge           //character's knowledge model (see knowledge class below);
        loc                 //character's current location
        has                 //character's current inventory, array of item objects, e.g. {Gun, securityTape};

    )
    */
    function Character(name, personality, loc, has) {
        this.name           = name;
        this.personality    = personality;
        this.loc            = loc;
        this.has            = has;

        this.alive          = true;
        this.relations;
        this.knowledge;
        this.currGoal;
        this.nextAction     = null;
        this.nextActionTarget;
        this.actionTimer;
        this.goalsAccomplished = new Array();
        this.goalsTried = new Array();

        //Checks, getters and setters
        //Retrieves personality attribute;
        this.getPersonality = function getPersonality(attribute) {
            return this.personality[attribute];
        }

        //Set personality attribute;
        this.setPersonality = function setPersonality(attribute, value) {
            this.personality[attribute] = value;
        }

        //Retrieves relationship parameter for a given target character;
        this.getRelation = function getRelation(targetChar, attribute) {
            var i = 0;
            while (i < this.relations.length) {
                if(this.relations[i].targetChar == targetChar) {return this.relations[i].attribute;}
                i++;
            }
            return null;
        }

        //Set character's relations
        this.setRelations = function setRelations(relations) {
            this.relations = relations;
        }

        //Set character's knowledge
        this.setKnowledge = function setKnowledge(knowledge) {
            this.knowledge = knowledge;
        }

        //Sets relationship parameter for a given target character;
        this.setRelation = function getRelation(targetChar, attribute, value) {
            var i = 0;
            while (i < this.relations.length) {
                if(this.relations[i].targetChar == targetChar) {
                    this.relations[i].attribute = value;
                }
                i++;
            }
        }

        //Check if character is holding an item;
        this.checkItem = function checkItem(item) {
            var i = 0;
            while (i < this.has.length) {
                if(this.has[i] == item) {return true;}
                i++;
            }
            return false;
        }

        //Inventory management
        //Remove item from character's inventory
        this.removeItem = function removeItem(item) {
            var i = this.has.indexOf(item);
            if (i > -1) { this.has.splice(i, 1);}
        }

        //Add item into character's inventory
        this.addItem = function addItem(item) {
            this.has.push(item);
        }

        //Check if this character shares the same location as another character
        this.checkProx = function checkProx(character) {
            if (this.loc == character.loc) {return true;}
            else {return false;}
        }

        //Knowledge management
        //Check if character knows the location of a character or item
        this.checkKnow = function checkKnow(target, attr) {
            for (i = 0; i < this.knowledge.length; i++) {
                if (
                    this.knowledge[i].targetSubject == target && 
                    this.knowledge[i].predicateType == attr
                ) {
                    return true;
                } 
            }
            return false;  
        }

        //Planning and performing actions
        //Setting new current goal
        this.setCurrGoal = function setCurrGoal(goalName) {
            this.currGoal = gl[goalName];
            console.log(this.name +" wants to "+ this.currGoal.name);
        }

        this.setNextAction = function setNextAction(action, targetChar) {
            this.nextAction = action;
            this.nextActionTarget = targetChar;
            this.actionTimer = action.duration();
            console.log(this.name +" decides to "+ this.nextAction.name + ".");
        }

        this.performAction = function performAction() {
            this.nextAction.setUser(this);
            this.nextAction.setTarget(this.nextActionTarget);

            this.nextAction.effects(); //Perform action
            this.goalsAccomplished.push(this.currGoal); //Remember that the character completed this goal.
            
            //Remove action from nextAction 
            this.nextAction = null; this.nextActionTarget = null; this.actionTimer = 0;

            //If goal has parent, make the current goal's parent the new goal.
            if (!!this.currGoal.parent) {
                var currGoalParent = this.currGoal.parent;
                this.setCurrGoal(currGoalParent);
            }
            else if (this.currGoal.name != "wait") {this.setCurrGoal("wait");}
        }

        //Plan
        this.plan = function plan() {
            //Check if goal has any child nodes, check that they're are accomplished. If not, make child current goal.
            if (this.currGoal.child.length > 0 && this.currGoal.childLogic == "and") {
                for (i = 0; i < this.currGoal.child.length; i++ ) {
                    if (this.goalsAccomplished.indexOf(gl[this.currGoal.child[i]]) == -1) {
                        this.setCurrGoal(this.currGoal.child[i]);
                        return "fail";
                    }
                }
             }

            //Create an array of desired goal effects. 
            var desiredEffects = this.currGoal.desiredEffects;
            
            //Create an array of legal actions and targets.
            var legalActions = new Array();
            var legalTargets = new Array();
            var legalActionScore = new Array();

            //Check for legal actions (w/ legal targets)
            for  (var cName in cl) { //Character targets
                for (var aName in al) {
                    
                    if (aName != "getItem" && aName != "moveToItemLoc") {
                        al[aName].setUser(this); //Set user character.
                        al[aName].setTarget(cl[cName]); //Set target character.
                     
                        //If action is legal, add it to the legalAction array, along with legal target.
                        if (al[aName].isLegal()) {
                            legalActions.push(al[aName]); 
                            legalTargets.push(cl[cName]);
                        }
                    }
                } 
            }

            for (var iName in il) { //Item targets
                for (var aName in al) {
                    if (aName == "getItem" || aName == "moveToItemLoc") {
                        al[aName].setUser(this);
                        al[aName].setTarget(il[iName]);

                        //If action is legal, add it to the legalAction array, along with legal target.
                        if (al[aName].isLegal()) {
                            legalActions.push(al[aName]); 
                            legalTargets.push(il[iName]);
                        }
                    }
                }
            }

            //Scan legal actions for best fit with currGoal's desired effects.
            for (i = 0; i < legalActions.length; i++) { //For each legal action...
                
                var score = 0;
                for (j = 0; j < desiredEffects.length; j++) { //Compare currGoal's desired effects and action's effects.
                    for (k = 0; k < legalActions[i].effectsDesc.length; k++) {
                        
                        var effectCharacter, effectValue;
                        if(legalActions[i].effectsDesc[k].character == "userChar") {effectCharacter = this;}
                        else if (legalActions[i].effectsDesc[k].character == "targetChar") {effectCharacter = legalTargets[i];}
                        else {effectCharacter = legalActions[i].effectsDesc[k].character;}

                        if(legalActions[i].effectsDesc[k].value == "userChar") {effectValue = this;}
                        else if (legalActions[i].effectsDesc[k].value == "targetChar") {effectValue = legalTargets[i];}
                        else {effectValue = legalActions[i].effectsDesc[k].value;}

                        var goalCharacter, goalValue;
                        if(desiredEffects[j].character == "userChar") {goalCharacter = this;}
                        else if (desiredEffects[j].character== "targetChar") {goalCharacter = legalTargets[i];}
                        else {goalCharacter = desiredEffects[j].character;}

                        if(desiredEffects[j].value == "userChar") {goalValue = this;}
                        else if (desiredEffects[j].value == "targetChar") {goalValue = legalTargets[i];}
                        else {goalValue = desiredEffects[j].value;}
                        
                        if ( 
                            goalCharacter == effectCharacter &&
                            desiredEffects[j].attr == legalActions[i].effectsDesc[k].attr &&
                            goalValue == effectValue
                        ) {score++;}
                    }
                }
                
                //Attach a score to each legal action; higher scores indicate closer matches between desired effects and action effects.
                legalActionScore[i] = score; 
            }

            //Remove actions that don't meet any of the character's desired goals. 
            var deletionList = new Array();
            
            for(i = 0; i < legalActions.length; i++) {
                if (legalActionScore[i] < 1) {
                    deletionList.push(i);
                }
            } 
            
            for(var i = deletionList.length-1; i >= 0; i--) {
                legalActions.splice(deletionList[i], 1);
                legalActionScore.splice(deletionList[i], 1);
                legalTargets.splice(deletionList[i], 1);
            }
            
            /*
          
             */
            if (legalActions.length < 1) { 
                this.goalsTried.push(this.currGoal); //Remember that the character tried and failed to meet this goal.
                var goalChildren = this.currGoal.child;
                var childAccomplished = false;

                if (goalChildren.length > 0 && this.currGoal.childLogic == "and") { //If goal has children, decompose to a child node the character has yet to accomplish.
                    for (var i = 0; i < goalChildren.length; i++) {
                        if (this.goalsAccomplished.indexOf(gl[goalChildren[i]]) == -1) { 
                            this.setCurrGoal(goalChildren[i]);
                            goalIsFound = true;
                        }
                    }
                }

                //If child logic is "or", and no children are acomplished, chose untried child.
                else if (goalChildren.length > 0 && this.currGoal.childLogic == "or") { 

                    for (var i = 0; i < goalChildren.length; i++) { //Check for accomplished goals. 
                        if (this.goalsAccomplished.indexOf(gl[goalChildren[i]]) != -1) { //If goal already accomplished, try parent or wait.
                            childAccomplished = true; 
                            if(!!this.currGoal.parent) {this.setCurrGoal(this.currGoal.parent);}
                            else {this.setCurrGoal("wait");}
                        }
                    }

                    if(!childAccomplished ) { //if no child has been accomplished, try untried child with personality pref.
                        for (var i = 0; i < goalChildren.length; i++) {
                            if (this.goalsTried.indexOf(gl[goalChildren[i]]) == -1 ) { 
                                if(!!gl[goalChildren[i]].personality) {
                                    var pVector = this.getPersonality(gl[goalChildren[i]].personality);
                                    if (pVector > 0.4) {this.setCurrGoal(goalChildren[i]);}
                                }
                                //else {this.setCurrGoal(goalChildren[i]);}
                                break;
                            }
                        } 
                    }
                }
                else if (this.currGoal.name != "wait") { //if character has no parent nodes, wait.
                    this.setCurrGoal("wait");
                }
                return "fail";
            }
            //If there are legal actions available to perform...
            else {
                //Sort best available action.
                var bestActionIndex = legalActions.length - 1;
                for (var i=legalActions.length-1; i--;) {
                   if (legalActionScore[i] > legalActionScore[bestActionIndex]) {
                      bestActionIndex = i;
                   }
                }
                
                //Cue up best action.
                this.setNextAction(legalActions[bestActionIndex], legalTargets[bestActionIndex]);
                return "sucess";
            }
        }

        this.moveToLoc = function moveToLoc(targetLocation) {
            this.loc = targetLocation;
        }

    } window.Character = Character;

    /*
    Relationship Class
    --
    Constructor: (
        targetChar          //target character        
        cmp                 //competition, e.g. values (-1 - 1); e.g. cmp = 0.2;
        dom                 //dominance
        fam                 //familiarity
        aff                 //affection
        trs                 //trust
        dec                 //deceit
        idb                 //indebtedness
    )
    */
    function Relationship(targetChar, cmp, dom, fam, aff, trs, dec, idb) {
        this.targetChar     = targetChar;
        this.cmp            = cmp;
        this.dom            = dom;
        this.fam            = fam;
        this.aff            = aff;
        this.trs            = trs;
        this.dec            = dec;
        this.idb            = idb;
    } window.Relationship = Relationship;

    /*
    Knowledge Class
    --
    Constructor: (
        targetSubject       //character or item, e.g. Tibbs;
        indirectTarget      //for relationships' target character, otherwise null;
        predicateType       //location, knowledge, relationship or personality, e.g. "personality";
        predicateSub        //for relationship or personality sub-trait, otherwise null;
        value               //location, knowledge, relationship or personality value between -1 and 1. 
    )

    Examples: 
        new Knowledge(Rivers, Tibbs, "relationship", "dom", 0.9); 
            //Whoever holds this knowledge node believes that Rivers has a very (i.e. 0.9) dominating relationship toward Tibbs.
        
        new Knowledge(Gun, null, "location", null, Ferst); 
            //Whoever holds this knowledge node believes that the gun is located at the Ferst Center for the Arts. 
        
        new Knowledge(Tibbs, null, "knowledge", new Knowledge(Rivers, null, "personality", "hon", -0.9));
            //Whoever holds this node believes that Tibbs believes that Rivers has a dishonest (i.e. -0.9) personality.

    */
    function Knowledge(targetSubject, indirectTarget, predicateType, predicateSubType, value) {
        this.targetSubject  = targetSubject;
        this.indirectTarget = indirectTarget;
        this.predicateType  = predicateType;
        this.predicateSub   = predicateSubType;
        this.value          = value;

        //Remove this knowledge node
        this.remove = function remove() {
            delete this; 
        }

    } window.Knowledge = Knowledge;


    /*
    Item CLass
    --
    Constructor: (
        name                //item's name
        loc                 //item's current location        
    )
    */
    function Item(name, loc, owner) {
        this.name           = name;
        this.loc            = loc;
    }
    window.Item = Item;

    /*
    Location CLass
    --
    Constructor: (
        name                //Locations's name
        coordinates         //Location's coordinates
    )
    */
    function Loc(name, coordinates) {
        this.name           = name;
        this.coor           = coordinates;
    }
    window.Loc = Loc;

    /*
    Action Class
    --
    Constructor: (
        name                //actions's name
        preconditions       //action's preconditions
        effectsDesc         //description of effects
        effects             //action's effects
    )
    */
    function Action(name, preconditions, effectsDesc, effects, duration) {
        this.userChar;
        this.targetChar;

        this.name           = name;
        this.preconditions  = preconditions;
        this.effectsDesc    = effectsDesc;
        this.effects        = effects;
        this.duration       = duration;

        //Set action's target character
        this.setTarget = function setTarget(character) {
            this.targetChar = character;
        };

        //Set action's user character
        this.setUser = function setUser(character) {
            this.userChar = character;
        };

        //Evaluate if an action is legal
        this.isLegal = function isLegal() {
            var legalFlags = new Array();
            for(i = 0; i < this.preconditions.length; i++) {
                switch(this.preconditions[i].attr) {
                    case "has":
                        var character = this.preconditions[i].character;
                        if (character == "userChar") {character = this.userChar;}
                        
                        var item = this.preconditions[i].value;
                        var result = character.checkItem(item);
                        legalFlags.push(result);
                        break;
                    
                    case "alive":
                        var character = this.preconditions[i].character;
                        if (character == "userChar") {character = this.userChar;}
                        else if (character == "targetChar") {character = this.targetChar;};

                        var value = this.preconditions[i].value;
                        var result = (character.alive == value) ? true: false;
                        legalFlags.push(result);
                        break;  
                    
                    //Personality preconditions
                    case "knd":
                    case "hon":
                    case "van": 
                    case "int":
                        var character = this.preconditions[i].character;
                        if (character == "userChar") {character = this.userChar;}
                        var trait = this.preconditions[i].attr;
                        var value = this.preconditions[i].value;
                        var result;
                        if(value > 0 && character.personality[trait] > value) {result = true;}
                        else if (value < 0 && character.personality[trait] < value){result = true;}
                        else {result = false}
                        legalFlags.push(result); 
                        break;

                    case "knowsLoc":
                        var character = this.preconditions[i].character;
                        if (character == "userChar") {character = this.userChar;}
                        var target = this.preconditions[i].value;
                        if (target == "targetChar") {target = this.targetChar;}
                        var result = character.checkKnow(target, "loc");
                        legalFlags.push(result);
                        break;

                    case "prox":
                        var character = this.preconditions[i].character;
                        if (character == "userChar") {character = this.userChar;}
                        else if (character == "targetChar") {character = this.targetChar;}

                        var result = this.userChar.checkProx(this.targetChar);
                        result = (result == this.preconditions[i].value) ? true : false;
                        legalFlags.push(result);
                        break;
                }
            }  
            //If all legalFlags are true (all preconditions met), return true; else return false.
            if (legalFlags.indexOf(false) > -1) {return false;}
            else {return true;}
        }
    }
    window.Action = Action;

    /*
    Goal CLass
    --
    Constructor: (
        name                //goal's name
        parent              //goal's parent in goal hierarchy
        child               //goal's child in goal hierarchy
        desired effects     //desired goal state
    )
    */
    function Goal(name, parent, child, childLogic, desiredEffects, personalityPreference) {
        this.name           = name;
        this.parent         = parent;
        this.child          = child;
        this.childLogic     = childLogic;
        this.desiredEffects = desiredEffects;
        this.personality    = personalityPreference;

        this.owner;
        this.targetChar;

        //Set goal's owner
        this.setOwner = function setGoal(character) {
            this.owner = character;
        }

        //Set goal's target character
        this.setTarget = function setTarget(character) {
            this.targetChar = character;
        }
    }
    window.Goal = Goal;

}(window));