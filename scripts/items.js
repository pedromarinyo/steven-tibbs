/*
Item CLass
--
Constructor: (
    name                //item's name
    loc                 //item's current location        
)
*/

function initItem() {
    il = 
    {
        "gun": new Item(
            "Gun",              //item's name
            ll.vanLeer         //item's current locaton;
        ),

        "ammo": new Item(
            "Ammo",             //item's name
            ll.ferst         //item's current locaton;
        ),

        "poison": new Item(
            "Poison",           //item's name
            ll.vanLeer       //item's current locaton;
        ),

        "bat": new Item(
            "Bat",              //item's name
            ll.clough        //item's current locaton;
        ),

        "injection": new Item(
            "Injection",        //item's name
            ll.healthCenter  //item's current locaton;
        ),

        "rope": new Item(
            "Rope",             //item's name
            ll.skiles        //item's current locaton;
        )
    };
}