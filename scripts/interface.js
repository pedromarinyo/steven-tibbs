var pages = ['start', 'choosequest', 'quest-map', 'quest-found', 'final'];
var scene_types = {};
scene_types['start']='next';
scene_types['choosequest']='selection';
scene_types['quest-map']='next';
scene_types['quest-found']='next';
scene_types['final']='next';

var current_page;
var status_num;
var timeline;
var tool = "gun";
var questtask;
var questMaster;
var currquests;
var currquest;

function initInterface() {
	current_page = -1;
	status_num = 0;
	questMaster = new questGenerator(tool,killer,crimescene);
	timeline = start;
	$('#btn').append('<button class="next" id="next">Next</button>');
	$('.next').click(function() {
		moveNext();
		recordselection('None');
		console.log("done");
	});
	currquests=new Array();
}

function moveNext() {
	if (timeline=="start" || timeline=="quest-found"){
		if (timeline=="quest-found"){
			questMaster.finshQuest(currquest);
		}
		currquests=questMaster.nextQuests();
		if (currquests.length>1) timeline="choosequest";
		else if (currquests.length==1) timeline="quest-map";
		else timeline="final";
	}
	else if (timeline=='choosequest'){
		timeline='quest-map';
	}
	else if (timeline=='quest-map'){
		timeline='quest-found';
	}
	//timeline = pages[current_page];
	// console.log(current_page);
	// console.log("////");
	// console.log(timeline);
	// console.log(scene_types[current_page]);
	//  console.log(tool);
	$('#btn').empty();
	$('#map-canvas').hide();

	//$('#scene_no').text(pages[current_page]);
	//The user should not press back button. It will mess up all the status check 

	if (scene_types[timeline] == 'next') {
		$('#btn').append('<button class="next" id="next">Next</button>');
		$('.next').click(function() {
			moveNext();
			recordselection('None');
			console.log("done");
		});
	} else if (scene_types[timeline] == 'selection') {
		$('#btn').append('<button class="selection" id="object"> Object</button>');
		$('#btn').append('<button class="selection" id="record"> Record</button>');
		$('#btn').append('<button class="selection" id="Personal"> Personal</button>');
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
	if (selection=='record'){
		currquest=currquests[1];
	}
	else if (selection=='Personal'){
		currquest=currquests[2];
	}
	else currquest=currquests[0];
	//console.log(questtask);

	switch (timeline) {
		case "start":
			$('#questTop').append("<center><img src='img/banner.jpg'> </img> </center>  <center><img src='img/background-auditorium.jpg'> </img> <img src='img/character-tibbs.png' style='position:relative; top:-160px; width:110px; margin-bottom:-110px;'  ></img></center>  ");
			$('#questMessage').text("Steven Tibbs, CEO and billionaire philanthropist, disappears when giving a speech in Ferst Center for the Arts. Let's go there to see what happens! ");
			$('#next').text("Find out more!");
			break;

		case "choosequest":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/bullet.jpg' id='item'></img></center>");
			$('#questMessage').text(deathInfo+"What would you do next?");
			$('#object').text(currquests[0].name);
			$('#record').text(currquests[1].name);
			if (currquests.length>2) $('#personal').text(currquests[2].name);
			else $('#personal').hide();
			break;


		case "quest-map":
			$('#questTop').empty();
			$('#map-canvas').show();
			$('#questMessage').text("You have to go to "+currquest.destination+" to "+currquest.name+". Click button when you arrive. ");
			$('#next').text("I have arrived");
			break;

		case "quest-found":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>");
			$('#questMessage').text("You have found the "+currquest.award+".");
			$('#next').text("Find where to go");
			break;

		case "final":
			$('#questTop').empty();
			$('#questTop').append("<center><img src='img/character-tibbs.jpg' id='item'></img></center>");
			$('#questMessage').text("You have finished your task! you found the suspect. Congratulations! The suspect is "+killer+" and used "+tool+" for the affair. ");
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