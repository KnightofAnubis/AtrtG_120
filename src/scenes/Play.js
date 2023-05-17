class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('player', 'assets/player.jpeg');
        this.load.image('ground', 'assets/ground.png');
    }
    
    create() {
        const groundY = game.config.height - borderUISize - borderPadding;
        this.ground = this.add.tileSprite(0, groundY+40, game.config.width, game.config.height, 'ground').setOrigin(0, 1);

        this.player = new Player(this, game.config.width / 2, groundY + 30, 'player', groundY).setOrigin(0.5, 1);
        this.asteroids = new AsteroidGroup(this, groundY); // Create an AsteroidGroup instead of a single Asteroid
        
        this.physics.add.collider(this.player, this.asteroids, this.hitObstacle, null, this);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.player.update();
        this.asteroids.update(); // Update the AsteroidGroup
        this.ground.tilePositionX += 4;
    }
    
    hitObstacle(player, obstacle) {
        if (obstacle instanceof Asteroid) {
            obstacle.reset();
        }
    }
}
