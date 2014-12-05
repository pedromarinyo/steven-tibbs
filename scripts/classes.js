/*
Chracter Class
--
Constructor: (
    name                //character's name
    personality         //character's personality, assoc. array of vlaues (-1 - 1); e.g. personality[dc] = -0.5;
        knd             //kindness
        van             //vanity or charm
        hon             //honesty
        int             //intelligence
    relations           //character's relationship, assoc. array of values (see relationship class below); e.g. relation[Tibbs] = new Relaionship();
    knowledge           //character's knowledge model (see knowledge class below);
    loc                 //character's current location
    has                 //character's current inventory, array of item objects, e.g. {Gun, securityTape};

)
*/
function Character(name, handle, personality, loc, has, money) {
    this.name                   = name;
    this.handle                 = handle;
    this.personality            = personality;
    this.loc                    = loc;
    this.has                    = has;
    this.money                  = money;

    this.alive                  = true;
    this.lastCharAsked; 
    this.relations;
    this.knowledge              = [];
    this.currGoal;
    this.nextAction             = null;
    this.nextActionTarget;

    this.actionTimer;
    this.goalsAccomplished = [];
    this.goalsTried = [];
    this.actionsTried = [];
    this.targetsTried= [];

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
        for (character in this.relations) {
            if (character == targetChar) { return this.relations[targetChar][attribute]; }
        }
    }

    //Set relation attr for given target character.
    this.setRelationAttr = function setRelationAttr(targetChar, attr, value) {
        
        for (character in this.relations) {
            if (character == targetChar) {
                this.relations[targetChar][attr] = value;
            }
        }
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

    //Get location of item based on character knowledge.
    this.knowledgeItemLoc = function knowledgeItemLoc(item) {
        //Scan knowledge for mention of item
        for(i = 0; i < this.knowledge.length; i++) {
            if (this.knowledge[i].predicateType == "loc" && this.knowledge[i].targetSubject == item) {
                return this.knowledge[i].value;
            }
        }
        return null;
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
        item.owner = this;
    }

    //Check if this character shares the same location as another character or item. 
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
                return this.knowledge[i].value;
            } 
        }
        return false;  
    }

    //Planning and performing actions
    //Setting new current goal
    this.setCurrGoal = function setCurrGoal(goalName) {
        this.currGoal = gl[goalName];
        //$("#simOutput").append("<hr>" +this.name +" wants to "+ this.currGoal.name);
    }

    this.setNextAction = function setNextAction(action, targetChar) {
        this.nextAction = action;
        this.nextActionTarget = targetChar;
        this.actionTimer = action.duration();
        $("#simOutput").append("<hr>" +this.name +" decides to "+ this.nextAction.name);
    }

    this.performAction = function performAction() {
        this.nextAction.setUser(this);
        this.nextAction.setTarget(this.nextActionTarget);

        var result = this.nextAction.effects(); //Perform action; check if it was sucessful. 
        this.actionsTried.push(this.nextAction);
        this.targetsTried.push(this.nextActionTarget);
        
        switch (result) {
            case true:
                //Remember that the character completed this goal.
                this.goalsAccomplished.push(this.currGoal); 
                
                //Remove action and actionTarget from actionsTried/targetsTried.
                for(i = this.actionsTried.length - 1; i > 0; i--) {
                    if (this.actionsTried[i] == this.nextAction && this.targetsTried[i] == this.nextActionTarget) {
                        this.actionsTried.splice(i, 1);
                        this.targetsTried.splice(i, 1);
                    }
                }
                
                //If goal has parent, make the current goal's parent the new goal.
                if (!!this.currGoal.parent) {
                    this.setCurrGoal(this.currGoal.parent);
                }
                else {
                    this.setCurrGoal("wait");
                }
                break;
            case "learnFail": //If action "learnAboutX" isn't successful, try another method of learning.
                //Add to actionsTried along with target; try action again with new targets;  
                //If no score > 0 actions exist, plan accordingly in planning function. 
                this.setCurrGoal(this.currGoal.child[0]);
                //Remove "learnAboutX" from accomplished goals. 
                var i = this.goalsAccomplished.indexOf(gl[this.currGoal.child[0]]);
                this.goalsAccomplished.splice(i, 1);

                //(include in planning code)Goto parent; if parent's children are "or", go to next available child. 
                //Otherwise, go to parent and repeat.
                break;
        }
        
        //Remove action from nextAction 
        this.nextAction = null; this.nextActionTarget = null; this.actionTimer = 0;
    }

    //Planing and Heuristics
    //______________________________
    //Plan for next action
    this.plan = function plan() { 
        //Function Description
        /* 
            1. If currGoal's children haven't been accomplished, decompose and re-plan;
            2. Find legal actions based on current world state and action preconditions; 
            3. Score actions -- compare goal's desired effects and action effects. 
            4. If no available actions, pop to parent goal and re-plan.
        */
        
        //Check if goal has any child nodes, check that they're are accomplished. If not, make child current goal then re-plan.
        if (this.currGoal.child.length > 0 && this.currGoal.childLogic == "and") {

            //Check if a child has been tried and failed; if so, pop to parent goal. 
            for (i = 0; i < this.currGoal.child.length; i++) {
                if (this.goalsTried.indexOf(gl[this.currGoal.child[i]]) != -1) {
                    this.goalsTried.push(this.currGoal); 
                    //If parent node exists, set goal to parent; else, wait. 
                    if(!!this.currGoal.parent) {this.setCurrGoal(this.currGoal.parent); this.plan(); return;}
                    else {this.setCurrGoal("wait"); return;}
                }
            }
            
            //If not, choose a goal that has yet to be accomplished. 
            for (i = 0; i < this.currGoal.child.length; i++ ) {
                if ( this.goalsAccomplished.indexOf(gl[this.currGoal.child[i]]) == -1) { //If goal hasn't been accomplished.
                    this.setCurrGoal(this.currGoal.child[i]);
                    this.plan();
                    return; 
                }
            }
         } 
         //Else, if logic is "or", and no children have been accomplished, choose a child that has yet to be tried. 
         else if (this.currGoal.child.length > 0 && this.currGoal.childLogic == "or") {
            //Check if at least one child has been accomplished; score goals based on personality vectors.
            var score = [];
            var orGoalAccomplished = false;
            for (var i = 0; i < this.currGoal.child.length; i++) { 
                if (this.goalsAccomplished.indexOf(gl[this.currGoal.child[i]]) != -1 ) { 
                    orGoalAccomplished = true; 
                }
                else {score[i] = (!!gl[this.currGoal.child[i]].personality) ? this.getPersonality(gl[this.currGoal.child[i]].personality) : 0;}    
            }
            
            //If no one goal has been accomplished, choose best child that hasn't been tried.
            if (!orGoalAccomplished) { 

                var goals = []; //Goals userChar has yet to try. 
                for (i = 0; i < this.currGoal.child.length; i++) {
                    if (this.goalsTried.indexOf(gl[this.currGoal.child[i]]) == -1) {
                        goals.push(this.currGoal.child[i]);
                    }
                }

                if (goals.length > 0) {
                    var bestGoalIndex = goals.length - 1;
                    for (i = bestGoalIndex; i >= 0; i-- ) {
                       if (score[i] > score[bestGoalIndex]) {
                          bestGoalIndex = i; 
                        }
                    } 

                    this.setCurrGoal(goals[bestGoalIndex]); 
                    this.plan(); 
                    return;
                }                      
            }
         }

        //Create an array of desired goal effects. 
        var desiredEffects = this.currGoal.desiredEffects; 
        
        //Create an array of legal actions and targets.
        var legalActions = [];
        var legalTargets = [];
        var legalActionScore = [];

        //Check for legal actions (w/ chars targets)
        for  (var cName in cl) { //Character targets
            for (var aName in al) {
                
                if (aName != "getItem" && aName != "moveToItemLoc" && aName != "buyItemFromBlackmarket") {
                    
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
        //Check for legal actions (w/ items targets)
        for (var iName in il) {
            for (var aName in al) {
                if (aName == "getItem" || aName == "moveToItemLoc" || aName == "askAboutCharItem" || aName == "buyItemFromBlackmarket") {
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
            //$("#simOutput").append("<hr>" +legalActions[i].name + " : " + legalTargets[i].name);

            var score = 0;
            
            for (j = 0; j < desiredEffects.length; j++) { //Compare currGoal's desired effects and action's effects.
                for (k = 0; k < legalActions[i].effectsDesc.length; k++) {
                    
                    var effectCharacter, effectValue;
                    //Determining effect character.
                    if(legalActions[i].effectsDesc[k].character == "userChar") {effectCharacter = this;}
                    else if (legalActions[i].effectsDesc[k].character == "targetChar") {effectCharacter = legalTargets[i];}
                    else {effectCharacter = legalActions[i].effectsDesc[k].character;}
                    //Determining effect Value. 
                    if(legalActions[i].effectsDesc[k].value == "userChar") {effectValue = this;}
                    else if (legalActions[i].effectsDesc[k].value == "targetChar") {effectValue = legalTargets[i];}
                    else {effectValue = legalActions[i].effectsDesc[k].value;}

                    var goalCharacter, goalValue;
                    //Determining goal character.
                    if(desiredEffects[j].character == "userChar") {goalCharacter = this;}
                    else if (desiredEffects[j].character== "targetChar") {goalCharacter = legalTargets[i];}
                    else {goalCharacter = desiredEffects[j].character;}
                    //Determining goal value.
                    if(desiredEffects[j].value == "userChar") {goalValue = this;}
                    else if (desiredEffects[j].value == "targetChar") {goalValue = legalTargets[i];}
                    else {goalValue = desiredEffects[j].value;}

                    //$("#simOutput").append("<hr>" +goalCharacter);
                    //if (!!goalCharacter) {$("#simOutput").append("<hr>" +goalCharacter.name + " : " + effectCharacter.name);}
                    //$("#simOutput").append("<hr>" +desiredEffects[j].attr + " : " + legalActions[i].effectsDesc[k].attr);
                    //$("#simOutput").append("<hr>" +goalValue.name + " : " + effectValue.name);

                    
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
        //Remove actions and targets that have been already tried. 
        var deletionList = []; 
        
        for(i = 0; i < legalActions.length; i++) { 
            if (legalActionScore[i] < 1) { deletionList.push(i); }
            else if ( //If action and target are already tried, add to deletion list.
                this.actionsTried.indexOf(legalActions[i]) != -1 &&
                this.actionsTried.indexOf(legalActions[i]) == this.targetsTried.indexOf(legalTargets[i])
                ) {
                deletionList.push(i); 
            }
        } 


        
        for(var i = deletionList.length-1; i >= 0; i--) { 
            //$("#simOutput").append("<hr>" +legalActions[deletionList[i]].name + " : " + legalTargets[deletionList[i]].name);
            legalActions.splice(deletionList[i], 1);
            legalActionScore.splice(deletionList[i], 1);
            legalTargets.splice(deletionList[i], 1);
        } 

        //If there are no legal actions available to perform, go to parent node. 
        if (legalActions.length < 1) { 

            //Check if goal is killTibbs (overall goal).
            if(this.currGoal == gl["killTibbs"] && !cl.tibbs.alive) {$("#simOutput").append("<hr>" +"Tibbs is dead!");}

            $("#simOutput").append("<hr>" +this.name + " has no legal actions available to " + this.currGoal.name);
            this.goalsTried.push(this.currGoal); //Remember that the character tried and failed to meet this goal.    

            //Set currGoal to parent.
            if(!!this.currGoal.parent) {
                this.setCurrGoal(this.currGoal.parent);
                this.plan();
                return;
            } else {
                this.setCurrGoal("wait");
                return;
            }
        }

        //If there are legal actions to preform, choose best available actions based on desired effects. 
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
            return true;
        }
    }

    //Decide how to repsond to other char actions: askCharItem, etc.
    this.planResponse = function planResponse(targetChar, targetItem) {
        var score, responses, bestIndex; 
        
        //Create a array of repsonse actions.
        responses = [];
        for (var aName in al) {
            for (var effect in al[aName].effectsDesc) {
                if(al[aName].effectsDesc[effect].attr == "respond") {responses.push(al[aName]);}
            }
        }

        //Score response actions.
        var score = [];
        for (var i = 0; i < responses.length; i++) {
            score[i] = 0;
            switch(responses[i].name) {
                case "tellAboutItem":
                    score[i] += this.personality.knd;
                    break;
                case "ignoreAsk":
                    score[i] -= this.personality.knd; //Subtract kindness
                    score[i] -= this.personality.hon; //Add honesty
                    break;
            }
        }

        //Sort best reponse choice.
        bestIndex = 0;
        for(var i = 0; i < score.length; i++) {
            if(score[i] > score[bestIndex]) {bestIndex = i;}
        }

        al[responses[bestIndex].name].setUser(this);
        al[responses[bestIndex].name].setTarget(targetChar); 
        al[responses[bestIndex].name].setTargetItem(targetItem);

        return responses[bestIndex].effects();
    }

    //Decide details of particular actions: askAboutCharItem, etc.
    this.decide = function decide(){
        var score, chars, bestIndex;

        //Create an array of possible characters to ask
        chars = [];
        for (i = 0; i < this.knowledge.length; i++) {
            if (
                this.knowledge[i].predicateType == "loc" && //If predicate type is location
                cl.hasOwnProperty(this.knowledge[i].targetSubject.handle) //And targetSubject is a character...
            ) {
                chars.push(this.knowledge[i].targetSubject); 
            }
        }
        
        //Evaluate which character should be sought after, based on distance and affection. 
        score = [];
        for (var i = 0; i < chars.length; i++) {

            score[i] = 0;
            
            //Add users level of affection to this char's score;
            if (!!this.relations[chars[i].handle]) {
                score[i] += this.relations[chars[i].handle].aff;
                score[i] += this.relations[chars[i].handle].fam;
            }
        }

        //Find the best score. 
        bestIndex = 0;
        for (var i = 0; i < chars.length; i++) {
            if(chars[i] > chars[bestIndex]) {bestIndex = i;}
        }

        //Return pref. character
        return chars[bestIndex]; 
        
    }



    this.moveToLoc = function moveToLoc(targetLocation) {
        this.loc = targetLocation;
        for (i = 0; i < this.has.length; i++) { //Updating inventory locations. 
            this.has[i].loc = this.loc;
        }

        //Check if black market is located here; if yes, character learns black market's loc.
        if (targetLocation == il.blackMarket.loc) {
            this.knowledge.push(new Knowledge(il.blackMarket, null, "loc", null, targetLocation));
            $("#simOutput").append("<hr>" +this.name + " stumbles upon the black market");
        }
    }

    this.responseQuest = function responseQuest(item) {
        var result = this.checkKnow(item, "asked");
        if(!!result) {
            var response = result.name + " came arounding asking for it. That's all I know."
            return response;
        } else {
            return "I don't know anything about that.";
        }
    }

}

/*
Relationship Class
--
Constructor: (
    targetChar          //target character        
    fam                 //familiarity
    aff                 //affection
)
*/
function Relationship(targetChar, fam, aff) {
    this.targetChar     = targetChar;
    this.fam            = fam;
    this.aff            = aff;
} 

/*
Knowledge Class
--
Constructor: (
    targetSubject       //character or item, e.g. Tibbs;
    indirectTarget      //for relationships' target character, otherwise null;
    predicateType       //location, has, knowledge, relationship or personality, e.g. "personality";
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

} 

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
    this.owner          = owner;
} 

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
    this.marker;

    this.hideMarker = function hideMarker() {
        this.marker.setMap(null);
    }

    this.showMarker = function showMarker() {
        this.marker.setMap(map);
        map.panTo(new google.maps.LatLng(this.coor.lat, this.coor.long));
    }
}

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
    this.targetItem;

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

    //Set action's target item 
    this.setTargetItem = function setTargetItem(item) {
        this.targetItem = item;
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

                case "knowsLoc": //Check that character knows the location of an target char or item.
                    var character = this.preconditions[i].character;
                    if (character == "userChar") {character = this.userChar;}
                    var target = this.preconditions[i].value;
                    if (target == "targetChar") {target = this.targetChar;}
                    var result = (!character.checkKnow(target, "loc")) ? false : true;  //(character.checkKnow(target, "loc") ? true : false;
                    legalFlags.push(result);
                    break;

                case "prox":
                    var character = this.preconditions[i].character;
                    var value = this.preconditions[i].value;

                    if (character == "userChar") {character = this.userChar;}
                    else if (character == "targetChar") {character = this.targetChar;}
                    
                    if (value == "userChar") {value = this.userChar;}
                    else if (value == "targetChar") {value = this.targetChar;}

                    var result = character.checkProx(value);                    
                    legalFlags.push(result);
                    break;
            }
        }  
        //If all legalFlags are true (all preconditions met), return true; else return false.
        if (legalFlags.indexOf(false) > -1) {return false;}
        else {return true; $("#simOutput").append (this); }
    }
} 

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

/*
Player Class
---
Constructor: (
    name                //goal's name
    parent              //goal's parent in goal hierarchy
    child               //goal's child in goal hierarchy
    desired effects     //desired goal state

)
*/
function Player() {
    this.position;
    this.accuracy;
    this.marker;

    this.initPlayer = function initPlayer() {
        this.marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: 'Player',
            icon: {
                scaledSize: new google.maps.Size(40, 55),
                url: "img/marker.png" 
            }
        });
    }

    this.setCoords = function setCoords(pos) { //Set coordinates and accuracy.
        this.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.accuracy = pos.accuracy;
        
        this.marker.setPosition(this.position); //Update player marker.
    } 

    this.getPosition = function getPosition(type) {
        switch (type) {
            case "lat":
                return this.position.latitude;
                break;
            case "lng":
                return this.position.longitude;
                break;
        }
    }

    this.getAccuracy = function getAccuracy() {
        return this.accuracy;
    }

}

/*
Player Class
---
Constructor: (
    name                //goal's name
    parent              //goal's parent in goal hierarchy
    child               //goal's child in goal hierarchy
    desired effects     //desired goal state

)
*/
function Quest(name, img, loc, description, btn, next) {
    this.name = name;
    this.loc = loc;
    this.img = img;
    this.description = description;
    this.btn = btn;
    this.next = next;

    this.show = function show() {
        if (!!img) {
            $('#map-canvas').slideUp();
            $('#questTop').html("<img src='./img/" + this.img + "'/>");
            $('#questTop').show();
        } else {
            $('#map-canvas').slideDown();
            this.loc.showMarker();
            $('#questTop').hide();
        }
        
        $('#questMessage').html("<h2>"+this.name+"</h2><p>"+this.description+"</p>");

        this.next(); 

        $('#btns').html("");
        for(i = 0; i < this.btn.length; i+=2) {
            $('#btns').append("<div class='btn' onclick='goToQuest("+ this.btn[i+1] +")'>"+ this.btn[i] +"</div>");    
        }
        
    }
}


