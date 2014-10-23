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

	//Characters
	//Steven Tibbs
	tibbs = new Character(
						"Steven Tibbs", 				//name
						{								//personality vectors
							"knd":0.3, 					//kindness
							"van":1, 					//vanity
							"hon":-0.3, 				//honesty
							"int":0.9					//intelligence
						}, 
						{ 								//relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
							"rivers": new Relationship(rivers, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
							"boomer": new Relationship(boomer, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
						},
						[								//knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
							new Knowledge(rivers, null, "personality", "hon", -0.4), //Tiibs believes that Rivers exibits low honesty;
							new Knowledge(boomer, tibbs, "personality", "aff", -0.3), //Tibbs believes that Dect. Boomer has little affection for him;
							new Knowledge(rivers, boomer, "relationship", "dom", .9) //Tibbs believes that Rivers has a dominating relationsip with Boomer;
						],
						ferst,							//starting location
						{}								//items currently carrying, i.e. none;
	);

	//Jennifer Rivers
	rivers = new Character(
						"Jennifer Rivers", 				//name
						{								//personality vectors
							"knd":0.3, 					//kindness
							"van":1, 					//vanity
							"hon":-0.3, 				//honesty
							"int":0.9					//intelligence
						}, 
						{ 								//relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
							"tibbs": new Relationship(tibbs, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
							"boomer": new Relationship(boomer, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
						},
						[								//knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
							new Knowledge(tibbs, null, "personality", "hon", -0.4), //Rivvers believes that Tibbs exibits low honesty;
							new Knowledge(boomer, null, "knowledge", null, new Knowledge(rivers, tibbs, "relationship", "aff", -0.8)), //Rivres believes that Dect. Boomer believes that rivers fells little affection for Tibbs.
							new Knowledge(tibbs, boomer, "relationship", "dom", .9) //Rivers believes that Tibbs has a dominating relationsip with Boomer;
						],
						vanLeer,						//starting location
						{}								//items currently carrying, i.e. none;
	);

	//Detective Boomer
	boomer = new Character(
						"Detective Boomer", 			//name
						{								//personality vectors
							"knd":0.3, 					//kindness
							"van":1, 					//vanity
							"hon":-0.3, 				//honesty
							"int":0.9					//intelligence
						}, 
						{ 								//relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
							"tibbs": new Relationship(tibbs, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
							"rivers": new Relationship(rivers, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
						},
						[								//knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
							new Knowledge(tibbs, null, "personality", "hon", -0.4), //Boomer believes that Tibbs exibits low honesty;
							new Knowledge(rivers, tibbs, "relationship", "aff", -0.8), //Boomer believes that Rivers has little affection for Tibbs; 
							new Knowledge(tibbs, rivers, "relationship", "dom", .9) //Boomer believes that Tibbs has a dominating relationsip with Rivers;
						],
						vanLeer,						//starting location
						{}								//items currently carrying, i.e. none;
	);

}
