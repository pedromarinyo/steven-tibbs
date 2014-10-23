/*
Item CLass
--
Constructor: (
    name                //item's name
    loc                 //item's current location        
)
*/

function initItem() {

    gun = new Item(
                        "Gun",            //item's name
                        ferst             //item's current locaton;
    );

    ammo = new Item(
                        "Ammo",           //item's name
                        ferst             //item's current locaton;
    );

    poison = new Item(
                        "Poison",            //item's name
                        vanLeer           //item's current locaton;
    );
    
} 
