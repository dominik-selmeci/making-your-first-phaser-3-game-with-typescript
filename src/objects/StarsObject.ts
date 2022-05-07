import { Physics, Scene } from 'phaser';
import PlayerObject from './PlayerObject';

export default class StarObject extends Physics.Arcade.Image {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'star');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBounce(Phaser.Math.FloatBetween(0.2, 0.9));
  }

  onPlayerCollision(_: PlayerObject | null = null, star: Physics.Arcade.Image) {
    star.disableBody(true, true);
    this.scene.sound.play('coin');
  }
}
