import { Scene, Types } from "phaser";
import { Physics, GameObjects } from "phaser";

export default class PlayerObject extends GameObjects.GameObject {
  platforms: Physics.Arcade.StaticGroup;
  playerSprite!: Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Scene, platforms: Physics.Arcade.StaticGroup) {
    super(scene, "player");
    this.platforms = platforms;

    this.create();
  }

  create() {
    this.playerSprite = this.scene.physics.add
      .sprite(100, 450, "dude")
      .setBounce(0.1)
      .setCollideWorldBounds(true);
    this.playerSprite.body.setGravityY(300);
    this.scene.physics.add.collider(this.playerSprite, this.platforms);

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.playerSprite.setVelocityX(-160);
      this.playerSprite.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.playerSprite.setVelocityX(160);
      this.playerSprite.anims.play("right", true);
    } else {
      this.playerSprite.setVelocityX(0);
      this.playerSprite.anims.play("turn");
    }

    if (cursors.up.isDown && this.playerSprite.body.touching.down) {
      this.playerSprite.setVelocityY(-480);
    }
  }

  onBombCollision(player: Types.Physics.Arcade.SpriteWithDynamicBody) {
    player.setTint(0xff0000);
    player.anims.play("turn");
  }
}
