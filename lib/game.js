const Doodle = require("./doodle");
const Block = require("./block");

const Map = require("./map");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.doodle = new Doodle;
    this.blocks = [];
    this.score = 0;

    this.start = this.start.bind(this);
    const b = new Block(200, 500);
    const b2 = new Block(200, 300);
    const b3 = new Block(300, 400);


    this.blocks.push(b);
    this.blocks.push(b2);
    this.blocks.push(b3);
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
      case 37: this.doodle.dx = -3;
        break;
      case 39: this.doodle.dx = 3;
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

  draw(ctx) {
    this.moveScreen();

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
