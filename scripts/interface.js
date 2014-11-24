var current_status =['start','basic_info','quest1clue','quest1fin','choosequest2','quest2clue','quest2fin','final' ]; 
 
var status_num=0;
    var timeline;
var tool="gun";
var questtask="find";

 

$('#next_btn').click(function () {
    status_num++; 
    //The user should not press back button. It will mess up all the status check 
    timeline=current_status[status_num];
    console.log(timeline);
    console.log(tool);
    
    switch(timeline){
        	case "start":
        	break; 
        	
        	case "basic_info":
     switch(tool) {
    case "gun":
      $('#questTop').empty();
      $('#questTop').append("<center><img src='img/bullet.jpg' id='item'></img></center>" );
  
   $('#questMessage').text("Tibbs is shot by a gun. A bullet is found. Maybe finding the gun would help investigating. Detectives say that the suspect might have bought the gun from the nearby gun store. The crowd are mourning, and some are questioning whether Tibb's had an issue with his family, based on his talk. What would you do next? ");
  
   //$('#questBottom button').remove(); 
     // the next button should be removed, but I don't know how to make other buttons work, so I am keeping it for now.
     
   $('#questBottom').append("<button id='next_btn' type='button' class='find'>Find gun</button>"); 
   //need to add function to the buttons to register for the choices. 
  // $( "#questBottom .find" ).bind( "click", function() {questtask="find";   });
   
    $('#questBottom').append("<button id='next_btn' type='button' class='detective'>Meet with Detectives</button>"); 
   // $( "#questBottom .detective" ).bind( "click", function() {questtask="detective";    });
    
    $('#questBottom').append("<button id='next_btn' type='button'>Meet with Family</button>"); 
   // $( "#next_btn .meet").bind("click", function() {questtask="meet"; console.log("going"); });
   
   break; 
   //more case to be added...
    }
   
   break; 
			
        	 case "quest1clue":
        	 console.log(questtask);
        	 
        	 switch(tool) {
    case "gun": 
     $('#questTop').empty();
        // show map 
  //  $('#stage').append("<div id='map-canvas'></div>");
     $('#next_btn').text(" I arrived! "); 
      
       ///other buttons should be removed... 
       
   if(questtask=="find"){
   $('#questMessage').text( "In order to find the gun, you should go here." );
   }
   
     if(questtask=="detective"){
   $('#questMessage').text( "In order to meet with detectives, you should go here." );
   }
  
   if(questtask=="meet"){
   $('#questMessage').text( "In order to meet with family, you should go here." );
   }
   
  
    break; 
    //more to come...
    
    }
       
        	break; 
        	
        	case "quest1fin":
        	 $('#questTop').empty();
           $('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>" );
        	 $('#questMessage').text( "You have found the gun. Now you can go investigate what fingerprints it has. You have to bring the gun to xxx to investigate.  " );
        	$('#next_btn').text(" Find where to go. "); 
        	
        	break; 
        	
        	case "choosequest2":
        	 $('#questTop').empty();
            $('#questTop').append("<center><img src='img/gun.jpg' id='item'></img></center>" );
        	 $('#questMessage').text( "You have found that the gun has xxx and xxx fingerprints. You need more clues. You can meet with detectives or families. " );
        	$('#next_btn').text(" Do whatever "); 
        	break; 
        	
        	case "quest2clue":
        	///map shows here
        	 $('#questTop').empty();
        	 $('#questMessage').text( "In order to meet with detectives, go here. " );
        	$('#next_btn').text(" I arrived! "); 
        	break; 
        	
        	case "quest2fin":
        	 $('#questTop').empty();
        	 $('#questTop').append("<center><img src='img/character-boomer.jpg' id='item'></img></center>" );
        	 $('#questMessage').text( "Detective boomer says that the gun might be purchased from the nearby dealershop. He asks if you can go with him to the dealershop to see who purchased the gun recently.  " );
        	$('#next_btn').text(" Let's go to the dealershop "); 
        	break; 
        	
        	case "final":
        	$('#questTop').empty();
        	
        	 $('#questTop').append("<center><img src='img/character-tibbs.jpg' id='item'></img></center>" );
        	 $('#questMessage').text( "You have finished your task! you found the suspect. Congratulations!  " );
        	 $('#questBottom button').remove();
        	break; 
        	
        	
        	 
        	
        	}
        	
        	
    
    
    
    
     
     
     
     
     
	for (i in locationMarkers){
		if (i!=0){
			locationMarkers[i].setMap(null);
		}
	}
});



/*

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


//Button interface, functions
$('#startSimulation_btn').click(function () {
	document.getElementById('stage').style.display="none";
	document.getElementById('quest').style.display="initial";
});

$('#next_quest').click(function () {
	alert("You got the clue: Steven Tibbs has never been to Ferst Center for Arts")
	document.getElementById('stage').style.display="none";
	document.getElementById('quest').style.display="initial";
});
 
*/
