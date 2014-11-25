var pages = ['start', 'choosequest1', 'quest1clue-map', 'quest1clue-found', 'quest2clue-map', 'quest2clue-found', 'quest3clue-map', 'quest3clue-found', 'quest4clue-map', 'quest4clue-found', 'final'];
var scene_types = ['next', 'selection', 'next', 'next', 'next', 'next', 'next', 'next', 'next', 'next', 'next']

var current_page = -1;
var status_num = 0;
var timeline;
var tool = "gun";
var questtask;


function moveNext() {
	current_page++;
	timeline = pages[current_page];
	// console.log(current_page);
	// console.log("////");
	// console.log(timeline);
	// console.log(scene_types[current_page]);
	//  console.log(tool);
	$('#btn').empty();
	$('#map-canvas').hide();

	//$('#scene_no').text(pages[current_page]);
	//The user should not press back button. It will mess up all the status check 

	if (scene_types[current_page] == 'next') {
		$('#btn').append('<button class="next" id="next">Next</button>');
		$('.next').click(function() {
			moveNext();
			recordselection('None');
			console.log("done");
		});
	} else if (scene_types[current_page] == 'selection') {
		$('#btn').append('<button class="selection" id="object"> Object</button>');
		$('#btn').append('<button class="selection" id="record"> Record</button>');
		//$('#btn').append('<button class="selection" id="Personal"> Personal</button>');
		$('.selection').click(function() {
			moveNext();
			recordselection($(this).attr('id'));
		})
	}

	// console.log("fin");
}



function recordselection(selection) {
	//console.log("starting");
	questtask = selection;
	//console.log(questtask);

	switch (timeline) {
		case "start":
			$('#questTop').append("<center><img src='img/banner.jpg'> </img> </center>  <center><img src='img/background-auditorium.jpg'> </img> <img src='img/character-tibbs.png' style='position:relative; top:-160px; width:110px; margin-bottom:-110px;'  ></img></center>  ");
			$('#questMessage').text("Steven Tibbs, CEO and billionaire philanthropist, disappears when giving a speech in Ferst Center for the Arts. Let's go there to see what happens! ");
			$('#next').text("Find out more!");
			break;

		case "choosequest1":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/bullet.jpg' id='item'></img></center>");
			//$('#questMessage').text("Tibbs is shot by a gun. A bullet is found. Maybe finding the gun would help investigating. Detectives say that the suspect might have bought the gun from the nearby gun store. The crowd are mourning, and some are questioning whether Tibb's had an issue with his family, based on his talk. What would you do next? ");
			$('#questMessage').text(deathInfo+"What would you do next?");
			// $('#object').text("Find the Gun");
// 			$('#record').text("Meet Detective");
// 			$('#personal').text("Meet with Families");
			$('#object').text(quest1.name);
			$('#record').text(quest3.name);
			//$('#personal').text(quest3.name);
			break;


		case "quest1clue-map":
			$('#questTop').empty();
			$('#map-canvas').show();
			$('#questMessage').text("You have to go to "+quest1.destination+" to "+quest1.name+". Click button when you arrive. ");
			$('#next').text("I have arrived");
			break;

		case "quest1clue-found":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>");
			$('#questMessage').text("You have found the "+quest1.award+".");
			$('#next').text("Find where to go");
			break;

		case "quest2clue-map":
			$('#questTop').empty();
			$('#map-canvas').show();
			$('#questMessage').text("You have to go to "+quest2.destination+" to "+quest2.name+". Click button when you arrive. ");
			$('#next').text("I have arrived");
			break;


		case "quest2clue-found":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>");
			$('#questMessage').text("You have found the "+quest2.award+".");
			$('#next').text("Next");
			break;

// 		case "choosequest3":
// 			$('#questTop').empty();
// 			$('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>");
// 			$('#questMessage').text(" You need more clues. You can meet with detectives or families. ");
// 
// 			$('#object').hide();
// 			$('#record').text(quest2.name);
// 			$('#personal').text(quest3.name);
// 			break;

		case "quest3clue-map":
			$('#questTop').empty();
			$('#map-canvas').show();
			$('#questMessage').text("You have to go to "+quest3.destination+" to "+quest3.name+". Click button when you arrive. ");
			$('#next').text("I have arrived ");
			break;

		case "quest3clue-found":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/character-boomer.jpg' id='item'></img></center>");
			//$('#questMessage').text("        	Detective boomer says that the gun might be purchased from the nearby dealershop. He asks if you can go with him to the dealershop to see who purchased the gun recently. ");
			$('#questMessage').text("You have found the "+quest3.award+".");
			$('#next').text(quest4.name);
			break;

		case "quest4clue-map":
			$('#questTop').empty();
			$('#map-canvas').show();
			$('#questMessage').text("You have to go to "+quest4.destination+" to "+quest4.name+". Click button when you arrive. ");
			$('#next').text("I have arrived ");
			break;

		case "quest4clue-found":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/character-boomer.jpg' id='item'></img></center>");

			//$('#questMessage').text("You have found that xxxx visited the dealership before. ");
			$('#questMessage').text("You have found the "+quest4.award+".");
			$('#next').text(" Next ");
			break;


		case "final":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/character-tibbs.jpg' id='item'></img></center>");
			$('#questMessage').text("You have finished your task! you found the suspect. Congratulations! The suspect is "+killer+" and used "+tool+" for the affair. ");
			//	 $('#questBottom button').remove();
			break;




	}




}




/*
	for (i in locationMarkers){
		if (i!=0){
			locationMarkers[i].setMap(null);
		}
	}
	
$('#next_btn').click(function () {
	document.getElementById('quest').style.display="none";
	document.getElementById('stage').style.display="initial";
	document.getElementById('stageTop').style.display="none";
	document.getElementById('guide').style.display="initial";
	
	for (i in locationMarkers){
		if (i!=0){
			locationMarkers[i].setMap(null);
		}
	}
});


//Button interface, functions
$('#startSimulation_btn').click(function () {
	document.getElementById('stage').style.display="none";
	document.getElementById('quest').style.display="initial";
});

$('#next_quest').click(function () {
	alert("You got the clue: Steven Tibbs has never been to Ferst Center for Arts")
	document.getElementById('stage').style.display="none";
	document.getElementById('quest').style.display="initial";
});
 
*/