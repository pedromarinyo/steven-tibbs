//Initiate quests
function initQuests() {
	var chap1;

	switch(weapon) {
		case il.gun:
			chap1 = "put a hole in his head";
			break;
		case il.rope:
			chap1 = "strangled the life out of him";
			break;
		case il.injection:
			chap1 = "injected him with who-knows-what";
			break;
		case il.poison:
			chap1 = "slipped some poison in his magarita";
			break;
		case il.bat:
			chap1 = "improved their batting average all over his face";
			break;
	}


	ql = [
		new Quest(
			"Prologue",
			"phone.png",
			ll.clough,
			"Boomer here. I got another job for you. Meet me at the <b> Clough Building</b>, and I'll fill you in on the details. <br><br>This could be your big break. Don't blow it.",
			["Begin", 1],
			function() {
				
			}
		),

		new Quest(
			"Prologue",
			null,
			ll.clough,
			"Meet me at the <b> Clough Building</b>, and I'll fill you in on the details.",
			["Teleport to Clough", 2],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.clough.coor.lat, ll.clough.coor.long));
				ll.clough.showMarker();
			}
		),

		new Quest(
			"Chapter 1: <br>The Crime Scene",
			"notebook.png",
			ll.clough,
			"You may recognize our victim. Mr. Tibbs here was the CEO of Sunshine Inc. -- some fancy Silicon Vally startup.<br><br> Had a big talk scheduled for this afternoon, but someone " + chap1 + ". <br><br> It's your job to figure out who.",
			["\"You can count on me.\"", 3],
			function() {
				
			}
		),

		new Quest(
			"",
			"notebook.png",
			ll.clough,
			"I certainly hope so.<br><br>Let's get down to buisness. There's four suspects. Start with them.<br><br>Shall I give you a run down?",
			[
				"\"No need. Just point me to \'em.\"", 8,
				"\"Sure. I like to be well informed.\"", 4
			],
			function() {
				
			}
		),

		new Quest(
			"Suspect 1:<br>Norma Bryce",
			"bryce.png",
			ll.clough,
			"Ah, Norma Bryce -- Tibbs' ghost writer. Word has it that she was jealous of Tibbs' spotlight.<br>You're likely to find her hanging about the <b>library</b>.",
			[
				"\"Got it. Who's next?\"", 5,
				"\"Nevermind. Let's get started.\"", 8
			],
			function() {
				
			}
		),

		new Quest(
			"Suspect 2:<br>Elis Tibbs",
			"elis.png",
			ll.clough,
			"Steven Tibbs' younger brother. I don't know much about him myself. I here he's a student here at Georgia Tech. <br><br> You can probably find him in the <b>Van Leer</b> building.",
			[
				"\"Got it. Who's next?\"", 6,
				"\"Nevermind. Let's get started.\"", 8
			],
			function() {
				
			}
		),

		new Quest(
			"Suspect 3:<br>John Meeks",
			"meeks.png",
			ll.clough,
			"Tibbs' longtime assistant. Rumor has it he's been itching for a promotion. He's a peculiar one -- look for him near the <b>fountain</b>.",
			[
				"\"Got it. Who's next?\"", 7,
				"\"Nevermind. Let's get started.\"", 8
			],
			function() {
				
			}
		),

		new Quest(
			"Suspect 4:<br>Jennifer Rivers",
			"rivers.png",
			ll.clough,
			"Tibbs' ex-wife. The tabloids say she's teaching theatre nowadays. You can find her at the <b>Ferst Center for the Arts</b>.",
			[
				"\"Let's get started.\"", 8
			],
			function() {
				
			}
		),

		new Quest(
			"",
			null,
			ll.clough,
			"You're free to start with whomever you like. Remember, Detective: we're counting on you.",
			[
				"Teleport to <b>Library</b>", 9,
				//"Teleport to <b>Van Leer</b>", 7,
				//"Teleport to <b>Fountain</b>", 15,
				//"Teleport to <b>Ferst</b>", 7
			],
			function() {
				ll.library.showMarker();
				ll.vanLeer.showMarker();
				ll.fountain.showMarker();
				ll.ferst.showMarker();
				ll.clough.showMarker();
			}
		),

		new Quest(
			"Norma Bryce",
			"bryce.png",
			ll.library,
			"\"Manuscript's due next week. Can't talk.\"",
			[
				"Ask about <b>Gun</b>", 10,
				"Ask about <b>Rope</b>", 11,
				"Ask about <b>Injection</b>", 12,
				"Ask about <b>Bat</b>", 13,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
				currChar = cl.bryce;
			}
		),

		new Quest(
			"Tell me about the Gun",
			"bryce.png",
			ll.library,
			cl.bryce.responseQuest(il.gun),
			[
				"Ask about <b>Rope</b>", 11,
				"Ask about <b>Injection</b>", 12,
				"Ask about <b>Bat</b>", 13,
				"Ask about <b>Poison</b>", 14,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
			}
		),

		new Quest(
			"The Rope?",
			"bryce.png",
			ll.library,
			cl.bryce.responseQuest(il.rope),
			[
				"Ask about <b>Gun</b>", 10,
				"Ask about <b>Injection</b>", 12,
				"Ask about <b>Bat</b>", 13,
				"Ask about <b>Poison</b>", 14,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
			}
		),

		new Quest(
			"The Injection?",
			"bryce.png",
			ll.library,
			cl.bryce.responseQuest(il.injection),
			[
				"Ask about <b>Gun</b>", 10,
				"Ask about <b>Rope</b>", 11,
				"Ask about <b>Bat</b>", 13,
				"Ask about <b>Poison</b>", 14,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
			}
		),

		new Quest(
			"The Bat?",
			"bryce.png",
			ll.library,
			cl.bryce.responseQuest(il.bat),
			[
				"Ask about <b>Gun</b>", 10,
				"Ask about <b>Rope</b>", 11,
				"Ask about <b>Injection</b>", 12,
				"Ask about <b>Poison</b>", 14,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
			}
		),

		new Quest(
			"The Poison?",
			"bryce.png",
			ll.library,
			cl.bryce.responseQuest(il.poison),
			[
				"Ask about <b>Gun</b>", 10,
				"Ask about <b>Rope</b>", 11,
				"Ask about <b>Injection</b>", 12,
				"Ask about <b>Bat</b>", 13,
				"Return to <b>Clough</b>", 8
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
			}
		),

		new Quest(
			"John Meeks",
			"meeks.png",
			ll.fountain,
			"\"Isn't this fountain wonderful?\"",
			[
				"Ask about <b>Gun</b>", 7,
				"Ask about <b>Rope</b>", 7,
				"Ask about <b>Injection</b>", 7,
				"Ask about <b>Bat</b>", 7,
				"Return to <b>Clough</b>", 7
			],
			function() {
				player.marker.setPosition(new google.maps.LatLng(ll.library.coor.lat, ll.library.coor.long));
				currChar = cl.bryce;
			}
		),

		

	];

}