
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








