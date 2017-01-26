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
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Doodle = __webpack_require__(2);
	const Block = __webpack_require__(3);
	
	class Game {
	  constructor(ctx) {
	    let interval;
	    this.ctx = ctx;
	    this.doodle = new Doodle;
	    this.doodle.draw(ctx);
	    this.blocks = [
	      new Block(200, 500), new Block(200, 300, 2),
	      new Block(300, 400), new Block(110, 370),
	      new Block(100, 200), new Block(250, 120)
	    ];
	    this.start = this.start.bind(this);
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
	      case 37: this.doodle.dx = -5;
	        break;
	      case 39: this.doodle.dx = 5;
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
	        this.blocks[i].dy = 8;
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
	    let type = Math.random() > 0.2 ? 1 : 2 ;
	    this.blocks.push(new Block(x, y, type));
	  }
	  ensureMoreBlocks() {
	    if (this.blocks[this.blocks.length -1].y > 120) {
	      this.newRandomBlock(80);
	    }
	  }
	
	  ensureReachableBlock() {
	
	  }
	
	  drawMap(ctx) {
	    ctx.font = "30px Veranda";
	    ctx.fillStyle = "black";
	    ctx.fillText(
	      `${Math.round(this.blocks[0].y - this.doodle.lastJump.y)}`,
	        10, 50
	      );
	
	    // line
	    ctx.beginPath();
	    ctx.moveTo(0, 70);
	    ctx.lineTo(400,70);
	    ctx.stroke();
	
	    // blue rect
	    ctx.beginPath();
	    ctx.rect(0, 0, 400, 70);
	    ctx.fillStyle = "rgba(135,206,250, 0.6)";
	    ctx.fill();
	  }
	
	  draw(ctx) {
	    this.moveScreen();
	    this.ensureMoreBlocks();
	
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    // ctx.fillStyle = Game.BACKGROUND_COLOR;
	
	    // Doodle Checks
	    if (this.doodle.y <= this.doodle.jumpFrom - this.doodle.jumpHeight
	        && this.doodle.dy < 0
	      ) {
	      this.doodle.dy = this.doodle.dy * -1;
	    }
	    this.jumpCheck();
	
	    this.allObjects().forEach((object) => {
	      object.draw(ctx);
	    });
	    this.drawMap(ctx);
	  }
	
	
	}
	
	Game.DIM_X = 400;
	Game.DIM_Y = 600;
	Game.BACKGROUND_COLOR = "#00FFFF00";
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Doodle {
	  constructor(ctx) {
	    this.x = 200;
	    this.y = 400;
	    this.dx = 0;
	    this.dy = 0;
	    this.gravity = 0.4;
	    this.lastJump = null;
	    this.jumpFrom = 500;
	    this.jumpHeight = 150;
	
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
	    ctx.beginPath();
	    ctx.arc(
	      this.x, this.y, 15, 0, 2 * Math.PI, true
	    );
	    ctx.fill();
	  }
	
	  jump() {
	    this.dy = -10;
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