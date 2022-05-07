import { Physics, Scene } from 'phaser';

export default class BombObject extends Physics.Arcade.Image {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'bomb');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBounce(1)
      .setCollideWorldBounds(true)
      .setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
