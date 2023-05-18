class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, groundY) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.world.enableBody(this); // Add the asteroid to the physics world
        //this.body.setImmovable(true); // Make the asteroid immovable
        this.body.allowGravity = false; // Disable gravity for the asteroid

        this.moveSpeed = 1;
        this.startX = x;
        this.startY = y;

        this.groundY = groundY;
    }

    update() {
        this.y += this.moveSpeed;
        
        if (this.y >= this.groundY + this.height) {
            this.destroy();
        }
    }
    
    
    
    
}