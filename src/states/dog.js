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


