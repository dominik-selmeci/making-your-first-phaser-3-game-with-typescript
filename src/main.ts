import { AUTO, Game } from 'phaser';
import './style.css';
import PhaserScene from './scenes/PhaserScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  scene: [PhaserScene],
};

export default new Game(config);
