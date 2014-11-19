/*


gun,
ammo
poison
bat
injection
rope
car
  

*/
//class of tools used for killing
(function (window) {
	function questGenerator(tool, killer, crimescene) {
		this.tool = tool;
		this.killer = killer;
		this.crimescene = crimescene;

        this.evidenceAccomplished = new Array();
        this.allEvidences = new Array();
        
        // Generate all possible evidences
        this.allEvidences.push("Evidence: " + this.tool);
        
        
        this.questAccomplished = new Array();
        this.allQuests = new Array();
        
        // Generate all possible quests
        var name = "find the " + this.tool;
        var description = "Go to " + this.crimescene + " to find " + this.tool;
        var destination = this.crimescene;
        var evidenceRequired = new Array();
        var award = "Evidence: " + this.tool;
        this.allQuests.push(new quest(name, description, destination, evidenceRequired, award));
        
        
        this.nextQuests = function nextQuests() {
        	var quests = new Array();
        	for (var i = 0; i < this.allQuests.length; i++) {
        		if (this.questAccomplished.indexOf(this.allQuests[i]) == -1) {
        			var hasEvidenceRequired = true;
        			for (var j = 0; j < this.allQuests[i].evidenceRequired.length; j++) {
        				if (this.evidenceAccomplished.indexOf(this.allQuests[i].evidenceRequired[j]) == -1) {
        					hasEvidenceRequired = false;
        				}
        			}
        			if (hasEvidenceRequired) {
        				quests.push(this.allQuests[i]);
        			}
        		}
        	}
        	return quests;
        }
        
        this.finshQuest = function finshQuest(quest) {
        	this.questAccomplished.push(quest);
        	this.evidenceAccomplished.push(quest.award);
        }
	}
	
// 	function tool(name, evidence) {
//         this.name     = name;
//         this.evidence=evidence;
//         
//         this.questAccomplished = new Array();
//         this.questTried = new Array();   
//     }   
//         
// 	function inspecttools(name, clue) {
//         this.name     = name;
//     	this.clue	  = clue;
// 	}
  
	function quest(name, description, destination, evidenceRequired, award){
		this.name = name;
		this.description = description;
		this.destination = destination;
		this.evidenceRequired = evidenceRequired;
		this.award = award;
	}
        
}(window));   //but i dont understand what this window stuff is doing. do i need it to make a class? 
       
        
        
        ////

function initquest(tool, killer, crimescene) {
this.tool=tool;
this.killer=killer;
this.crimescene=crimescene;

this.knowtool=false;
this.knowkiller=false;
this.knowlocation=false;    
this.knowwhy=false;    

 


itemrequirements(); 
}

  function itemrequirements(){

  switch(this.tool) {
  case "gun":
  fingerprint;
  
  break;
  
  
  case "poison":
  
  break;
  
  
    case "bat":
  
  break;
  
  
    case "injection":
  
  break;
  
  
    case "rope":
  
  break;
  }
  
  


function givequest(step){
 

  switch(step) {
  case "finditem":
  
  
  break;
  
  
  case "inspectitem":
  
  break;
  
  
 case "meetdetective":
  
  break;
  
  
  case "inspectcollaborator":
  
  break;
  
  
 case "meetfamily":
  
  break;
  
  
 case "findmessage":
  
  break;
  
  }
  