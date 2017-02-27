const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');
  c.width = Game.DIM_X;
  c.height = Game.DIM_Y;
  let theme = 1;
  let game = new Game(ctx, theme);
  // game.drawHome();

  document.getElementById('doodle').addEventListener("click", () => {
    theme = 1;
    game = new Game(ctx, theme);
    game.drawHome();
  });
  document.getElementById('spongebob').addEventListener("click", () => {
    theme = 2;
    game = new Game(ctx, theme);
    game.drawHome();
  });


  document.addEventListener('keydown', e => {
    game.handleKeyPress(e);
  });
  document.addEventListener('keyup', () => {
    game.doodle.dx = 0;
  });

});
