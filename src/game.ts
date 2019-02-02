/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Flappy Bird: Game
 * @license      Digitsensitive
 */

/// <reference path="./phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Flappy Bird",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 405,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  backgroundColor: "#98d687",
  render: { pixelArt: true, antialias: false, autoResize: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
