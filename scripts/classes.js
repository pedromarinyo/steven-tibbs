
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
    function Character(name, personality, relations, knowledge, loc, has) {
        this.name           = name;
        this.personality    = personality;
        this.relations      = relations;
        this.knowledge      = knowledge;
        this.loc            = loc;
        this.has            = has;

        this.alive          = true;
        this.currGoal;

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
            while (i < this.relations.length()) {
                if(this.relations[i].targetChar == targetChar) {return this.relations[i].attribute;}
                i++;
            }
            return null;
        }

        //Sets relationship parameter for a given target character;
        this.setRelation = function getRelation(targetChar, attribute, value) {
            var i = 0;
            while (i < this.relations.length()) {
                if(this.relations[i].targetChar == targetChar) {
                    this.relations[i].attribute = value;
                }
                i++;
            }
        }

        //Check if character is holding an item;
        this.checkItem = function checkItem(item) {
            var i = 0;
            while (i < this.has.length()) {
                if(this.has[i] == item) {return true;}
                i++;
            }
            return false;
        }

        //Remove item from character's inventory
        this.removeItem = function removeItem(item) {
            var i = this.has.indexOf(item);
            if (i > -1) { this.has.splice(index, 1);}
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
        value               //location, knowledge, relationship or personality, value between -1 and 1. 
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
        effects             //action's effects
    )
    */
    function Action(name, preconditions, effects) {
        this.name           = name;
        this.preconditions  = preconditions;
        this.effects        = effects;

        this.userChar;
        this.targetChar;
    }
    window.Action = Action;

    /*
    Goal CLass
    --
    Constructor: (
        name                //goal's name
        parent              //goal's parent in goal hierarchy
        child               //goal's child in goal hierarchy
        operators           //potential actions for accomplising goal
    )
    */
    function Goal(name, parent, child, operators) {
        this.name           = name;
        this.parent         = parent;
        this.child          = child;
        this.operators      = operators;
    }
    window.Goal = Goal;

}(window));