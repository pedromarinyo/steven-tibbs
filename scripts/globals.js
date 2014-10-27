//Global Variables
//_________________________________
var stage;
var stage_state = "root";

var sw = 320; //Screen width, iPhone 5
var sh = 568; //Screen height, iPhone 5

//Location declarations
var ferst, vanLeer, library, studentCenter, healthCenter, skiles, clough;	
var locations;
var locationMarkers=[]

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
	locations = [ferst, vanLeer, library, studentCenter, healthCenter, skiles, clough];
	//Items
	initItem();
	//Characters
	initChar();
	
	initMap();
}

function initMap(){
	var mapOptions = {
		center: { lat: 33.7760605, lng: -84.3993823},
		zoom: 14
	};
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    for (i in locations){
    	var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(locations[i].coor.lat,locations[i].coor.long),
    		map: map,
    		title: locations[i].name
		});
		google.maps.event.addListener(marker, 'click', function() {
			var infowindow = new google.maps.InfoWindow({
      			content: "<h4>"+this.title+"</h4>"
  			});
    		infowindow.open(map,this);
		});
		locationMarkers.push(marker);
    }
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
