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
        this.load.path = "./assets/"
        this.load.image('heart', 'heart.png',);
        this.load.atlas('sunset', 'sunset.png', 'sunset.json');
        this.load.atlas('jetpack', 'jetpack-sheet.png', 'jetpack.json');
        this.load.image('asteroid', 'asteroid.png');
        this.load.atlas('warning', 'warning.png', 'warning.json');
        this.load.audio('bgdMusic', 'Space1.wav')
    }

    create() {
        this.scene.start('menuScene');
    }
}