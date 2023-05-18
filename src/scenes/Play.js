class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {}
    create(){
        

        //tilesprite
        this.sunset = this.add.sprite (0, 0,'sunset').setOrigin(0,0); 
        this.physics.world.setBounds(0,0,game.config.width,game.config.height);
        this.gameOver = false;
        this.currentAsteroid = 0;
        this.totalAsteroid = 5;

        //audio set up based on paddleParkour
        this.bgdMusic = this.sound.add('bgdMusic', { 
            mute: false,
            volume: 5,
            rate: 1,
            loop: true 
        });
        this.bgdMusic.play();


        this.anims.create({
            key: 'shiftingGrid',
            defaultTextureKey: 'sunset',
            frames:  this.anims.generateFrameNames('sunset', {
                prefix: 'sunset_',
                suffix: '.ase',
                start: 0,
                end: 16,
                zeroPad: 2,
        }),
            duration: 700,
                repeat: -1
        });
        this.sunset.anims.play('shiftingGrid');

        //key binds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        
        this.P1 = new jetPack(this, game.config.width / 2, game.config.height - playerBuffer, 'jetpack', 'jetpack_00.png').setDepth(1);
        
        this.asteroids = this.add.group({
            classType: asteroid,
            runChildUpdate: true,
            maxsize: -1
        });

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>{
            if(gameObject1.texture.key == 'jetpack'){
                this.P1.disableBody(true,false);
                this.P1.PlayerAsteroidOverlap(gameObject1); 
            }
            if(gameObject2.texture.key == 'asteroid'){
                gameObject2.kill();
            }
            
        });
            
        this.scene.run('gameUIScene', {active: true});
    }

    update(){
        console.log(this.P1.health,this.P1.body.onOverlap);
        if(this.currentAsteroid < this.totalAsteroid){    
            this.currentAsteroid ++;
            this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                this.asteroids.add(new asteroid(this,
                    (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                    164, 
                    'asteroid',
                ));
            });
        }

        if(this.P1.health == 0){
            this.gameOver = true;
            this.asteroids.clear(true, true);
            this.tweens.add({
                targets: this.bgdMusic,
                volume: 0,
                ease: 'Linear',
                duration: 1000
            });
            this.time.delayedCall(1000, () => { this.scene.stop('gameUIScene');this.scene.start('gameOverScene'); });
        }
        
        this.P1.update();
        if(!this.gameOver){
            this.P1.update();
            this.physics.world.overlap(this.P1, this.asteroids);
        }
    } 
}
/*
audio set up based on paddleParkour
        this.bikeSFX = this.sound.add('bikePetal', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bikeSFX.play();

this.tweens.add({
    targets: this.bikeSFX,
    volume: 0,
    ease: 'Linear',
    duration: 2000
});

this.anims.create({
            key: 'warningFlash',
            defaultTextureKey: 'warning',
            frames:  this.anims.generateFrameNames('warning', {
                prefix: 'warning',
                suffix: '.png',
                start: 0,
                end: 2,
                zeroPad: 0,
            }),
                loop: 4,
                duration: 1000,
        });


this.AIFrames = ['white', 'lightBlue', 'red', 'green', 'pink', 'blue'];
        this.AIBikers = this.add.group({
            classType: AI,
            runChildUpdate: true,
            maxsize: -1
        });
        this.totalAI = 5;
        for(let i = 0;  i < 5; i++){
            this.AIBikers.add(new AI(this,
            (i/5) * ( 360 - (UIBorderX + grassWidth) * 2 )  + UIBorderX * 2 + grassWidth ,
            UIBorderY, 
            'AIBike',
            this.AIFrames[Math.floor(Math.random()*6)]
            ));
            
        }


this.AIBikers.createMultiple({
            key: 'AIBike',
            setXY: {
                x: Math.floor(Math.random()*360-(UIBorderX + grassWidth))+UIBorderX + grassWidth,
                y:UIBorderY
            }

if(addAI){     
            this.AIBikers.add(new AI(this,
                game.config.width / 2,
                UIBorderY, 
                'AIBike',
                this.AIFrames[Math.floor(Math.random()*6)]
            ));
            addAI = false;  
        } 

PlayerHitSpikes(gameObject1, gameObject2){
        gameObject1.health --;
        gameObject2.disableBody(true,false);
        gameObject1.breakDown = true;
        gameObject2.inPlayerReset = true;
        this.cameras.main.shake(10,2);
        sceneEvents.emit('playerUseRepair', gameObject1.health);
        this.blink = this.tweens.chain({
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
                this.P1.breakDown = false;
                gameObject2.inPlayerReset = false;
            }
        });
    }         
 */