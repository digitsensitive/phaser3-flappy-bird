const config: GameConfig = {
  width: 390,
  height: 600,
  parent: "game",
  scene: [GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }
    }
  },
  render: { pixelArt: true }
};
