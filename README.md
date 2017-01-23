# DoodleJump

## Background

Doodle Jump was a popular iPhone game known for it's addicting yet simple gameplay. The rules of the game are simple, control the alien to jump from block to block withouot falling out of the screen. 

## Functionality and MVP

With this implementation of DoodleJump, users will be able to: 
  * Start and pause the gameplay
  * Control the alien with the left and right arrow keys and the A and S keys
  * Toggle between multiple background themes
 
 In addition the game will include:
  * Basic gamplay obstacles including springs
  * Appropriate sound and background music that can be easily toggled off

## Wireframes

The app will be a simple, one page app with the gameplay screen, controls, and buttons to toggle different theme options. In addition there will be a pop up modal with basic rules and background info as well as links to my LinkedIn and Github. It will be organized as shown below:

[Wireframe](doodle_wire_frame)

## Architecture and Technologies

This project will be implemented using the following technologies:
* Vanilla JavaScript with jQuery
* HTML 5 Canvas
* Webpack

There will be three main scripts will control the functionality of the gameplay, 
* map.js: this script will handle the generation of a randomized set of blocks on the map as well as the logic for rendering the basic gameplay view.
* block.js: this script will handle the features of an individual block including solid or breakable as well as any obstacles they may contain
* doodle.js: this script will contain the movement and rendering of the alien

These files will all be bundled into a fourth, Webpack entry file.

## Implementation Timeline

### Day 1:
Set up the framework for the entire project. Ensure that Webpack is packing properly into the entry file. Write the basic script for map.js and start getting comfortable rendering canvas objects.

Goals for the day:
* Get wepack.config.js and package.json set up and running property
* Review and familiarize with canvas
* Write the basic script for rendering a game map

### Day 2: 
Today will be focused on writing the script for a basic block element (solid, no obstacles) and the basic script for the aliens motion and controls. By the end of today, we should have a very basic, yet complete gameplay.

Goals for the day:
* Write the script for a basic block with no obstacles in block.js
* Write the script for the control and motion of the alien in doodle.js
* If time permits, write more advanced gameplay features such as pausing and screenwrapping

### Day 3: 
Today will be all about the blocks and obstacles and how the affect the alien. We will start with two additional block types: breakable blocks and blocks with springs. These will have slightly different affects on the aliens change in velocity when contacted by the alien.

Goals for the day:
* Write the scrips for the basic alternate block types (breakable and spring)
* Render each block type distinctly and cleanly with canvas

### Day 4:
Finish any canvas styling on all three files. Add styling to the page with a Title, rules, controls and links the LinkedIn and Github. Create additional themes for gameplay as time permits.

Goals for the day:
* Finish any and all canvas styling
* Flush out the webpage with rules, controls, titles
* Create additional themes for gameplay


## Bonus Features:
* Add additional obsticales such as jetpacks, rockets, etc.
* Track high scores
