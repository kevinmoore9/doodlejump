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
