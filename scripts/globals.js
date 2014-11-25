//Global Variables
//_________________________________
var stage;
var stage_state = "root";
var map; 

var player = new Player(); //Holds information for completed quests, current geolocation, etc.

var sw = 320; //Screen width, iPhone 5
var sh = 568; //Screen height, iPhone 5

var ll = new Object(); //Location library
var il = new Object(); //Item library
var cl = new Object(); //Characters library

var quest1,quest2,quest3,quest4,deathInfo;

var tool,crimescene,killer;

//Location declarations
var locationMarkers = [];

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
	initMap();

	//Player
	player.initPlayer();

	//For Testing
	//__________________________________
    cl.rivers.addItem(il.ammo);
    cl.rivers.setCurrGoal("killTibbs");
    cl.tibbs.setCurrGoal("wait");
    cl.elis.setCurrGoal("wait");
    cl.boomer.setCurrGoal("wait");

    //initSim();	
}

//Map, map functions
//__________________________________
function initMap(){
	var mapOptions = {
		center: {lat: 33.7760605, lng: -84.3993823},
		zoom: 16,
		disableDefaultUI: true
	};
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    for (i in ll){
    	var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(ll[i].coor.lat, ll[i].coor.long),
    		map: map,
    		title: ll[i].name
		});
		google.maps.event.addListener(marker, 'click', function() {
			var infowindow = new google.maps.InfoWindow({
      			content: this.title,
      			maxWidth: 300
  			});
    		infowindow.open(map,this);
		});
		locationMarkers.push(marker);
    }

    //Styling map
    var styles = [
	    {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#F1FF00"
	            },
	            {
	                "saturation": -27.4
	            },
	            {
	                "lightness": 9.4
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#0099FF"
	            },
	            {
	                "saturation": -20
	            },
	            {
	                "lightness": 36.4
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#00FF4F"
	            },
	            {
	                "saturation": 0
	            },
	            {
	                "lightness": 0
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#FFB300"
	            },
	            {
	                "saturation": -38
	            },
	            {
	                "lightness": 11.2
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#00B6FF"
	            },
	            {
	                "saturation": 4.2
	            },
	            {
	                "lightness": -63.4
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "hue": "#9FFF00"
	            },
	            {
	                "saturation": 0
	            },
	            {
	                "lightness": 0
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    }
	];
	map.setOptions({styles: styles});
}

function geolocCheck(loc) {
	if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(geolocSuccess);} 
    else {alert('not supported');}
}

function geolocSuccess(pos) {
	player.setCoords(pos); //Update player's position.
	map.panTo(player.position); //Pan map to player's position.
}

function geolocWatch() { //For constant geoloc information.
	if (navigator.geolocation) { navigator.geolocation.watchPosition(updateMap);} 
    else {alert('not supported');}
}

function updateMap(pos) {
	player.setCoords(pos);
}

//Simulation
//__________________________________
function initSim() {
	currTime = 0;
	while (currTime < 100) { //Iterate while tibbs is still alive.
		for (var cName in cl) { //For each character...
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

//Button interface, functions
$('#startSimulation_btn').click(function () {
	//document.getElementById('stage').style.display="none";
	//document.getElementById('quest').style.display="initial";
	initSim();
});

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

$('#next_quest').click(function () {
	document.getElementById('stage').style.display="none";
	document.getElementById('quest').style.display="initial";
});
