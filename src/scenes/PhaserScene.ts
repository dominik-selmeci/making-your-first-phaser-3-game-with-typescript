import { Scene, Physics } from "phaser";

export default class HelloWorldScene extends Scene {
  private platforms: Physics.Arcade.StaticGroup | null = null;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    // image size is taken from file
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // x,y - images are centered in the middle
    this.add.image(400, 300, "sky");

    // or you can set origin
    // this.add.image(0, 0, 'sky').setOrigin(0, 0);
    // the order of the images are important

    this.createPlatforms();
    this.createPlayer();
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (!this.player) {
      return;
    }

    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-480);
    }
  }

  private createPlatforms() {
    // this.physics is not initialized in the constructor and is for arcade physics
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }

  private createPlayer() {
    if (!this.platforms) {
      return;
    }

    this.player = this.physics.add
      .sprite(100, 450, "dude")
      .setBounce(0.1)
      .setCollideWorldBounds(true);
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
