class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
      this.load.audio('sfx_select', './assets/sound/selection.wav'); 
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

        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            //spaceshipSpeed: 3,
            gameTimer: 60 // Change this value to set the game duration (e.g., 120000 for 2 minutes)
          }
          
          this.sound.play('sfx_select');
          this.time.delayedCall(1000, () => {
            this.scene.start('playScene');    
          });
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            //spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}
