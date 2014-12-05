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
    		this.allEvidences.push("Evidence: Bullet is left in the scene");
    		this.allEvidences.push("Evidence: Tibb had a grim when he mentioned in his talk to thank his family. ");
    		this.allEvidences.push("Evidence: Gun dealer is nearby. ");
    		
    		
    		this.allEvidences.push("Evidence: Fingerprints on the gun");
    		this.allEvidences.push("Evidence: Information about gun dealer");
    		this.allEvidences.push("Evidence: Tibb's password and email");
    		this.allEvidences.push("Evidence: Tibb has received a threatening email. ");
    	    imageURL="<center><img src='img/item-gun.jpg' id='item'></img></center>";
    	    deathInfo="Tibb seems to be shot by a gun but his body disappeared. Many people heard the trigger, bullet is found, Gun dealer is nearby, Tibb mentioned his family with a grim during his talk. "; 
    	
    	
    		break;
    	case "poison":
    		this.allEvidences.push("Evidence: broken wine glass");
    		this.allEvidences.push("Evidence: the note about the poison");
    	    this.allEvidences.push("Evidence: Tibb mentioned in his talk to thank his friends with a grim. ");
    				
    		this.allEvidences.push("Evidence: Wine glass has fingerprints. ");
   			 this.allEvidences.push("Evidence: Note about the poison shows that the suspect borrowed books from the library. ");
    		this.allEvidences.push("Evidence: Family knows the location of Tibb's diary");
    		this.allEvidences.push("Evidence:  Tibb's diary shows that he had a heart breaking experience with friends in a romantic triangle. ");
    		
    	    imageURL="<center><img src='img/items-poison.jpg' id='item'></img></center>";
    	    deathInfo="Tibb drank wine and got fainted dropping the wine glass. There is a note on the scene but police took it. Witnesses are saying that Tibb had a secret which might be written in his diary. "; 
    	
    		
    		break;
    	case "bat":
    	    this.allEvidences.push("Evidence: broken bat and drops of blood");
    		this.allEvidences.push("Evidence: Witness about the missing bat");
    	    this.allEvidences.push("Evidence: Tibb mentioned in his talk to thank his office mates then got frozen");
    				
    		this.allEvidences.push("Evidence: DNA test of left hair and bloods. ");
   			 this.allEvidences.push("Evidence: Stolen record of the bat and CCTV  ");
    		this.allEvidences.push("Evidence: Tibb's office mate says that he had an enemy");
    		this.allEvidences.push("Evidence:  A message is left on Tibb's desk.  ");
            imageURL="<center><img src='img/items-bat.jpg' id='item'></img></center>";
    	    deathInfo="There was a sound of a punch. Tibb seems to be hit by a baseball bat. The bat is broken, there are drops of blood around but Tibbs is missing. Tibb mentioned in his talk to thank his office mates and was frozen for a while. "; 
       	
    		break;
    	case "injection":
    	   this.allEvidences.push("Evidence: Syringe and clothes of the nurse left in the scene");
    		this.allEvidences.push("Evidence: Package of the syringe with the name of the hospital");
    	    this.allEvidences.push("Evidence: Tibb mentioned in his talk he has a secret for his happiness. ");
    				
    		this.allEvidences.push("Evidence: DNA test of left hair from the clothes in the scene ");
   			 this.allEvidences.push("Evidence: Hospital record with suspicious activities. ");
    		this.allEvidences.push("Evidence: CCTV of the hospital ");
    		this.allEvidences.push("Evidence: Tibb's family's witnesses about Tibb's drug usage. ");
    		this.allEvidences.push("Evidence:  Voicemail sent to Tibbs from  a drug dealer /nurse");
            imageURL="<center><img src='img/items-injection.png' id='item'></img></center>";
    	    deathInfo="Tibbs seems to be injected but his body disappeared and there is a syringe. He mentioned in his talk that he has a secret for his happiness that his family knows. "; 
    	
    		break;
    	case "rope":
    	 this.allEvidences.push("Evidence: Scream from the scene");
    		this.allEvidences.push("Evidence: Security said only mailman has access to the back of the bldg");
    	    this.allEvidences.push("Evidence: Tibb paused during his talk for a few seconds, being scared to see an unexpected audience. ");
    				
    		this.allEvidences.push("Evidence: DNA test of personal belongings left in the scene ");
   			this.allEvidences.push("Evidence: CCTV of the bldg ");
    		this.allEvidences.push("Evidence: Tibb's friends witnesses that he had a  fans who was a psychopass and hated him. ");
    		this.allEvidences.push("Evidence: Threatening textmessage sent to Tibbs ");
         
            imageURL="<center><img src='img/items-injection.png' id='item'></img></center>";
    	    deathInfo="You heard a scream. Tibb seems to be choked by a rope but his body disappeared, and only the rope is left. Tibb paused for his talk for a few seconds, being scared to see an unexpected audience. Security says that only mailman has access to the back of the bldg.  "; 

    	
    		/*break;
    	case "car":
    	
    		break;
    		*/
    		
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
    	
    	this.allQuests.push(new quest("object","find the gun",ll.ferst, 'no', 'got gun as an evidence'));
    	this.allQuests.push(new quest("object-investigate","investigate the fingerprints on the gun",ll.clough, 'yes', 'got fingerprints as evidence'));
    	
		this.allQuests.push(new quest("record","meet with detectives",ll.fountain, 'no', 'meet detectives to get information about the gun dealers'));
    	this.allQuests.push(new quest("record-investigate","investigate gun dealer records",ll.skiles, 'yes', 'got gun dealer record as an evidence'));
    	
    	this.allQuests.push(new quest("personal","find the password",ll.library, 'no', 'meet with Tibbs family to ask for his email/password'));
    	this.allQuests.push(new quest("personal-investigate","Go to computerlab to investigate email",ll.vanLeer, 'no', 'Got Threat email sent to Tibbs'));
    	
    	
    		break;
    	case "poison":
    	
    	this.allQuests.push(new quest("object","find the wineglass",ll.ferst, 'no', 'got a wineglass as an evidence'));
    	this.allQuests.push(new quest("object-investigate","investigate the fingerprints on the wineglass",ll.clough, 'yes', 'got fingerprints as evidence'));
    	
		this.allQuests.push(new quest("record","meet with police",ll.fountain, 'no', 'got note and book lists as an evidence'));
    	this.allQuests.push(new quest("record-investigate","investigate the notes",ll.library, 'yes', 'got library check out record an evidence'));
    	
    	this.allQuests.push(new quest("personal","find the diary",ll.studentCenter, 'no', 'meet with Tibbs family to ask for his diary'));
    	this.allQuests.push(new quest("personal-investigate","Go to Tibbs home to pick up and investigate the diary",ll.library, 'no', 'Diary writes about the suspect and Tibb romantic triangle'));
 
    	
    		break;
    	case "bat":
    	
    	this.allQuests.push(new quest("object","find the bat",ll.ferst, 'no', 'got a broken bat'));
    	this.allQuests.push(new quest("object-investigate","investigate the DNA of hair on the bat",ll.clough, 'yes', 'got DNA as evidence'));
    	
		this.allQuests.push(new quest("record","meet with captain",ll.studentCenter, 'no', 'got stolen record of the bat'));
    	this.allQuests.push(new quest("record-investigate","investigate the cctv",ll.fountain, 'yes', 'got cctv record of the suspect stealing a bat'));
    	
    	this.allQuests.push(new quest("personal","find the enemy",ll.library, 'no', 'meet with Tibbs officemates to know tibb enemy who is a psychopass'));
    	this.allQuests.push(new quest("personal-investigate","Go to Tibbs desk to find any data ",ll.vanLeer, 'no', 'Suspect left a threatening letter on Tibb desk  '));
 		 break;
  
  
    	case "injection":
    	this.allQuests.push(new quest("object","find the syringe",ll.ferst, 'no', 'got a syringe and clothes'));
    	this.allQuests.push(new quest("object-investigate","investigate the DNA of hair on the clothes",ll.fountain, 'yes', 'got DNA as evidence'));
    	
		this.allQuests.push(new quest("record","meet with nurses",ll.healthCenter, 'no', 'got suspicious hospital record'));
    	this.allQuests.push(new quest("record-investigate","investigate the cctv",ll.fountain, 'yes', 'got cctv record of the suspect with suspicious activity'));
    	
    	this.allQuests.push(new quest("personal","find tibbs secret",ll.library, 'no', 'meet with Tibbs family to find out his secret about drug usage '));
    	this.allQuests.push(new quest("personal-investigate","Listen to Tibbs voicemail ",ll.vanLeer, 'no', 'Suspect left a threatening voice mail  '));

        break;
    		
    		
    	case "rope":
    	this.allQuests.push(new quest("object","find the rope",ll.ferst, 'no', 'found rope and personal belongings'));
    	this.allQuests.push(new quest("object-investigate","investigate the DNA of hair from the belongings",ll.clough, 'yes', 'got DNA as evidence'));
    	
		this.allQuests.push(new quest("record","meet with security",ll.studentCenter, 'no', 'got witnesses about mailman visits'));
    	this.allQuests.push(new quest("record-investigate","investigate the cctv",ll.fountain, 'yes', 'got cctv record of the bldg and a fake mailman'));
    	
    	this.allQuests.push(new quest("personal","find the enemy",ll.library, 'no', 'meet with Tibbs friends to know tibbs fan who is a psychopass'));
    	this.allQuests.push(new quest("personal-investigate","Go to Tibbs desk to find data from phone ",ll.vanLeer, 'no', 'Suspect left a threatening text message '));
    	
    	break;
    	
    	
    	/*	break;
    	case "car":
    	*/
    	
    		
    }
    
    
    this.nextQuests = function nextQuests() {
    	var quests = new Array();
    	for (var i = 0; i < this.allQuests.length; i++) {
    		if (this.questAccomplished.indexOf(this.allQuests[i]) == -1) {
    			var hasEvidenceRequired = true;
    			for (var j = 0; j < this.allQuests[i].evidenceRequired.length; j++) {
    				if (this.evidenceAccomplished.indexOf(this.allQuests[i].evidenceRequired[j]) == -1 && this.allQuests[i].evidenceRequired[j]!='none') {
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
    
