var Dog = new Play('Dog');

Dog.preload = function() {

	this.addImage('bg', 'assets/img/character/dog/bg.png', false);

	//Dog Graphics
	this.addImage('face', 'assets/img/character/dog/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/dog/eyebrows.png', 387, 472, false);
	this.addSpriteSheet('eyes', 'assets/img/character/dog/eyes.png', 406, 536, false);
	this.addSpriteSheet('mouth', 'assets/img/character/dog/mouth.png', 425, 727, false);

	//The Body
	this.addImage('base', 'assets/img/character/dog/outfit/base.png', false);
	
	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}

Dog.createDressup = function() {

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.bg, 0, 0);
    this.addChild(this.background);

}