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
            "shootGun": new action(                             //Shoot gun
                "shootGun",
                [                                               //Preconditions
                    this.userChar.checkProx(targetChar),        //Check that user and target share the same location;
                    this.userChar.checkItem(gun),               //Check that the user has a gun;
                    this.userChar.checkItem(ammo),              //Check that the user has ammo;
                    this.targetChar.alive                       //Check that the target character is alive;
                ],
                function effects(userChar, targetChar){         //Effects
                    this.targetChar.alive = false;              //Target character is dead;
                    this.userChar.removeItem(ammo);             //User character no longer has ammo;
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