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

	console.log(rivers.loc.coor.lat);

}