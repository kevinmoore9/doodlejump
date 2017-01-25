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
	  c.width = Game.DIM_X;
	  c.height = Game.DIM_Y;
	  const ctx = c.getContext('2d');
	  const game = new Game(ctx);
	  document.addEventListener('keydown', e => {
	    game.handleKeyPress(e);
	  });
	  document.addEventListener('keyup', () => {
	    game.doodle.dx = 0;
	  });
	
	  game.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Doodle = __webpack_require__(2);
	const Block = __webpack_require__(3);
	
	const Map = __webpack_require__(4);
	
	class Game {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.doodle = new Doodle;
	    this.blocks = [];
	    this.score = 0;
	
	    this.start = this.start.bind(this);
	    const b = new Block(200, 500);
	    const b2 = new Block(200, 300, 2);
	    const b3 = new Block(300, 400);
	    const b4 = new Block(170, 370);
	    const b5 = new Block(100, 200);
	    const b6 = new Block(250, 120);
	
	
	
	    this.blocks.push(b);
	    this.blocks.push(b2);
	    this.blocks.push(b3);
	    this.blocks.push(b4);
	    this.blocks.push(b5);
	    this.blocks.push(b6);
	
	
	    this.doodle.draw(ctx);
	    let interval;
	  }
	
	  start() {
	    this.interval = setInterval(this.draw.bind(this), 18, this.ctx);
	  }
	
	  pause() {
	    clearInterval(this.interval);
	    this.interval = undefined;
	  }
	
	  handleKeyPress(e) {
	    let code = e.keyCode;
	    switch (code) {
	      case 32: this.interval ? this.pause() : this.start() ;
	        break;
	      case 37: this.doodle.dx = -4;
	        break;
	      case 39: this.doodle.dx = 4;
	      defualt: return null;
	    }
	  }
	
	  allObjects() {
	    return [this.doodle].concat(this.blocks);
	  }
	
	  moveScreen() {
	    this.doodle.lastJump = this.doodle.lastJump
	        ? this.doodle.lastJump
	        : this.blocks[0];
	
	    if (this.doodle.lastJump.y < 500) {
	      for(let i = 0; i < this.blocks.length; i++) {
	        this.blocks[i].dy = 3;
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
	      if ( this.doodle.x <= block.x + block.width/2
	        && this.doodle.x >= block.x - block.width/2) {
	
	        // hits block height while falling
	          if (this.doodle.y <= block.y
	           && this.doodle.y >= block.y -block.height/2
	           && this.doodle.dy > 0) {
	             // jump from new block
	             this.doodle.lastJump = block;
	             this.doodle.jumpFrom = block.y;
	             this.jump();
	           }
	        }
	    });
	  }
	
	  jump() {
	    this.doodle.dy = Math.abs(this.doodle.dy) * -1;
	  }
	  newRandomBlock(maxY) {
	    let x = Math.random() * Game.DIM_X;
	    let y = Math.random() * 80;
	    let type = Math.random() > 0.2 ? 1 : 2 ;
	    this.blocks.push(new Block(x, y, type));
	  }
	  ensureMoreBlocks() {
	    if (this.blocks[this.blocks.length -1].y > 120) {
	      this.newRandomBlock(80);
	    }
	  }
	
	
	  draw(ctx) {
	    this.moveScreen();
	    this.ensureMoreBlocks();
	
	    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    this.ctx.fillStyle = Game.BACKGROUND_COLOR;
	    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
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
	  }
	
	
	}
	
	Game.DIM_X = 400;
	Game.DIM_Y = 600;
	Game.BACKGROUND_COLOR = "#000000";
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Doodle {
	  constructor(ctx) {
	    this.x = 200;
	    this.y = 320;
	    this.dx = 0;
	    this.dy = -8;
	    // this.dy = 0;
	    // this.gravity = 0.6;
	    this.lastJump = null;
	    this.jumpFrom = 500;
	    this.jumpHeight = 150;
	
	  }
	
	  draw(ctx) {
	    // this.dy += this.gravity;
	    if (this.x <= 0) {
	      this.x = 400;
	    } else if (this.x >= 400) {
	      this.x = 0;
	    }
	    
	    this.y += this.dy;
	    this.x += this.dx;
	
	    ctx.fillStyle = "blue";
	    ctx.beginPath();
	    ctx.arc(
	      this.x, this.y, 15, 0, 2 * Math.PI, true
	    );
	    ctx.fill();
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
	    this.width = 50;
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	
	class Map {
	
	}
	
	module.exports = Map;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map