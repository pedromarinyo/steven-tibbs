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
                        "Poison",         //item's name
                        vanLeer           //item's current locaton;
    );

    bat = new Item(
                        "Bat",            //item's name
                        clough            //item's current locaton;
    );

    injection = new Item(
                        "Injection",      //item's name
                        healthCenter      //item's current locaton;
    );

    rope = new Item(
                        "Rope",           //item's name
                        skiles            //item's current locaton;
    );
    
}