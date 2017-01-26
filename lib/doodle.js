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
