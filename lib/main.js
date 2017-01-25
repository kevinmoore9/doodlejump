const Game = require("./game");

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
