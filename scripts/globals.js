//Global Variables
//_________________________________
var stage;
var stage_state = "root";

var sw = 375; //Screen width, iPhone 5
var sh = 667; //Screen height, iPhone 5

//Location declarations
var ferst, vanLeer, library, studentCenter, healthCenter, skiles, clough;	

//Item declarations
var gun, poison, injection, ammo, rope, bat;	

//Characters declarations
var tibbs, rivers, boomer, elis;

//Global Functions
//__________________________________
function init() {
	//Initializaing...
	//Stage
	
	// stage = new Kinetic.Stage({
	// 	container: "stage",
	// 	width: sw,
	// 	height: sh
	// });  

	
	//Locations
	initLoc();
	//Items
	initItem();
	//Characters
	initChar();

	//Map
	var mapOptions = {
		center: { lat: 33.7760605, lng: -84.3993823},
    	zoom: 16
    };    
    
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
}



//Initiate simulation
function initSim() {}

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
