

class Block {
  constructor(x, y, type = 1) {
    this.x = x;
    this.y = y;
    this.dy = 0;
    this.dx = 0;
    this.type = type;
    this.width = 50;
    this.height = 20;
    if (type === 2) {
      this.dx = 2;
    }
  }

  draw(ctx, color = "green") {
    this.y += this.dy;
    ctx.fillStyle = color;
    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
  }


}

module.exports = Block;
