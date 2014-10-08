Zoe Dress up game 1.0
======================================

The Zoe dress up game is an extended version of the [dress up game blueprint](https://github.com/gamelab/Dressup-Blueprint). This blueprint showcases the same core features of the dress-up blueprint, but on a larger scale with more characters to switch between.

Created by the Kiwi.JS team, this blueprint is designed to show and help out users who are new Kiwi.JS and/or game development and would like to see some game-code in action. 


##Versions

KiwiJS last version test: 1.1.1


##Features

This blueprint includes:
* Multiple characters to dress-up.   
* Cycling buttons which dynamically change items of clothing used based on spritesheets and different textures.
* Random and reset character functions.
* Print and save your character.


##Folders / Files of Note

* /src - All of the working source files for the game. These are compiled into a single file and included into the HTML file.
* /build - Where the latest built version of the game will be stored. Both minified and un-minified.
* /assets - Any game assets are stored
* /lib - External libraries / plugins that are relied upon for the game to work. This includes kiwi.js. 
* index.html - HTML file upon which the game is displayed.


##Compling the Game
This project uses grunt to compile all of the source code (which can be located in the 'src' folder) into a single javascript file which is then included in the main HTML file. 

The steps below assume you already have a copy of the repo.


###Using Grunt

To be able to use grunt, you will firstly need to install (node.js)[http://nodejs.org/] and then the (grunt CLI package)[http://gruntjs.com/getting-started].

With that done, navigate to the 'root' directory of this repo on your computer and using the node package manager install the package dependencies. 

	npm install

To build the game and create a minified version use the default command.

	grunt

To start a local server so you can view the game. Use the 'serve' command.
	
	grunt serve 


##How to use 

All code related to the game can be found in the 'src' folder.


###Loading of Assets 

Loading the assets is split up into two different areas depending on how often they are used in the game and across the states. 

**GLOBAL** assets are loaded at the start of the game (when the 'MainLoader' state is switch to). These types of assets are typically used across multiple states. The one exception to this is the main-menu graphics.

All **OTHER** assets are loaded when the game switches to their respective states. In this case, this is when the game switches to a character like Zoe. You can tell that assets are being loaded in this fashion, when the 'spinner' is being displayed.


###Characters

This game features the ability to dress up multiple different characters. So to keep as much of the code for the characters in a singular place, each State upon which you can dress someone extends the 'Play' state (located in the '_play.js' file). 

The 'Play' state contains the core logic for what to do if someone wants to 'save' or 'print' a character, and all similar functionality between those states. Then all each subsequent state needs to do is manage the dressing up of a character.

*Note: The reason that the '_play' file has a underscore at the start, is to make sure that when grunt concatenates the files into one, it will add this file before any others, which may require it*


##Contribute
If you discover a bug or find yourself just wanting to jump on in and help make this blueprint even better please file and issue and get stuck in. We're a friendly bunch and hope people find themselves wanting to get involved.

https://github.com/gamelab/Zoe-Dress-up-Blueprint/issues/new


