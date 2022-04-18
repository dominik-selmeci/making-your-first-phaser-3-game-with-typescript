import { Physics, GameObjects, Scene } from 'phaser';

export default class BombObject extends GameObjects.GameObject {
  platforms: Physics.Arcade.StaticGroup;
  bombGroup!: Physics.Arcade.Group;

  constructor(scene: Scene, platforms: Physics.Arcade.StaticGroup) {
    super(scene, 'stars');
    this.platforms = platforms;

    this.create();
  }

  create() {
    this.bombGroup = this.scene.physics.add.group();
    this.scene.physics.add.collider(this.bombGroup, this.platforms);
  }

  createBomb(playerPositionX: number) {
    var x = playerPositionX < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bomb = this.bombGroup.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
