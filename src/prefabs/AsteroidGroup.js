class AsteroidGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.spawnAsteroid(scene);
    }

    spawnAsteroid(scene) {
        const x = Phaser.Math.Between(scene.game.config.width / 2 - 50, scene.game.config.width / 2 + 50); // Add randomness to the x position
        const y = scene.game.config.height / 2;
    
        const asteroidHeight = scene.textures.get('asteroid').getSourceImage().height;
        const groundY = game.config.height - borderUISize - borderPadding;
    
        const asteroid = new Asteroid(scene, x, y, 'asteroid', 0, groundY);
        this.add(asteroid);
    
        // Create a timed event to spawn the next Asteroid
        const spawnDelay = Phaser.Math.Between(1000, 5000);
        scene.time.delayedCall(spawnDelay, () => {
            this.spawnAsteroid(scene);
        });
    }
    

    update() {
        this.getChildren().forEach(asteroid => {
            asteroid.update();
    
            if (asteroid.y - asteroid.height > this.scene.game.config.height) {
                console.log("destroyed");
                asteroid.destroy();
                this.spawnAsteroid(this.scene);
            }

        });
    }
    
}
