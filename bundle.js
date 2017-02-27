/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const c = document.getElementById('canvas');
	  const ctx = c.getContext('2d');
	  c.width = Game.DIM_X;
	  c.height = Game.DIM_Y;
	  let theme = 1;
	  let game = new Game(ctx, theme);
	  // game.drawHome();
	
	  document.getElementById('doodle').addEventListener("click", () => {
	    theme = 1;
	    game = new Game(ctx, theme);
	    game.drawHome();
	  });
	  document.getElementById('spongebob').addEventListener("click", () => {
	    theme = 2;
	    game = new Game(ctx, theme);
	    game.drawHome();
	  });
	
	
	  document.addEventListener('keydown', e => {
	    game.handleKeyPress(e);
	  });
	  document.addEventListener('keyup', () => {
	    game.doodle.dx = 0;
	  });
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Doodle = __webpack_require__(2);
	const Block = __webpack_require__(3);
	
	class Game {
	  constructor(ctx, theme) {
	    let interval;
	    this.theme = theme;
	    this.ctx = ctx;
	    this.doodle = new Doodle(ctx, theme);
	    this.blocks = [
	      new Block(200, 500), new Block(200, 300, 2),
	      new Block(300, 400), new Block(110, 370),
	      new Block(100, 200), new Block(250, 120)
	    ];
	    this.start = this.start.bind(this);
	    this.drawHome();
	  }
	
	  drawHome() {
	    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    this.doodle.draw(this.ctx);
	    this.ctx.font = "30px Gloria Hallelujah";
	    this.ctx.fillStyle = "#A51834";
	    this.ctx.fillText("press space to begin", 60, 250);
	    this.drawMap(this.ctx);
	  }
	
	  start() {
	    this.interval = setInterval(this.draw.bind(this), 18, this.ctx);
	  }
	
	  pause() {
	    clearInterval(this.interval);
	    this.interval = undefined;
	  }
	
	  gameOver() {
	    clearInterval(this.interval);
	    this.interval = undefined;
	
	    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    this.ctx.font = "50px Gloria Hallelujah";
	    this.ctx.fillStyle = "#A51834";
	    this.ctx.fillText("game over!", 70, 150);
	    this.ctx.font = "28px Gloria Hallelujah";
	    this.ctx.fillStyle = "black";
	    this.ctx.fillText(`your score: ${Math.round(this.blocks[0].y - this.doodle.lastJump.y)}`, 100, 240);
	    this.ctx.fillText(`your highscore: ${Math.round(this.blocks[0].y - this.doodle.lastJump.y)}`, 80, 300);
	    this.ctx.font = "20px Gloria Hallelujah";
	    this.ctx.fillText('Select a character to jump again!', 30, 400);
	    this.drawMap(this.ctx);
	  }
	
	  handleKeyPress(e) {
	    let code = e.keyCode;
	    switch (code) {
	      case 32: this.interval ? this.pause() : this.start() ;
	        break;
	      case 13: this.restart();
	        break;
	      case 37: this.doodle.dx = -5;
	        break;
	      case 39: this.doodle.dx = 5;
	      defualt: return null;
	    }
	  }
	
	  allObjects() {
	    return this.blocks.concat([this.doodle]);
	  }
	
	  moveScreen() {
	    this.doodle.lastJump = this.doodle.lastJump
	        ? this.doodle.lastJump
	        : this.blocks[0];
	
	    if (this.doodle.lastJump.y < 200) {
	      for(let i = 0; i < this.blocks.length; i++) {
	        this.blocks[i].dy = 20;
	      }
	    } else if (this.doodle.lastJump.y < 400) {
	      for(let i = 0; i < this.blocks.length; i++) {
	        this.blocks[i].dy = 15;
	        }
	      } else if (this.doodle.lastJump.y < 500) {
	        for(let i = 0; i < this.blocks.length; i++) {
	        this.blocks[i].dy = 10;
	      }
	    } else if (this.doodle.lastJump.y >= 400) {
	      for(let i = 0; i < this.blocks.length; i++) {
	        this.blocks[i].dy = 0;
	      }
	    }
	  }
	
	  jumpCheck() {
	    this.blocks.forEach( block => {
	      // hit block horizontally
	      if ( this.doodle.x <= block.x + 40
	        && this.doodle.x >= block.x - 40) {
	
	        // hits block height while falling
	          if (this.doodle.y <= block.y + block.height/2
	           && this.doodle.y >= block.y -block.height/2
	           && this.doodle.dy > 0) {
	             // jump from new block
	             this.doodle.lastJump = block;
	             this.doodle.jumpFrom = block.y;
	             this.doodle.jump();
	           }
	        }
	    });
	  }
	
	
	  newRandomBlock(maxY) {
	    let x = (Math.random() * (Game.DIM_X - 40)) + 20;
	    let y = Math.random() * 80;
	    let type = 1;
	    type = Math.random() < 0.7 ? type : 2 ;
	    type = Math.random() < 0.9 ? type : 3 ;
	    this.blocks.push(new Block(x, y, type));
	  }
	  ensureMoreBlocks() {
	    if (this.blocks[this.blocks.length -1].y > 120) {
	      this.newRandomBlock(80);
	    }
	  }
	
	  drawMap(ctx) {
	
	    // line
	    ctx.beginPath();
	    ctx.moveTo(0, 70);
	    ctx.lineTo(400,60);
	    ctx.stroke();
	
	    // blue rect
	    ctx.fillStyle = "rgba(135,206,250,0.7)";
	    ctx.beginPath();
	    ctx.moveTo(0,0);
	    ctx.lineTo(0,70);
	    ctx.lineTo(400, 60);
	    ctx.lineTo(400, 0);
	    ctx.closePath();
	    ctx.fill();
	
	    // text
	    ctx.font = "30px Veranda";
	    ctx.fillStyle = "black";
	    if (this.doodle.lastJump) {
	      ctx.fillText(
	        `${Math.round(this.blocks[0].y - this.doodle.lastJump.y)}`,
	        10, 50
	      );
	    } else {
	      ctx.fillText(`0`, 10, 50);
	    }
	  }
	
	  draw() {
	    this.moveScreen();
	    this.ensureMoreBlocks();
	
	    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	    // Doodle Checks
	    if (this.doodle.y <= this.doodle.jumpFrom - this.doodle.jumpHeight
	        && this.doodle.dy < 0
	      ) {
	      this.doodle.dy = this.doodle.dy * -1;
	    }
	    this.jumpCheck();
	
	    this.allObjects().forEach((object) => {
	      object.draw(this.ctx);
	    });
	    this.drawMap(this.ctx);
	    this.doodle.y > Game.DIM_Y ? this.gameOver() : null;
	  }
	
	
	}
	
	Game.DIM_X = 400;
	Game.DIM_Y = 600;
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Doodle {
	  constructor(ctx, theme) {
	    this.x = 200;
	    this.y = 400;
	    this.dx = 0;
	    this.dy = 0;
	    this.gravity = 0.4;
	    this.lastJump = null;
	    this.jumpFrom = 500;
	    this.jumpHeight = 150;
	    switch (theme) {
	      case 1: this.img = document.getElementById('doodle');
	        break;
	      case 2: this.img = document.getElementById('spongebob');
	        break;
	      default: this.img = document.getElememtById('doodle');
	    }
	
	  }
	
	  draw(ctx) {
	    this.dy += this.gravity;
	    if (this.x <= 0) {
	      this.x = 400;
	    } else if (this.x >= 400) {
	      this.x = 0;
	    }
	
	    this.y += this.dy;
	    this.x += this.dx;
	
	    ctx.fillStyle = "blue";
	
	    ctx.drawImage(
	      this.img, this.x - 40, this.y - 80, 80, 80
	    );
	
	    ctx.fill();
	  }
	
	  jump() {
	    this.dy = -10;
	    this.jumpHeight = 150;
	
	  }
	
	}
	
	module.exports = Doodle;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	
	class Block {
	  constructor(x, y, type = 1) {
	    this.x = x;
	    this.y = y;
	    this.dy = 0;
	    this.dx = 0;
	    this.type = type;
	    this.width = 60;
	    this.height = 20;
	    this.color = "green";
	    if (type === 2) {
	      this.dx = 2;
	      this.color = "blue";
	    }
	  }
	
	  draw(ctx) {
	    if (this.x <= this.width/2 || this.x >= 400 - this.width/2) {
	      this.dx *= -1;
	    }
	    this.y += this.dy;
	    this.x += this.dx;
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	  }
	
	
	}
	
	module.exports = Block;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map