/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Flappy Bird: Game Scene
 * @license      Digitsensitive
 */

import { Bird } from "../objects/bird";
import { Pipe } from "../objects/pipe";

export class GameScene extends Phaser.Scene {
  // game objects
  private bird: Bird;
  private pipes: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.pack(
      "flappyBirdPack",
      "./src/assets/pack.json",
      "flappyBirdPack"
    );
  }

  init(): void {
    this.registry.set("score", -1);
  }

  create(): void {
    // *****************************************************************
    // GAME OBJECTS
    // *****************************************************************
    this.background = this.add.tileSprite(0, 0, 390, 600, "background");
    this.background.setOrigin(0, 0);

    this.scoreText = this.add
      .bitmapText(
        this.sys.canvas.width / 2 - 14,
        30,
        "font",
        this.registry.get("score")
      )
      .setDepth(2);

    this.pipes = this.add.group({ classType: Pipe });

    this.bird = new Bird({
      scene: this,
      x: 50,
      y: 100,
      key: "bird"
    });

    this.addRowOfPipes();

    // *****************************************************************
    // TIMER
    // *****************************************************************
    this.time.addEvent({
      delay: 1500,
      callback: this.addRowOfPipes,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    if (!this.bird.getDead()) {
      this.background.tilePositionX += 4;
      this.bird.update();
      this.physics.overlap(
        this.bird,
        this.pipes,
        function() {
          this.bird.setDead(true);
        },
        null,
        this
      );
    } else {
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        function(pipe) {
          pipe.body.setVelocityX(0);
        },
        this
      );

      if (this.bird.y > this.sys.canvas.height) {
        this.scene.restart();
      }
    }
  }

  private addOnePipe(x, y, frame, hole): void {
    // create a pipe at the position x and y
    let pipe = new Pipe({
      scene: this,
      x: x,
      y: y,
      frame: frame,
      key: "pipe"
    });

    // add pipe to group
    this.pipes.add(pipe);
  }

  private addRowOfPipes(): void {
    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText("" + this.registry.get("score"));

    // randomly pick a number between 1 and 5
    let hole = Math.floor(Math.random() * 5) + 1;

    // add 6 pipes with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i++) {
      if (i != hole && i != hole + 1 && i != hole + 2) {
        if (i == hole - 1) {
          this.addOnePipe(400, i * 60, 0, hole);
        } else if (i == hole + 3) {
          this.addOnePipe(400, i * 60, 1, hole);
        } else {
          this.addOnePipe(400, i * 60, 2, hole);
        }
      }
    }
  }
}
