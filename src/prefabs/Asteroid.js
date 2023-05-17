class Asteroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, groundY){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.world.enableBody(this); // Add the asteroid to the physics world
        this.body.setImmovable(true); // Make the asteroid immovable
        this.body.allowGravity = false; // Disable gravity for the asteroid
        
        this.moveSpeed = 4;
        this.groundY = groundY;
    }   

    update(){
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }
    reset() {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(borderUISize + borderPadding, this.groundY - this.height);
    }
}
