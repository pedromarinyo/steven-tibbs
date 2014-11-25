//Global Variables
//_________________________________
var stage;
var stage_state = "root";

var sw = 320; //Screen width, iPhone 5
var sh = 568; //Screen height, iPhone 5


var ll = new Object(); //Location library
var il = new Object(); //Item library
var cl = new Object(); //Characters library

var quest1,quest2,quest3,quest4,deathInfo;

var tool,crimescene,killer;

//Location declarations
var ferst, vanLeer, library, studentCenter, healthCenter, skiles, clough;	
var locations;
var locationMarkers=[];

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
	
    //For Testing
    cl.rivers.addItem(il.ammo);
    cl.rivers.setCurrGoal("killTibbs");
    cl.tibbs.setCurrGoal("wait");
    cl.elis.setCurrGoal("wait");
    cl.boomer.setCurrGoal("wait");

	locations = [ll.ferst, ll.vanLeer, ll.library, ll.studentCenter, ll.healthCenter, ll.skiles, ll.clough];
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
	
	var questGen = new questGenerator(tool, killer, crimescene);
}

 
