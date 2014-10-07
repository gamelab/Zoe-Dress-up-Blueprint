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
	
	//Called after we have loaded our assets	
	Play.prototype.preload.call(this);

}

ZoeFriend.createDressup = function() {

    //Create the background. 
    //In this example we do not have a background, so we will skip this step.
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.bg, 0, 0);
    this.addChild(this.background);

}