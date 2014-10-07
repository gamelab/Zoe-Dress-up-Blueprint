/**
* The Loading State is used to load in all of the GLOBAL in-game assets that we need in game.
* GLOBAL assets are the type of assets that we want to always be in the game, because they are used so often.
*
*/



/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
* 
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - subfolder {String} The folder that the loading graphics are located at. 
*/
var MainLoader = new KiwiLoadingScreen('MainLoader', 'MainMenu', 'assets/img/loading/');

/**
* This preload method is responsible for preloading all of our in game assets.
* Each time this state is switched to, it will attempt to load in these graphics
*
* @method preload
*/
MainLoader.preload = function () {

    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);


    //Load in all of the generic buttons.
    this.addSpriteSheet('cameraBtn', 'assets/img/buttons/cameraBtn.png', 100, 100);
    this.addSpriteSheet('randomBtn', 'assets/img/buttons/randomBtn.png', 100, 100);
    this.addSpriteSheet('resetBtn', 'assets/img/buttons/resetBtn.png', 100, 100);

    this.addSpriteSheet('nextBtn', 'assets/img/buttons/nextBtn.png', 126, 126);
    this.addSpriteSheet('prevBtn', 'assets/img/buttons/prevBtn.png', 126, 126);

    this.addSpriteSheet('backBtn', 'assets/img/buttons/backBtn.png', 100, 100);
    this.addSpriteSheet('printBtn', 'assets/img/buttons/printBtn.png', 100, 100);
    this.addSpriteSheet('saveBtn', 'assets/img/buttons/saveBtn.png', 100, 100);
    
    //
    this.addSpriteSheet('eyebrowsBtn', 'assets/img/buttons/eyebrowsBtn.png', 101, 101);
    this.addSpriteSheet('eyesBtn', 'assets/img/buttons/eyesBtn.png', 101, 101);
    this.addSpriteSheet('glassesBtn', 'assets/img/buttons/glassesBtn.png', 101, 101);
    this.addSpriteSheet('hairBtn', 'assets/img/buttons/hairBtn.png', 101, 101);
    this.addSpriteSheet('mouthBtn', 'assets/img/buttons/mouthBtn.png', 101, 101);
    this.addSpriteSheet('noseBtn', 'assets/img/buttons/noseBtn.png', 101, 101);
    this.addSpriteSheet('outfitBtn', 'assets/img/buttons/outfitBtn.png', 101, 101);
    
    
    //Load in the main menu assets 
    this.addImage('menu', 'assets/img/menu/start.png');

    //While we are here, we will load in a few of the backgrounds.
    //This way the user can see a nice background whilst loading is happening.

    this.addImage('zoe-bg', 'assets/img/character/zoe/bg.png');
    this.addImage('zoefriend-bg', 'assets/img/character/zoefriend/bg.png');
    this.addImage('dude-bg', 'assets/img/character/dude/bg.png');
    this.addImage('dog-bg', 'assets/img/character/dog/bg.png');

    //Load in the 'spinner' assets, which are displayed whilst loading is happening on the Play State.
    this.addImage('spinnerBackground', 'assets/img/spinner/spinnerSquare.png');
    this.addImage('spinner', 'assets/img/spinner/spinner.png');


}










