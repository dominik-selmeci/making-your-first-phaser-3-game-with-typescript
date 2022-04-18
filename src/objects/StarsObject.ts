import { Physics, GameObjects, Scene } from 'phaser';
import PlayerObject from './PlayerObject';

export default class StarObject extends GameObjects.GameObject {
  platforms: Physics.Arcade.StaticGroup;
  starGroup!: Physics.Arcade.Group;

  constructor(scene: Scene, platforms: Physics.Arcade.StaticGroup) {
    super(scene, 'stars');
    this.platforms = platforms;

    this.create();
  }

  create() {
    this.starGroup = this.scene.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: 60, y: 0, stepX: 130 },
    });
    this.starGroup.children.each((star) => {
      (star as Phaser.Types.Physics.Arcade.ImageWithDynamicBody).setBounceY(
        Phaser.Math.FloatBetween(0.2, 0.9)
      );
    });

    this.scene.physics.add.collider(this.starGroup, this.platforms);
  }

  onPlayerCollision(
    _: PlayerObject | null = null,
    star: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    star.disableBody(true, true);

    if (this.starGroup.countActive(true) === 0) {
      this.starGroup.children.iterate(function (child) {
        const star = child as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
        star.enableBody(true, star.x, 0, true, true);
      });
    }
  }
}
