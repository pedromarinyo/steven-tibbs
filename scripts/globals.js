//Global Variables
//_________________________________
var stage;
var stage_state = "root";
var map; 

var simSwitch = false;
var currQuest, currChar;

var player = new Player(); //Holds information for completed quests, current geolocation, etc.

var sw = 320; //Screen width, iPhone 5
var sh = 568; //Screen height, iPhone 5

var ll = new Object(); //Location library
var il = new Object(); //Item library
var cl = new Object(); //Characters library
var ql = new Object(); //Quest library

//Quest declarations
var quest1, quest2, quest3, quest4, deathInfo;
var weapon, crimeScene, murderer;

//Location declarations
var locationMarkers = [];

//Time scale, actions, goals
var currTime, al, gl;

//For testing
var watchSwitch = false;

//Global Functions
//__________________________________
function init() { 
	//Initializaing...  
	//Locations
	initLoc();

	//Items
	initItem();
	//Generate random loc for black market;
	var randomLoc = randomProp(ll); 
	il.blackMarket = new Item("Black Market", ll["library"], null);

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
    cl.tibbs.setCurrGoal("wait");

    cl.rivers.addItem(il.ammo);
    cl.rivers.setCurrGoal("killTibbs");
    cl.elis.setCurrGoal("killTibbs");
    cl.bryce.setCurrGoal("killTibbs");
    cl.meeks.setCurrGoal("killTibbs");
    cl.boomer.setCurrGoal("wait");

    initSim();
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
    		title: ll[i].name
		});
		google.maps.event.addListener(marker, 'click', function() {
			var infowindow = new google.maps.InfoWindow({
      			content: this.title,
      			maxWidth: 300
  			});
    		infowindow.open(map,this);
		});
		ll[i].marker = marker;
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

function geolocCheck() {
	if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(geolocSuccess);} 
    else {alert('not supported');}
}

function geolocSuccess(pos) {
	player.setCoords(pos); //Update player's position.
	map.panTo(player.position); //Pan map to player's position.

	var locCheck = ll[$('input[name="loc"]:checked').val()];
	var locCoords = new google.maps.LatLng(locCheck.coor.lat, locCheck.coor.long);

	var distance = google.maps.geometry.spherical.computeDistanceBetween(locCoords, player.position);
	

	if (distance < 100) {alert("You're here! You're " + distance + " meters away.");}
	else {alert("Nope! You're " + distance + " meters away.");}
	
}

function geolocWatch() { //For constant geoloc information.
	if (!watchSwitch) {
		if (navigator.geolocation) { navigator.geolocation.watchPosition(updateMap);} 
	    else {alert('not supported');}
	    $("#watchBtn").prop('value', 'Stop Watching');
	    watchSwitch = true;
	} else {
		navigator.geolocation.clearWatch(updateMap);
		$("#watchBtn").prop('value', 'Watch Location');
		watchSwitch = false;
	}
}

function updateMap(pos) {
	player.setCoords(pos);
	$("#simOutput").append("<hr>" +pos);
}

//Simulation
//__________________________________
function initSim() {
	$("#simOutput").append("<hr>" +"The black market is hidden near the " + il.blackMarket.loc.name);

	//Initiate simulation
	currTime = 0;
	while (cl.tibbs.alive && currTime < 500) { //Iterate while tibbs is still alive.
		for (var cName in cl) { //For each character...
			if(cl[cName].alive && cl[cName].currGoal != gl["wait"]) {
				if (cl[cName].nextAction == null) {cl[cName].plan();}
				else if (cl[cName].actionTimer > 0) {cl[cName].actionTimer--;}
				else {cl[cName].performAction();}
			}
		}
		currTime++;
	} 
	
	initQuests();
	currQuest = 0;
	currChar = cl.bryce;
	ql[currQuest].show();
	
	//var questGen = new questGenerator(tool, murderer, crimescene);
}

//Button interface
//__________________________________
$('#startSimulation_btn').click(function () {
	//document.getElementById('stage').style.display="none";
	//document.getElementById('quest').style.display="initial";
	initSim();
});

$('#simBtn').click(function(){
	if(simSwitch) {
		$('#simBtn').html("Show Simulation");
		$('#simOutput').hide();
		simSwitch = false;
	} else {
		$('#simBtn').html("Hide Simulation");
		$('#simOutput').show();
		simSwitch = true;
	}
});

$('#btn').click(function() {
	currQuest++;
	ql[currQuest].show();
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

//Misc. Functions
//__________________________________
function randomProp(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function goToQuest(quest) {
	currQuest = quest;
	ql[currQuest].show();	
}
