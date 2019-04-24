import "phaser";
export class VictoryScene extends Phaser.Scene {
  score: number;
  result: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;
constructor() {
    super({
      key: "VictoryScene"
    });
  }
init(params: any): void {
    this.score = params.starsCaught;
  }
create(): void {
    var resultText: string = 'Parabens você venceu!!!!!!!!!!!';
    this.result = this.add.text(200, 250, resultText,
      { font: '48px Arial Bold', fill: '#FBFBAC' });
var hintText: string = "Aperte Espaco para reiniciar";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });
this.input.keyboard.on('keydown-SPACE', function (/*pointer*/) {
      this.scene.start("WelcomeScene");
    }, this);
  }
};