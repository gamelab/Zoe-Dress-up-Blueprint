/**
*  
* The Option GameObject is the gameobject use for a piece of clothing/makeup/e.t.c.
* This particular type of option
* 
*/

var Option = function(state, textures, ex, ey) {

	if(Kiwi.Utils.Common.isArray(textures)) {
		this.textures = textures;
	} else {
		this.textures = [textures];
	}
	
	Kiwi.GameObjects.StaticImage.call(this, state, this.textures[0], ex, ey);

}

Kiwi.extend(Option, Kiwi.GameObjects.StaticImage);


//Resets this option to the first frame.
Option.prototype.reset = function() {
	this.cellIndex = 0;
	this.atlas = this.textures[0];
}


//Because of a current bug with Kiwi (where setting the number of cells a spritesheet has doesn't work)
//We have to implement this little system which will use the number of cells if it exists (it only exists if it is a spritesheet)
//Otherwise it uses the length of the cell field.
Option.prototype.getLength = function() {
	return this.atlas.numCells || this.atlas.cells.length;
}



//Makes the element go to the next frame.
//This would be when a user wants to go to the next clothing item, e.t.c.
Option.prototype.next = function() {

	// Go to the next frame in this current texture. If it fails, then go to the next texture atlas.
	if( this.nextFrame() == false) { 

		var nextAtlas = this.textures.indexOf(this.atlas) + 1;

		//Go back to the start if we exceed the length
		if(nextAtlas >= this.textures.length) nextAtlas = 0;

		this.atlas = this.textures[ nextAtlas ];
		this.cellIndex = 0;
	}

}

Option.prototype.nextFrame = function() {

	//If we increased the cellIndex by one and the number of cells in this atlas is still less than that amount
	//Then there is another cell to switch to!
	if( this.cellIndex + 1 < this.getLength() ) {
		this.cellIndex++;
		return true;
	}

	//otherwise not.
	return false;

}


//Makes the element go to the previous frame
//This would be when a user wants to go to the previous clothing item.
Option.prototype.prev = function() {
	
	// Go to the previous frame in this current texture. If it fails, then go to the previous texture atlas.
	if( this.prevFrame() == false) { 

		var nextAtlas = this.textures.indexOf(this.atlas) - 1;

		//Go to the end if we exceed the minimum value
		if(nextAtlas < 0) nextAtlas = this.textures.length - 1;

		this.atlas = this.textures[ nextAtlas ];
		this.cellIndex = 0;
	}
}

Option.prototype.prevFrame = function() {

	//If we increased the cellIndex by one and the number of cells in this atlas is still less than that amount
	//Then there is another cell to switch to!
	if(this.cellIndex - 1 >= 0) {
		this.cellIndex--;
		return true;
	}

	//otherwise not.
	return false;

}



//Choose a random piece of clothing.
Option.prototype.randomize = function() {

	//Choose a random atlas
	this.atlas = this.textures[ this.game.rnd.integerInRange( 0, this.textures.length ) ]; 

	//Choose a random cell in that atlas
	this.cellIndex = this.game.rnd.integerInRange( 0, this.getLength() );

}





/**
* 
* The Play State is the state handles the majority of the in-game logic. 
* In the case of the Dressup Game, the logic this would handle is anything to do with, 
* - Switching between items of clothing/makeup/e.t.c.
* - Taking screenshots.
* - Randomisation of clothing/e.t.c.
* 
*/
var Play = function(name) {

    Kiwi.State.call(this, name);

}

Kiwi.extend(Play, Kiwi.State);


/**
* 
* We are going to use the preload method on this state to load all the assets that we need in this particular state.
* The reason we have not added them to the MainLoader is because these assets we do not want to be GLOBAL, 
* but instead only want them to be there whilst this state is active, and then go away (to save memory).
* 
*/
Play.prototype.preload = function() {

    

    //Create spinner
    this.createLoader();

}


//Creates the loader. This should happen at the preload stage
Play.prototype.createLoader = function() {
    this.spinnerBackground = new Kiwi.GameObjects.StaticImage(this, this.textures.spinnerBackground);
    this.addChild(this.spinnerBackground);

    this.spinner = new Kiwi.GameObjects.StaticImage(this, this.textures.spinner);
    this.addChild(this.spinner);

    this.spinnerBackground.x = (this.game.stage.width - this.spinnerBackground.width) * 0.5;
    this.spinner.x = (this.game.stage.width - this.spinner.width) * 0.5;

    this.spinnerBackground.y = (this.game.stage.height - this.spinnerBackground.height) * 0.5;
    this.spinner.y = (this.game.stage.height - this.spinner.height) * 0.5;
}


//The 'loadUpdate' is executed as the update loop, dur
Play.prototype.loadUpdate = function() {

    //Spin the spinner
    if(this.game.frame % 15 == 0)  this.spinner.rotation += Math.PI / 6;

}


//Removes the loader. This will happen at the create state, after all the assets have been loaded.
Play.prototype.removeLoader = function() {
    this.spinnerBackground.visible = false;
    this.spinner.visible = false;
    this.spinnerBackground.exists = false;
    this.spinner.exists = false;
    this.spinnerBackground = null;
    this.spinner = null;
}


//When the files needed have been loaded, remove the loader
Play.prototype.loadComplete = function() {
    //Remove the loader
    this.removeLoader();
}


//Executed once all the game assets have been loaded. 
//In charge of setting up the game 
Play.prototype.create = function () {


    //Create the dressup elements
    this.createDressup();

    //Create the buttons to deal with game options
    this.createCustomButtons();
    this.createSaveButtons();

}



//Handles the creation of the dressup items
Play.prototype.createDressup = function() {

}



//Holds the code for generating buttons which deal with the customisation of the character.
Play.prototype.createCustomButtons = function() {

    //Create the 'random' button with an event listener for when it is clicked
    this.randomButton = new Kiwi.GameObjects.Sprite(this, this.textures.randomBtn, 224, 914);
    this.addChild(this.randomButton);
    this.randomButton.input.onUp.add(this.randomizeCharacter, this);
    

    //Create the 'reset' button with an event listener for when it is clicked
    this.resetButton = new Kiwi.GameObjects.Sprite(this, this.textures.resetBtn, 334, 914);
    this.addChild(this.resetButton);
    this.resetButton.input.onUp.add(this.resetCharacter, this);
    

    //Create the 'camera' button with an event listener for when it is clicked
    this.showButton = new Kiwi.GameObjects.Sprite(this, this.textures.cameraBtn, 444, 914);
    this.addChild(this.showButton);
    this.showButton.input.onUp.add(this.showSaveButtons, this);


    //Previous/Next Button
    this.prevButton = new Kiwi.GameObjects.Sprite(this, this.textures.prevBtn, 0, 0);
    this.nextButton = new Kiwi.GameObjects.Sprite(this, this.textures.nextBtn, 0, 0);

    this.prevButton.y = this.game.stage.height - this.prevButton.height - 10;
    this.nextButton.y = this.game.stage.height - this.nextButton.height - 10;

    this.prevButton.x = 10;
    this.nextButton.x = this.game.stage.width - this.nextButton.width - 10;

    this.addChild(this.prevButton);
    this.addChild(this.nextButton);
}


//Holds the code for generating buttons which deal with the saving/printing of the dressup game
//These buttons are invisible by default
Play.prototype.createSaveButtons = function() {

    //Display the print button
    this.printButton = new Kiwi.GameObjects.Sprite(this, this.textures.printBtn, 224, 914);
    this.printButton.visible = false;
    this.printButton.active = false;
    this.addChild(this.printButton);

    //Display the save button
    this.saveButton = new Kiwi.GameObjects.Sprite(this, this.textures.saveBtn, 334, 914);
    this.saveButton.visible = false;
    this.saveButton.active = false;
    this.addChild(this.saveButton);

    //Display the back button
    this.backButton = new Kiwi.GameObjects.Sprite(this, this.textures.backBtn, 444, 914);
    this.backButton.visible = false;
    this.backButton.active = false;
    this.addChild(this.backButton);
    this.backButton.input.onUp.add(this.showCreateButtons, this);


    //Input Event for the save and print buttons.
    //We will attach a callback direct to the input manager for these buttons so that the browser doesn't block any new windows we open or the like.
    this.game.input.onUp.add(this.checkInputs, this);

}


Play.prototype.showCreateButtons = function() {
    //Show the current buttons
    this.randomButton.active = true;
    this.randomButton.visible = true;
    this.resetButton.active = true;
    this.resetButton.visible = true;
    this.showButton.active = true;
    this.showButton.visible = true;

    this.nextButton.visible = true;
    this.prevButton.visible = true;
    this.nextButton.active = true;
    this.prevButton.active = true;

    //Show the current buttons
    this.printButton.visible = false;
    this.printButton.active = false;
    this.saveButton.visible = false;
    this.saveButton.active = false;
    this.backButton.visible = false;
    this.backButton.active = false;

    var len = this.buttons.length;
    while(len--) {
        this.buttons[len].visible = true;
    }
}

Play.prototype.showSaveButtons = function(show) {
    
    //Show the current buttons
    this.randomButton.active = false;
    this.randomButton.visible = false;
    this.resetButton.active = false;
    this.resetButton.visible = false;
    this.showButton.active = false;
    this.showButton.visible = false;

    this.nextButton.visible = false;
    this.prevButton.visible = false;
    this.nextButton.active = false;
    this.prevButton.active = false;

    //Show the current buttons
    this.printButton.visible = true;
    this.printButton.active = true;
    this.saveButton.visible = true;
    this.saveButton.active = true;
    this.backButton.visible = true;
    this.backButton.active = true;

    var len = this.buttons.length;
    while(len--) {
        this.buttons[len].visible = false;
    }
}




// Randomize character based on the amount of frames each dress up element has.
Play.prototype.randomizeCharacter = function () {
    
    //Loop through the dressup elements and call the randomise method
    for(var i = 0; i < this.dressUpElements.length; i++) {
        this.dressUpElements[i].randomize();
    }


}



//Set all dress up element animations to their first frame (which is the default).
Play.prototype.resetCharacter = function () {

    //Loop through the dressup elements and call the randomise method
    for(var i = 0; i < this.dressUpElements.length; i++) {
        this.dressUpElements[i].reset();
    }

}


//Holds the print functionality
Play.prototype.print = function() {
    //Hide the buttons
    this.printButton.visible = false;
    this.saveButton.visible = false;
    this.backButton.visible = false;

    //Force the game to re-render.
    this.game.cameras.render(); //generally not recommended if you can help it

    //Create the data url of the canvas
    var dataUrl = this.game.stage.canvas.toDataURL();


    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Your Dress Up</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';

    //Open that 'html' in a new window.
    var printWin = window.open('', '', 'width=1280,height=960');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();

    //Focus that window and print.
    printWin.focus();
    printWin.print();
    printWin.close();

    //Show UI again.
    this.printButton.visible = true;
    this.saveButton.visible = true;
    this.backButton.visible = true;
}


//Holds the save functionality
Play.prototype.save = function() {

    //Hide the buttons
    this.printButton.visible = false;
    this.saveButton.visible = false;
    this.backButton.visible = false;

    //Force the game to re-render.
    this.game.cameras.render(); //generally not recommended if you can help it

    //Get the canvas information
    var img = this.game.stage.canvas.toDataURL("image/octet-stream");
    
    //Open it up in a new window.
    window.open(img, "toDataURL() image", "width=1280, height=960");

    //Show UI again.
    this.printButton.visible = true;
    this.saveButton.visible = true;
    this.backButton.visible = true;

}


//The callbacks used to see if the print or save buttons were pressed.
Play.prototype.checkInputs = function(x,y) {

    //Print Button check
    if(this.printButton.active && this.printButton.box.hitbox.contains(x,y)) {
        this.print();
        return;
    }

    //Save button check
    if(this.saveButton.active && this.saveButton.box.hitbox.contains(x,y)) {
        this.save();
        return;
    }

}



//Is called when this state is about to be switch off of and so destroyed.

Play.prototype.shutDown = function() {

    //Remove the input callback we have added.
    this.game.input.onUp.remove(this.checkInputs, this);

    //Make all the buttons we have added null, so attempt to mark them for garbage collection
    this.printButton = null;
    this.saveButton = null;
    this.backButton = null;
    this.randomButton = null;
    this.showButton = null;
    this.resetButton = null;

    this.buttons = null;
    this.dressUpElements = null;
}









var Dog = new Play('Dog');

Dog.preload = function() {


	//Dog Graphics

	this.addSpriteSheet('eyebrows', 'assets/img/character/dog/eyebrows.png', 387, 472, false);
	this.addSpriteSheet('eyes', 'assets/img/character/dog/eyes.png', 406, 536, false);
	this.addSpriteSheet('mouth', 'assets/img/character/dog/mouth.png', 425, 727, false);

	//The Body
	this.addImage('base', 'assets/img/character/dog/outfit/base.png', false);
	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['dog-bg']);
	this.addChild(this.background);

	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}


Dog.loadComplete = function() {
	Play.prototype.loadComplete.call(this);

	//When the loading has been completed, we need to destory the background and re-create it in the create stage.
	//This is because after the loadComplete method executes, Kiwi then remakes the texture library and that process will destory any currently used images.
	this.background.exists = false;
	this.background.visible = false;
}


//Controls the creation the dressup elements and the buttons to control them.
Dog.createDressup = function() {

    //Create the background. 
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['dog-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    //The Base
    var base = new Kiwi.GameObjects.StaticImage(this, this.textures.base, 0, 0);

    //Changable Items
    var eyes = new Option(this, this.textures.eyes, 0, 0);
    var eyebrows = new Option(this, this.textures.eyebrows, 0, 0);
    var mouth = new Option(this, this.textures.mouth, 0, 0);

    //Add the dress up elements to the array
    this.dressUpElements = [eyes, eyebrows, mouth];

    //Create the buttons
    this.createButton( this.textures.eyebrowsBtn, 10, eyebrows);
    this.createButton( this.textures.eyesBtn, 121, eyes);
    this.createButton( this.textures.mouthBtn, 232, mouth);


    //Add to the stage.
    this.addChild(this.background);
    this.addChild(base);

    for(var i = 0; i < this.dressUpElements.length; i++) {
    	this.addChild( this.dressUpElements[i] );
    }

    for(var i = 0; i < this.buttons.length; i++) {
    	this.addChild( this.buttons[i] );
    }
}


//Handles the creation of a button to switch the dressup item
Dog.createButton = function(btnTexture, y, dressUpItem) {
	var ele = new Kiwi.GameObjects.Sprite(this, btnTexture, 10, y);
	this.buttons.push(ele);
	ele.input.onUp.add(dressUpItem.next, dressUpItem);
}


//This custom 
Dog.createCustomButtons = function() {
	//Call the Play states createCustomButtons method, this will ensure that the buttons are created still.
	Play.prototype.createCustomButtons.call(this);

	//Apply input events to the next and previous buttons
	this.nextButton.input.onUp.add(function() {
		this.game.states.switchState('ZoeFriend');
	}, this);


	this.prevButton.input.onUp.add(function() {
		this.game.states.switchState('Dude');
	}, this);
}



var Dude = new Play('Dude');

Dude.preload = function() {


	//Dude Graphics
	this.addImage('face', 'assets/img/character/dude/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/dude/eyebrows.png', 488, 260, false);
	this.addSpriteSheet('eyes', 'assets/img/character/dude/eyes.png', 491, 290, false, 5);
	this.addSpriteSheet('mouth', 'assets/img/character/dude/mouth.png', 491, 377, false, 6);

	//The Body
	this.addImage('base', 'assets/img/character/dude/outfit/base.png', false);
	this.addImage('outfit-1', 'assets/img/character/dude/outfit/0.png', false);
	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['dude-bg']);
	this.addChild(this.background);

	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}


Dude.loadComplete = function() {
	Play.prototype.loadComplete.call(this);

	//When the loading has been completed, we need to destory the background and re-create it in the create stage.
	//This is because after the loadComplete method executes, Kiwi then remakes the texture library and that process will destory any currently used images.
	this.background.exists = false;
	this.background.visible = false;
}


//Controls the creation the dressup elements and the buttons to control them.
Dude.createDressup = function() {

    //Create the background. 
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['dude-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    //Changable Items
    var face = new Option(this, this.textures.face, 0, 0);
    var eyes = new Option(this, this.textures.eyes, 0, 0);
    var eyebrows = new Option(this, this.textures.eyebrows, 0, 0);
    var mouth = new Option(this, this.textures.mouth, 0, 0);
    var outfit = new Option(this, [this.textures['outfit-1'], this.textures['base']], 0, 0);

    //Add the dress up elements to the array
    this.dressUpElements = [outfit, face, eyes, eyebrows, mouth];

    //Create the buttons
    this.createButton( this.textures.eyebrowsBtn, 10, eyebrows);
    this.createButton( this.textures.eyesBtn, 121, eyes);
    this.createButton( this.textures.mouthBtn, 232, mouth);
    this.createButton( this.textures.outfitBtn, 343, outfit);


    //Add to the stage.
    this.addChild(this.background);
    this.addChild( face);

    for(var i = 0; i < this.dressUpElements.length; i++) {
    	this.addChild( this.dressUpElements[i] );
    }

    for(var i = 0; i < this.buttons.length; i++) {
    	this.addChild( this.buttons[i] );
    }
}


//Handles the creation of a button to switch the dressup item
Dude.createButton = function(btnTexture, y, dressUpItem) {
	var ele = new Kiwi.GameObjects.Sprite(this, btnTexture, 10, y);
	this.buttons.push(ele);
	ele.input.onUp.add(dressUpItem.next, dressUpItem);
}


//This custom 
Dude.createCustomButtons = function() {
	//Call the Play states createCustomButtons method, this will ensure that the buttons are created still.
	Play.prototype.createCustomButtons.call(this);

	//Apply input events to the next and previous buttons
	this.nextButton.input.onUp.add(function() {
		this.game.states.switchState('Dog');
	}, this);


	this.prevButton.input.onUp.add(function() {
		this.game.states.switchState('Zoe');
	}, this);
}

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











/**
* 
* The MainMenu State is as its name suggests, the state for the main menu of the game.
* In this state we are just going to have a link to 'start/play' the game,
* but here would you add all other main menu functionality, like viewing leaderboards.
* 
* Or in the case of a Dressup game, perhaps a way to view how others have dressed-up a particular character?
* 
*/

var MainMenu = new Kiwi.State('MainMenu');


MainMenu.create = function() {

	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.menu, 0, 0);
	this.addChild(this.background);

	this.game.input.onUp.addOnce(this.startGame, this);

}


MainMenu.startGame = function() {

	this.game.stage.color = 'fff';
    //This state is currently skipped, but can be used as a main menu page.
    this.game.states.switchState("Zoe");

}
var Zoe = new Play('Zoe');

Zoe.preload = function() {

	//Zoe Graphics
	this.addImage('face', 'assets/img/character/zoe/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/zoe/eyebrows.png', 477, 283, false, 6);
	this.addSpriteSheet('eyes', 'assets/img/character/zoe/eyes.png', 481, 304, false, 10);
	this.addSpriteSheet('glasses', 'assets/img/character/zoe/glasses.png', 510, 320, false);
	this.addSpriteSheet('hair', 'assets/img/character/zoe/hair.png', 600, 377, false, 3);
	this.addSpriteSheet('mouth', 'assets/img/character/zoe/mouth.png', 75, 52, false);
	this.addSpriteSheet('nose', 'assets/img/character/zoe/nose.png', 431, 351, false);

	//The Body
	this.addImage('base', 'assets/img/character/zoe/outfit/base.png', false);
	this.addImage('outfit-1', 'assets/img/character/zoe/outfit/0.png', false);
	this.addImage('outfit-2', 'assets/img/character/zoe/outfit/1.png', false);
	this.addImage('outfit-3', 'assets/img/character/zoe/outfit/2.png', false);
	this.addImage('outfit-4', 'assets/img/character/zoe/outfit/3.png', false);
	this.addImage('outfit-5', 'assets/img/character/zoe/outfit/4.png', false);
	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['zoe-bg']);
	this.addChild(this.background);

	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}


Zoe.loadComplete = function() {
	Play.prototype.loadComplete.call(this);

	//When the loading has been completed, we need to destory the background and re-create it in the create stage.
	//This is because after the loadComplete method executes, Kiwi then remakes the texture library and that process will destory any currently used images.
	this.background.exists = false;
	this.background.visible = false;
}


//Controls the creation the dressup elements and the buttons to control them.
Zoe.createDressup = function() {

    //Create the background. 
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['zoe-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    //The Base
    var base = new Kiwi.GameObjects.StaticImage(this, this.textures.base, 0, 0);

    //Changable Items
    var face = new Option(this, this.textures.face, 0, 0);
    var eyes = new Option(this, this.textures.eyes, 0, 0);
    var eyebrows = new Option(this, this.textures.eyebrows, 0, 0);
    var glasses = new Option(this, this.textures.glasses, 0, 0);
    var hair = new Option(this, this.textures.hair, 1, 0);
    var mouth = new Option(this, this.textures.mouth, 383, 335);
    var nose = new Option(this, this.textures.nose, 0, 0);
    var outfit = new Option(this, [this.textures['outfit-1'], 
    	this.textures['outfit-2'],
    	this.textures['outfit-3'],
    	this.textures['outfit-4'],
    	this.textures['outfit-5']
    	], 0, 0);

    //Add the dress up elements to the array
    this.dressUpElements = [outfit, face, eyes, eyebrows, hair, nose, mouth, glasses];

    //Create the buttons
    this.createButton( this.textures.hairBtn, 10, hair);
    this.createButton( this.textures.eyebrowsBtn, 121, eyebrows);
    this.createButton( this.textures.glassesBtn, 232, glasses);
    this.createButton( this.textures.eyesBtn, 343, eyes);
    this.createButton( this.textures.noseBtn, 454, nose);
    this.createButton( this.textures.mouthBtn, 565, mouth);
    this.createButton( this.textures.outfitBtn, 676, outfit);


    //Add to the stage.
    this.addChild(this.background);
    this.addChild(base);
    this.addChild(face);

    for(var i = 0; i < this.dressUpElements.length; i++) {
    	this.addChild( this.dressUpElements[i] );
    }

    for(var i = 0; i < this.buttons.length; i++) {
    	this.addChild( this.buttons[i] );
    }
}


//Handles the creation of a button to switch the dressup item
Zoe.createButton = function(btnTexture, y, dressUpItem) {
	var ele = new Kiwi.GameObjects.Sprite(this, btnTexture, 10, y);
	this.buttons.push(ele);
	ele.input.onUp.add(dressUpItem.next, dressUpItem);
}


//This custom 
Zoe.createCustomButtons = function() {
	//Call the Play states createCustomButtons method, this will ensure that the buttons are created still.
	Play.prototype.createCustomButtons.call(this);

	//Apply input events to the next and previous buttons
	this.nextButton.input.onUp.add(function() {
		this.game.states.switchState('Dude');
	}, this);


	this.prevButton.input.onUp.add(function() {
		this.game.states.switchState('ZoeFriend');
	}, this);
}





var ZoeFriend = new Play('ZoeFriend');

ZoeFriend.preload = function() {


	//ZoeFriend Graphics
	this.addImage('face', 'assets/img/character/zoefriend/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/zoefriend/eyebrows.png', 524, 338, false, 7);
	this.addSpriteSheet('eyes', 'assets/img/character/zoefriend/eyes.png', 177, 77, false);
	this.addSpriteSheet('hair-1', 'assets/img/character/zoefriend/hair1.png', 631, 522, false);
	this.addSpriteSheet('hair-2', 'assets/img/character/zoefriend/hair2.png', 631, 522, false, 7);
	this.addSpriteSheet('mouth', 'assets/img/character/zoefriend/mouth.png', 102, 65, false);
	this.addSpriteSheet('nose', 'assets/img/character/zoefriend/nose.png', 443, 418, false);

	//The Body
	this.addImage('outfit-1', 'assets/img/character/zoefriend/outfit/0.png', false);
	this.addImage('outfit-2', 'assets/img/character/zoefriend/outfit/1.png', false);
	this.addImage('outfit-3', 'assets/img/character/zoefriend/outfit/2.png', false);
	
	//Create the background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['zoefriend-bg']);
	this.addChild(this.background);

	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}


ZoeFriend.loadComplete = function() {
	Play.prototype.loadComplete.call(this);

	//When the loading has been completed, we need to destory the background and re-create it in the create stage.
	//This is because after the loadComplete method executes, Kiwi then remakes the texture library and that process will destory any currently used images.
	this.background.exists = false;
	this.background.visible = false;
}


//Controls the creation the dressup elements and the buttons to control them.
ZoeFriend.createDressup = function() {

    //Create the background. 
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['zoefriend-bg'], 0, 0);


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];
    this.buttons = [];

    //Changable Items
    var face = new Option(this, this.textures.face, 0, 0);
    var eyes = new Option(this, this.textures.eyes, 340, 320);
    var eyebrows = new Option(this, this.textures.eyebrows, 0, 20);
    var hair = new Option(this, [
    	this.textures['hair-1'],
    	this.textures['hair-2']
    	], 135, 110);
    var mouth = new Option(this, this.textures.mouth, 370, 420);
    var nose = new Option(this, this.textures.nose, 0, 0);
    var outfit = new Option(this, [this.textures['outfit-1'], 
    	this.textures['outfit-2'],
    	this.textures['outfit-3']
    	], 0, 0);

    //Add the dress up elements to the array
    this.dressUpElements = [outfit, face, eyes, eyebrows, hair, nose, mouth];

    //Create the buttons
    this.createButton( this.textures.hairBtn, 10, hair);
    this.createButton( this.textures.eyebrowsBtn, 121, eyebrows);
    this.createButton( this.textures.eyesBtn, 232, eyes);
    this.createButton( this.textures.noseBtn, 343, nose);
    this.createButton( this.textures.mouthBtn, 454, mouth);
    this.createButton( this.textures.outfitBtn, 565, outfit);


    //Add to the stage.
    this.addChild(this.background);
    this.addChild(face);

    for(var i = 0; i < this.dressUpElements.length; i++) {
    	this.addChild( this.dressUpElements[i] );
    }

    for(var i = 0; i < this.buttons.length; i++) {
    	this.addChild( this.buttons[i] );
    }
}


//Handles the creation of a button to switch the dressup item
ZoeFriend.createButton = function(btnTexture, y, dressUpItem) {
	var ele = new Kiwi.GameObjects.Sprite(this, btnTexture, 10, y);
	this.buttons.push(ele);
	ele.input.onUp.add(dressUpItem.next, dressUpItem);
}


//This custom 
ZoeFriend.createCustomButtons = function() {
	//Call the Play states createCustomButtons method, this will ensure that the buttons are created still.
	Play.prototype.createCustomButtons.call(this);

	//Apply input events to the next and previous buttons
	this.nextButton.input.onUp.add(function() {
		this.game.states.switchState('Zoe');
	}, this);


	this.prevButton.input.onUp.add(function() {
		this.game.states.switchState('Dog');
	}, this);
}





/**
* The core Dress-up blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game ,
* add all of the relevant states to that Game,
* and then choose which one to load first.
*/


//Create some gameoptions
var gameoptions = {
	width: 768,
	height: 1024
}


//Initialise the Kiwi Game. 

/*
* 'content' is the id of the element the game is going to be place inside of.
* 'ZoeDressup' is the name of the game.
*/
var game = new Kiwi.Game('content', 'ZoeDressup', null, gameoptions);


//Add all the States we are going to use.
game.states.addState(MainLoader);
game.states.addState(MainMenu);


//Ingame States Here
game.states.addState(Zoe);
game.states.addState(Dog);
game.states.addState(Dude);
game.states.addState(ZoeFriend);


//Switch to/use the Preloader state. 
game.states.switchState("MainLoader");