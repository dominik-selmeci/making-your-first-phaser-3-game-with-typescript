import { Scene, Physics } from 'phaser';
import BombObject from '../objects/BombObject';
import PlayerObject from '../objects/PlayerObject';
import StarObject from '../objects/StarsObject';

export default class HelloWorldScene extends Scene {
  private platforms!: Physics.Arcade.StaticGroup;
  private player!: PlayerObject;
  private bombObject!: BombObject;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    // image size is taken from file
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, false, true);
    this.createPlatformsAndBackground();

    this.player = new PlayerObject(this, this.platforms);
    this.createStarObject();
    this.createScoreInfo();
    this.createBombObject();
  }

  update() {
    this.player.update();
  }

  private createPlatformsAndBackground() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  }

  private createStarObject() {
    const starObject = new StarObject(this, this.platforms);

    this.physics.add.overlap(
      this.player.playerSprite,
      starObject.starGroup,
      (player, star) => {
        starObject.onPlayerCollision(
          null,
          star as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        );
        if (starObject.starGroup.countActive(true) === 6) {
          this.bombObject.createBomb(
            (player as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody).x
          );
        }
        this.updateScoreInfo();
      },
      undefined,
      this
    );
  }

  createBombObject() {
    this.bombObject = new BombObject(this, this.platforms);
    this.physics.add.collider(
      this.player.playerSprite,
      this.bombObject.bombGroup,
      (player) => {
        this.player.onBombCollision(player as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody);
        this.physics.pause();
      },
      undefined,
      this
    );
  }

  private createScoreInfo() {
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      color: '#000',
    });
  }

  private updateScoreInfo() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
