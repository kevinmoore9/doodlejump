const Doodle = require("./doodle");
const Block = require("./block");

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
