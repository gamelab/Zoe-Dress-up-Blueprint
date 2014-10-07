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



