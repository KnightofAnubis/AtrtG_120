class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('ground', 'assets/background.png');

        this.load.audio('music' , 'assets/Space1.wav');

        for (let i = 1; i <= 7; i++) {
            this.load.image(`player${i}`, `assets/playersheet/player${i}.png`);
        }
    
    }
    
    create() {
        const groundY = game.config.height - borderUISize - borderPadding;
        this.ground = this.add.tileSprite(0, groundY+40, game.config.width, game.config.height, 'ground').setOrigin(0, 1);
    
        // Remove this line, because we will create the player below with the animation
        // this.player = new Player(this, game.config.width / 2, groundY + 30, 'player', groundY).setOrigin(0.5, 1);
    
        this.asteroids = new AsteroidGroup(this, groundY); // Create an AsteroidGroup instead of a single Asteroid
    
    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        this.anims.create({
            key: 'playerRun',
            frames: [
                { key: 'player1' },
                { key: 'player2' },
                { key: 'player3' },
                { key: 'player4' },
                { key: 'player5' },
                { key: 'player6' },
                { key: 'player7' },
            ],
            frameRate: 10, // Set the frame rate for the animation
            repeat: -1 // Loop the animation
        });
        this.player = new Player(this, game.config.width / 2, groundY + 30, 'player1', groundY).setOrigin(0.5, 1);
        this.player.play('playerRun');
        
        this.physics.add.collider(this.player, this.asteroids, this.hitObstacle, null, this);
        
    }
    

    update() {
        this.player.update();
        this.asteroids.update(); // Update the AsteroidGroup
        
    }
    
    hitObstacle(player, obstacle) {
        if (obstacle instanceof Asteroid) {
            obstacle.reset();
        }
    }
}
