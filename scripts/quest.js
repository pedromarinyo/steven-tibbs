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
function questGenerator(tool, killer, crimescene) {
	this.tool = tool;
	this.killer = killer;
	this.crimescene = crimescene;

    this.evidenceAccomplished = new Array();
    this.allEvidences = new Array();
    
    // Generate all possible evidences
    switch (this.tool){
    	case "gun":
    		this.allEvidences.push("Evidence: bullet");
    		this.allEvidences.push("Evidence: gun");
    		this.allEvidences.push("Evidence: Fingerprints on the gun");
    		this.allEvidences.push("Evidence: Tibb mentioned in his talk to thank his family");
    		this.allEvidences.push("Evidence: information about gun dealer");
    		this.allEvidences.push("Evidence: Tibb's password and email");
    	    imageURL="<center><img src='img/gun.jpg' id='item'></img></center>";
    	    deathInfo="Tibb is shot by a gun but his body disappeared. Many people heard the trigger, bullet is found, Gun dealer is nearby, Tibb mentioned his family during his talk. "; 
    	
    	
    		break;
    	case "poison":
    		this.allEvidences.push("Evidence: broken wine glass");
    		this.allEvidences.push("Evidence: the note about the poison");
    		this.allEvidences.push("Evidence: Tibb mentioned in his talk to thank his family");
    		this.allEvidences.push("Evidence: the location of Tibb's diary");
    		 imageURL="<center><img src='img/items-poison.jpg' id='item'></img></center>";
    	    deathInfo="Tibb drank wine and got fainted dropping the wine glass. There is a note on the scene. Witnesses are saying that Tibb had a secret which might be written in his diary. "; 
    	
    		
    		break;
    	case "bat":
    	
    		break;
    	case "injection":
    	
    		break;
    	case "rope":
    	
    		break;
    	case "car":
    	
    		break;
    }
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
    
    switch (this.tool){
    	case "gun":
    	
    	this.allQuests.push(new quest("object","find the gun",ll.library, 'no', 'got gun as an evidence'));
    	this.allQuests.push(new quest("object-investigate","investigate the fingerprints on the gun",ll.clough, 'yes', 'got fingerprints as evidence'));
    	
		this.allQuests.push(new quest("record","meet with detectives",ll.fountain, 'no', 'meet detectives to get information about the gun dealers'));
    	this.allQuests.push(new quest("record-investigate","investigate gun dealer records",ll.library, 'yes', 'got gun dealer record as an evidence'));
    	
    	this.allQuests.push(new quest("personal","find the diary",ll.library, 'no', 'meet with Tibbs family to ask for his diary'));
    	this.allQuests.push(new quest("personal-investigate","Go to Tibbs home to pick up and investigate the diary",ll.library, 'no', 'Diary writes about the suspect as an enemy'));
    	
    	
    		break;
    	case "poison":
    	
    		break;
    	case "bat":
    	
    		break;
    	case "injection":
    	
    		break;
    	case "rope":
    	
    		break;
    	case "car":
    	
    		break;
    }
    
    
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

function quest(name, description, destination, evidenceRequired, award){
	this.name = name;
	this.description = description;
	this.destination = destination;
	this.evidenceRequired = evidenceRequired;
	this.award = award;
}

//define the 4 quests
// quest1=
// quest2=
// quest3=
// quest4=
    
