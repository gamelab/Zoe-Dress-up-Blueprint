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