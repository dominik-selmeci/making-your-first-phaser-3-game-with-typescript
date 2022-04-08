import { Scene } from 'phaser';

export default class HelloWorldScene extends Scene {
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

    this.add.image(400, 300, 'star');

    // the order of the images are important
  }

  update() {}
}
