(function (window) {

	/*
    Item CLass
    --
    Constructor: (
        name                //item's name
        loc                 //item's current location        
    )
    */
    
    function initItem() {

        var Gun = new Item(
                            "Gun",            //item's name
                            Ferst,            //item's current locaton;
        );
        
        
        var Poision = new Item(
                            "Poison",            //item's name
                            Ferst,            //item's current locaton;
        );
        
        
        var Bat = new Item(
                            "Bat",            //item's name
                           Clough,            //item's current locaton;
        );
        
        
         var Injection = new Item(
                            "Injection",            //item's name
                           Skiles,            //item's current locaton;
        );
        
        
         var Injection = new Item(
                            "Rope",            //item's name
                           Student Center,            //item's current locaton;
        );
        
        
        
    } window.initLoc = function initLoc();