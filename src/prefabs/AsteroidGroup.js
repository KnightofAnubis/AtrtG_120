class AsteroidGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.spawnAsteroid(scene);
    }

    spawnAsteroid(scene) {
        const x = scene.game.config.width + 100; // Spawn Asteroid off the screen
        const y = Phaser.Math.Between(borderUISize + borderPadding,
             game.config.height - borderUISize - borderPadding); 
             
        const asteroidHeight = scene.textures.get('asteroid').getSourceImage().height;
        

        const asteroid = new Asteroid(scene, x, y, 'asteroid'); // Replace 'Asteroid' with the desired texture name
        this.add(asteroid);

        // Create a timed event to spawn the next Asteroid
        const spawnDelay = Phaser.Math.Between(1000, 5000); // Adjust the values to change the frequency of Asteroids
        scene.time.delayedCall(spawnDelay, () => {
            this.spawnAsteroid(scene);
        });
    }

    update() { // Add update method to update all Asteroids in the group
        this.getChildren().forEach(asteroid => {
            asteroid.x -= 5;
            asteroid.update();
    
            //Asteroid.setVelocityX(-50); // Set the Asteroid's x velocity to move it from right to left more slowly

    
            if (asteroid.x + asteroid.width < 0) {
                asteroid.destroy();
            }
        });
    }
    
    
}