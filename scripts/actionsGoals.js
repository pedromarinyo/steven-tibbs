/*
Action Class
--
Constructor: (
    name                //actions's name
    preconditions       //action's preconditions
    effects             //action's effects
)
*/

function initActions() {

    actionLibrary = 
        {
            "shootGun": new action(                         //Shoot gun
                "shootGun",
                {                                           //Preconditions
                    userChar.checkProx,                     //Check that user and target share the same location;
                    userChar.checkItem(gun),                //Check that the user has a gun;
                    userChar.checkItem(ammo),               //Check that the user has ammo;
                    targetChar.alive                        //Check that the target character is alive;
                },
                function effects(userChar, targetChar){     //Effects
                    targetChar.alive = false;               //Target character is dead;
                    userChar.removeItem(ammo);              //User character no longer has ammo;
                }            
            )
        }
}

/*
Goal CLass
--
Constructor: (
    name                //goal's name
    parent              //goal's parent in goal hierarchy
    child               //goal's child in goal hierarchy
    operators           //potential actions for accomplising goal
)
*/

function initGoals() {

}