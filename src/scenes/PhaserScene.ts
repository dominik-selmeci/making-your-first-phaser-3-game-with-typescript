import { Scene, Physics, GameObjects } from 'phaser';
import BombObject from '../objects/BombObject';
import PlayerObject from '../objects/PlayerObject';
import StarObject from '../objects/StarsObject';

export default class HelloWorldScene extends Scene {
  private platforms!: Physics.Arcade.StaticGroup;
  private player!: PlayerObject;
  private stars!: GameObjects.Group;
  private bombs!: GameObjects.Group;
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
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.audio('coin', 'audio/coin.mp3');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, false, true);
    this.createPlatformsAndBackground();

    this.player = new PlayerObject(this, 100, 450);
    this.physics.add.collider(this.player, this.platforms);

    this.initStarObjects();
    this.createScoreInfo();
    this.initBombObjects();
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

  private initStarObjects() {
    this.stars = this.add.group();
    this.physics.add.collider(this.stars, this.platforms);

    for (let i = 0; i < 6; i++) {
      this.stars.add(new StarObject(this, 60 + 130 * i, 0));
    }

    this.physics.add.overlap(
      this.player,
      this.stars,
      (player, star) =>
        this.playerAndStarCollission(player as PlayerObject, star as StarObject),
      undefined,
      this
    );
  }

  initBombObjects() {
    this.bombs = this.add.group();
    this.physics.add.collider(this.platforms, this.bombs);
    this.physics.add.collider(
      this.player,
      this.bombs,
      (player) => {
        this.player.onBombCollision(player as PlayerObject);
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

  private playerAndStarCollission(player: PlayerObject, star: StarObject) {
    star.onPlayerCollision(null, star);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        const star = child as StarObject;
        star.enableBody(true, star.x, 0, true, true);
      });
    }

    if (this.stars.countActive(true) === 6) {
      const between = Phaser.Math.Between;
      const x = player.x < 400 ? between(400, 800) : between(0, 400);
      this.bombs.add(new BombObject(this, x, 16));
    }

    this.updateScoreInfo();
  }
}
