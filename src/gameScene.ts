import "phaser";
export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    deaths: number;

    maximumOfApples: number = 20;

    info: Phaser.GameObjects.Text;
    private player: Phaser.Physics.Arcade.Sprite

    constructor() {
        super({
            key: "GameScene"
        });
    }
    init(/*params: any*/): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.deaths = 0;
    }
    preload(): void {
        this.load.setBaseURL(
            "/");
        this.load.image('player', 'assets/dude.jpg');
        this.load.image('fruta', 'assets/fruta.png');
    }

    create(): void {
        const instance = this;
        this.info = this.add.text(10, 10, '',
            { font: '24px Arial Bold', fill: '#FBFBAC' });

        this.player = this.physics.add.sprite(100, 100, 'player');


        this.player.setBounce(-1);
        this.player.setCollideWorldBounds(true);

        this.input.keyboard.on('keydown-' + 'W', function (event) { instance.onKeyUp(event) });
        this.input.keyboard.on('keydown-' + 'S', function (event) { instance.onKeyDow(event) });
        this.input.keyboard.on('keydown-' + 'A', function (event) { instance.onKeyLeft(event) });
        this.input.keyboard.on('keydown-' + 'D', function (event) { instance.onKeyRight(event) });

        for (let index = 0; index < this.maximumOfApples; index++) {
            this.createFruit();

        }
    }

    update(time: number): void {
        const diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
        }
        this.info.text = `Placar : ${this.starsCaught} - Mortes : ${this.deaths} (max 3)`;
    }

    private onFail() {
        if (this.deaths > 2) {
            this.scene.start("ScoreScene",
                { starsCaught: this.starsCaught });
        }
    }

    private onVictory() {
        if (this.starsCaught == this.maximumOfApples) {
            this.scene.start("VictoryScene",
                { starsCaught: this.starsCaught });
        }
    }

    private onKeyUp(evnt) {
        this.player.setPosition(this.player.x, this.player.y - 10);
        //this.player.setAcceleration(0,-15)
        if (this.player.body.blocked.up) { this.killPlayer() }
    }
    private onKeyDow(evnt) {
        this.player.setPosition(this.player.x, this.player.y + 10);
        //this.player.setAcceleration(0, 15)
        if (this.player.body.blocked.down) { this.killPlayer() }
    }
    private onKeyLeft(evnt) {
        this.player.setPosition(this.player.x - 10, this.player.y);
        //this.player.setAcceleration(-15,0)
        if (this.player.body.blocked.left) { this.killPlayer() }
    }
    private onKeyRight(evnt) {
        this.player.setPosition(this.player.x + 10, this.player.y);
        //this.player.setAcceleration(15,0)
        if (this.player.body.blocked.right) { this.killPlayer() }
    }

    killPlayer(): void {
        this.deaths += 1;
        this.player.setTint(0xff0000)
        //this.player.setAcceleration(0,0)
        setTimeout(() => {
            this.player.clearTint();
            this.onFail();
            this.player.setPosition(100, 100);
        }, 100);

    }

    colectFruit(fruit: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            this.starsCaught += 1;
            fruit.destroy();
            this.onVictory();
        }
    }

    createFruit() {
        let fruit: Phaser.Physics.Arcade.Image;
        let x = Phaser.Math.Between(50, 600);
        let y = Phaser.Math.Between(200, 500);
        fruit = this.physics.add.image(Math.floor(Math.random() * 1000), y, "fruta");
        fruit.setDisplaySize(40, 40);
        this.physics.add.collider(fruit, this.player,
            this.colectFruit(fruit), null, this);
    }



};
