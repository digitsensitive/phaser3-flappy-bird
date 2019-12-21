/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Flappy Bird: Pipe
 * @license      Digitsensitive
 */

export class Pipe extends Phaser.GameObjects.Image {
  constructor(params, velocity: number) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-1 * velocity);
    this.body.setSize(20, 20);

    this.scene.add.existing(this);
  }
}
