import { Scene, Types } from 'phaser';
import { Physics } from 'phaser';

export default class PlayerObject extends Physics.Arcade.Sprite {
  playerSprite!: Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'dude');
    this.create();
  }

  create() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setBounce(0.1)
      .setGravityY(300)
      .createAnimations();
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const speed = cursors.shift.isDown ? 340 : 160;

    if (cursors.left.isDown) {
      this.setVelocityX(-speed);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(speed);
      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('turn');
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-480);
    }
  }

  onBombCollision(player: PlayerObject) {
    player.setTint(0xff0000);
    player.anims.play('turn');
  }
}
