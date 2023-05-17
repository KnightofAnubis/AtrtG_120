class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.image('menuBackground', './assets/ground.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '36px',
            backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'SPACE RACE', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '24px';
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use <- -> arrows to move and SPACEBAR to jump', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        });
    }
}
