var Zoe = new Play('Zoe');

Zoe.preload = function() {

	this.addImage('bg', 'assets/img/character/zoe/bg.png', false);

	//Zoe Graphics
	this.addImage('face', 'assets/img/character/zoe/face.png', false);

	this.addSpriteSheet('eyebrows', 'assets/img/character/zoe/eyebrows.png', 447, 283, false);
	this.addSpriteSheet('eyes', 'assets/img/character/zoe/eyes.png', 481, 304, false);
	this.addSpriteSheet('glasses', 'assets/img/character/zoe/glasses.png', 510, 320, false);
	this.addSpriteSheet('hair', 'assets/img/character/zoe/hair.png', 600, 377, false);
	this.addSpriteSheet('mouth', 'assets/img/character/zoe/mouth.png', 75, 52, false);
	this.addSpriteSheet('nose', 'assets/img/character/zoe/nose.png', 431, 351, false);

	//The Body
	this.addImage('base', 'assets/img/character/zoe/outfit/base.png', false);
	this.addImage('outfit-1', 'assets/img/character/zoe/outfit/0.png', false);
	this.addImage('outfit-2', 'assets/img/character/zoe/outfit/1.png', false);
	this.addImage('outfit-3', 'assets/img/character/zoe/outfit/2.png', false);
	this.addImage('outfit-4', 'assets/img/character/zoe/outfit/3.png', false);
	this.addImage('outfit-5', 'assets/img/character/zoe/outfit/4.png', false);
	
	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}

Zoe.createDressup = function() {

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.bg, 0, 0);
    this.addChild(this.background);

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.


    //We are going to store all of the dress up parts inside this array, to keep track of them.
    this.dressUpElements = [];

    this.buttons = [];


}