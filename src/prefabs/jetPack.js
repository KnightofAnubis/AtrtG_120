class jetPack extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame);
        this.scene = scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setCollideWorldBounds(true);
        this.body.setSize(this.width / 4 , this.height);   
        this.body.onOverlap = true;
        this.breakDown = false;
        this.accel = 400;
        this.drag = 400;
        this.health = 3;
        this.scale = game.config.width / 720;
        this.health = 3;
        this.anims.create({
            key: 'flyingLoop',
            defaultTextureKey: 'jetPack',
            frames:  this.anims.generateFrameNames('jetpack', {
                prefix: 'jetpack_',
                suffix: '.png',
                start: 0,
                end:6,
                zeroPad: 2,
        }),
            duration: 700,
                repeat: -1
        });
        this.anims.play('flyingLoop');
    }
    create() {}
    
    update() {
        if(this.breakDown){
            this.angle = 0;
            this.body.setAccelerationX(0);
            if(this.x <= UIBorderX + grassWidth + this.body.width){
                this.body.velocity.x += 10;
            }else {
                if(this.x >= game.config.width - ( UIBorderX + grassWidth + this.body.width)){
                    this.body.velocity.x -= 10;
                }
            }
            this.body.velocity.x = Math.floor(this.body.velocity.x / 2);   

        }else{
            this.angle = this.body.velocity.x/7;
            if(keyA.isDown && this.x >= this.width){
                this.body.setAccelerationX(-this.accel)
            } else if (keyD.isDown && this.x <= game.config.width - this.width) {
                this.body.setAccelerationX(this.accel);
            }else {
                this.body.setAccelerationX(0);
                if(this.body.velocity.x < 0){
                    this.body.setAccelerationX(this.accel);
                }
                if(this.body.velocity.x > 0){
                    this.body.setAccelerationX(-this.accel);
                }
            }
        }
    }
}
