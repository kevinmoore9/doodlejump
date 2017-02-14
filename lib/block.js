

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
