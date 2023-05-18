class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    // loading bar code adapted from paddle parkour loading bar
    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 
            loadingBar.fillStyle(0xFFFFFF, 1);                  
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
        this.load.image('heart', './assets/heart.png',);
        this.load.image('sunset', './assets/sunset.png');
        this.load.image('jetPackGuy', './assets/spaceman.png');
        this.load.atlas('warning', './assets/warning.png', './assets/warning.json');
    }

    create() {
        this.scene.start('menuScene');
    }
}