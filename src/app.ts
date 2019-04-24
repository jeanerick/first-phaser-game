import "phaser";
import { WelcomeScene } from "./welcomeScene";
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { VictoryScene } from './VictoryScene';

const config: GameConfig = {
  title: "Horse",
  width: '100hw',
  height: '95vw',
  parent: "game",
  scene: [WelcomeScene, GameScene, ScoreScene, VictoryScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  backgroundColor: "#18216D"
};
export class SnakeGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  const game = new SnakeGame(config);
};