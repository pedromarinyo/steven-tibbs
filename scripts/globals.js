//Global Variables
//_________________________________
var stage;
var stage_state = "root";

var sw = 320; //Screen width, iPhone 5
var sh = 568; //Screen height, iPhone 5

var ll = new Object(); //Location library
var il = new Object(); //Item library
var cl = new Object(); //Characters library

//Time scale, actions, goals
var currTime, al, gl;

//Global Functions
//__________________________________
function init() {
	//Initializaing...  
	//Locations
	initLoc();
	
	//Items
	initItem();

	//Characters, relations and knowledge
	initChar();
	initCharRelations();
	initCharKnowledge();
	
	//Actions
	initActions();
	
	//Goals
	initGoals();
	
	//Map
	var mapOptions = {
		center: { lat: 33.7760605, lng: -84.3993823},
    	zoom: 16
    };    
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
    //For Testing
    cl.rivers.addItem(il.ammo);
    cl.rivers.setCurrGoal("killTibbs");
    cl.tibbs.setCurrGoal("wait");
    cl.elis.setCurrGoal("wait");
    cl.boomer.setCurrGoal("wait");

    initSim();
}

//Initiate simulation
function initSim() {
	currTime = 0;
	while (cl.tibbs.alive) { //Iterate while tibbs is still alive.
		for (var cName in cl) {
			if(cl[cName].alive) {
				if (cl[cName].nextAction == null) {cl[cName].plan();}
				else if (cl[cName].actionTimer > 0) {cl[cName].actionTimer--;}
				else {cl[cName].performAction();}
			}
		}
		currTime++;
	} 
}

//Initiate quest generation
function initQuest() {}

//Button interface, functions
$('#startbutton').click(function () {
	var $this = $(this);
	
	simulateStory();
	
	$('#startbutton').text('next');    
	$('#startbutton').id='next';
});


$('#next').click(function () {
	//Check location, stage, and provide next quest or see whether mission is accomplished. 
});
