//Global Variables
//_________________________________
var stage;
var stage_state = "root";

var sw = 640; //Screen width, iPhone 5
var sh = 1136; //Screen height, iPhone 5

//Location declarations
var ferst, vanLeer;	

//Item declarations
var gun, poison;	

//Characters declarations
var tibbs, rivers, boomer;

//Global Functions
//__________________________________
function init() {
	//Initializaing...
	//Stage
	stage = new Kinetic.Stage({
		container: "stage",
		width: sw,
		height: sh
	});  

	//Locations
	initLoc();
	//Items
	initItem();
	//Characters
	initChar();

<<<<<<< HEAD
	console.log(rivers.loc.coor.lat);

}
=======
	var mapOptions = {
		center: { lat: 33.7760605, lng: -84.3993823},
    	zoom: 16
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    
}

google.maps.event.addDomListener(window, 'load', init);


function simulatestory() {

/* will be added with story simulation ....
1. First, find the villain and method by AI. 
2. Explain how and where he kills by tracking the item. 
*/


 quest();
}

function quest() {
 /* will be added with quest generation ....
 
*/


}



///// button interface and functions

$('#startbutton').click(function () {
 var $this = $(this);
  simluatestory();
  stage_state="1";
  $('#startbutton').text('next');    
    $('#startbutton').id='next';
})



$('#next').click(function () {
 // check location, stage, and provide next quest or see whether mission is accomplished. 
 
 })
>>>>>>> FETCH_HEAD
