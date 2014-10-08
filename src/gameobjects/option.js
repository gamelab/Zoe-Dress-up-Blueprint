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



