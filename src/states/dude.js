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
	
	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}

Dude.createDressup = function() {

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.bg, 0, 0);
    this.addChild(this.background);

}