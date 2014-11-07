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
    loc                 //character's current location
    has					//character's current inventory, array of item objects, e.g. {Gun, securityTape};
)
*/
function initChar() { 
	cl.tibbs = new Character(
		"Steven Tibbs", 				//name
		{								//personality vectors
			"knd": 0.3, 				//kindness
			"van": 1, 					//vanity
			"hon": -0.3, 				//honesty
			"int": 0.9					//intelligence
		}, 
		ll.clough,					//starting location
		[]								//items currently carrying, i.e. none;
	);

	//Jennifer Rivers
	cl.rivers = new Character(
		"Jennifer Rivers", 				//name
		{								//personality vectors
			"knd":-0.9, 					//kindness
			"van":0.8, 					//vanity
			"hon":0.5, 					//honesty
			"int":0.8					//intelligence
		}, 
		ll.healthCenter,						//starting location
		[]								//items currently carrying, i.e. none;
	);

	//Detective Boomer
	cl.boomer =  new Character(
		"Detective Boomer", 			//name
		{								//personality vectors
			"knd":-0.9, 				//kindness
			"van":-0.5, 				//vanity
			"hon":0, 					//honesty
			"int":1						//intelligence
		}, 
		ll.vanLeer,						//starting location
		[]								//items currently carrying, i.e. none;
	);

	//Elis Tibbs, brother
	cl.elis = new Character(
		"Elis Tibbs", 					//name
		{								//personality vectors
			"knd":1, 					//kindness
			"van":0.2, 					//vanity
			"hon":0.5, 					//honesty
			"int":0						//intelligence
		}, 
		ll.library,						//starting location
		[]								//items currently carrying, i.e. none;
	);	
}

//Initiate characters' relations and knowledge
function initCharRelations() {
	cl.tibbs.setRelations(
		{ //relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
			"rivers": new Relationship(cl.rivers, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
			"boomer": new Relationship(cl.boomer, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
		}
	);

	cl.rivers.setRelations(
		{ //relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
			"tibbs": new Relationship(cl.tibbs, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
			"boomer": new Relationship(cl.boomer, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
		}
	);

	cl.boomer.setRelations(
		{ //relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
			"tibbs": new Relationship(cl.tibbs, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
			"rivers": new Relationship(cl.rivers, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
		}
	);

	cl.elis.setRelations(
		{ //relationship vectors, e.g. (targetChar, cmp, dom, fam, aff, trs, dec, idb);
			"tibbs": new Relationship(cl.tibbs, 0.6, -0.1, 0.8, 0.7, 0.4, -0.6, -0.8),
			"rivers": new Relationship(cl.rivers, 0.1, -0.4, 0.9, 0.1, 0.2, -0.1, -0.4)
		}
	);
}

function initCharKnowledge() {
	cl.tibbs.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.rivers, null, "personality", "hon", -0.4), //Tiibs believes that Rivers exibits low honesty;
			new Knowledge(cl.boomer, cl.tibbs, "personality", "aff", -0.3), //Tibbs believes that Dect. Boomer has little affection for him;
			new Knowledge(cl.rivers, cl.boomer, "relationship", "dom", .9) //Tibbs believes that Rivers has a dominating relationsip with Boomer;
		]
	);

	cl.rivers.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "loc", null, ll.clough), //Rivvers believes that Tibbs is at the ferst center for the arts;
			new Knowledge(cl.boomer, null, "knowledge", null, new Knowledge(cl.rivers, cl.tibbs, "relationship", "aff", -0.8)), //Rivres believes that Dect. Boomer believes that rivers fells little affection for Tibbs.
			new Knowledge(cl.tibbs, cl.boomer, "relationship", "dom", .9), //Rivers believes that Tibbs has a dominating relationsip with Boomer;
			new Knowledge(il.gun, null, "loc", null, ll.ferst) //Rivers knows the location of the gun. 
		]
	);

	cl.boomer.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "personality", "hon", -0.4), //Boomer believes that Tibbs exibits low honesty;
			new Knowledge(cl.rivers, cl.tibbs, "relationship", "aff", -0.8), //Boomer believes that Rivers has little affection for Tibbs; 
			new Knowledge(cl.tibbs, cl.rivers, "relationship", "dom", .9) //Boomer believes that Tibbs has a dominating relationsip with Rivers;
		]
	);

	cl.elis.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "personality", "hon", -0.4), //Boomer believes that Tibbs exibits low honesty;
			new Knowledge(cl.rivers, cl.tibbs, "relationship", "aff", -0.8), //Boomer believes that Rivers has little affection for Tibbs; 
			new Knowledge(cl.tibbs, cl.rivers, "relationship", "dom", .9) //Boomer believes that Tibbs has a dominating relationsip with Rivers;
		]
	);
}
