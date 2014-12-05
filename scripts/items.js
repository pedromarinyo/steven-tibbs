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
            ll[randomProp(ll)],        //item's current locaton;
            null
        ),

        "ammo": new Item(
            "Ammo",             //item's name
            ll[randomProp(ll)],         //item's current locaton;
            null
        ),

        "poison": new Item(
            "Poison",           //item's name
            ll[randomProp(ll)],       //item's current locaton;
            null
        ),

        "bat": new Item(
            "Bat",              //item's name
            ll[randomProp(ll)],        //item's current locaton;
            null
        ),

        "injection": new Item(
            "Injection",        //item's name
            ll[randomProp(ll)],  //item's current locaton;
            null
        ),

        "rope": new Item(
            "Rope",             //item's name
            ll[randomProp(ll)],        //item's current locaton;
            null
        )
    };
}