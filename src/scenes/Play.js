class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {}
    create(){
        

        //tilesprite
        this.sunset = this.add.tileSprite(0, 0,  640, 360, 'sunset').setOrigin(0,0); 
        this.physics.world.setBounds(0,0,game.config.width,game.config.height);
        this.gameOver = false;

        
        
        //key binds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        
        
        this.P1 = new jetPack(this, game.config.width / 2, game.config.height - playerBuffer, 'jetPackGuy').setDepth(1);
        
        this.warning = this.add.sprite(game.config.width / 2 - roadWidth / 2, UIBorderY, 'warning').setOrigin(0.5,0);
        this.warning.alpha = 0;
        
        this.physics.world.on('overlap',  (gameObject1, gameObject2, body1, body2) =>{
            if(gameObject1.texture.key == 'playerBike'){
                this.PlayerOverlap(gameObject1);
            }else {
                if(gameObject1.texture.key == 'AIBike'){
                    gameObject1.breakDown = true;
                }
            }
            if(gameObject2.type == gameObject1.type){
                this.tirePop.play();
            }
        });
            
        this.scene.run('gameUIScene', {active: true});
    }
    update(){
        if(addAI){     
            this.AIBikers.add(new AI(this,
                game.config.width / 2,
                UIBorderY, 
                'AIBike',
                this.AIFrames[Math.floor(Math.random()*6)]
            ));
            addAI = false;  
        } 
        if(this.P1.health == 0){
            this.gameOver = true;
            //this.AIBikers.runChildUpdate = false;
            this.tweens.add({
                targets: this.bikeSFX,
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            this.time.delayedCall(4000, () => { this.scene.stop('gameUIScene');this.scene.start('gameOverScene'); });
        }
        
        //const pointer = this.input.activePointer;
        //pX = pointer.worldX;
        this.P1.update();
        if(!this.gameOver){
            this.P1.update();
        }
    }
    PlayerOverlap(gameObject1, gameObject2){

        gameObject1.body.onOverlap = false;
        gameObject1.health --;
        gameObject1.breakDown = true;
        gameObject1.offRoad = true;
        this.cameras.main.shake(10,2);
        sceneEvents.emit('lostLife', gameObject1.health);
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
                gameObject1.breakDown = false;
                gameObject1.body.onOverlap = true;
                gameObject1.body.velocity.x = 0;
            }
        });
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