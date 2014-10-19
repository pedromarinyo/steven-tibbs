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
        knowledge           //character's knowledge model, array of knowledge nodes (see knowledge class);
        loc                 //character's current location
        has					//character's current inventory, array of item objects, e.g. {Gun, securityTape};

    )
    */
    function initChar() {

		var Tibbs = new Character(
							"Steven Tibbs", 				//name
							{								//personality vectors
								"knd":0.3, 					//kindness
								"van":1, 					//vanity
								"hon":-0.3, 				//honesty
								"int":0.9					//intelligence
							}, 
							{ 								//relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
								new Relationship(Rivers, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
								new Relationship(Boomer, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4),
							},
							{								//knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
								new Knowledge(Rivers, null, "personality", "hon", -0.4), //Tiibs believes that Rivers exibits low honesty;
								new Knowledge(Boomer, null, "knowledge", new knowledge(Rivers, Tibbs "relationship", "aff", -0.8)) //Tibbs believes that Dect. Boomer believes that rivers fells little affection for Tibbs.
								new Knowledge(Rivers, Boomer, "relationship", "dom", .9); //Tibbs believes that Rivers has a dominating relationsip with Boomer;
							}
							Ferst,							//starting location
							{}								//items currently carrying, i.e. none;
    	);

	} window.initChar = function initChar();