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
		"tibbs",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()						//intelligence
		}, 
		ll.clough,						//starting location
		[], 							//items currently carrying, i.e. none;
		2000000
	);

	//Norma Bryce
	cl.bryce = new Character(
		"Norma Bryce", 				//name
		"bryce",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()						//intelligence
		}, 
		ll.library,						//starting location
		[], 							//items currently carrying, i.e. none;
		Math.floor(Math.random() * 10000)
	);

	//Jenna Meeks
	cl.meeks = new Character(
		"Jenna Meeks", 				//name
		"meeks",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()						//intelligence
		}, 
		ll.fountain,						//starting location
		[], 							//items currently carrying, i.e. none;
		Math.floor(Math.random() * 10000)
	);

	//Jennifer Rivers
	cl.rivers = new Character(
		"Jennifer Rivers", 				//name
		"rivers",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()					//intelligence
		}, 
		ll.ferst,				//starting location
		[],								//items currently carrying, i.e. none;
		Math.floor(Math.random() * 10000)
	);

	//Detective Boomer
	cl.boomer =  new Character(
		"Detective Boomer", 			//name
		"boomer",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()						//intelligence
		}, 
		ll.clough,						//starting location
		[],								//items currently carrying, i.e. none;
		Math.floor(Math.random() * 5000)
	);

	//Elis Tibbs, brother
	cl.elis = new Character(
		"Elis Tibbs", 					//name
		"elis",
		{								//personality vectors
			"knd": Math.random(), 					//kindness
			"van":Math.random(), 					//vanity
			"hon":Math.random(), 					//honesty
			"int":Math.random()						//intelligence
		}, 
		ll.vanLeer,						//starting location
		[],								//items currently carrying, i.e. none;
		Math.floor(Math.random() * 15000)
	);	
}

//Initiate characters' relations and knowledge
function initCharRelations() {
	cl.tibbs.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			"rivers": new Relationship(cl.rivers, Math.random(), Math.random()),
			"boomer": new Relationship(cl.boomer, Math.random(), Math.random()),
			"bryce": new Relationship(cl.bryce, Math.random(), Math.random()),
			"meeks": new Relationship(cl.meeks, Math.random(), Math.random())
		}
	);

	cl.rivers.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			//"tibbs": new Relationship(cl.tibbs, 0, 0),
			//"boomer": new Relationship(cl.boomer, Math.random(), Math.random()),
			//"elis": new Relationship(cl.elis, Math.random(), Math.random()),
			"bryce": new Relationship(cl.bryce, Math.random(), Math.random()),
			"meeks": new Relationship(cl.meeks, Math.random(), Math.random())
		}
	);

	cl.boomer.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			"tibbs": new Relationship(cl.tibbs,  0, 0),
			"rivers": new Relationship(cl.rivers, Math.random(), Math.random()),
			"elis": new Relationship(cl.elis, Math.random(), Math.random()),
			"bryce": new Relationship(cl.bryce, Math.random(), Math.random()),
			"meeks": new Relationship(cl.meeks, Math.random(), Math.random())
		}
	);

	cl.elis.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			"tibbs": new Relationship(cl.tibbs,  0, 0),
			//"rivers": new Relationship(cl.rivers, Math.random(), Math.random()),
			//"boomer": new Relationship(cl.boomer, Math.random(), Math.random()),
			"bryce": new Relationship(cl.bryce, Math.random(), Math.random()),
			"meeks": new Relationship(cl.meeks, Math.random(), Math.random())
		}
	);

	cl.bryce.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			"tibbs": new Relationship(cl.tibbs,  0, 0),
			"rivers": new Relationship(cl.rivers, Math.random(), Math.random()),
			"boomer": new Relationship(cl.boomer, Math.random(), Math.random()),
			"elis": new Relationship(cl.elis, Math.random(), Math.random()),
			"meeks": new Relationship(cl.meeks, Math.random(), Math.random())
		}
	);

	cl.meeks.setRelations(
		{ //relationship vectors, e.g. (targetChar, fam, aff);
			"tibbs": new Relationship(cl.tibbs,  0, 0),
			"rivers": new Relationship(cl.rivers, Math.random(), Math.random()),
			"boomer": new Relationship(cl.boomer, Math.random(), Math.random()),
			"elis": new Relationship(cl.elis, Math.random(), Math.random()),
			"bryce": new Relationship(cl.bryce, Math.random(), Math.random())
		}
	);
}

function initCharKnowledge() {
	//Prereqquisites:
	/*
		1. Everyone knows Tibbs' location; 
		2. Everyone knows the location of at least one POI;
	*/
	cl.tibbs.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.rivers, null, "personality", "hon", -0.4), //Tiibs believes that Rivers exibits low honesty;
			new Knowledge(cl.boomer, cl.tibbs, "personality", "aff", -0.3), //Tibbs believes that Dect. Boomer has little affection for him;
			new Knowledge(cl.rivers, cl.boomer, "relationship", "dom", .9) //Tibbs believes that Rivers has a dominating relationsip with Boomer;
		]
	);

	cl.rivers.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			//new Knowledge(cl.boomer, null, "loc", null, ll.clough), //Rivers believes that Boomer is at the ferst center for the arts;
			new Knowledge(cl.elis, null, "loc", null, ll.ferst), //Rivers believes that Boomer is at the ferst center for the arts;
			new Knowledge(cl.tibbs, null, "loc", null, ll.clough),
			new Knowledge(il.rope, null, "loc", null, il.rope.loc),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(il.gun, null, "loc", null, il.gun.loc),
			new Knowledge(cl.bryce, null, "loc", null, ll.ferst)
		]
	);

	cl.boomer.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "personality", "hon", -0.4), //Boomer believes that Tibbs exibits low honesty;
			new Knowledge(il.gun, null, "loc", null, il.gun.loc),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(cl.rivers, cl.tibbs, "relationship", "aff", -0.8), //Boomer believes that Rivers has little affection for Tibbs; 
			new Knowledge(cl.tibbs, cl.rivers, "relationship", "dom", .9),
			new Knowledge(il.bat, null, "loc", null, il.bat.loc),
			new Knowledge(il.rope, null, "loc", null, il.rope.loc),
			new Knowledge(il.gun, null, "loc", null, il.gun.loc),
			new Knowledge(cl.bryce, null, "loc", null, ll.ferst)
		]
	);

	cl.elis.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "personality", "hon", -0.4), //Boomer believes that Tibbs exibits low honesty;
			//new Knowledge(cl.boomer, null, "loc", null, ll.clough), //Rivers believes that Boomer is at the ferst center for the arts;
			new Knowledge(cl.tibbs, null, "loc", null, ll.clough),
			new Knowledge(cl.rivers, cl.tibbs, "relationship", "aff", -0.8), //Boomer believes that Rivers has little affection for Tibbs; 
			new Knowledge(cl.tibbs, cl.rivers, "relationship", "dom", .9),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(cl.meeks, null, "loc", null, ll.ferst),
			new Knowledge(cl.rivers, null, "loc", null, ll.ferst),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(cl.bryce, null, "loc", null, ll.ferst)
		]
	);

	cl.bryce.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.boomer, null, "loc", null, ll.clough), //Rivers believes that Boomer is at the ferst center for the arts;
			new Knowledge(cl.tibbs, null, "loc", null, ll.clough),
			new Knowledge(il.bat, null, "loc", null, il.bat.loc),
			new Knowledge(cl.rivers, null, "loc", null, ll.ferst),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(il.bat, null, "loc", null, il.bat.loc),
			new Knowledge(cl.bryce, null, "loc", null, ll.ferst)
		]
	);

	cl.meeks.setKnowledge(
		[ //knowledge nodes, e.g. (targetSubject, indirectTarget, predicateType, predicateSub, value)
			new Knowledge(cl.tibbs, null, "loc", null, ll.clough),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(cl.elis, null, "loc", null, ll.ferst),
			new Knowledge(il.injection, null, "loc", null, il.injection.loc),
			new Knowledge(il.gun, null, "loc", null, il.gun.loc),
			new Knowledge(cl.bryce, null, "loc", null, ll.ferst)
		]
	);
}
