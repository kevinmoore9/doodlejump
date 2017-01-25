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
