(function (window) {

	/*
    Item CLass
    --
    Constructor: (
        name                //item's name
        pers				//item's preferred personality
        loc                 //item's current location        
    )
    */
    
    function initItem() {

        var Gun = new Item(
                            "Gun",            //item's name
                            "van" ,				//item's preferred personality
                            "Ferst"            //item's current locaton;
        );
        
        
        var Poision = new Item(
                            "Poison",            //item's name
                            "int",
                            "Ferst"                //item's current locaton;
        );
        
        
        var Bat = new Item(
                            "Bat",            //item's name
                            "vio" ,	
                           "Clough"             //item's current locaton;
        );
        
        
         var Injection = new Item(
                            "Injection",            //item's name
                            "knd",
                           "Skiles"             //item's current locaton;
        );
        
        
         var Rope = new Item(
                            "Rope",            //item's name
                            "hon",
                           "Student Center'             //item's current locaton;
        );
        
        
        
    } window.initItem = function initItem();
    
 