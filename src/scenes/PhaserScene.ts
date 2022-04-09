import { Scene, Physics } from 'phaser';

export default class HelloWorldScene extends Scene {
  private platforms: Physics.Arcade.StaticGroup | null = null;

  preload() {
    // image size is taken from file
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // x,y - images are centered in the middle
    this.add.image(400, 300, 'sky');

    // or you can set origin
    // this.add.image(0, 0, 'sky').setOrigin(0, 0);
    // the order of the images are important

    // this.physics is not initialized in the constructor and is for arcade physics
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  }

  update() {}
}
