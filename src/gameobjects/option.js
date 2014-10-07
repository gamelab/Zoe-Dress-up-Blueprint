/**
*  
* The Option GameObject is the gameobject use for a piece of clothing/makeup/e.t.c.
* This particular type of option
* 
*/

var Option = function(state, texture, ex, ey) {
	
	Kiwi.GameObjects.Sprite.call(this, state, texture, ex, ey);

}

Kiwi.extend(Option, Kiwi.GameObjects.Sprite);


//Resets this option to the first frame.
Option.prototype.reset = function() {
	this.cellIndex = 0;
}


//Makes the element go to the next frame.
//This would be when a user wants to go to the next clothing item, e.t.c.
Option.prototype.next = function() {
	this.animation.nextFrame();
}


//Makes the element go to the previous frame
//This would be when a user wants to go to the previous clothing item.
Option.prototype.prev = function() {
	this.animation.prevFrame();
}


//Choose a random piece of clothing.
Option.prototype.randomize = function() {

	this.cellIndex = this.game.rnd.integerInRange( 0, this.animation.length );

}



