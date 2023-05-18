class jetPack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame);
        this.scene = scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.setCollideWorldBounds(true);
        this.accel = 400;
        this.drag = 400;
        this.health = 3;
        this.scale = game.config.width / 720;
        this.health = 3;
        this.breakDown = false;

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
        this.body.setVelocityY(0);
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
    PlayerAsteroidOverlap(gameObject1){
        gameObject1.body.setVelocityY(0);
        gameObject1.body.setVelocityX(0);
        gameObject1.health --;
        gameObject1.breakDown = true;
        this.scene.cameras.main.shake(100,2);
        sceneEvents.emit('lostLife', gameObject1.health);
        this.blink = this.scene.tweens.chain({
            targets: gameObject1,
            tweens: [
                {
                    alpha:0,
                    duration: 40
                },
                {
                    alpha: 1,
                    duration: 40
                },
            ],
            loop: 15,
            onComplete: () => {
                gameObject1.enableBody(true, this.x, this.y, true, true)
            }
        });
    }
}
