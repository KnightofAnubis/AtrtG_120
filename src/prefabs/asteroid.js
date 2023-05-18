class asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.scene = scene;
        this.body.drag = 0;
        this.scale = this.y/128 - 1;
        this.firstX = (game.config.width - horizonLine) / 2;
        this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
        this.constVelocity = 5;
        this.body.velocity.y = 198/ this.constVelocity;
        //set x velocity to move to the correct end target
        this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;
    }
    update() {
        this.scale = (this.y - 128) / 128;

    }
}
